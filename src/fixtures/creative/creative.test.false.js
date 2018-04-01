module.exports = {
  validate: {
    params: {
      campaignObjective: 'VIDEO_VIEWS',
      adFormat: 'image',
    },
    response: false,
  },
  map: {
    byFormat: {
      params: {
        adFormat: 'image',
      },
      response: ["REACH", "BRAND_AWARENESS", "LINK_CLICKS", "APP_INSTALLS", "LEAD_GENERATION", "CONVERSIONS", "PRODUCT_CATALOG_SALES", "LEAD_GENERATION", "MESSAGES", "CONVERSIONS"]
    },
    byObjective: {
      params: {
        campaignObjective: 'VIDEO_VIEWS',
      },
      response: ["image", "video", "slideshow", "carousel"]
    },
  }
}