
import { isEqual } from 'dummy/helpers/is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | is equal');

test('it works', function(assert) {
  let result = isEqual([42, 42]);
  assert.ok(result);

  result = isEqual([42, 43]);
  assert.notOk(result);

  result = isEqual([42, "42"]);
  assert.notOk(result);

  result = isEqual([42, null]);
  assert.notOk(result);
});

