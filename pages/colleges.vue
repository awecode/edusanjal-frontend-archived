<template>
    <div>
        <nuxt-link :to="{name: 'slug', params: {slug: 'khwopa-college'}}">Khwopa College</nuxt-link>
    </div>
</template>

<script>
  import Verified from '~/components/Verified.vue';

  export default {
    page: 1,
    components: {Verified},
    collection: 'institutes',
    key: 'slug',
    async fetch({store, query}) {
      if (query.page) {
        this.page = query.page;
      }
//      if (!store.state.collection[this.collection].objects[params[this.key]]) {
      await store.dispatch('collection/get_list', [this.collection, this.page, this.key]);
//      } else {
//        this.remote = false;
//      }
    },
    computed: {
      obj() {
        return [];
//        return this.$store.state.collection[this.$options.collection].objects[this.$route.params[this.$options.key]];
      },
    },
    async mounted() {
//      if (this.$options.remote) {
//        await this.$store.dispatch('collection/update_item_from_ssr', [this.$options.collection, this.$route.params[this.$options.key]]);
//      } else {
//        await this.$store.dispatch('collection/get_item', [this.$options.collection, this.$route.params[this.$options.key]]);
//      }
    },
  }
</script>