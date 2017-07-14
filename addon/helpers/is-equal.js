import Ember from 'ember'
import { helper } from "@ember/component/helper"

export function isEqual([a, b]) {
  return Ember.isEqual(a, b)
}

export default helper(isEqual)
