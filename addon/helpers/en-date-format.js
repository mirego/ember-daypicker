import Ember from 'ember';

export function enDateFormat(params, hash) {
  let date = hash.date
  let format = hash.format || "D"

  return moment(date).format(format);
}

export default Ember.Helper.helper(enDateFormat);
