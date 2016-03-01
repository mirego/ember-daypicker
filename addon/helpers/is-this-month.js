import Ember from 'ember';

export function isThisMonth(params, hash) {
  let day = hash.day
  let month = hash.month

  let findMonth = day.month()
  return findMonth === month.index;
}

export default Ember.Helper.helper(isThisMonth);
