import Ember from 'ember';

export function isThisDay(params, { day, date }) {
  return day.isSame(date, 'day')
}

export default Ember.Helper.helper(isThisDay);
