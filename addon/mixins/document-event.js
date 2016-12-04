import Ember from 'ember';

const {
  get,
  set,
  computed,
  inject,
  run,
  Logger: { warn },
  Mixin
} = Em

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export default Mixin.create({
  documentEvents: [],

  didInsertElement () {
    run.scheduleOnce('afterRender', () => {
      get(this, 'documentEvents')
        .forEach(event => {
          const eventHandler = `onDocument${capitalize(event)}`

          if (!this[eventHandler]) {
            warn(`[document-event] You are tracking ${event}, but there is no handler. ${eventHandler} was not found`)
            return
          }

          this[eventHandler] = this[eventHandler].bind(this)
          window.addEventListener(event, this[eventHandler], true)
        })
    })
  },

  willDestroyElement () {
    get(this, 'documentEvents')
      .forEach(event => {
        const eventHandler = `onDocument${capitalize(event)}`
        window.removeEventListener(event, this[eventHandler], true)
      })
  }
});
