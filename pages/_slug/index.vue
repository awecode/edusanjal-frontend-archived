<template>
    <div>
        <section class="header" :style="{background: 'url('+cover_image+')'}">
            <div class="container">
                <img class="logo" :src="logo" :alt="name"/>
            </div>
            <div class="footer">
                <div class="container">
                    <div>
                        <h1>{{name}}</h1>
                        <Verified v-if="verified"/>
                    </div>
                    <strong class="is-uppercase" v-for="board in boards" :key="board.slug">{{board.name}}</strong>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
  import Verified from '~/components/Verified.vue';

  export default {
    components: {Verified},
    validate({params}) {
      // Must be a number
      return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(params.id)
    },
    async asyncData({params: {slug}}) {
      const url = 'institutes/' + slug + '/';
      return api.get(url)
        .then((res) => {
          return res.data;
        })
    }
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
            font-size: 2.7rem;
            font-weight: bold;
            display: inline-block;
            text-transform: uppercase;
        }

        strong {
            padding-right: 1rem;
        }

    }

</style>