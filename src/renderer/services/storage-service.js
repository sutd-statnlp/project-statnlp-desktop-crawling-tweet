const TWEET_FILENAME_KEY = 'tweet-filename'

export default {
  saveTweetFileName (fileName) {
    localStorage.setItem(TWEET_FILENAME_KEY, fileName)
  },
  getTweetFileName () {
    return localStorage.getItem(TWEET_FILENAME_KEY)
  }
}
