<template>
  <div class="time-container">
    <div
      v-if="days >= 0"
      class="title"
    >
      {{ $t('teacher_dashboard.arena_days_left', {
        arenaName:
          $t(`league.${currentArena.slug.replaceAll('-', '_')}`), season: currentArena.season
      }) }}
    </div>
    <div
      v-else
      class="title elapse"
    >
      {{ $t('teacher_dashboard.arena_days_elapse', {
        arenaName:
          $t(`league.${currentArena.slug.replaceAll('-', '_')}`),
        season: currentArena.season,
        time: elapse
      }) }}
    </div>
    <div
      v-if="days >= 0"
      class="frame"
    >
      <div class="overlap-group">
        <div class="text-wrapper">
          {{ days }}
        </div>
        <div class="unit">
          {{ $t('units.days') }}
        </div>
      </div>
      <div class="overlap-group">
        <div class="text-wrapper">
          {{ hours }}
        </div>
        <div class="unit">
          {{ $t('units.hours') }}
        </div>
      </div>
      <div class="overlap-group">
        <div class="text-wrapper">
          {{ minutes }}
        </div>
        <div class="unit">
          {{ $t('units.minutes') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currentRegularArena, currentChampionshipArena } from 'app/core/store/modules/seasonalLeague'
import moment from 'moment'

export default {
  name: 'RemainingTimeView',
  data () {
    return {
      days: '26',
      hours: '6',
      minutes: '43',
      elapse: ''
    }
  },
  computed: {
    currentArena () {
      return currentChampionshipArena || currentRegularArena
    }
  },
  mounted () {
    this.updateTime()
  },
  methods: {
    updateTime () {
      const arena = this.currentArena
      if (!arena) return
      const remainingTime = arena.end - Date.now()
      this.days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
      this.hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      this.minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
      this.elapse = moment(arena.end).fromNow()
      setTimeout(this.updateTime, 1000 * 60)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "app/styles/ozaria/_ozaria-style-params.scss";
@import "ozaria/site/styles/common/variables.scss";

.time-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: $ozaria-main-font-family;

    .title {
        color: #131B25;
        font-feature-settings: 'clig' off, 'liga' off;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 0.333px;
        max-width: 140px;

      &.elapse {
        max-width: 320px;
      }
    }

    .frame {
        background: linear-gradient(125deg, $purple 0%, lighten($purple, 10%) 100%);
        background-color: rgba(255, 255, 255, 1);
        border-radius: 10px;
        height: 70px;
        position: relative;
        width: 300px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        .overlap-group {
            display: flex;
            flex-direction: column;
        }

        .text-wrapper {
            color: #F7D047;
            font-family: "Space Mono", Helvetica;
            font-size: 32px;
            font-weight: 700;
            height: 40px;
            left: 0;
            letter-spacing: 0;
            line-height: normal;
            text-align: center;
        }

        .unit {
            color: #FFF;
            text-align: center;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 18px;
            text-transform: uppercase;
        }
    }
}
</style>