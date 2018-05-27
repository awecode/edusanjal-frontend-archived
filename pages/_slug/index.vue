<template>
    <div v-if="obj">
        <img class="cover is-hidden-tablet" :src="obj.cover_image" alt="obj.name"/>
        <section :class="'header '+headerClass" :style="headerStyle">
            <div class="container logo-container">
                <img class="logo" :src="obj.logo_set.small" :alt="obj.name"/>
            </div>
            <div class="footer">
                <div class="container">
                    <div>
                        <h1>{{obj.name}}</h1>
                        <Verified v-if="obj.verified"/>
                    </div>
                    <div class="boards">
                        <strong class="is-uppercase" v-for="board in obj.boards" :key="board.slug">{{board.name}}</strong>
                    </div>
                </div>
            </div>
        </section>
        <div class="tabs institute-tabs">
            <ul class="container">
                <li class="is-active"><a>About</a></li>
                <li v-if="obj.images && obj.images.length"><a href="#gallery">Gallery</a></li>
                <li v-if="obj.programs && obj.programs.length"><a @click="activateTab('programs')">Programs</a></li>
                <li v-if="obj.salient_features"><a @click="activateTab('features')">Features</a></li>
                <li v-if="obj.admission_guidelines"><a @click="activateTab('admission')">Admission</a></li>
                <li v-if="obj.scholarship_information"><a @click="activateTab('scholarship')">Scholarship</a></li>
                <li v-if="obj.latitude && obj.longitude"><a>Contact</a></li>
            </ul>
        </div>
        <div class="bg-grey">
            <div class="container columns pt2">
                <div class="column is-three-fifths">
                    <div class="description" v-html="obj.description"></div>
                </div>
                <div class="column is-two-fifths">
                    <div class="card">
                        <div class="card-content info">
                            <div v-if="obj.established"><i class="gap"></i>ESTD:<i class="gap"></i>{{obj.established}}</div>
                            <div v-if="obj.address">
                                <FA i="location-arrow"/>
                                {{obj.address}}
                            </div>
                            <div v-if="obj.type">
                                <FA i="building"/>
                                {{obj.type}}
                            </div>
                            <div v-if="obj.phone && obj.phone.length">
                                <FA i="phone"/>
                                <span class="csv" v-for="ph in obj.phone" :key="ph"><a :href="'tel:'+ph">{{ph}}</a></span>
                            </div>
                            <div v-if="obj.email && obj.email.length">
                                <FA i="at"/>
                                <span class="csv" v-for="em in obj.email" :key="em"><a :href="'mailto:'+em">{{em}}</a></span>
                            </div>
                            <div v-if="obj.website">
                                <FA i="globe"/>
                                <a target="_blank" rel="noreferrer noopener"
                                   :href="obj.website">{{obj.website}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="gallery" class="gallery" v-if="obj.images && obj.images.length">
                <h2 class="is-uppercase has-text-centered mt3">Gallery</h2>
                <div class="bg-primary has-text-centered">
                    <div class="grid">
                        <img v-for="image in obj.images" :data-src="image.url.small" :key="image.name" :data-bp="image.url.full"
                             :title="image.name" :alt="image.name" :caption="image.name">
                        <!--<a v-for="(image, index) in obj.images" :href="image.url.full" :key="image.name+index">-->
                        <!--<img :data-bp="image.url.full" :src="image.url.small" :title="image.name" :alt="image.name">-->
                        <!--</a>-->
                    </div>
                </div>
            </div>
        </div>

        <h2 class="is-uppercase has-text-centered mt3">More Information</h2>

        <div class="more-info container">
            <div class="tabs info-tabs is-toggle is-large is-fullwidth">
                <ul>
                    <li :class="{'is-active': activeTab == 'programs'}" @click="activateTab('programs')">
                        <a>Offered Programs</a></li>
                    <li v-if="obj.salient_features" :class="{'is-active': activeTab == 'features'}"
                        @click="activateTab('features')"><a>Salient Features</a></li>
                    <li v-if="obj.admission_guidelines" :class="{'is-active': activeTab == 'admission'}"
                        @click="activateTab('admission')"><a>Admission Guidelines</a></li>
                    <li v-if="obj.scholarship_information" :class="{'is-active': activeTab == 'scholarship'}"
                        @click="activateTab('scholarship')"><a>Scholarship Info</a></li>
                </ul>
            </div>
            <div class="tab-content-container bg-grey p1">
                <div id="programs" class="tab-content">
                    <div v-if="activeTab=='programs'">
                        <ul v-for="(programs, level, index) in levels" :key="level">
                            <hr v-if="index!==0"/>
                            <h4><strong>{{level}}</strong></h4>
                            <li v-for="program in programs" :key="program.slug">
                                {{program.name}}
                            </li>

                        </ul>
                    </div>
                </div>
                <div id="features" class="tab-content">
                    <div class="tab-content" v-if="activeTab=='features'" v-html="obj.salient_features"></div>
                </div>
                <div id="admission" class="tab-content">
                    <div class="tab-content" v-if="activeTab=='admission'" v-html="obj.admission_guidelines"></div>
                </div>
                <div id="scholarship" class="tab-content">
                    <div class="tab-content" v-if="activeTab=='scholarship'" v-html="obj.scholarship_information"></div>
                </div>
            </div>
        </div>

        <div class="bg-primary p1 mt3">

            <h2 class="is-uppercase has-text-centered">Network Institutes</h2>
            <div>
                <no-ssr placeholder="Loading...">
                    <div class="carousel-wrapper network-institutes">
                        <carousel :navigationEnabled="true" :paginationEnabled="false"
                                  :perPageCustom="[[600, 2], [800, 3], [1000, 4], [1300, 5]]"
                                  v-on:transitionEnd="lazyNew" :perPage="1" :autoplay="true"
                                  :navigationPrevLabel="`<i class='fas fa-angle-left'></i>`"
                                  :navigationNextLabel="`<i class='fas fa-angle-right'></i>`">
                            <slide v-for="ins in obj.network_institutes" :key="ins.slug">
                                <nuxt-link :to="{name: 'slug', params: {slug: ins.slug}}">
                                    <img :data-src="ins.logo_set.small" height="100" width="100"/>
                                </nuxt-link>

                                <nuxt-link :to="{name: 'slug', params: {slug: ins.slug}}">{{ins.name}}</nuxt-link>
                            </slide>
                        </carousel>
                    </div>
                </no-ssr>
            </div>
        </div>

        <no-ssr class="map" v-if="obj.latitude && obj.longitude">
            <GMap :lat="obj.latitude" :lng="obj.longitude" :name="obj.name"/>
        </no-ssr>

    </div>
</template>

<script>
  import Verified from '@/components/Verified.vue'
  import GMap from '@/components/Map.vue'
  import Bricks from 'bricks.js'
  import {Carousel, Slide} from 'vue-carousel'

  if (process.browser && window) {
    window.BigPicture = require('bigpicture')
  }

  export default {
    remote: true,
    components: {
      Verified, GMap, Carousel, Slide
    },
    collection: 'institutes',
    key: 'slug',
    validate({params}) {
      return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(params.id)
    },
    async fetch({store, params, error}) {
      if (!params[this.key] || params[this.key] === 'null') {
        return;
      }
      if (!store.state.collection[this.collection].objects[params[this.key]]) {
        await store.dispatch('collection/get_item', [this.collection, params[this.key]]).catch((e) => {
          error({statusCode: 404, message: 'Page not found'})
        });
      } else {
        this.remote = false;
      }
    },
    computed: {
      headerStyle() {
        if (this.obj && this.obj.cover_image) {
          return {background: 'url(' + this.obj.cover_image + ')'};
        } else {
          return {};
        }
      },
      headerClass() {
        if (this.obj && this.obj.cover_image) {
          return 'with-image';
        } else {
          return 'no-image'
        }
      },
      obj() {
        return this.$store.state.collection[this.$options.collection].objects[this.$route.params[this.$options.key]];
      },
      levels() {
        let dct = {};
        if (this.obj.programs && this.obj.programs.length) {
          this.obj.programs.forEach(function (program) {
            dct[program.level] = dct[program.level] || [];
            dct[program.level].push(program)
          });
        }
        return dct;
      }
    },
    data() {
      return {
        activeTab: 'programs'
      }
    },
    methods: {
      activateTab(tab) {
        let el = document.getElementById(tab);
        // find if hash is a tab
        if (el.classList.contains('tab-content')) {
          this.activeTab = tab;
        }
        smoothScroll(el);
        window.location.hash = tab;
      },
      lazyNew() {
        new LazyLoad();
      }
    },
    async mounted() {
      if (this.$options.remote) {
        await this.$store.dispatch('collection/update_item_from_ssr', [this.$options.collection, this.$route.params[this.$options.key]]);
      } else {
        await this.$store.dispatch('collection/get_item', [this.$options.collection, this.$route.params[this.$options.key]]);
      }

      if (this.$route.hash) {
        this.activateTab(this.$route.hash.replace('#', ''));
      }
    },
    updated() {
      // Computation of brick size by screen size
      // padding(left+right) = 20px; gutter=10px; width_per_column = 300px
      // formula: 20 + width_per_column * no_of_columns + (no_of_columns - 1) *gutter
      // i.e. 20 + 300n + 10(n-1)
      // i.e. 310n + 10
      const sizes = [
        {columns: 1, gutter: 10}, // assumed to be mobile, because of the missing mq property
        {columns: 2, gutter: 10, mq: '630px'},
        {columns: 3, gutter: 10, mq: '940px'},
        {columns: 4, gutter: 5, mq: '1250px'},
        {columns: 5, gutter: 10, mq: '1560px'},
        {columns: 6, gutter: 10, mq: '1870px'},
        {columns: 7, gutter: 10, mq: '2180px'},
        {columns: 8, gutter: 10, mq: '2490px'},
      ];


      // Lightbox
      let imageLinks = document.querySelectorAll('#gallery .grid img');


      if (imageLinks) {
        for (let i = 0; i < imageLinks.length; i++) {
          imageLinks[i].addEventListener('click', function (e) {
            e.preventDefault();
            BigPicture({
              el: e.target,
              gallery: '#gallery .grid'
            })
          })
        }

        // Lazyload images, instantiate Bricks after lazyload complete
        let counter = 0;
        let lazyload = new LazyLoad({
            callback_set: function (a) {
              if (a.hasAttribute('data-src')) {
                counter++;
              }
              if (counter && counter === imageLinks.length) {
                // TODO find a way without setTimeout
                setTimeout(function () {
                  Bricks({
                    container: '.gallery .grid',
                    packed: 'packed',
                    sizes: sizes,
                  }).resize(true).pack();
                }, 99);
              }
            }

          }
        );

      }
    },
  }
</script>


<style lang="scss">
    @import '~assets/scss/variables';

    section.header {
        display: flex;
        min-height: 300px;
        flex-direction: column;
        justify-content: flex-end;
        color: #fff;
        background-position: center !important;
        transition: min-height 1s, background 1s, flex-direction 1s;

        .logo-container {
            transition: width 1s, margin 1s;
        }

        .footer {
            background: rgba($primary, .6);
            padding: .5rem;
        }

        h1 {
            font-weight: bold;
            display: inline;
            text-transform: uppercase;
        }

        strong {
            padding-right: 2rem;
        }

        &.no-image {
            min-height: 125px;
            align-items: center;
            background: lighten($primary, 5);
            flex-direction: row;
            justify-content: flex-start;

            .logo-container {
                width: auto;
                margin: 1rem;
            }
        }

    }

    .institute-tabs {
        text-transform: uppercase;
        border-bottom: 1px solid #ccc;
        line-height: 2rem;
        font-size: .9rem;
        margin-bottom: 0 !important;
    }

    .gallery {
        .bg-primary {
            padding: 10px;
        }
        .grid {
            margin: 0 auto;
        }
        img[caption] {
            cursor: pointer;
        }
    }

    .tab-content-container {
        border: 1px solid #ccc;
        border-top: none;
    }

    .network-institutes {
        .VueCarousel-slide {
            img {
                box-sizing: content-box;
                border: 50px solid #fff;
                border-top: 0;
                border-bottom: 0;
            }
        }
    }

    @media (max-width: 769px) {
        section.header {
            background: transparent !important;
            flex-direction: inherit;
            min-height: inherit;
            .footer {
                background: transparent;
                color: $primary;
            }
            .container {
                width: auto;
                margin-right: 1rem;
            }

            .logo-container {
                display: flex;
                align-items: center;
            }
            /* Move boards to left */
            /*.boards{*/
            /*position: absolute;*/
            /*left: 1rem;*/
            /*line-height: 2rem;*/
            /*}*/
            /*margin-bottom: 1rem;*/
        }
    }

    @media (max-width: 1024px) {
        section.header {
            h1 {
                font-size: 2rem
            }
        }
    }

</style>