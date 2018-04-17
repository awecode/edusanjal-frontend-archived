<template>
    <div>
        <section class="header">
            {{name}}
        </section>
    </div>
</template>

<script>
  export default {
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
</script>esb
