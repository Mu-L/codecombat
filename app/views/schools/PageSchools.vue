<template>
  <div id="page-schools">
    <banner-component />
    <div class="container">
      <header-component class="container__header">
        <template #header-text>
          <h1 class="text-h1">
            <mixed-color-label :text="$t('schools_page.most_effective_computer_science_solution')" />
          </h1>
          <p class="text-24">
            {{ $t('schools_page.start_teach_trial') }}
          </p>
          <CTAButton
            v-if="me.isAnonymous()"
            class="contact-solution signup-button"
            data-start-on-path="teacher"
          >
            {{ $t('schools_page.try_it_free') }}
          </CTAButton>
          <CTAButton
            v-else
            class="contact-solution"
            @clickedCTA="showContactModal = true"
          >
            {{ $t('schools_page.get_my_solution') }}
          </CTAButton>
        </template>
        <template #image>
          <content-box :main-image-bg="true">
            <template #image>
              <video-box
                video-id="8dc59ba8779cdb63f9cf5a3cb7493b09"
              />
            </template>
          </content-box>
        </template>
      </header-component>
    </div>

    <background-container
      type="colored"
      class="testimonials"
    >
      <div class="container">
        <carousel-component
          :show-tabs="false"
          :show-dots="true"
          :has-background="false"
        >
          <template
            v-for="(item, index) in testimonials"
            #[`${index}`]
          >
            <carousel-item :key="index">
              <testimonial-component
                class="testimonials__item"
                :quote="$t(`schools_page.testimonials_${index + 1}_quote`)"
                :name="$t(`schools_page.testimonials_${index + 1}_name`)"
                :title="$t(`schools_page.testimonials_${index + 1}_title`)"
                :image="item.image"
                :link="item.link"
                :full-review-link="item.fullReviewLink"
                :full-review-text="$t(`schools_page.testimonials_${index + 1}_full_review_text`)"
              />
            </carousel-item>
          </template>
        </carousel-component>
      </div>
    </background-container>

    <div class="container">
      <turnkey-solutions :title="$t('schools_page.your_turnkey_solutions')" />
    </div>

    <div
      v-if="me.isAnonymous()"
      id="try-it-free"
      class="container contact-us"
    >
      <div class="row">
        <div class="col-md-12">
          <CTAButton
            class="signup-button"
            data-start-on-path="teacher"
          >
            {{ $t('schools_page.try_it_free') }}
          </CTAButton>
        </div>
      </div>
    </div>

    <div class="container">
      <image-and-text
        :title="$t('schools_page.flexible_standards_aligned_curriculum_title')"
        :text="$t('schools_page.flexible_standards_aligned_curriculum_text')"
      >
        <template #image>
          <video-box
            video-id="c01bf2665cc40c18e1b728516b3ed4fb"
          />
        </template>
      </image-and-text>
      <image-and-text
        :title="$t('schools_page.comprehensive_tools_resources_title')"
        :text="$t('schools_page.comprehensive_tools_resources_text')"
        :reverse="true"
      >
        <template #image>
          <video-box
            video-id="274971c4154aa46305c65d739a7d4412"
          />
        </template>
      </image-and-text>
    </div>

    <BackgroundContainer>
      <stats-component class="container" />
    </BackgroundContainer>

    <div class="container">
      <image-and-text
        :title="$t('schools_page.accessible_data_insights_title')"
        :text="$t('schools_page.accessible_data_insights_text')"
      >
        <template #image>
          <video-box
            video-id="cfd3f5540ac68830bb1ac43f9863a220"
          />
        </template>
      </image-and-text>

      <image-and-text
        :title="$t('schools_page.high_quality_professional_development_title')"
        :text="$t('schools_page.high_quality_professional_development_text')"
        :reverse="true"
      >
        <p class="hq-prof">
          <span>{{ $t('schools_page.earn_up_to_3_graduate_credits') }}</span>
          <img
            src="/images/pages/schools/logo/southern-new-hampshire-university_small.webp"
            alt="Southern New Hampshire University logo"
          >
        </p>
        <template #image>
          <video-box
            video-id="daebc1c8739e2f638660df076c1104e2"
          />
        </template>
      </image-and-text>
    </div>

    <div
      id="request-a-demo"
      class="container contact-us"
    >
      <div class="row">
        <div class="col-md-12">
          <CTAButton
            class="request-demo"
            @clickedCTA="showContactModal = true"
          >
            {{ $t('schools_page.request_a_demo') }}
          </CTAButton>
        </div>
      </div>
    </div>

    <background-container type="sides">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <content-box>
              <template #text>
                <mission-component />
              </template>
            </content-box>
          </div>
        </div>
      </div>
    </background-container>

    <background-container
      type="colored"
      class="maximize"
    >
      <div class="container">
        <h2 class="text-h2 text-highlight">
          {{ $t('schools_page.maximize_your_impact') }}
        </h2>
        <box-panel
          :title="$t('schools_page.core_curriculum')"
          :items="coreCurriculum"
        />
        <box-panel
          :title="$t('schools_page.practice_enrichment')"
          :items="practiceEnrichment"
        />
        <box-panel
          :title="$t('schools_page.student_acceleration_ap_csp')"
          :items="studentAcceleration"
          :lazy-load="true"
        />
        <box-panel
          :title="$t('schools_page.young_learners')"
          :items="youngLearners"
          :lazy-load="true"
        />
        <box-panel
          :title="$t('schools_page.funding_solutions')"
          :items="fundingSolutions"
          arrangement="horizontal"
          :lazy-load="true"
        />
        <box-panel
          :title="$t('schools_page.support_development')"
          :items="supportDevelopment"
          :lazy-load="true"
        />
      </div>
    </background-container>

    <div class="container">
      <image-and-text
        :title="$t('schools_page.ai_support_acceleration_title')"
        :text="$t('schools_page.ai_support_acceleration_text')"
        image="/images/pages/schools/boxes/aisupport_1.webp"
        :lazy-load="true"
      />
      <image-and-text
        :text="$t('schools_page.codecombat_ai_hackstack_text')"
        image="/images/pages/home-v3/young-learners/box-bg-ai-hs.webp"
        :reverse="true"
        :lazy-load="true"
      />
    </div>

    <background-container
      type="colored"
      class="pathway"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2
              class="text-h2"
            >
              {{ $t('schools_page.pathways_for_success') }}
            </h2>
          </div>
        </div>
        <div
          v-if="me.isAnonymous()"
          class="row contact-row"
        >
          <div class="col-md-12">
            <CTAButton
              class="signup-button"
              data-start-on-path="teacher"
              :description="$t('schools_page.trial_the_curriculum')"
            >
              {{ $t('schools_page.free_teacher_account') }}
            </CTAButton>
          </div>
        </div>
        <custom-table
          :header-contents="[
            $t('schools_page.elementary_school'),
            $t('schools_page.codecombat_jr'),
            $t('schools_page.ai_hacksstack_jr'),
            $t('schools_page.codecombat_worlds')
          ]"
          :table-rows="[
            {
              year: '1',
              percents: [50, 50, null],
              contents: [
                $t('schools_page.k'),
                $t('schools_page.icons_block_based'),
                $t('schools_page.introduction_to_ai'),
                null
              ]
            },
            {
              year: '2',
              percents: [50, 50, null],
              contents: [
                $t('schools_page.grade_1'),
                $t('schools_page.icons_block_based'),
                $t('schools_page.simple_ai_templates'),
                null
              ]
            },
            {
              year: '3',
              percents: [60, 20, 20],
              contents: [
                $t('schools_page.grade_2'),
                $t('schools_page.icons_block_based'),
                $t('schools_page.complex_ai_templates'),
                $t('schools_page.explorations')
              ]
            },
            {
              year: '4',
              percents: [70, 10, 20],
              contents: [
                $t('schools_page.grade_3'),
                $t('schools_page.block_based'),
                $t('schools_page.complex_ai_templates'),
                $t('schools_page.explorations')
              ]
            },
            {
              year: '5',
              percents: [45, 10, 45],
              contents: [
                $t('schools_page.grade_4'),
                $t('schools_page.block_based_text'),
                $t('schools_page.complex_ai_templates'),
                $t('schools_page.explorations')
              ]
            },
            {
              year: '6',
              percents: [45, 10, 45],
              contents: [
                $t('schools_page.grade_5'),
                $t('schools_page.text'),
                $t('schools_page.complex_ai_templates'),
                $t('schools_page.explorations')
              ]
            }
          ]"
        />
        <p>
          <mixed-color-label
            :text="$t('schools_page.our_k_5_implementation_pathway')"
          />
        </p>
        <custom-table
          :header-contents="[
            $t('schools_page.middle_school'),
            $t('schools_page.ozaria'),
            $t('schools_page.codecombat_worlds'),
            $t('schools_page.ai_hackstack'),
            $t('schools_page.ai_league')
          ]"
          :table-rows="[
            {
              year: '1',
              percents: [75, null, 25, null],
              contents: [
                $t('schools_page.grade_6'),
                $t('schools_page.introduction_to_coding'),
                $t('schools_page.introduction_to_luau_coding'),
                $t('schools_page.introduction_to_ai'),
                $t('schools_page.introduction_to_coding_esports')
              ]
            },
            {
              year: '2',
              percents: [25, null, 75, null],
              contents: [
                $t('schools_page.grade_7'),
                $t('schools_page.loops_structures'),
                $t('schools_page.introduction_to_creative_mode'),
                $t('schools_page.ai_scenarios'),
                $t('schools_page.competitive_coding_arenas')
              ]
            },
            {
              year: '3',
              percents: [25, null, 75, null],
              contents: [
                $t('schools_page.grade_8'),
                $t('schools_page.functions_data'),
                $t('schools_page.game_development'),
                $t('schools_page.open_ended_ai_projects'),
                $t('schools_page.competitive_coding_arenas')
              ]
            }
          ]"
        />
        <p>
          <mixed-color-label
            :text="$t('schools_page.middle_school_implementation')"
          />
        </p>
        <custom-table
          :header-contents="[
            $t('schools_page.high_school'),
            $t('schools_page.codecombat'),
            $t('schools_page.codecombat_worlds'),
            $t('schools_page.ai_hackstack'),
            $t('schools_page.ai_league')
          ]"
          :table-rows="[
            {
              year: '1',
              percents: [90, null, 10, null],
              contents: [
                $t('schools_page.ap_csp'),
                $t('schools_page.cs1_4_data_science_cybersecurity_exam_content'),
                $t('schools_page.game_development'),
                $t('schools_page.open_ended_ai_projects'),
                $t('schools_page.competitive_coding_arenas')
              ]
            },
            {
              year: '2',
              percents: [35, 25, 25, 15],
              contents: [
                $t('schools_page.advanced_cs'),
                $t('schools_page.cs5_6_gd1_3_wd1_2'),
                $t('schools_page.advanced_game_development'),
                $t('schools_page.advanced_ai_projects'),
                $t('schools_page.global_esports_tournament')
              ]
            }
          ]"
        />
        <p>
          <mixed-color-label
            :text="$t('schools_page.first_year_high_school_curriculum')"
          />
        </p>
      </div>
    </background-container>

    <div class="container">
      <image-and-text
        :title="$t('schools_page.accessibility_representation_title')"
        :text="$t('schools_page.accessibility_representation_text')"
        image="/images/pages/schools/boxes/box_access.webp"
        :lazy-load="true"
      >
        <p>
          <span>{{ $t('schools_page.accessibility_acr_prefix') }}</span>
          <a href="/acr">{{ $t('schools_page.accessibility_acr_link_text') }}</a>
          <span>{{ $t('schools_page.accessibility_acr_suffix') }}</span>
        </p>
      </image-and-text>
      <image-and-text
        :title="$t('schools_page.privacy_security_title')"
        :text="$t('schools_page.privacy_security_text')"
        image="/images/pages/schools/boxes/box_privacy.webp"
        link="https://codecombat.com/privacy"
        :reverse="true"
        :lazy-load="true"
      />
    </div>

    <div
      class="container contact-us"
    >
      <div class="row">
        <div class="col-md-12">
          <CTAButton
            class="contact-us-quote"
            @clickedCTA="showContactModal = true"
          >
            {{ $t('new_home.request_quote') }}
          </CTAButton>
        </div>
      </div>
    </div>

    <background-container type="colored">
      <div class="container">
        <faq-component :faq-items="faqItems" />
      </div>
    </background-container>

    <trends-and-insights />

    <div
      id="contact-us"
      class="container contact-us"
    >
      <div class="row">
        <div class="col-md-12">
          <CTAButton
            class="contact-modal-schools"
            :description="$t('schools_page.for_turnkey_solutions')"
            @clickedCTA="showContactModal = true"
          >
            {{ $t('schools_page.contact_our_team') }}
          </CTAButton>
        </div>
      </div>
    </div>
    <modal-get-licenses
      v-if="showContactModal"
      @close="showContactModal = false"
    />
  </div>
