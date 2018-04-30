<template>
    <div>
        <img class="cover is-hidden-tablet" :src="obj.cover_image" alt="obj.name"/>
        <section class="header" :style="{background: 'url('+obj.cover_image+')'}">
            <div class="container logo-container">
                <img class="logo" :src="obj.logo" :alt="obj.name"/>
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
                <li><a href="#gallery">Gallery</a></li>
                <li><a>Courses</a></li>
                <li><a>Features</a></li>
                <li><a>Guidelines</a></li>
                <li><a>Scholarship</a></li>
                <li><a>Contact</a></li>
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
                            <div v-if="obj.address"><i class="gap"></i>{{obj.address}}</div>
                            <div v-if="obj.type"><i class="gap"></i>{{obj.type}}</div>
                            <div v-if="obj.phone"><i class="gap"></i><span class="csv" v-for="ph in obj.phone" :key="ph">
        <a :href="'tel:'+ph">{{ph}}</a>
        </span></div>
                            <div v-if="obj.email"><i class="gap"></i><span class="csv" v-for="em in obj.email" :key="em">
        <a :href="'mailto:'+em">{{em}}</a>
        </span></div>
                            <div v-if="obj.website"><i class="gap"></i><a target="_blank" rel="noreferrer noopener"
                                                                          :href="obj.website">{{obj.website}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="gallery" class="gallery">
            <h2 class="is-uppercase has-text-centered mt3">Gallery</h2>
            <div class="bg-primary has-text-centered">
                <div class="grid">
                    <img v-for="image in obj.images" :src="image.url.small" :key="image.name">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Verified from '@/components/Verified.vue'
  import Bricks from 'bricks.js'


  export default {
    remote: true,
    components: {Verified},
    collection: 'institutes',
    key: 'slug',
    validate({params}) {
      return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(params.id)
    },
    async fetch({store, params}) {

      if (!params[this.key] || params[this.key] === 'null') {
        return;
      }
      if (!store.state.collection[this.collection].objects[params[this.key]]) {
        await store.dispatch('collection/get_item', [this.collection, params[this.key]]);
      } else {
        this.remote = false;
      }
    },
    computed: {
      obj() {
        return this.$store.state.collection[this.$options.collection].objects[this.$route.params[this.$options.key]];
      },
    },
    async mounted() {
      if (this.$options.remote) {
        await this.$store.dispatch('collection/update_item_from_ssr', [this.$options.collection, this.$route.params[this.$options.key]]);
      } else {
        await this.$store.dispatch('collection/get_item', [this.$options.collection, this.$route.params[this.$options.key]]);
      }

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

      const instance = Bricks({
        container: '.gallery .grid',
        packed: 'packed',
        sizes: sizes,
      }).resize(true).pack();
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

    }

    .gallery {
        .bg-primary {
            padding: 10px;
        }
        .grid {
            margin: 0 auto;
        }
    }

    .institute-tabs {
        text-transform: uppercase;
        border-bottom: 1px solid #ccc;
        line-height: 2rem;
        font-size: .9rem;
        margin-bottom: 0 !important;
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