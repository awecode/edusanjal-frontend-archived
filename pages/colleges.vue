<template>
    <div class="bg-grey p1">

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

        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a class="pagination-previous">Previous</a>
            <a class="pagination-next">Next</a>
            <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
  import Verified from '~/components/Verified.vue';

  export default {
    remote: true,
    page: 1,
    components: {Verified},
    collection: 'institutes',
    key: 'slug',
    async fetch({store, query}) {
      if (query.page) {
        this.page = query.page;
      }
      if (!store.getters['collection/get_items_for_page'](this.collection, this.page).length) {
        await store.dispatch('collection/get_list', [this.collection, this.key, this.page]);
      } else {
        this.remote = false;
      }
    },
    computed: {
      objs() {
        return this.$store.getters['collection/get_items_for_page'](this.$options.collection, this.$options.page);
      },
    },
    async mounted() {
      if (this.$options.remote) {
        await this.$store.dispatch('collection/update_list_from_ssr', [this.$options.collection, this.$route.params[this.$options.key], this.$options.page]);
      } else {
        await this.$store.dispatch('collection/get_list', [this.$options.collection, this.$options.key, this.$options.page]);
      }
    },
  }
</script>