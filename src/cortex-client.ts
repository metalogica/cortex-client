class CortexClient {
  constructor(options: CortexClient) {
    console.log('cortex client class fired', options);
  }
}

export default (options: CortexClient) => new CortexClient(options);
