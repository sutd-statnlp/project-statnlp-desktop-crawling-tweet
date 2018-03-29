<template>
  <div class="m-navbar">
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar">
      <div class="container">
        <!-- Brand -->
        <a class="navbar-brand" href="#sec-intro">
          <strong>TWEETS CRAWLING</strong>
        </a>
        <!-- Collapse -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Links -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left -->
          <ul class="navbar-nav mr-auto">
          </ul>

          <!-- Right -->
          <ul class="navbar-nav nav-flex-icons">
            <li class="nav-item">
              <a href="https://gitlab.com/sutd_nlp" class="nav-link" target="_blank">
                <i class="fa fa-gitlab"></i>
              </a>
            </li>
            <li class="nav-item">
              <a href="https://github.com/sutd-statnlp/" class="nav-link" target="_blank">
                <i class="fa fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
    }
  },
  mounted () {
    let lastScrollTop = 0
    let $navbar = $('.navbar')
    $(window).scroll(function (event) {
      var st = $(this).scrollTop()
      if (st > lastScrollTop) {
        $navbar.fadeOut()
      } else {
        $navbar.fadeIn()
      }
      lastScrollTop = st
    })
  }
}
</script>

<style scoped>

</style>
