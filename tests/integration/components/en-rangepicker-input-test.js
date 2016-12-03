import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('en-rangepicker-input', 'Integration | Component | en rangepicker input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{en-rangepicker-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#en-rangepicker-input}}
      template block text
    {{/en-rangepicker-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
