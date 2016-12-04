import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('en-rangepicker', 'Integration | Component | en rangepicker', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{en-rangepicker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#en-rangepicker}}
      template block text
    {{/en-rangepicker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
