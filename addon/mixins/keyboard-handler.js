import Ember from 'ember';

const isFirstDayofWeek = (day) => day.index() === 0
const isLastDayOfWeek  = (day) => day.index() === 6

export default Ember.Mixin.create({
  didInsertElement () {
    this.focusSelected()
  },

  focusSelected () {
    const selected = this.$('.is-selected')

    if (selected) {
      Em.run(() => {
        selected.focus()
      })
    }
  },

  keyDown (ev) {
    const focused = this.$('.en-daypicker-day:focus')

    if (!focused) {
      console.warn('[en-daypicker] Could not find the focused day')
      return
    }

    const key = ev.which || ev.keyCode 
    const day = focused.data('daypicker-day')

    switch (key) {
      case 37:
        this.focusPreviousDay(focused)
        break;

      case 38:
        this.focusPreviousWeek(focused, day)
        break;

      case 39:
        this.focusNextDay(focused)
        break;

      case 40:
        this.focusNextWeek(focused, day)
        break;

      case 13:
        this.selectFocused(focused)
        break;

      default:
        return
    }
  },

  focusPreviousDay (focused) {
    if (focused && isFirstDayofWeek(focused)) {
      this.focusPreviousWeek(focused, 6)
    } else {
      const prev = focused.prev()

      if (!prev.hasClass('is-disabled')) {
        prev.focus()
      }
    }
  },

  focusNextDay (focused) {
    if (focused && isLastDayOfWeek(focused)) {
      this.focusNextWeek(focused, 0)
    } else {
      const next = focused.next()

      if (!next.hasClass('is-disabled')) {
        next.focus()
      }
    }
  },

  focusPreviousWeek (focused, day) {
    const previousWeek = focused.parent().prev()

    if (focused) {
      const previousWeekDay = previousWeek.find('.en-daypicker-day').eq(day)

      if (previousWeekDay && !previousWeekDay.hasClass('is-disabled')) {
        previousWeekDay.focus()
      }
    }
  },

  focusNextWeek (focused, day) {
    const nextWeek = focused.parent().next()

    if (focused) {
      const nextWeekDay = nextWeek.find('.en-daypicker-day').eq(day)

      if (nextWeekDay && !nextWeekDay.hasClass('is-disabled')) {
        nextWeekDay.focus()
      }
    }
  },

  selectFocused (focused) {
    focused.click()
  }
});
