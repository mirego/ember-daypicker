import { helper } from "@ember/component/helper"

export function isThisDay(params, { day, date }) {
  return day.isSame(date, "day")
}

export default helper(isThisDay)
