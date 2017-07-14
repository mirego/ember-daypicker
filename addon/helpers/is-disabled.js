import { helper } from "@ember/component/helper"

export function isDisabled(params, hash) {
  let { day, disabler, month, max, min } = hash

  if (!day) {
    return true
  }

  if (month && day.month() !== month.index) {
    return true
  }

  if (max && min && (day.isAfter(max) || day.isBefore(min))) {
    return true
  }

  if (max && day.isAfter(max)) {
    return true
  }

  if (min && day.isBefore(min)) {
    return true
  }

  if (!!disabler && typeof disabler === "function" && disabler(day)) {
    return true
  }

  return false
}

export default helper(isDisabled)
