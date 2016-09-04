import Ember from 'ember';

export function isAfterDate(params, hash) {
  if (!hash.date) return false
  return moment(hash.day).isAfter(moment(hash.date))
}

export default Ember.Helper.helper(isAfterDate);
