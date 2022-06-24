class CortexClient {
  constructor(options: CortexClient) {
    console.log('cortex client class fired', options);

    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;

    this.headset = options.headset;

    this.ws = new WebSocket(options.url);
  }

  async stream() {
    const cortexToken = await this._getCortexToken();
    const sessionId = await this._getSessionId({cortexToken});

    const message = {
      id: 1,
      jsonrpc: '2.0',
      method: 'subscribe',
      params: {
        cortexToken,
        sessionId,
        streams: ['com'],
      },
    };

    await this._send({message});
  }

  async _send({message}) {
    await this.ws.send(JSON.stringify(message));
  }

  async _getCortexToken() {
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
  }

  async _getSessionId({cortexToken}) {
    const message = {
      id: 1,
      jsonrpc: '2.0',
      method: 'createSession',
      params: {
        cortexToken,
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        headset: this.headset,
        status: 'active',
      },
    };
  }
}

export default (options: CortexClient) => new CortexClient(options);
