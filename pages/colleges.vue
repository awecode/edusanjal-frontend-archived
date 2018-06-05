<template>
    <div class="bg-grey p1">
        <div class="container columns">
            <div class="column is-one-third">
                <FilterCard :filter="filterSet.type" @filter="filter"/>
            </div>
            <div class="column is-two-thirds">
                <div class="card mt1 mh1" v-for="obj in objs" :key="obj.slug">
                    <div class="card-content info list-item">
                        <nuxt-link :to="{name: 'slug', params: {slug: obj.slug}}" class="list-image">
                            <img :src="obj.logo_set.small" :alt="obj.name" :title="obj.name"/>
                        </nuxt-link>
                        <div class="list-detail">
                            <div>
                                <h3>
                                    <nuxt-link :to="{name: 'slug', params: {slug: obj.slug}}">{{obj.name}}</nuxt-link>
                                </h3>
                                <div v-if="obj.address">
                                    <FA i="location-arrow"/>
                                    {{obj.address}}
                                </div>
                                <div v-if="obj.type">
                                    <FA i="building"/>
                                    {{obj.type}}
                                </div>
                                <div class="boards" v-if="obj.boards && obj.boards.length">
                                    <FA i="university"/>
                                    <div class="csv">
                                        <div v-for="board in obj.boards" :key="board.slug">{{board.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination :pagination="pagination" @paginate="paginate"/>
            </div>
        </div>

    </div>
</template>

<script>
  import Verified from '~/components/Verified.vue';
  import Pagination from '~/components/Pagination.vue';
  import FilterCard from '~/components/FilterCard.vue';

  export default {
    local: true,
    ssr: false,
    page: 1,
    components: {Verified, Pagination, FilterCard},
    collection: 'institutes',
    key: 'slug',
    filters: {},
    async get_list(store) {
      await store.dispatch('collection/get_list', [this.collection, this.key, this.page]);
    },
    async fetch({store, query}) {// fetch isn't called on client side if already called on server side

      this.ssr = process.browser;

      if (query.page) {
        this.page = query.page;
      }

      // if not in local storage, fetch
      if (!store.getters['collection/get_items_for_page'](this.collection, this.page).length) {
        await this.get_list(store);
        this.local = false;
      }

    },
    data() {
      return {
        'page': 1,
        'filters': {},
        'filterSet': {
          'type': {
            'name': 'Type',
            'param': 'type',
            'type': 'checkbox',
            'facets': ['Private', 'Community', 'Public']
          }
        }

      }
    },
    computed: {
      objs() {
        return this.$store.getters['collection/get_items_for_page'](this.$options.collection, this.page, this.filters);
      },
      pagination() {
        return this.$store.getters['collection/get_pagination'](this.$options.collection);
      },
    },
    methods: {
      paginate(page) {
        this.$options.page = page;
        this.$options.get_list(this.$store).then(() => {
          this.page = page;
        });
      },
      filter(obj) {
        this.filters = obj;
      }
    },
    async mounted() { // called on client side only

      // Update page data from page option
      this.page = this.$options.page;

      // if data is from local storage, try fetching from api
      if (this.$options.local) {
        await this.$store.dispatch('collection/get_list', [this.$options.collection, this.$options.key, this.$options.page]);
      } else if (this.$options.ssr) { // if fetched via API on SSR, update localStorage
        await this.$store.dispatch('collection/update_list_from_ssr', [this.$options.collection, this.$route.params[this.$options.key], this.$options.page]);
      }
    },
  }
</script>