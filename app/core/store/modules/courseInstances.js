import courseInstancesApi from 'core/api/course-instances'

const CourseInstance = require('models/CourseInstance')
const User = require('models/User')
const Prepaid = require('models/Prepaid')
const utils = require('core/utils')

export default {
  namespaced: true,

  state: {
    loading: {
      byTeacher: {},
      byId: {}
    },

    courseInstancesByTeacher: {},
    courseInstanceById: {},
    courseInstanceByClassroom: {}
  },

  getters: {
    // to get cis for a particluar class of the teacher
    getCourseInstancesForClass: (state) => (teacherId, classroomId) => {
      const cis = state.courseInstancesByTeacher[teacherId] || []
      return cis.filter((ci) => ci.classroomID == classroomId)
    },
    getCourseInstancesOfClass: (state) => (classroomId) => {
      return state.courseInstanceByClassroom[classroomId]
    },
    getCourseInstanceById: (state) => (id) => {
      return state.courseInstanceById[id]
    }
  },

  mutations: {
    toggleTeacherLoading: (state, teacherId) => {
      let loading = true
      if (state.loading.byTeacher[teacherId]) {
        loading = false
      }

      Vue.set(state.loading.byTeacher, teacherId, loading)
    },

    toggleIdLoading: (state, id) => {
      let loading = true
      if (state.loading.byId[id]) {
        loading = false
      }

      Vue.set(state.loading.byId, id, loading)
    },

    setCourseInstancesForTeacher: (state, { teacherId, instances }) => {
      Vue.set(state.courseInstancesByTeacher, teacherId, instances)
    },

    setCourseInstanceForId: (state, { id, instance }) => {
      Vue.set(state.courseInstanceById, id, instance)
    },

    setCourseInstancesForClassroom: (state, { classroomId, instances }) => {
      Vue.set(state.courseInstanceByClassroom, classroomId, instances)
    },

    addCourseInstancesForTeacher: (state, { teacherId, instances }) => {
      const cis = (state.courseInstancesByTeacher[teacherId] || []).concat(instances)
      Vue.set(state.courseInstancesByTeacher, teacherId, cis)
    }
  },

  actions: {
    fetchCourseInstancesForTeacher: ({ commit }, teacherId) => {
      commit('toggleTeacherLoading', teacherId)

      return courseInstancesApi
        .fetchByOwner(teacherId)
        .then(res => {
          if (res) {
            commit('setCourseInstancesForTeacher', {
              teacherId,
              instances: res
            })
          } else {
            throw new Error('Unexpected response from course instances by owner API.')
          }
        })
        .catch((e) => noty({ text: 'Fetch course instances failure: ' + e, type: 'error', layout: 'topCenter', timeout: 2000 }))
        .finally(() => commit('toggleTeacherLoading', teacherId))
    },

    updateCourseInstance: async ({ commit, state }, { courseInstance, updates }) => {
      const response = await courseInstancesApi.update({ courseInstanceID: courseInstance._id, updates })
      if (response) {
        commit('setCourseInstanceForId', {
          id: courseInstance._id,
          instance: response
        })
        const classroomId = response.classroomID
        Vue.set(state.courseInstanceByClassroom, classroomId, state.courseInstanceByClassroom[classroomId].map(ci => {
          if (ci._id === courseInstance._id) {
            return response
          }
          return ci
        }))

      } else {
        throw new Error('Unexpected response from course instances update API.')
      }
    },

    fetchCourseInstancesForClassroom: ({ commit }, classroomId) => {
      return courseInstancesApi
        .fetchByClassroom(classroomId)
        .then(res => {
          if (res) {
            commit('setCourseInstancesForClassroom', {
              classroomId,
              instances: res
            })
          } else {
            throw new Error('Unexpected response from course instances by classroom API.')
          }
        })
        .catch((e) => noty({ text: 'Failed to fetch course instances: ' + e, type: 'error', layout: 'topCenter', timeout: 5000 }))
    },

    fetchCourseInstanceForId: async ({ commit, getters }, id) => {
      if (getters.getCourseInstanceById(id)) {
        return
      }
      commit('toggleIdLoading', id)

      const res = await courseInstancesApi.get({ courseInstanceID: id })
      if (res) {
        commit('setCourseInstanceForId', {
          id,
          instance: res
        })
      } else {
        throw new Error('Unexpected response from course instances by id API.')
      }
      commit('toggleIdLoading', id)
    },

    async assignCourse ({ rootGetters, state }, { course, members, classroom, sharedClassroomId }) {
      const students = members.map(data => new User(data))

      let courseInstance = state.courseInstanceByClassroom[classroom._id].find((ci) => ci.courseID === course._id)
      if (courseInstance === undefined) {
        courseInstance = new CourseInstance({
          courseID: course._id,
          classroomID: classroom._id,
          ownerID: classroom.ownerID,
          aceConfig: {}
        })
        courseInstance.notyErrors = false

        await courseInstance.save()
      } else {
        courseInstance = new CourseInstance(courseInstance)
      }

      // Automatically apply licenses to students if necessary
      const prepaids = rootGetters['prepaids/getPrepaidsByTeacher'](classroom.ownerID)
      const availablePrepaids = prepaids.available.map(data => new Prepaid(data))

      const unenrolledStudents = students
        .filter(user => !user.isEnrolled() || !user.prepaidIncludesCourse(course._id))

      const totalSpotsAvailable = availablePrepaids.reduce((acc, prepaid) => {
        if (prepaid.includesCourse(course._id)) {
          return acc + prepaid.openSpots()
        } else {
          return acc
        }
      }, 0)
      const canAssignCourses = totalSpotsAvailable >= unenrolledStudents.length

      if (!course.free && !canAssignCourses) {
        const additionalLicensesNum = unenrolledStudents.length - totalSpotsAvailable
        noty({
          text: `Oops! It looks like you need ${additionalLicensesNum} more license${additionalLicensesNum > 1 ? 's' : ''} to access the remaining chapters. Visit My Licenses to learn more!`,
          layout: 'center',
          type: 'error',
          killer: true,
          timeout: 5000
        })
        return
      }

      const numberEnrolled = unenrolledStudents.length
      const courseName = utils.i18n(course, 'name')
      if (numberEnrolled && !course.free) {
        let confirmed = false
        await new Promise((resolve) => noty({
          text: $.i18n.t('teachers.assign_course_confirm', {
            numStudents: members.length,
            courseName,
            numberEnrolled,
          }),
          buttons: [
            {
              addClass: 'btn btn-primary',
              text: $.i18n.t('modal.okay'),
              onClick: function ($noty) {
                confirmed = true
                $noty.close()
                resolve()
              }
            },
            {
              addClass: 'btn btn-danger',
              text: $.i18n.t('modal.cancel'),
              onClick: function ($noty) {
                $noty.close()
                resolve()
              }
            }
          ]
        }))

        if (!confirmed) {
          return
        }
      }
      const remainingSpots = totalSpotsAvailable - numberEnrolled

      if (!course.free) {
        const requests = []
        for (const prepaid of availablePrepaids) {
          if (!prepaid.includesCourse(course._id) || !Math.min(unenrolledStudents.length, prepaid.openSpots()) > 0) {
            // Not able to assign to this prepaid.
            continue
          }

          const availableLicenses = Math.min(unenrolledStudents.length, prepaid.openSpots())
          for (let i = 0; i < availableLicenses; i++) {
            const user = unenrolledStudents.pop()
            requests.push(prepaid.redeem(user.get('_id'), { data: { sharedClassroomId } }))
          }
        }

        await Promise.all(requests)
      }

      try {
        noty({ text: $.i18n.t('teacher.assigning_course'), layout: 'center', type: 'information', killer: true })
        await courseInstance.addMembers(members.map(({ _id }) => _id))

        const lines = [
          $.i18n.t('teacher.assigned_msg_1')
            .replace('{{numberAssigned}}', members.length)
            .replace('{{courseName}}', course.name)
        ]
        if (!course.free && numberEnrolled > 0) {
          lines.push(
            $.i18n.t('teacher.assigned_msg_2')
              .replace('{{numberEnrolled}}', numberEnrolled)
          )
          lines.push(
            $.i18n.t('teacher.assigned_msg_3')
              .replace('{{remainingSpots}}', remainingSpots)
          )
        }
        noty({ text: lines.join('<br />'), layout: 'center', type: 'information', killer: true, timeout: 5000 })
      } catch (e) {
        noty({ text: JSON.stringify(e), type: 'error' })
      }
    },

    async removeCourse ({ state }, { course, members, classroom }) {
      const courseInstanceData = state.courseInstanceByClassroom[classroom._id].find((ci) => ci.courseID === course._id)
      if (!courseInstanceData) {
        noty({ text: `No course found to remove.`, type: 'error', layout: 'topCenter', timeout: 5000 })
        return
      }
      const courseInstance = new CourseInstance(courseInstanceData)
      const membersBefore = courseInstance.get('members').length

      if (members.length) {
        noty({ text: $.i18n.t('teacher.removing_course'), layout: 'center', type: 'information', killer: true })

        await courseInstance.removeMembers(members)

        const membersAfter = courseInstance.get('members').length || 0
        const numRemoved = membersBefore - membersAfter
        const lines = [
          $.i18n.t('teacher.removed_course_msg')
            .replace('{{numberRemoved}}', numRemoved)
            .replace('{{courseName}}', course.name)
        ]
        noty({ text: lines.join('<br />'), layout: 'center', type: 'information', killer: true, timeout: 5000 })
      }
    },

    // creates free course instances for a new classroom, so that when students join the classroom they are assigned the free courses
    // TODO move to server in the classroom creation flow
    async createFreeCourseInstances ({ state, commit }, { classroom, courses }) {
      const freeCourses = courses.filter((c) => c.free === true)
      const initialFreeCourses = classroom.initialFreeCourses || [utils.courseIDs.INTRODUCTION_TO_COMPUTER_SCIENCE]
      const courseInstancePromises = []
      freeCourses.forEach((c) => {
        if(!initialFreeCourses.includes(c._id)) {
          return
        }

        courseInstancePromises.push(courseInstancesApi.post({ classroomID: classroom._id, courseID: c._id }).then((ci) => {
          commit('addCourseInstancesForTeacher', { // update course-instance state
            teacherId: classroom.ownerID,
            instances: [ci]
          })
        }))
      })
      await Promise.all(courseInstancePromises)
    }
  }
}
