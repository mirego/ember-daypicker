import { isDisabled } from '../../../helpers/is-disabled';
import { module, test } from 'qunit';

module('Unit | Helper | is disabled');

test('it returns false for a day in the given month', function(assert) {
  let today = moment()

  let result = isDisabled([], {
    day: today,
    month: {
      index: today.month()
    }
  });

  assert.notOk(result);
});

test('it returns true for a day in another month', function(assert) {
  let today = moment()

  let result = isDisabled([], {
    day: today,
    month: {
      index: today.clone().add(1, 'month').month()
    }
  });

  assert.ok(result);
});

test('it works for days before a given day', function(assert) {
  let result = isDisabled([], {
    day:  moment(),
    min: moment().add(1, 'month')
  });

  assert.ok(result);

  result = isDisabled([], {
    day:  moment(),
    min: moment().add(1, 'day')
  });

  assert.ok(result);

  result = isDisabled([], {
    day:  moment(),
    min: moment()
  });

  assert.notOk(result);

  result = isDisabled([], {
    day:  moment().add(1, 'day'),
    min: moment()
  });

  assert.notOk(result);

  result = isDisabled([], {
    day:  moment().add(1, 'day'),
    min: undefined
  });

  assert.notOk(result);
});

test('it works for days after a given day', function(assert) {
  let result = isDisabled([], {
    day:  moment(),
    max: moment().add(1, 'month')
  });

  assert.notOk(result);

  result = isDisabled([], {
    day:  moment(),
    max: moment().add(1, 'day')
  });

  assert.notOk(result);

  result = isDisabled([], {
    day:  moment(),
    max: moment()
  });

  assert.notOk(result);

  result = isDisabled([], {
    day:  moment().add(1, 'day'),
    max: moment()
  });

  assert.ok(result);

  result = isDisabled([], {
    day:  moment().add(1, 'day'),
    max: undefined
  });

  assert.notOk(result);
});
