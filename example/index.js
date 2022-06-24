"use strict";(()=>{var o=class{constructor(n){console.log("cortex client class fired",n)}},t=e=>new o(e);var s=new WebSocket("wss://localhost:6868");s.addEventListener("open",()=>{let e=t({headset:"test"});console.log(e),s.send(JSON.stringify({id:1,jsonrpc:2,method:"getUserLogin"}))});console.log("main script completed.");})();
//# sourceMappingURL=index.js.map