</template>

<script>
import CarouselComponent from '../../components/common/elements/CarouselComponent.vue'
import CarouselItem from '../../components/common/elements/CarouselItem.vue'
import MixedColorLabel from '../../components/common/labels/MixedColorLabel.vue'
import BackgroundContainer from '../../components/common/backgrounds/BackgroundContainer.vue'
import ContentBox from '../../components/common/elements/ContentBox.vue'
import BoxPanel from '../../components/common/elements/BoxPanel.vue'
import CTAButton from '../../components/common/buttons/CTAButton.vue'
import HeaderComponent from '../../components/common/elements/HeaderComponent.vue'
import ImageAndText from '../../components/common/elements/ImageAndText.vue'
import MissionComponent from '../common/MissionComponent.vue'
import TestimonialComponent from '../../components/common/elements/TestimonialComponent.vue'
import FaqComponent from '../../components/common/elements/FaqComponent.vue'
import TrendsAndInsights from '../common/TrendsAndInsights.vue'
import VideoBox from '../../components/common/image-containers/VideoBox.vue'

import TurnkeySolutions from './TurnkeySolutions.vue'
import StatsComponent from './StatsComponent.vue'
import CustomTable from './CustomTable.vue'
import ModalGetLicenses from '../../components/common/ModalGetLicenses.vue'
import BannerComponent from '../../components/common/elements/BannerComponent.vue'

