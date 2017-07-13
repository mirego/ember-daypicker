import Ember from 'ember';
import moment from 'moment'

export function enDateFormat(params, hash) {
  let date = hash.date
  let format = hash.format || "D"

  if (date && moment(date).isValid()) {
    return moment(date).format(format);
  } else {
    return null
  }
}

export default Ember.Helper.helper(enDateFormat);
