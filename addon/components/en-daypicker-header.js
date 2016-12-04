import Ember from 'ember';

const {
  get, set,
  Component,
  computed
} = Em

export default Component.extend({
  isChangingYear: false,

  years: computed('year', function () {
    let arr = []
    let i = 1950

    while (i <= 2020) {
      arr.push(i)
      i++
    }

    return arr.sort()
  }),

  actions: {
    toggleChangingYear () {
      this.toggleProperty('isChangingYear')
    }
  }
});
