<template>
  <div class="row">
    <div class="col-2">
      <i :class="faIcon + ' fa fa-2x mb-1 indigo-text'" aria-hidden="true"></i>
    </div>
    <div class="col-10 mb-2">
      <h5 class="feature-title font-bold mb-1">{{title}}</h5>
      <p class="grey-text mt-2">
        {{description}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OptionInfo',
  props: {
    title: '',
    description: '',
    faIcon: ''
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