export default Vue.extend({
  name: 'PageSchools',
  components: {
    CarouselComponent,
    CarouselItem,
    MixedColorLabel,
    BackgroundContainer,
    ContentBox,
    BoxPanel,
    CTAButton,
    HeaderComponent,
    ImageAndText,
    TurnkeySolutions,
    StatsComponent,
    MissionComponent,
    CustomTable,
    TestimonialComponent,
    FaqComponent,
    TrendsAndInsights,
    VideoBox,
    ModalGetLicenses,
    BannerComponent,
  },
  data () {
    return {
      testimonials: [
        {
          image: '/images/pages/schools/avatar/avatar_seth.webp',
        },
        {
          link: 'https://www.youtube.com/watch?v=hCbn7viOf7A&t=60s&ab_channel=CommonSenseEducation',
          image: '/images/pages/schools/avatar/avatar_tanner.webp',
          fullReviewLink: 'https://www.youtube.com/watch?v=hCbn7viOf7A&t=60s',
        },
        {
          image: '/images/pages/schools/avatar/avatar_steve.webp',
        },
        {
          image: '/images/pages/schools/avatar/avatar_student.webp',
        },
        {
          image: '/images/pages/schools/avatar/avataar_sandra.webp',
        },
      ],
      faqItems: [
        {
          question: this.$t('schools_page.faq_1_question'),
          answer: this.$t('schools_page.faq_1_answer'),
        },
        {
          question: this.$t('schools_page.faq_2_question'),
          answer: this.$t('schools_page.faq_2_answer'),
        },
        {
          question: this.$t('schools_page.faq_3_question'),
          answer: this.$t('schools_page.faq_3_answer'),
        },
        {
          question: this.$t('schools_page.faq_4_question'),
          answer: this.$t('schools_page.faq_4_answer'),
        },
        {
          question: this.$t('schools_page.faq_5_question'),
          answer: this.$t('schools_page.faq_5_answer'),
        },
        {
          question: this.$t('schools_page.faq_6_question'),
          answer: this.$t('schools_page.faq_6_answer'),
        },
        {
          question: this.$t('schools_page.faq_7_question'),
          answer: [
            this.$t('schools_page.faq_7_answer_1'),
            this.$t('schools_page.faq_7_answer_2'),
            this.$t('schools_page.faq_7_answer_3'),
            this.$t('schools_page.faq_7_answer_4'),
          ],
        },
        {
          question: this.$t('schools_page.faq_8_question'),
          answer: this.$t('schools_page.faq_8_answer'),
        },
        {
          question: this.$t('schools_page.faq_9_question'),
          answer: this.$t('schools_page.faq_9_answer'),
        },
      ],
      coreCurriculum: [
        {
          title: this.$t('schools_page.core_curriculum_1_title'),
          text: this.$t('schools_page.core_curriculum_1_text'),
          link: 'https://ozaria.com',
          linkText: this.$t('schools_page.core_curriculum_1_link_text'),
          video: {
            videoId: '177fb5ba412b8fee21928e3353a9e469',
          },
        },
        {
          title: this.$t('schools_page.core_curriculum_2_title'),
          text: this.$t('schools_page.core_curriculum_2_text'),
          signupModal: true,
          signupModalPath: 'teacher',
          linkText: this.$t('schools_page.core_curriculum_2_link_text'),
          video: {
            videoId: '16b8482dc4d9b96c7d827fb788e64368',
          },
        },
      ],
      practiceEnrichment: [
        {
          title: this.$t('schools_page.practice_enrichment_1_title'),
          text: this.$t('schools_page.practice_enrichment_1_text'),
          link: 'https://codecombat.com/league',
          linkText: this.$t('schools_page.practice_enrichment_1_link_text'),
          video: {
            videoId: '1b3bcd237a9dda25a042493d799e7278',
          },
        },
        {
          title: this.$t('schools_page.practice_enrichment_2_title'),
          text: this.$t('schools_page.practice_enrichment_2_text'),
          link: 'https://codecombat.com/roblox',
          linkText: this.$t('schools_page.practice_enrichment_2_link_text'),
          video: {
            videoId: 'a50758af1eeeb12f241472beca961424',
          },
        },
      ],
      studentAcceleration: [
        {
          title: this.$t('schools_page.student_acceleration_1_title'),
          text: this.$t('schools_page.student_acceleration_1_text'),
          link: '/hackstack',
          linkText: this.$t('schools_page.student_acceleration_1_link_text'),
          video: {
            videoId: '50770b9a2fb36de457a37693a3f632c7',
            aspectRatio: '1535 / 1038',
          },
        },
        {
          title: this.$t('schools_page.student_acceleration_2_title'),
          text: this.$t('schools_page.student_acceleration_2_text'),
          image: '/images/pages/schools/boxes/maximize_6.webp',
          linkText: this.$t('schools_page.learn_more_text'),
          link: 'https://codecombat.com/apcsp',
          mainImageOriginal: true,
        },
      ],
      youngLearners: [
        {
          title: this.$t('home_v3.young_learners_1_title'),
          text: this.$t('home_v3.young_learners_1_text'),
          link: 'https://codecombat.com/junior',
          linkText: this.$t('home_v3.try_it_now'),
          image: '/images/pages/home-v3/young-learners/box-bg-coco-jr.webp',
        },
        {
          title: this.$t('home_v3.young_learners_2_title'),
          text: this.$t('home_v3.young_learners_2_text'),
          link: 'https://docs.google.com/forms/d/e/1FAIpQLSfcWo6JVeFP30OslksUwE1Z-XyWFIKW3h81v08aYU1-vbhSUA/viewform',
          linkText: this.$t('home_v3.young_learners_2_linkText'),
          image: '/images/pages/home-v3/young-learners/box-bg-ai-jr.webp',
        },
      ],
      fundingSolutions: [
        {
          title: this.$t('schools_page.funding_solutions_1_title'),
          text: this.$t('schools_page.funding_solutions_1_text'),
          linkText: this.$t('schools_page.funding_solutions_1_link_text'),
          link: 'https://codecombat.com/grants',
          hasPadding: false,
          mainImageBg: true,
          equalWidth: true,
          image: '/images/pages/schools/boxes/maximize_9.webp',
        },
      ],
      supportDevelopment: [
        {
          title: this.$t('schools_page.support_development_1_title'),
          text: this.$t('schools_page.support_development_1_text'),
          link: 'https://codecombat.com/teachers/quote',
          linkText: this.$t('schools_page.learn_more_text'),
          image: '/images/pages/schools/boxes/maximize_10.webp',
        },
        {
          title: this.$t('home_v3.solutions_1_title'),
          text: this.$t('home_v3.solutions_1_text'),
          link: 'https://www.ozaria.com/pd',
          linkText: this.$t('home_v3.solutions_1_linkText'),
          middleText: this.$t('home_v3.solutions_1_middleText'),
          middleImage: '/images/pages/schools/logo/southern-new-hampshire-university_small.webp',
          middleImageAlt: 'Southern New Hampshire University logo',
          image: '/images/pages/home-v3/solutions/box_1.webp',
        },
      ],
      showContactModal: false,
    }
  },
  computed: {
    me () {
      return me
    },
  },
  mounted () {
    const params = new URLSearchParams(window.location.search)
    const shouldOpenModal = params.get('openContactModal')
    if (shouldOpenModal === 'true') {
      this.showContactModal = true
    }
  },
  metaInfo () {
    return {
      title: this.$t('schools_page.meta_title'),
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { vmid: 'meta-description', name: 'description', content: this.$t('schools_page.our_comprehensive_implementation') },
      ],
    }
  },
})
</script>

