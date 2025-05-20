const assert = require('assert');
const app = require('../../src/app');

describe('\'documentItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('documentItems');

    assert.ok(service, 'Registered the service (documentItems)');
  });
});
