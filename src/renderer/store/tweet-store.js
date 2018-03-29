
import axios from 'axios'
import ServerService from '@/services/server-service'
import StorageService from '@/services/storage-service'
import DataService from '@/services/data-service'
import DataUtil from '@/util/data-util'

export default {
  namespaced: true,
  state: {
    tweetResponse: {
      fileName: '',
      isStreaming: false,
      link: ''
    },
    tweets: []
  },
  getters: {
    getTweetResponse (state) {
      return state.tweetResponse
    },
    getTweets (state) {
      return state.tweets
    }
  },
  mutations: {
    crawlTweets (state, payload) {
      let url = ServerService.getCrawlingTweetEndpoint()
      let formData = new FormData()
      formData.append('keyword', payload.keyword)
      formData.append('location', payload.location)
      formData.append('userId', payload.userId)
      formData.append('language', payload.language)
      formData.append('maxMinute', payload.maxMinute)
      axios.post(url, formData).then(response => {
        state.tweetResponse = DataUtil.responseToTweetResponse(response, ServerService.getDataEndpoint())
        StorageService.saveTweetFileName(state.tweetResponse.fileName)
      }).catch(function (error) {
        console.log(error)
      })
    },
    stopCrawling (state) {
      let url = ServerService.getStopCrawlingTweetEndpoint()
      let formData = new FormData()
      formData.append('fileName', state.tweetResponse.fileName)
      axios.post(url, formData).then(response => {
        state.tweetResponse = DataUtil.responseToTweetResponse(response, ServerService.getDataEndpoint())
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadCsv (state) {
      DataService.loadTweetsFromCsv(state)
    },
    loadFileName (state) {
      let fileName = StorageService.getTweetFileName()
      if (fileName != null) {
        let url = ServerService.getGetCrawlingChannelEndpoint()
        axios.get(url, {
          params: {
            fileName: fileName
          }
        }).then(function (response) {
          state.tweetResponse = DataUtil.responseToTweetResponse(response, ServerService.getDataEndpoint())
          if (state.tweetResponse.isStreaming) {
            this.interval = setInterval(function () {
              DataService.loadTweetsFromCsv(state)
            }, 800)
          } else {
            DataService.loadTweetsFromCsv(state)
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  },
  actions: {
    crawlTweets (context, payload) {
      context.commit('crawlTweets', payload)
    },
    stopCrawling (context) {
      clearInterval(this.interval)
      context.commit('stopCrawling')
    },
    loadIntervalCsv (context, payload) {
      this.interval = setInterval(function () {
        context.commit('loadCsv')
      }, 800)
      setTimeout(() => {
        context.commit('stopCrawling')
      }, payload.maxMinute * 60000)
    },
    loadFileName (context) {
      context.commit('loadFileName')
    }
  }
}
