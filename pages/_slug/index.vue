<template>
    <div>
        {{name}}
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
      //      debugger;
      //      return $axios.get(`https://my-api/posts/${params.id}`)
        .then((res) => {
//          console.log(res);
          const data = res.data;
          return {name: data.name}
        })
    }
  }
</script>