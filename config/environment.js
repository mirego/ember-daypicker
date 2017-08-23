/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    moment: {
      // To cherry-pick specific locale support into your application.
      // Full list of locales: https://github.com/moment/moment/tree/2.10.3/locale
      includeLocales: ['en', 'fr']
    }
  };
};
