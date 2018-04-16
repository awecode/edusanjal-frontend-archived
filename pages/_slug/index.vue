<template>
    <div>
        Institute Page
    </div>
</template>

<script>
  export default {
    validate({params}) {
      // Must be a number
      return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(params.id)
    }
  }
</script>