import CortexClient from '../src/cortex-client';

describe('Cortex Client', () => {
  describe('Data streaming', () => {
    test('it should make a call to the websocket client on the start of a stream', () => {
      const websocketSpy = jest.spyOn(CortexClient, '_send');

      const config = {
        clientId: '',
        clientSecret: '',
        headset: 'EPOCX-E202014A',
        url: 'wss://localhost:6868',

        commands: [
          {
            name: 'neutral',
            callback: magnitude => console.log('it fired: lift', magnitude),
          },
          {
            name: 'lift',
            callback: magnitude => console.log('it fired: lift', magnitude),
          },
        ],
      };

      const cortexClient = CortexClient(config).stream();

      expect(websocketSpy).toHaveBeenCalledWith({
        id: 1,
        jsonrpc: '2.0',
        method: 'authorize',
        params: {
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          debit: 1,
        },
      });
    });

    describe('Step 1/3: Requesting a Cortex Token', () => {});

    test('it should create a new session', () => {});

    test('it should subscribe to a mental command stream', () => {});
  });

  describe('DOM manipulation', () => {
    test('it should render in the DOM when specified', () => {});
  });
});
