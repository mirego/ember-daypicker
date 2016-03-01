# ember-daypicker

ember-daypicker is a simple datepicker component for ember.js. It's built using moment.js; there are no
external datepicker components.

## Installation

`ember install ember-daypicker`

## Usage

You get a component `en-daypicker-input` that be used as such:

```
  {{en-daypicker-input
    date=date
    on-select=(action 'didSelectDate')
```

It uses moment.js everywhere, so you should pass in a moment object as the `date` attr,
and when you handle the `on-select` action, you should also expect a moment object to
be sent back to you.

Optionally, you can also provide the `format` attribute that will control how the selected
date gets shown in the input field. By default, it is `MMM D` which would be something like
`Mar 10`.

## Questions? Bugs?

Feel free to create an issue or send a PR if you find a bug.
