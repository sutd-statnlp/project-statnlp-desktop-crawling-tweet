<template>
  <div class="m-footer">
    <footer class="page-footer text-center font-small mt-4 wow fadeIn">
      <div class="pt-4">
        <a class="btn btn-outline-white" href="http://fileconvert.statnlp.org/" target="_blank" role="button">CSV Converter
          <i class="fa fa-exchange ml-2"></i>
        </a>
        <a class="btn btn-outline-white" href="http://demo-crawling.statnlp.tk/" target="_blank" role="button">Crawling Demo
          <i class="fa fa-play ml-2"></i>
        </a>
      </div>
      <hr class="my-4">

      <!-- Social icons -->
      <div class="pb-4">
        <a href="https://gitlab.com/sutd_nlp" target="_blank">
          <i class="fa fa-gitlab mr-3"></i>
        </a>
        <a href="https://github.com/sutd-statnlp/" target="_blank">
          <i class="fa fa-github mr-3"></i>
        </a>
        <a href="https://sutd.edu.sg/" target="_blank">
          <i class="fa fa-university mr-3"></i>
        </a>
        <a href="http://www.statnlp.org/" target="_blank">
          <i class="fa fa-globe mr-3"></i>
        </a>
      </div>
      <!-- Social icons -->

      <!--Copyright-->
      <div class="footer-copyright py-3">
        © 2018 Copyright:
        <a href="http://www.statnlp.org/" target="_blank"> STATNLP.org </a>
      </div>
      <!--/.Copyright-->

    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  },
  mounted () {
    new WOW().init()
  }
}
</script>

<style scoped>

</style>
