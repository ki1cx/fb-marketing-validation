module.exports = {
  validate: {
    params: {
      optimizationGoal: 'APP_INSTALLS',
      billingEvent: 'OFFER_CLAIMS',
    },
    response: false,
  },
  map: {
    params: {
      optimizationGoal: 'APP_INSTALLS',
    },
    response: ["IMPRESSIONS"]
  }
}