import { isBeforeDate } from '../../../helpers/is-before-date';
import { module, test } from 'qunit';

module('Unit | Helper | is before date');

test('it works', function(assert) {
  let result = isBeforeDate([], {
    day:  moment(),
    date: moment().add(1, 'month')
  });

  assert.ok(result);

  result = isBeforeDate([], {
    day:  moment(),
    date: moment().add(1, 'day')
  });

  assert.ok(result);

  result = isBeforeDate([], {
    day:  moment(),
    date: moment()
  });

  assert.notOk(result);

  result = isBeforeDate([], {
    day:  moment().add(1, 'day'),
    date: moment()
  });

  assert.notOk(result);

  result = isBeforeDate([], {
    day:  moment().add(1, 'day'),
    date: undefined
  });

  assert.notOk(result);
});
