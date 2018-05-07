<template>
    <no-ssr>
        <i :class="`fas fa-${i}`"></i>
    </no-ssr>
</template>

<script>
  export default {
    props: ['i']
  }
</script>