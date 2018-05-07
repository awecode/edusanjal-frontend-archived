<template>
    <div class="error container mt3 has-text-centered">
        <h1>A strange error occurred.</h1>
        <div class="block">
            <h4>Our developer is looking into it.</h4>

            <!--<pre>-->
            <!--/\     /\-->
            <!--{  `-&#45;&#45;'  }-->
            <!--{  O   O  }-->
            <!--~~&gt;  V  &lt;~~-->
            <!--\  \|/  /-->
            <!--`-&#45;&#45;&#45;&#45;'____-->
            <!--/     \    \_-->
            <!--{       }\  )_\_   _-->
            <!--|  \_/  |/ /  \_\_/ )-->
            <!--\__/  /(_/     \__/-->
            <!--(__/-->
            <!--</pre>-->
            <img src="/chankhey.jpg" alt="Error"/>
        </div>
        <h2 v-if="error.statusCode === 404">Turns out the page does not exist. [4🐱4]</h2>
        <ul>
            <li>
                <nuxt-link to="/">Visit Homepage</nuxt-link>
            </li>
            <li>
                <a :href="'https://twitter.com/intent/tweet?text=@edusanjal%20Error%20at%20'+pageUrl" target="_blank"
                   rel="noreferrer noopener">
                    Let us know about the error.</a>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'index',
    head() {
      return {
        title: 'Error'
      }
    },
    data() {
      return {
        pageUrl: 'https://motorscript.com'
      }
    },
    mounted() {
      this.pageUrl = document.location.href;
    }
  }
</script>

<style lang="scss">
    .error.container {
        img {
            max-height: 500px;
        }
    }
</style>