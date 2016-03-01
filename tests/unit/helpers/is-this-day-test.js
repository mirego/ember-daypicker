import { isThisDay } from '../../../helpers/is-this-day';
import { module, test } from 'qunit';

module('Unit | Helper | is this day');

test('it returns true for same days', function(assert) {
  let result = isThisDay([], {
    day: moment(),
    date: moment()
  });

  assert.equal(result, true);
});

test('it returns true for same days even if times are different', function(assert) {
  let day = moment()
  let start = day.clone().startOf('day')
  let end = day.clone().endOf('day')

  let result = isThisDay([], {
    day: start,
    date: end
  });

  assert.equal(result, true);
});

test('it returns false for different days', function(assert) {
  let result = isThisDay([], {
    day: moment("April 15, 2015"),
    date: moment("April 15, 2016")
  });

  assert.equal(result, false);
});
