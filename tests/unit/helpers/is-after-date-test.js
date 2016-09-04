import { isAfterDate } from '../../../helpers/is-after-date';
import { module, test } from 'qunit';

module('Unit | Helper | is after date');

test('it works', function(assert) {
  let result = isAfterDate([], {
    day:  moment(),
    date: moment().add(1, 'month')
  });

  assert.notOk(result);

  result = isAfterDate([], {
    day:  moment(),
    date: moment().add(1, 'day')
  });

  assert.notOk(result);

  result = isAfterDate([], {
    day:  moment(),
    date: moment()
  });

  assert.notOk(result);

  result = isAfterDate([], {
    day:  moment().add(1, 'day'),
    date: moment()
  });

  assert.ok(result);

  result = isAfterDate([], {
    day:  moment().add(1, 'day'),
    date: undefined
  });

  assert.notOk(result);
});
