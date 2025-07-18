<script>
import ButtonSlides from './ButtonSlides'
import ButtonProjectReq from './ButtonProjectReq'
import ButtonExemplar from './ButtonExemplar'

import IconHelp from '../../common/icons/IconHelp'
import { mapGetters } from 'vuex'
import utils from 'core/utils'

import CodeRenderer from 'app/components/common/labels/CodeRenderer'
import AccessLevelIndicator from 'app/components/common/elements/AccessLevelIndicator'

export default {
  components: {
    ButtonSlides,
    ButtonProjectReq,
    ButtonExemplar,
    IconHelp,
    CodeRenderer,
    AccessLevelIndicator,
  },
  props: {
    moduleNum: {
      required: true,
      type: String,
    },
    courseName: {
      type: String,
      default: null,
    },
    isCapstone: {
      type: Boolean,
      default: false,
    },
    moduleName: {
      type: String,
      default: '',
    },
    showLessonSlides: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      getCurrentCourse: 'baseCurriculumGuide/getCurrentCourse',
      getCurrentModuleNames: 'baseCurriculumGuide/getCurrentModuleNames',
      getCurrentModuleHeadingInfo: 'baseCurriculumGuide/getCurrentModuleHeadingInfo',
      getCapstoneInfo: 'baseCurriculumGuide/getCapstoneInfo',
      isOnLockedCampaign: 'baseCurriculumGuide/isOnLockedCampaign',
      getTrackCategory: 'teacherDashboard/getTrackCategory',
    }),

    getModuleInfo () {
      return this.getCurrentModuleHeadingInfo(this.moduleNum) || {}
    },

    getModuleTotalTimeInfo () {
      return utils.i18n(this.getModuleInfo?.duration, 'total')
    },
    currentCourseSlug () {
      return this.getCurrentCourse?.slug
    },
  },

  methods: {
    tooltipTimeContent () {
      const time = []

      if (this.getModuleInfo?.duration?.totalTimeRange) {
        time.push(`<p><b>${this.$t('teacher_dashboard.class_time_range')}</b> ${utils.i18n(this.getModuleInfo?.duration, 'totalTimeRange')}</p>`)
      }

      if (this.getModuleInfo?.duration?.inGame) {
        time.push(`<p><b>${this.$t('teacher_dashboard.in_game_play_time')}</b> ${utils.i18n(this.getModuleInfo?.duration, 'inGame')}</p>`)
      }

      return time.join('')
    },

    projectRubricTooltipContent () {
      if (this.isOnLockedCampaign) {
        return this.$t('teacher_dashboard.need_licenses_tooltip')
      }
      return this.$t('teacher_dashboard.project_rubric_tooltip')
    },

    exemplarProjectTooltipContent () {
      if (this.isOnLockedCampaign) {
        return this.$t('teacher_dashboard.need_licenses_tooltip')
      }
      return this.$t('teacher_dashboard.exemplar_projects_tooltip')
    },

    trackEvent (eventName) {
      if (!this.isOnLockedCampaign && eventName) {
        window.tracker?.trackEvent(eventName, { category: this.getTrackCategory, label: this.courseName })
      }
    },
  },
}
</script>
<template>
  <div class="header">
    <div class="module-header">
      <h3>
        <span>{{ $t('teacher_dashboard.module') }} </span>
        <span
          v-if="!(['junior', 'ai-hackstack'].includes(getCurrentCourse.slug))"
        >
          {{ moduleNum }}:
        </span>
        <code-renderer :content="moduleName || getCurrentModuleNames(moduleNum) || 'Introduction'" />
      </h3>
      <div
        v-if="getModuleTotalTimeInfo"
        class="time-row"
      >
        <p>{{ $t('teacher_dashboard.class_time') }} {{ getModuleTotalTimeInfo }}</p>
        <icon-help
          v-if="tooltipTimeContent()"
          v-tooltip.top="{
            content: tooltipTimeContent,
            classes: 'teacher-dashboard-tooltip'
          }"
        />
      </div>
    </div>
    <div class="buttons">
      <access-level-indicator
        :level="getModuleInfo.access"
        :course-slug="currentCourseSlug"
      />
      <!-- For this locked tooltip we use a span, as the disabled button doesn't trigger a tooltip. -->
      <template
        v-if="getModuleInfo.lessonSlidesUrl && showLessonSlides"
      >
        <span
          v-if="isOnLockedCampaign"
          v-tooltip.top="{
            content: $t('teacher_dashboard.need_licenses_tooltip'),
            classes: 'teacher-dashboard-tooltip lighter-p',
            autoHide: false
          }"
        >
          <button-slides
            class="margin-right"
            :link="getModuleInfo.lessonSlidesUrl"
            :locked="true"
          />
        </span>
        <button-slides
          v-else
          v-tooltip.top="{
            content: $t('teacher_dashboard.lesson_slides_tooltip'),
            classes: 'teacher-dashboard-tooltip lighter-p'
          }"
          class="margin-right"
          :link="getModuleInfo.lessonSlidesUrl"
          :locked="isOnLockedCampaign"
          @click.native="trackEvent('Curriculum Guide: Lesson Slides Clicked')"
        />
      </template>

      <button-project-req
        v-if="isCapstone"
        v-tooltip.top="{
          content: projectRubricTooltipContent,
          classes: 'teacher-dashboard-tooltip lighter-p',
          autoHide: !isOnLockedCampaign
        }"
        :locked="isOnLockedCampaign"
        class="margin-right"
        :link="getCapstoneInfo.projectRubricUrl"
        @click.native="trackEvent('Curriculum Guide: Project Rubric Clicked')"
      />

      <button-exemplar
        v-if="isCapstone"
        v-tooltip.top="{
          content: exemplarProjectTooltipContent,
          classes: 'teacher-dashboard-tooltip lighter-p',
          autoHide: !isOnLockedCampaign
        }"
        class="margin-right"
        :link="getCapstoneInfo.exemplarProjectUrl"
        :locked="isOnLockedCampaign"
        @click.native="trackEvent('Curriculum Guide: Exemplar Project Clicked')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "app/styles/bootstrap/variables";
  @import "ozaria/site/styles/common/variables.scss";
  @import "app/styles/ozaria/_ozaria-style-params.scss";

  .header {
    height: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;

    border: 0.5px solid #d8d8d8;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);

    padding: 0 15px;

    .module-header {
      flex: 1 1 auto;
    }
    .buttons {
      flex: 2 2 auto;
      display: flex;
      align-items: center;
      .margin-right {
        margin-right: 15px;
      }
    }
  }

  .time-row {
    display: flex;
    flex-direction: row;

    & > img {
      margin-left: 9px;
    }
  }

  h3 {
    @include font-p-3-small-button-text-black;
    text-align: left;
    color: #333333;
    margin-bottom: 3px;
  }
  p {
    @include font-p-4-paragraph-smallest-gray;
    color: #131b25;
    margin-bottom: 0;
  }
</style>
