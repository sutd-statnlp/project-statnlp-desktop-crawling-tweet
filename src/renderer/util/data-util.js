export default {
  responseToTweetResponse (response, linkEndpoint) {
    let tweetResponse = {
      fileName: response.data.FileName,
      isStreaming: response.data.IsStreaming,
      link: linkEndpoint + response.data.FileName
    }
    return tweetResponse
  }
}
