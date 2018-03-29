import Papa from 'papaparse'

export default {
  loadTweetsFromCsv (state) {
    Papa.parse(state.tweetResponse.link, {
      header: true,
      dynamicTyping: true,
      download: true,
      complete: (results, file) => {
        results.data.pop()
        state.tweets = results.data
      }
    })
  }
}