<style>
#page-schools {
  max-width: 100vw;
  overflow-x: hidden;
}
</style>

<style scoped lang="scss">
@import "app/styles/component_variables.scss";

.testimonials {
  &__item {
    align-items: center;
    text-align: center;
  }
}

#page-schools {
  ::v-deep {
    @extend %frontend-page;
  }

  #request-a-demo {
    margin-bottom: -40px;
    @media screen and (min-width: $screen-md) {
      margin-bottom: -80px;
    }
  }

  .container {
    &__header {
      padding-top: 200px;

      .text-h1 {
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    .text-h1 {
      @extend %font-44;
      text-align: left;
    }
  }

  #trends {
    ::v-deep .text-h2 {
      margin: 80px auto;
    }

    padding-bottom: 160px;
  }

  .contact-us, .pathway .contact-row {
    text-align: center;

    p {
      margin-top: 8px;
      color: $purple;
      text-align: center;
      @extend %font-14;
      font-style: normal;
      font-weight: 700;
      line-height: 32px;
    }
  }

  .pathway {

    .text-h2 {
      margin-bottom: 0;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 70px;
    }
    .contact-row {
      text-align: center;
    }
  }

  .hq-prof {
    color: $dark-grey;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .maximize {
    .text-h2 {
      @extend %font-36;
    }
  }
}
</style>
