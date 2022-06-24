import sinon from 'sinon';
import CortexClient from '../src/cortex-client';

describe('Cortex Client', () => {
  // import WebSocketServerMock from 'mock-server';
  let mockCortexWebsocketServer;

  describe('Data streaming', () => {
    describe('Step 1/3: Requesting a Cortex Token', () => {
      const config = {
        clientId: 'id',
        clientSecret: 'secret',
        headset: 'EPOCX-E202014A',
      };

      beforeEach(() => {
        // TODO: mock ws:// server
        sinon
          .stub(mockCortexWebsocketServer, 'onMessage')
          .returns({cortexToken: 'some-token'});
      });

      test('it should request a session token', async () => {
        const client = CortexClient(config);

        await client._getCortexToken();

        expect(client.cortexToken).toBe('some-token');
      });

      test('it should throw an error if the right config is not provided', () => {
        const client = CortexClient();

        expect(client._getCortexToken()).toThrow();
      });
    });

    test('it should create a new session', () => {
      const client = CortexClient(config);
      client.cortexToken = 'eySomeToken=';

      expect(client._getSessionId()).toBe('session-id-123');
    });

    test('it should subscribe to a mental command stream', () => {
      const client = CortexClient(config);
      client.cortexToken = 'some token';
      client.sessionId = 'session-id-123';

      expect(client.stream()).toBe(true);
    });
  });

  describe('DOM manipulation', () => {
    const config = {
      ui: true,
    };

    test('it should render in the DOM when specified', () => {
      CortexClient(config);

      const userInterface;

      expect(userInterface).toBeTruthy();
    });
  });
});
