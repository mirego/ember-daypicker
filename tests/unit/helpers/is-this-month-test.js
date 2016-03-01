import { isThisMonth } from '../../../helpers/is-this-month';
import { module, test } from 'qunit';

module('Unit | Helper | is this month');

test('it returns true for a day in the given month', function(assert) {
  let today = moment()

  let result = isThisMonth([], {
    day: today,
    month: {
      index: today.month()
    }
  });

  assert.ok(result);
});

test('it returns false for a day in another month', function(assert) {
  let today = moment()

  let result = isThisMonth([], {
    day: today,
    month: {
      index: today.clone().add(1, 'month').month()
    }
  });

  assert.notOk(result);
});
