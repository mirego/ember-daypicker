import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('en-daypicker', 'Integration | Component | en daypicker', {
  integration: true
});

test('it renders with the initial date value', function(assert) {
  let today = moment()
  let nextMonth = today.clone().add(1, 'month')

  this.set('nextMonth', nextMonth)

  this.render(hbs`{{en-daypicker 
              date=nextMonth}}`);

  assert.equal(this.$('.en-daypicker-month').text().trim(), nextMonth.format("MMMM YYYY"));
});

test('when the date updates later, it updates the rest', function(assert) {
  let today = moment()
  let nextMonth = today.clone().add(1, 'month')

  this.set('nextMonth', nextMonth)

  this.render(hbs`{{en-daypicker 
              date=nextMonth}}`);

  assert.equal(this.$('.en-daypicker-month').text().trim(), nextMonth.format("MMMM YYYY"));

  let nextMonthAgain = today.clone().add(3, 'month')
  this.set('nextMonth', nextMonthAgain)

  assert.equal(this.$('.en-daypicker-month').text().trim(), nextMonthAgain.format("MMMM YYYY"));
});

test('when a date is clicked upon, it sends the on-select action', function(assert) {
  let today = moment()

  this.set('nextMonth', today)

  this.on('on-select', function (day) {
    assert.ok(day, 'is present')
    assert.ok(moment.isMoment(day), 'is a moment object')
  })

  this.render(hbs`{{en-daypicker 
              date=nextMonth
              on-select="on-select"}}`);

  this.$('.en-daypicker-day:not(.is-disabled):not(.is-selected):first').click()
});
