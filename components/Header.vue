<template>
    <nav class="navbar is-primary">
        <div class="navbar-brand">
            <nuxt-link to="/" class="navbar-item">
                <img src="~/static/logo.svg" alt="">
                edusanjal
            </nuxt-link>
            <!--<a class="navbar-item" href="/">-->
                <!---->
            <!--</a>-->
            <div class="navbar-burger" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">

            <div class="navbar-start">
                <a class="navbar-item" href="/">
                    Home
                </a>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="/documentation/overview/start/">
                        Docs
                    </a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item" href="/documentation/overview/start/">
                            Overview
                        </a>
                        <a class="navbar-item" href="/documentation/modifiers/syntax/">
                            Modifiers
                        </a>
                        <a class="navbar-item" href="/documentation/columns/basics/">
                            Columns
                        </a>
                        <a class="navbar-item" href="/documentation/layout/container/">
                            Layout
                        </a>
                        <a class="navbar-item" href="/documentation/form/general/">
                            Form
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item" href="/documentation/elements/box/">
                            Elements
                        </a>
                        <a class="navbar-item is-active" href="/documentation/components/breadcrumb/">
                            Components
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <a class="navbar-item" href="#">
                    Home
                </a>
                <a class="navbar-item" href="#">
                    Home
                </a>
                <a class="navbar-item" href="#">
                    Home
                </a>
                <a class="navbar-item" href="#">
                    Home
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
  export default {
    data() {
      return {
        showNav: false
      }
    }
  }
</script>