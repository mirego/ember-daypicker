import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Em

moduleForComponent('en-daypicker-input', 'Integration | Component | en daypicker input', {
  integration: true
});

test("it shows the datepicker when the input gets focus", function (assert) {
  let today = moment()
  this.set('today', today)
  this.on('on-select', () => null)

  this.render(hbs`{{en-daypicker-input
              date=today
              on-select=(action "on-select")}}`);

  assert.equal($('.en-day-picker').length, 0, "doesn't have datepicker by default")

  run(() => {
    this.$('input').focus()
  })

  assert.equal($('.en-day-picker').length, 1, "has datepicker when input is focused")
})

test("the date has MMM D format by default", function (assert) {
  let today = moment()
  this.set('today', today)
  this.on('on-select', () => null)

  this.render(hbs`{{en-daypicker-input
              date=today
              on-select=(action "on-select")}}`);

  assert.equal(this.$('input').val(), today.format("MMM D"))
})

test("the date works with other formats", function (assert) {
  let today = moment()
  let format = "MMM D, YYY"

  this.set('today', today)
  this.set('format', format)
  this.on('on-select', () => null)

  this.render(hbs`{{en-daypicker-input
              date=today
              format=format
              on-select=(action "on-select")}}`);

  assert.equal(this.$('input').val(), today.format(format))

  format = "X"
  this.set('format', format)

  assert.equal(this.$('input').val(), today.format(format))

  format = "MMM DD, YYYY hh:mm ss Z"
  this.set('format', format)

  assert.equal(this.$('input').val(), today.format(format))
})

test("placeholder works", function (assert) {
  let today = moment()

  this.set('today', today)
  this.on('on-select', () => null)

  this.render(hbs`{{en-daypicker-input
              date=today
              placeholder="Choose a date..."
              on-select=(action "on-select")}}`);

  assert.equal(this.$('input').attr('placeholder'), "Choose a date...")
})

test("on selecting a date, it sends the on-select action", function (assert) {
  assert.expect(1)

  let today = moment()
  this.set('today', today)
  this.on('on-select', (date) => {
    assert.ok(moment.isMoment(date), "got a moment object")
  })

  this.render(hbs`{{en-daypicker-input
              date=today
              isFocused=true
              on-select=(action "on-select")}}`);

  this.$('.en-daypicker-day').not('.is-disabled').last().click()
})
