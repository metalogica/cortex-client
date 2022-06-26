import CortexHandler from './cortex-handler';

export class WebSocketClient extends WebSocket {
  constructor(url, options) {
    super(url);

    this.cortexHandler = new CortexHandler({...options, webSocketClient: this});
  }

  onopen = function (message) {
    console.log('ws: onopen fired: ', message);

    this.cortexHandler.authorize();
  };

  onmessage = function (message) {
    // console.log('ws: onmessage received: ', message);

    const response = this.cortexHandler.parse(message);
  };

  onclose = function (message) {
    console.log('ws: connection closed: ', message);
  };

  onerror = function (message) {
    console.error('ws: error: ', message);
  };
}

export default WebSocketClient;
