import Ember from 'ember';

export function isThisDay(params, hash) {
  let day = hash.day
  let date = hash.date

  return day.isSame(date, 'day')
}

export default Ember.Helper.helper(isThisDay);
