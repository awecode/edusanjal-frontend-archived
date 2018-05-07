<template>
    <no-ssr class="w15">
        <i :class="`fas fa-${i}`"></i>
    </no-ssr>
</template>

<script>
  export default {
    props: ['i']
  }
</script>

<style>
    .svg-inline--fa {
        margin-right: .5rem;
        width: 1rem !important;
    }

    .w15 {
        width: 1.5rem;
        display: inline-block;
    }
</style>