import Ember from 'ember'
import Constants from '../utils/constants'
import KeyboardHandler from '../mixins/keyboard-handler'

const {
  get: get,
  set: set,
  computed,
  getProperties,
  run
} = Em

export default Ember.Component.extend(KeyboardHandler, {
  classNames: ['en-day-picker'],
  attributeBindings: ['role'],
  role: 'widget',

  date: moment(),
  today: moment(),

  month: computed('date', {
    get () {
      let moments = Constants.months
      let index = get(this, 'date').month()

      return { 
        name: moments[index],
        index: index
      }
    }
  }),

  year: computed('date', {
    get () {
      return get(this, 'date').year()
    }
  }),

  firstDay: computed('month', {
    get () {
      let date = get(this, 'date')
      return date.startOf('month')
    }
  }),

  weeksArray: computed('month', function () {
    let { date, month, year } = getProperties(this, 'date', 'month', 'year' )
    let daysInMonth = date.daysInMonth()

    let days = []
    let weeks = []

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(moment([year, month.index, i, 0, 0, 0]))
    }

    let currentWeek = []

    days.forEach(day => {
      if (currentWeek.length > 0 && day.day() === 0) {
        weeks.push(currentWeek)
        currentWeek = []
      }

      currentWeek.push(day)

      if (days.indexOf(day) === days.length - 1) {
        weeks.push(currentWeek)
      }
    })

    let firstWeek = weeks[0]

    for (let i = 7 - firstWeek.length; i > 0; i--) {
      let firstDay = firstWeek[0].clone()
      let previousDay = firstDay.subtract(1, 'day')

      firstWeek.unshift(previousDay)
    }

    let lastWeek = weeks[weeks.length - 1]

    for (let i = lastWeek.length; i < 7; i++) {
      let lastDay = lastWeek[lastWeek.length - 1].clone()
      let nextDay = lastDay.add(1, 'day')

      lastWeek.push(nextDay)
    }

    return weeks
  }),

  init () {
    this._super(...arguments)
    this._verifyMoment()
  },

  _verifyMoment () {
    if (!moment) {
      throw('[en-daypicker] moment.js could not be found')
    }
  },

  weekDays: Constants.weekdays,

  actions: {
    nextMonth () {
      let date = this.get('date')
      let nextMonth = date.clone().add(1, 'month').startOf('month')

      this.set('date', nextMonth)
      run.next(() => {
        this.focusSelected()
      })
    },

    previousMonth () {
      let date = this.get('date')
      let previousMonth = date.clone().subtract(1, 'month').startOf('month')

      this.set('date', previousMonth)
      run.next(() => {
        this.focusSelected()
      })
    },

    didSelectDate (day) {
      this.focusSelected()
      this.attrs['on-select'](day)
    }
  }
});
