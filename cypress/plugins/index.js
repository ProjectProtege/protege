/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

// plugins/index.js
require('dotenv').config()

module.exports = (on, config) => {
  // eslint-disable-next-line no-param-reassign
  config.env.apiKey = process.env.API_KEY
  // config.defaultCommandTimeout = 10000
  // config.env.ENVIRONMENT = 'development'
  // console.log(config)
  return config
}
