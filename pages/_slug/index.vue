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
        <div class="container">
            <div class="left">
                <div class="description" v-html="description"></div>
            </div>
            <div class="right">
            </div>
        </div>
        <div class="gallery">
            <h2 class="is-uppercase has-text-centered mt3">Gallery</h2>
            <div class="bg-primary has-text-centered">
                <img v-for="image in images" :src="image.file" :key="image.name">
            </div>
        </div>
    </div>
</template>

<script>
  import Verified from '~/components/Verified.vue';

  export default {
    components: {Verified},
    validate({params}) {
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
            font-weight: bold;
            display: inline-block;
            text-transform: uppercase;
        }

        strong {
            padding-right: 1rem;
        }

    }
    
    .gallery img{
        max-height: 800px;
        max-width: 800px;
    }

    .institute-tabs {
        text-transform: uppercase;
        border-bottom: 1px solid #ccc;
        line-height: 2rem;
        font-size: .9rem;
    }

</style>