import cortexClient from './cortex-client';

const ws = new WebSocket('wss://localhost:6868');

ws.addEventListener('open', () => {
  const cortex = cortexClient({
    headset: 'test',
  });
  console.log(cortex);

  ws.send(
    JSON.stringify({
      id: 1,
      jsonrpc: 2.0,
      method: 'getUserLogin',
    })
  );
});

console.log('main script completed.');
