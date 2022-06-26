class CortexHandler {
  constructor(options) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.cortexToken = undefined;
    this.sessionId = undefined;
    this.headset = options.headset;
    this.callbacks = options.callbacks;

    this.webSocketClient = options.webSocketClient;
  }

  send(response) {
    this.webSocketClient.send(JSON.stringify(response));
  }

  authorize(response) {
    console.log('CortexHandler: authorize function called', response);

    const message = {
      id: 1,
      jsonrpc: '2.0',
      method: 'authorize',
      params: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        debit: 1,
      },
    };

    this.send(message);
  }

  parse(response) {
    // console.log('CortexHandler: parse function called', response);

    const {data} = response;

    const message = JSON.parse(data);

    // console.log('CortexHandler: parsed the content', message);

    const cortexToken = message?.result?.cortexToken;

    if (cortexToken) {
      this.cortexToken = cortexToken;

      this._updateSessionStorage({cortexToken});
      this._getSessionId();
    }

    const sessionId = message?.result?.appId && message?.result?.id;

    if (sessionId) {
      this.sessionId = sessionId;

      this._updateSessionStorage({sessionId});
      this._getStream();
    }

    const command = message?.com;

    if (command) {
      const [name, magnitude] = command;

      // console.log('CortexHandler: mental command received', name, magnitude);

      this._handleCallback({name, magnitude});
    }
  }

  _handleCallback({name, magnitude}) {
    const {action: callbackFn} = this.callbacks.find(
      callback => callback.name === name
    );

    callbackFn({name, magnitude});
  }

  _getStream() {
    const message = {
      id: 1,
      jsonrpc: '2.0',
      method: 'subscribe',
      params: {
        cortexToken: this.cortexToken,
        session: this.sessionId,
        streams: ['com'],
      },
    };

    this.send(message);
  }

  async _getSessionId() {
    const message = {
      id: 1,
      jsonrpc: '2.0',
      method: 'createSession',
      params: {
        cortexToken: this.cortexToken,
        headset: this.headset,
        status: 'active',
      },
    };

    this.send(message);
  }

  _updateSessionStorage(option) {
    for (const [key, value] of Object.entries(option)) {
      localStorage.setItem(key, value);
    }
  }
}

export default CortexHandler;
