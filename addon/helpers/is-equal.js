import Ember from 'ember';

export function isEqual([a, b]) {
  return Ember.isEqual(a, b)
}

export default Ember.Helper.helper(isEqual);
