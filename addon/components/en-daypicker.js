import Ember from 'ember'
import Constants from '../utils/constants'
import KeyboardHandler from '../mixins/keyboard-handler'

const {
  get,
  set,
  computed,
  Component,
  getProperties,
  run
} = Em

export default Component.extend(KeyboardHandler, {
  classNames: ['en-day-picker'],
  classNameBindings: ['positionFromRight:from-right', 'positionFromBottom:from-bottom'],
  attributeBindings: ['role'],
  role: 'widget',

  positionFromBottom: false,
  positionFromRight: false,

  defaultFormat: Constants.defaultFormat,

  date: moment(),
  today: moment(),

  /*
   * activeDate controls the month and the
   * year that is displayed
  */

  activeDate: computed('date', {
    get () {
      return get(this, 'date')
    }
  }),

  month: computed('activeDate', {
    get () {
      let moments = Constants.months
      let index = get(this, 'activeDate').month()

      return {
        name: moments[index],
        index: index
      }
    }
  }),

  year: computed('activeDate', {
    get () {
      return get(this, 'activeDate').year()
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

  didInsertElement () {
    this._super(...arguments)

    run.scheduleOnce('afterRender', () => {
      this.repositionElement()
      this.focusSelected()
    })
  },

  repositionElement () {
    let { right, top } = this.element.getBoundingClientRect()
    let { innerWidth, innerHeight } = window

    if (innerWidth - right < 150) {
      set(this, 'positionFromRight', true)
    }

    if (innerHeight - top < 150) {
      set(this, 'positionFromBottom', true)
    }
  },

  actions: {
    changeYear (year) {
      let date = get(this, 'date')
      let next = date.clone().year(year)
      set(this, 'date', next)
    },

    nextMonth () {
      let date = get(this, 'activeDate')
      let nextMonth = date.clone().add(1, 'month').startOf('month')

      this.set('activeDate', nextMonth)

      run.next(() => {
        this.focusSelected()
      })
    },

    previousMonth () {
      let date = get(this, 'activeDate')
      let previousMonth = date.clone().subtract(1, 'month').startOf('month')

      this.set('activeDate', previousMonth)

      run.next(() => {
        this.focusSelected()
      })
    },

    didSelectDate (day) {
      const { minDate, maxDate } = getProperties(this, 'minDate', 'maxDate')

      if (minDate && day.isBefore(minDate)) return
      if (maxDate && day.isAfter(maxDate)) return

      this.focusSelected()
      this.attrs['on-select'](day)
    }
  }
});
