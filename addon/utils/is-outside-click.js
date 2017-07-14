import Ember from 'ember'
const { assert, $ } = Ember

export default function isOutsideClick (elem, target) {
  assert('You need to pass in both the element and the target', elem && target)

  let $target = $(target)
  let $selector = $(elem)

  if ($selector.is($target) || $selector.has($target).length > 0) {
    return false
  } else {
    return true
  }
}
