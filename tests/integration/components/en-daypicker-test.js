import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Constants from 'ember-day/utils/constants'

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

const m = (d) => moment(d, Constants.defaultFormat)

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

/*
 * Disabling days works
 */

test("it can disable dates after a given maxDate", function (assert) {
  let today = m("Sep 1, 2016")
  let nextWeek = today.clone().add(6, 'days')

  this.set('today', today)
  this.set('nextWeek', nextWeek)

  this.render(hbs`{{en-daypicker
              maxDate=nextWeek
              date=today}}`);

  let active = this.$('.en-daypicker-day:not(.is-disabled)')
  assert.equal(active.length, 7, "has 7 active days")

  let firstDayAfterMax = this.$('.en-daypicker-day[aria-label="Sep 08, 2016"]')
  assert.ok(firstDayAfterMax.hasClass('is-disabled'), "first day after max has disabled class")

  run(() => {
    this.$('.en-daypicker-action-next').click()
  })

  active = this.$('.en-daypicker-day:not(.is-disabled)')
  assert.equal(active.length, 0, "has no active days in the next month")
})

test("it can disable dates before a given minDate", function (assert) {
  let today = m("Sep 7, 2016")
  let nextWeek = today.clone().add(6, 'days')

  this.set('today', today)
  this.set('nextWeek', nextWeek)
  console.log(nextWeek)

  this.render(hbs`{{en-daypicker
              minDate=nextWeek
              date=today}}`);

  let active = this.$('.en-daypicker-day:not(.is-disabled)')
  assert.equal(active.length, 18, "has 18 active days")

  let lastDay = this.$('.en-daypicker-day[aria-label="Sep 12, 2016"]')
  assert.ok(lastDay.hasClass('is-disabled'), "last minDate has the disabled class")

  let firstDayAfterMin= this.$('.en-daypicker-day[aria-label="Sep 13, 2016"]')
  assert.notOk(firstDayAfterMin.hasClass('is-disabled'), "first day after max does not have disabled class")
})

test("it does not allow selecting disabled dates after max", function (assert) {
  expect(1)

  let today = m("Sep 1, 2016")
  let nextWeek = today.clone().add(6, 'days')

  this.set('today', today)
  this.set('nextWeek', nextWeek)

  this.on('on-select', (date) => {
    assert.ok(moment(date).isSame(m("Sep 07, 2016"), 'day'), 'got the right day')
  })

  this.render(hbs`{{en-daypicker
              maxDate=nextWeek
              date=today
              on-select=(action "on-select")}}`);

  run(() => {
    this.$('.en-daypicker-day[aria-label="Sep 07, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 08, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 10, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 12, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 15, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 21, 2016"]').click()
  })
})

test("it does not allow selecting disabled dates before min", function (assert) {
  expect(1)

  let today = m("Sep 1, 2016")
  let nextWeek = today.clone().add(6, 'days')

  this.set('today', today)
  this.set('nextWeek', nextWeek)

  this.on('on-select', (date) => {
    assert.ok(moment(date).isSame(m("Sep 07, 2016"), 'day'), 'got the right day')
  })

  this.render(hbs`{{en-daypicker
              minDate=nextWeek
              date=today
              on-select=(action "on-select")}}`);

  run(() => {
    this.$('.en-daypicker-day[aria-label="Sep 01, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 02, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 03, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 04, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 05, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 06, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 07, 2016"]').click()
  })
})

test("it allows disabling any day", function (assert) {
  expect(4)

  let today = m("Sep 1, 2016")
  let nextWeek = today.clone().add(6, 'days')

  this.set('today', today)
  this.set('nextWeek', nextWeek)

  this.set('disableFn', (date) => {
    return date.day() === 6 // Disable Saturdays
  })

  this.on('on-select', (date) => null)

  this.render(hbs`{{en-daypicker
              disableFn=disableFn
              date=today
              on-select=(action "on-select")}}`);

  run(() => {
    this.$('.en-daypicker-day[aria-label="Sep 03, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 10, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 17, 2016"]').click()
    this.$('.en-daypicker-day[aria-label="Sep 24, 2016"]').click()
  })

  assert.ok(this.$('.en-daypicker-day[aria-label="Sep 03, 2016"]').hasClass("is-disabled"))
  assert.ok(this.$('.en-daypicker-day[aria-label="Sep 10, 2016"]').hasClass("is-disabled"))
  assert.ok(this.$('.en-daypicker-day[aria-label="Sep 17, 2016"]').hasClass("is-disabled"))
  assert.ok(this.$('.en-daypicker-day[aria-label="Sep 24, 2016"]').hasClass("is-disabled"))
})
