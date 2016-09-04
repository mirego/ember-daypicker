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

test('when user hits next, it goes to the next date', function(assert) {
  let today = moment().startOf('week').add(2, 'days') // Ensure it's never the end of the week

  this.set('today', today)
  this.on('on-select', _ => null)

  this.render(hbs`{{en-daypicker 
              date=today
              on-select=(action "on-select")}}`);

  const selected = this.$('.en-daypicker-day.is-selected')
  assert.equal(selected.text().trim(), today.format("D"), "has the right day by default")

  const day = this.$('.en-daypicker-day:focus').data('daypicker-day')

  run(() => {
    selected.trigger(next)
  })

  console.log(day)

  assert.equal(this.$('.en-daypicker-day:focus').data('daypicker-day'), day + 1, "goes to the next date")
});

test("when user hits next on the last day of the week, it goes to the next week's first day", function(assert) {
  let endOfWeek = moment().endOf('week')

  this.set('date', endOfWeek)
  this.on('on-select', _ => null)

  this.render(hbs`{{en-daypicker 
              date=date
              on-select=(action "on-select")}}`);

  const selected = this.$('.en-daypicker-day.is-selected')
  assert.equal(selected.text().trim(), endOfWeek.format("D"), "has the right day by default")

  const day = this.$('.en-daypicker-day:focus').data('daypicker-day')

  run(() => {
    selected.trigger(next)
  })

  const focused = this.$('.en-daypicker-day:focus')

  assert.equal(focused.text().trim(), endOfWeek.add(1, 'day').format("D"), "goes to the right day")
  assert.equal(focused.data('daypicker-day'), 0, "goes to the right element")
});

test('when user hits prev, it goes to the previous date', function(assert) {
  let today = moment().startOf('week').add(2, 'days') // Ensure it's never the start of the week

  this.set('today', today)
  this.on('on-select', _ => null)

  this.render(hbs`{{en-daypicker 
              date=today
              on-select=(action "on-select")}}`);

  const selected = this.$('.en-daypicker-day.is-selected')
  assert.equal(selected.text().trim(), today.format("D"), "has the right day by default")

  const day = this.$('.en-daypicker-day:focus').data('daypicker-day')

  run(() => {
    selected.trigger(prev)
  })

  assert.equal(this.$('.en-daypicker-day:focus').data('daypicker-day'), day - 1, "goes to the previous date")
});

test("when user hits previous on the first day of the week, it goes to the previous week's last day", function(assert) {
  let startOfWeek = moment().startOf('week')

  this.set('date', startOfWeek)
  this.on('on-select', _ => null)

  this.render(hbs`{{en-daypicker 
              date=date
              on-select=(action "on-select")}}`);

  const selected = this.$('.en-daypicker-day.is-selected')
  assert.equal(selected.text().trim(), startOfWeek.format("D"), "has the right day by default")

  const day = this.$('.en-daypicker-day:focus').data('daypicker-day')

  run(() => {
    selected.trigger(prev)
  })

  const focused = this.$('.en-daypicker-day:focus')
  assert.equal(focused.text().trim(), startOfWeek.subtract(1, 'day').format("D"), "goes to the right day")
  assert.equal(focused.data('daypicker-day'), 6, "goes to the right element")
});
