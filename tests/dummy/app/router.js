import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('formatting-dates'),
  this.route('actions'),
  this.route('disabling-dates'),
  this.route('modifiers')
  this.route('customization')
});

export default Router;
