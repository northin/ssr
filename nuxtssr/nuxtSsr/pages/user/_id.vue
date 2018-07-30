<template>
  <section class="container">
    <div>
      <div>user-id</div>
    </div>
  </section>
</template>

<script>

export default {
  components: {
    
  },
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
</script>

<style>
</style>