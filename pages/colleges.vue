<template>
    <div class="bg-grey p1">
        <div class="container columns">
            <div class="column is-one-third">
                <FilterCard :filter="filterSet.type" :filters="filters" @filter="filter"/>
            </div>
            <div class="column is-two-thirds">
                <h1>{{title}}</h1>
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
    remote: true,
    page: 1,
    components: {Verified, Pagination, FilterCard},
    collection: 'institutes',
    key: 'slug',
    filters: {},
    filterSet: {
      'type': {
        'name': 'Type',
        'param': 'type',
        'type': 'checkbox',
        'facets': ['Private', 'Community', 'Public']
      }
    },

    async get_list(store) {
      if (this.filters && Object.keys(this.filters).length) {
        await store.dispatch('filter/get_data', [this.collection, this.filters, this.page]);
      } else {
        await store.dispatch('collection/get_list', [this.collection, this.key, this.page]);
      }
    },

    get_page(query) {
      this.page = Utils.isInteger(query.page) ? parseInt(query.page) : 1;
      return this.page;
    },

    get_filters(query) {
      delete query.page;
      this.filters = query;
      return this.filters;
    },

    async fetch({store, query}) {// fetch isn't called on client side if already called on server side
      this.get_page(query);
      this.get_filters(query);
      // if not in local storage, fetch
      if (!store.getters['collection/get_items_for_page'](this.collection, this.page).length) {
        await this.get_list(store);
      } else {
        this.remote = false;
      }

    },
    data() {
      return {
        'page': this.$options.page,
        'filters': this.$options.filters,
        'filterSet': this.$options.filterSet
      }
    },
    computed: {
      hasFilters() {
        return this.filters && Object.keys(this.filters).length;
      },
      objs() {
        if (this.hasFilters) {
          return this.$store.getters['filter/get_items'](this.$options.collection);
        } else {
          return this.$store.getters['collection/get_items_for_page'](this.$options.collection, this.page);
        }
      },
      pagination() {
        if (this.hasFilters) {
          return this.$store.getters['filter/get_pagination'](this.$options.collection);
        } else {
          return this.$store.getters['collection/get_pagination'](this.$options.collection, this.page);
        }
      },
      title() {
        let str = 'Colleges in Nepal';
        if (this.hasFilters) {
          if (this.filters.type) {
            str = Utils.englishList(this.filters.type) + ' ' + str;
          }
        }
        return str;
      }
    },
    methods: {
      updateQuery(key, value) {
        const validKeys = Object.keys(this.filterSet).concat(['page']);
        if (!validKeys.includes(key)) {
          return;
        }
        let query = Utils.clone(this.$route.query);
        query[key] = value;
        this.$router.push({query: query});
      },
      paginate(page) {
        // Unset page query for page 1
        page = (page === 1) ? [] : page;
        this.updateQuery('page', page);
      },
      filter(obj) {
        let key = Object.keys(obj)[0];
        if (key) {
          this.updateQuery(key, Object.values(obj)[0]);
        }
      }
    },
    watch: {
      '$route.query': function (n, o) {
        // TODO handle cached
        // Check for page number change
        if (n.page !== o.page) {
          const page = (Utils.isFalsy(n.page)) ? 1 : n.page;
          this.$options.page = page;
          this.page = page;
          this.$options.get_list(this.$store);
        }
        delete n.page;
        delete o.page;

        // TODO wait for some time, maybe another user input filter? cancel last pending request?

        // Check for filter change
        if (!Utils.isEqual(n, o)) {

          // remove empty filters
          if (n) {
            Object.keys(n).forEach((filter) => {
              if (Utils.isFalsy(n[filter])) {
                delete n[filter];
              }
            })
          }

          this.$options.filters = n;
          this.filters = n;

          // reset page count on filter update
          this.$options.page = 1;
          this.page = 1;
          this.$options.get_list(this.$store);
        }
      }
    },
    beforeMount() {
      // handle query params
      this.page = this.$options.get_page(this.$route.query);
      this.filters = this.$options.get_filters(Utils.clone(this.$route.query));
    },
    async mounted() { // called on client side only
      if (this.$options.remote) {
        await this.$store.dispatch('collection/update_list_from_ssr', [this.$options.collection, this.$route.params[this.$options.key], this.$options.page]);
      } else {
        await this.$options.get_list(this.$store);
      }


    },
  }
</script>