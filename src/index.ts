import Cortex from './cortex';

const cortex = Cortex({
  url: 'wss://localhost:6868',
  headset: 'EPOCX-E202014A',
  clientId: 'OagQZeyXwrYoSwQt4JGtGL7HX22U2vJQDnpW6sOK',
  clientSecret:
    'WNhMfomUciXSJovRXPYEnPZrHq5ETDvR73FVSxlBMRHXbrfBm6q0z0W6l07oj7BchXcVmWQ6Yvd31ipR6ybn6lfxx8aNJjcnSNrBa0M5PUuuxC9BvEocGCjdJsG41nv2',

  callbacks: [
    {
      name: 'neutral',
      action: ({name, magnitude}) =>
        console.log('CallbackFn: it fired: neutral', name, magnitude + 5),
    },
    {
      name: 'lift',
      action: ({name, magnitude}) =>
        console.log('Callback: it fired: lift', name, magnitude),
    },
  ],
});

console.log('cortex class: ', cortex);

cortex.stream();
