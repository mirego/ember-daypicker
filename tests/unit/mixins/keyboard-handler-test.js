import Ember from 'ember';
import KeyboardHandlerMixin from '../../../mixins/keyboard-handler';
import { module, test } from 'qunit';

module('Unit | Mixin | keyboard handler');

// Replace this with your real tests.
test('it works', function(assert) {
  let KeyboardHandlerObject = Ember.Object.extend(KeyboardHandlerMixin);
  let subject = KeyboardHandlerObject.create();
  assert.ok(subject);
});
