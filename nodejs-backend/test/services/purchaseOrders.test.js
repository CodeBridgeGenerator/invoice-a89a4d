const assert = require('assert');
const app = require('../../src/app');

describe('\'purchaseOrders\' service', () => {
  it('registered the service', () => {
    const service = app.service('purchaseOrders');

    assert.ok(service, 'Registered the service (purchaseOrders)');
  });
});
