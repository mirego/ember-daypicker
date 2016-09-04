import Ember from 'ember';

export function isBeforeDate(params, hash) {
  if (!hash.date) return false
  return moment(hash.day).isBefore(moment(hash.date))
}

export default Ember.Helper.helper(isBeforeDate);
