<template>
    <div>
        <section class="header" :style="{background: 'url('+obj.cover_image+')'}"><div class="container">
                <img class="logo" :src="obj.logo" :alt="obj.name"/>
            </div>
            <div class="footer">
                <div class="container">
                    <div>
                        <h1>{{obj.name}}</h1>
                        <Verified v-if="obj.verified"/>
                    </div>
                    <strong class="is-uppercase" v-for="board in obj.boards" :key="board.slug">{{board.name}}</strong>
                </div>
            </div>
        </section>
        <div class="tabs institute-tabs">
            <ul class="container">
                <li class="is-active"><a>About</a></li>
                <li><a>Gallery</a></li>
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
                            <div v-if="obj.website"><i class="gap"></i><a target="_blank" rel="noreferrer noopener" :href="obj.website">{{obj.website}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="gallery">
            <h2 class="is-uppercase has-text-centered mt3">Gallery</h2>
            <div class="bg-primary has-text-centered">
                <img v-for="image in obj.images" :src="image.file" :key="image.name">
            </div>
        </div>

    </div>
</template>

<script>
  import Verified from '~/components/Verified.vue';
//  import {mapState} from 'vuex';

  export default {
    remote: true,
    components: {Verified},
    validate({params}) {
      return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(params.id)
    },
    async fetch({store, params: {slug}}) {
      if (!store.state.collection.institutes.objects[slug]) {
        await store.dispatch('collection/get_item', ['institutes', slug]);
      } else {
        this.remote = false;
      }
    },
    computed: {
    obj() {
      return this.$store.state.collection.institutes.objects[this.$route.params['slug']];
    },
    },
    async mounted() {
      if (this.$options.remote) {
        await this.$store.dispatch('collection/update_item_from_ssr', ['institutes', this.$route.params['slug']]);
      } else {
        await this.$store.dispatch('collection/get_item', ['institutes', this.$route.params['slug']]);
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

        .footer {
            background: rgba($primary, .6);
            padding: .5rem;
        }

        h1 {
            font-weight: bold;
            display: inline-block;
            text-transform: uppercase;
        }

        strong {
            padding-right: 2rem;
        }

    }

    .gallery img {
        max-height: 800px;
        max-width: 800px;
    }

    .institute-tabs {
        text-transform: uppercase;
        border-bottom: 1px solid #ccc;
        line-height: 2rem;
        font-size: .9rem;
        margin-bottom: 0 !important;
    }

</style>