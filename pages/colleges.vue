<template>
    <div>
        <ul v-for="obj in objs" :key="obj.slug">
            <div class="card-content info">
                <img :src="obj.logo.small" :alt="obj.name" :title="obj.name"/>
                <nuxt-link :to="{name: 'slug', params: {slug: obj.slug}}">{{obj.name}}</nuxt-link>
            </div>

        </ul>
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