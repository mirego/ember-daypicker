import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run, run: { later }} = Em

moduleForComponent('en-daypicker', 'Integration | Component | en daypicker', {
  integration: true
});

test('it renders with the initial date value', function(assert) {
  let today = moment()
  let nextMonth = today.clone().add(1, 'month')

  this.set('nextMonth', nextMonth)

  this.render(hbs`{{en-daypicker 
              date=nextMonth}}`);

  assert.equal(this.$('.en-daypicker-month-name').text().trim(), nextMonth.format("MMMM YYYY"));
});

test('it renders the right dates', function(assert) {
  expect(3)

  let today = moment()
  this.set('today', today)

  this.render(hbs`{{en-daypicker 
              date=today}}`);

  const daysCount = today.daysInMonth()
  const daypickerDay = this.$('.en-daypicker-day').not('.is-disabled')

  const startOfMonth = today.startOf('month').day()
  const endOfMonth = today.endOf('month').day()

  assert.equal(daypickerDay.length, daysCount, "has the right number of days enabled")
  assert.equal(daypickerDay.first().data('daypicker-day'), startOfMonth, "has the right start")
  assert.equal(daypickerDay.last().data('daypicker-day'), endOfMonth, "has the right end")
});

test('it has the right today', function(assert) {
  expect(2)

  let today = moment()
  this.set('today', today)

  this.render(hbs`{{en-daypicker 
              date=today}}`);

  const todayDiv = this.$('.is-today')

  assert.equal(todayDiv.length, 1)
  assert.equal(todayDiv.text().trim(), today.format("D"))
});

test('when the date updates later, it updates the rest', function(assert) {
  let today = moment()
  let nextMonth = today.clone().add(1, 'month')

  this.set('nextMonth', nextMonth)

  this.render(hbs`{{en-daypicker 
              date=nextMonth}}`);

  assert.equal(this.$('.en-daypicker-month-name').text().trim(), nextMonth.format("MMMM YYYY"));

  let nextMonthAgain = today.clone().add(3, 'month')
  this.set('nextMonth', nextMonthAgain)

  assert.equal(this.$('.en-daypicker-month-name').text().trim(), nextMonthAgain.format("MMMM YYYY"));
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
              on-select=(action "on-select")}}`);

  this.$('.en-daypicker-day:not(.is-disabled):not(.is-selected):first').click()
});

/*
 * KEYBOARD EVENTS
*/

const down  = $.Event('keydown', { keyCode: 40, which: 40})
const up    = $.Event('keydown', { keyCode: 38, which: 38})
const next  = $.Event('keydown', { keyCode: 39, which: 39})
const prev  = $.Event('keydown', { keyCode: 37, which: 37})
const enter = $.Event('keydown', { keyCode: 13, which: 13})

const m = (d) => moment(d, "MMM DD, YYYY")

test('when user hits next, it goes to the next date', function(assert) {
  expect(2)

  let today = m("Sep 15, 2016")

  this.set('today', today)
  this.on('on-select', _ => null)

  this.on('on-focus', (day) => {
    assert.ok(moment(day).isSame(m("Sep 16, 2016")), "got the next day to focus")
  })

  this.render(hbs`{{en-daypicker 
              date=today
              on-select=(action "on-select")
              on-focus=(action "on-focus")}}`);

  const selected = this.$('.en-daypicker-day.is-selected')
  assert.equal(selected.text().trim(), today.format("D"), "has the right day by default")

  run(_ => selected.trigger(next))
});

test('when user hits prev, it goes to the previous date', function(assert) {
  expect(2)

  let today = m("Sep 15, 2016")

  this.set('today', today)
  this.on('on-select', _ => null)

  this.on('on-focus', (day) => {
    assert.ok(moment(day).isSame(m("Sep 14, 2016")), "got the pevious day to focus")
  })

  this.render(hbs`{{en-daypicker 
              date=today
              on-select=(action "on-select")
              on-focus=(action "on-focus")}}`);

  const selected = this.$('.en-daypicker-day.is-selected')
  assert.equal(selected.text().trim(), today.format("D"), "has the right day by default")

  run(_ => selected.trigger(prev))
});

test('when user hits up, it goes to the previous week', function(assert) {
  expect(2)

  let today = m("Sep 15, 2016")

  this.set('today', today)
  this.on('on-select', _ => null)

  this.on('on-focus', (day) => {
    assert.ok(moment(day).isSame(m("Sep 8, 2016"), "got the pevious week to focus"))
  })

  this.render(hbs`{{en-daypicker 
              date=today
              on-select=(action "on-select")
              on-focus=(action "on-focus")}}`);

  const selected = this.$('.en-daypicker-day.is-selected')
  assert.equal(selected.text().trim(), today.format("D"), "has the right day by default")

  run(_ => selected.trigger(up))
});

test('when user hits down, it goes to the next week', function(assert) {
  expect(2)

  let today = m("Sep 15, 2016")

  this.set('today', today)
  this.on('on-select', _ => null)

  this.on('on-focus', (day) => {
    assert.ok(moment(day).isSame(m("Sep 22, 2016"), "got the next week to focus"))
  })

  this.render(hbs`{{en-daypicker 
              date=today
              on-select=(action "on-select")
              on-focus=(action "on-focus")}}`);

  const selected = this.$('.en-daypicker-day.is-selected')
  assert.equal(selected.text().trim(), today.format("D"), "has the right day by default")

  run(_ => selected.trigger(down))
});
