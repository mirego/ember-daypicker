import { enDateFormat } from '../../../helpers/en-date-format';
import { module, test } from 'qunit';
import moment from 'moment';

module('Unit | Helper | en date format');

test('by default, it gives the date back', function(assert) {
  let result = enDateFormat([], { date: moment("March 1, 2016") })
  assert.equal(result, 1);
});

test('when a format is provided, it gives the date in that format', function(assert) {
  let result = enDateFormat([], { date: moment("March 1, 2016"), format: "MMM D" })
  assert.equal(result, "Mar 1");
});
