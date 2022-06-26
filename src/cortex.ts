import WebSocketClient from './web-socket-client';

class Cortex {
  constructor(options) {
    this.webSocketClient = WebSocketClient;

    this.options = options;
    this.url = options.url;
  }

  stream() {
    this.webSocketClient = new this.webSocketClient(this.url, this.options);
  }

  stop() {
    this.webSocketClient.close();
  }
}

module.exports = options => new Cortex(options);
