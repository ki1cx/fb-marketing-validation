module.exports = {
  validate: {
    params: {
      campaignObjective: 'BRAND_AWARENESS',
      optimizationGoal: 'BRAND_AWARENESS',
    },
    response: true,
  },
  map: {
    params: {
      campaignObjective: 'BRAND_AWARENESS',
    },
    response: ["BRAND_AWARENESS", "REACH"]
  }
}