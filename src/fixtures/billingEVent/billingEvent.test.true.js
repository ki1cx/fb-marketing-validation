module.exports = {
  validate: {
    params: {
      optimizationGoal: 'APP_INSTALLS',
      billingEvent: 'IMPRESSIONS',
    },
    response: true,
  },
  map: {
    params: {
      optimizationGoal: 'APP_INSTALLS',
    },
    response: ["IMPRESSIONS", "APP_INSTALLS"]
  }
}