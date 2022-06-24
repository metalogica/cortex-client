import cortexClient, { test } from './cortex-client';
test();
const ws = new WebSocket('wss://localhost:6868');
const cortex = cortexClient({
    headset: 'test',
});
console.log('import', cortexClient);
try {
    ws.addEventListener('open', () => {
        const cortex = cortexClient({
            headset: 'test',
        });
        console.log('ws init!');
        ws.send(JSON.stringify({
            id: 1,
            jsonrpc: 2.0,
            method: 'getUserLogin',
        }));
    });
}
catch (error) {
    console.error('Unable to initiate websocket conenction to cortex server: ', error);
}
localStorage.setItem('aaaaaaaa', String(Math.random()));
const a = localStorage.getItem('a');
console.log(a, 'test! what u mean!!!!!!!!!!!');
console.log('number 100000');
//# sourceMappingURL=index.js.map