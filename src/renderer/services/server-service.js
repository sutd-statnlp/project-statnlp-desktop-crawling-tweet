class ServerService {
  constructor () {
    this.httpSchema = 'http://'
    this.port = ':8220'

    this.servers = [{
      name: 'StatNLP 0',
      ip: '172.18.240.110',
      status: false
    }]
    this.server = this.servers[0]
  }
  getCrawlingTweetEndpoint () {
    return this.getEndpoint() + '/api/tweets/stream'
  }
  getEndpoint () {
    return this.httpSchema + this.server.ip + this.port
  }
  getDataEndpoint () {
    return this.getEndpoint() + '/data/'
  }
  getStopCrawlingTweetEndpoint () {
    return this.getEndpoint() + '/api/tweets/stop'
  }
  getGetCrawlingChannelEndpoint () {
    return this.getEndpoint() + '/api/tweets/channel'
  }
}

export default new ServerService()
