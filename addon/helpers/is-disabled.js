import Ember from 'ember';

export function isDisabled(params, hash) {
  let { day, disabler, month, max, min } = hash
  let disabled = false

  if (!day) {
    disabled = true
  }

  if (month && day.month() !== month.index) {
    disabled = true
  }

  if (max && min && (day.isAfter(max) || day.isBefore(min))) {
    disabled = true
  }

  if (max && day.isAfter(max)) {
    disabled = true
  }

  if (min && day.isBefore(min)) {
    disabled = true
  }

  if (!!disabled && typeof disabled === "function") {
    disabled = disabler(day)
  }

  return disabled
}

export default Ember.Helper.helper(isDisabled);
