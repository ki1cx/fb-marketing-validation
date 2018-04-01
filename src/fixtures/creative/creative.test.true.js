module.exports = {
  validate: {
    params: {
      campaignObjective: 'BRAND_AWARENESS',
      adFormat: 'image',
    },
    response: true,
  },
  map: {
    byFormat: {
      params: {
        adFormat: 'image',
      },
      response: ["REACH", "BRAND_AWARENESS", "LINK_CLICKS", "POST_ENGAGEMENT", "PAGE_LIKES", "EVENT_RESPONSES", "APP_INSTALLS", "LEAD_GENERATION", "MESSAGES", "CONVERSIONS"]
    },
    byObjective: {
      params: {
        campaignObjective: 'BRAND_AWARENESS',
      },
      response: ["image", "video", "slideshow", "carousel"]
    },
  }
}