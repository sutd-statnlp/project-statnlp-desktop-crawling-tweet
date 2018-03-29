<template>
  <div class="m-home">
    <div id="sec-intro" class="view full-page-intro" style="background-image: url('./static/img/header-bird-min.jpg'); background-repeat: no-repeat; background-size: cover;">

      <!-- Mask & flexbox options-->
      <div class="mask rgba-black-light d-flex justify-content-center align-items-center">

        <!-- Content -->
        <div class="container">

          <!--Grid row-->
          <div class="row wow fadeIn">

            <!--Grid column-->
            <div class="col-md-6 mb-4 white-text text-center text-md-left">

              <h1 class="display-4 font-weight-bold">Start Crawling Tweets</h1>

              <hr class="hr-light">

              <p>
                <strong>Crawling tweets with keywords, language, following users and location. </strong>
              </p>
              <p class="mb-4 d-none d-md-block">
                <strong>Powerful options with 400 keywords, 5,000 userids and 25 location boxes. You can crawl tweets by a comma separated list of user IDs, phrases of keywords, geolocation bounding boxes or specific languages. Enjoy and have fun with StatNLP Tweet Crawling !</strong>
              </p>
              <a href="#sec-option" class="btn btn-primary btn-lg">View Options
                <i class="fa fa-filter ml-2"></i>
              </a>

            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-md-6 col-xl-5 mb-4">

              <!--Card-->
              <div class="card">

                <!--Card content-->
                <div class="card-body">

                  <!-- Form -->
                  <form name="" class="m-form" v-on:submit.prevent="onSubmit">
                    <!-- Heading -->
                    <div class="row justify-content-center">
                      <div class="md-form">
                        <i class="fa fa-key prefix grey-text"></i>
                        <input type="text" id="keyword" name="keyword" v-model="payload.keyword" class="form-control">
                        <label for="keyword">Keyword</label>
                      </div>
                      <div class="md-form">
                        <i class="fa fa-language prefix grey-text"></i>
                        <input type="text" id="language" name="language" v-model="payload.language" class="form-control">
                        <label for="language">Language</label>
                      </div>
                    </div>
                    <div class="row justify-content-center">
                      <div class="md-form">
                        <i class="fa fa-user prefix grey-text"></i>
                        <input type="text" id="userId" name="userId" v-model="payload.userId" class="form-control">
                        <label for="userId">Follow</label>
                      </div>
                      <div class="md-form">
                        <i class="fa fa-clock-o prefix grey-text"></i>
                        <input type="number" id="maxMinute" name="maxMinute" min="1" step="1" max="20" v-model="payload.maxMinute" class="form-control" required>
                        <label for="maxMinute">Maximum minutes</label>
                      </div>
                    </div>

                    <div class="text-center">
                      <button class="btn btn-primary">Crawl Tweets</button>
                      <hr>
                      <fieldset class="form-check">
                        <input type="checkbox" class="form-check-input" id="check-location" v-model="isLocated">
                        <label for="check-location" class="form-check-label dark-grey-text">USE LOCATION</label>
                      </fieldset>
                      <div id="googleMap"></div>
                      <input type="text" hidden class="form-control" id="location" v-model="payload.location" placeholder="Location" />
                    </div>

                  </form>
                  <!-- Form -->

                </div>

              </div>
              <!--/.Card-->

            </div>
            <!--Grid column-->

          </div>
          <!--Grid row-->

        </div>
        <!-- Content -->

      </div>
      <!-- Mask & flexbox options-->

    </div>
    <main>
    <div class="container">
      <section id="sec-crawling" class="wow fadeIn mt-4">
        <!--Grid row-->
        <div class="row">
          <!--Grid column-->
          <div class="col-md-12">
            <div class="text-center">
                <a :href="getTweetResponse.link" class="btn btn-primary waves-effect waves-light" target="_blank" v-show="getTweetResponse.link">Download CSV</a>
                <button class="btn btn-mdb-color waves-effect waves-light" v-on:click="stopCrawling()" v-show="getTweetResponse.isStreaming">Stop Crawling</button>
                <button class="btn btn-primary waves-effect waves-light" v-on:click="shrinkTable()" v-show="getTweetResponse.link && !getTweetResponse.isStreaming">Shrink Table</button>
            </div>
             <BouncingLoader v-show="getTweetResponse.isStreaming" />
             <div class="table-responsive" v-show="getTweetResponse.link">
              <table id="table-tweet" class="table table-striped display">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">UserName</th>
                    <th scope="col">CreatedAt</th>
                    <th scope="col">Language</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in getTweets.slice().reverse()" v-bind:key="index">
                    <th scope="row">{{getTweets.length - index}}</th>
                    <td>{{item.ID}}</td>
                    <td>{{item.UserName}}</td>
                    <td>{{item.CreatedAt}}</td>
                    <td>{{item.Lang}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--Grid row-->
      </section>
      <!--Section: Main info-->
        <section id="sec-option" class="mt-2 wow fadeIn mb-5">
        <hr class="my-5">
         <!--Grid column-->
          <h2 class="my-5 h3 text-center">Popular Options</h2>
          <!--First row-->
          <div class="row features-small mt-5 wow fadeIn">

            <!--Grid column-->
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Keywords" faIcon="fa-key" description="Keywords to track. A comma-separated list of phrases which will be used to determine what Tweets will be delivered on the stream." />
            </div>
            <!--/Grid column-->

            <!--Grid column-->
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Languages" faIcon="fa-language" description="Setting this parameter to a comma-separated list of BCP 47 language identifiers corresponding to any of the languages." />
            </div>
            <!--/Grid column-->

            <!--Grid column-->
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Follow" faIcon="fa-user" description="A comma separated list of user IDs, indicating the users to return statuses for in the stream. " />
            </div>
            <!--/Grid column-->
            <!--Grid column-->
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Location" faIcon="fa-map-marker" description="Specifies a set of bounding boxes to track geolocated Tweets falling within the requested bounding boxes." />
            </div>
            <!--/Grid column-->

          </div>
          <!--/First row-->
      </section>
      <section id="sec-upcoming" class="mt-2 wow fadeIn mb-5">
        <hr class="my-5">
         <!--Grid column-->
          <h2 class="my-5 h3 text-center">Upcoming Options</h2>
          <!--First row-->
          <div class="row features-small mt-5 wow fadeIn">

            <!--Grid column-->
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Filter Level" faIcon="fa-level-up" description="Setting this parameter to one of none, low, or medium will set the minimum value of the filter_level Tweet attribute required to be included in the stream." />
            </div>
            <!--/Grid column-->

            <!--Grid column-->
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Count" faIcon="fa-list-ol" description="Elevated access clients may include the count parameter to attempt to backfill missed messages which occurred during the disconnect period." />
            </div>
            <!--/Grid column-->

            <!--Grid column-->
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Emoji" faIcon="fa-smile-o" description="Emojis are a tokenized match, meaning that your emoji will be matched against the tokenized text of the Tweet body." />
            </div>
            <!--/Grid column-->
            <!--Grid column-->
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Substring" faIcon="fa-paragraph" description="Substring match for Tweets that have the given substring in the body, regardless of tokenization." />
            </div>
            <!--/Grid column-->
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Phrase" faIcon="fa-paragraph" description="Matches an exact phrase within the body of a Tweet." />
            </div>
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Hashtag" faIcon="fa-hashtag" description="Matches any Tweet with the given hashtag." />
            </div>
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Mention @" faIcon="fa-user" description="Matches any Tweet that mentions the given username." />
            </div>
            <div class="col-xl-3 col-lg-6">
              <OptionInfo title="Cashtag" faIcon="fa-usd" description="Matches any Tweet that contains the specified cashtag." />
            </div>
          </div>
          <!--/First row-->
      </section>
      <!--Section: Main info-->
    </div>
  </main>
  </div>
</template>

<script>
import OptionInfo from '@/components/OptionInfo'
import BouncingLoader from '@/components/BouncingLoader'
import SmoothScroll from 'smooth-scroll'

export default {
  components: {
    OptionInfo,
    BouncingLoader
  },
  name: 'HomePage',
  data () {
    return {
      payload: {
        keyword: '',
        language: '',
        location: '',
        userId: '',
        maxMinute: 1
      },
      isLocated: false,
      smoothScroll: null,
      table: null
    }
  },
  created () {
    this.$store.dispatch('tweet/loadFileName')
  },
  mounted () {
    this.smoothScroll = new SmoothScroll('a[href*="#sec"]', {
      offset: 80
    })
    this.initMap(this.payload)
  },
  methods: {
    onSubmit () {
      this.smoothScroll.animateScroll(document.querySelector('#sec-crawling'))
      if (!this.isLocated) {
        this.payload.location = ''
      }
      this.$store.dispatch('tweet/crawlTweets', this.payload)
      this.$store.dispatch('tweet/loadIntervalCsv', this.payload)
      if (this.table) {
        this.table.destroy()
      }
    },
    stopCrawling () {
      this.$store.dispatch('tweet/stopCrawling')
    },
    initMap (payload) {
      let mapProp = {
        center: new google.maps.LatLng(1.3413, 103.9638),
        zoom: 10,
        fullscreenControl: false
      }
      let map = new google.maps.Map(document.getElementById('googleMap'), mapProp)
      google.maps.event.addListener(map, 'bounds_changed', function () {
        let location = map.getBounds().toUrlValue(2)
        $('#location').val(location)
        payload.location = location
      })
      google.maps.event.addListener(map, 'click', function (event) {
        map.panTo(event.latLng)
      })
    },
    shrinkTable () {
      this.table = $('#table-tweet').DataTable({
        destroy: true
      })
    }
  },
  computed: {
    getTweetResponse () {
      return this.$store.getters['tweet/getTweetResponse']
    },
    getTweets () {
      return this.$store.getters['tweet/getTweets']
    }
  }
}
</script>

<style scoped>
  .view .mask {
    position: relative;
    padding-top: 60px;
    padding-bottom: 40px;
  }
  .m-form .row {
    padding-left: 10px;
  }
  #googleMap {
    width: 100%;
    height: 140px;
  }
  #maxMinute {
    width: 165px;
  }
  @media (max-width: 575.98px) {
    #sec-intro .container {
      padding-top: 80px;
    }
  }
</style>
