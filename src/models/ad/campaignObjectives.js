const CampaignObjectives = {
  brand_awareness: 'BRAND_AWARENESS',
  app_installs: 'APP_INSTALLS',
  conversions: 'CONVERSIONS',
  link_clicks: 'LINK_CLICKS',
  event_responses: 'EVENT_RESPONSES',
  lead_generation: 'LEAD_GENERATION',
  page_likes: 'PAGE_LIKES',
  post_engagement: 'POST_ENGAGEMENT',
  video_views: 'VIDEO_VIEWS',
  messages: 'MESSAGES',
  reach: 'REACH',
  product_catalog_sales: 'PRODUCT_CATALOG_SALES',
  store_visits: 'STORE_VISITS',
  traffic: 'TRAFFIC',
}

const CampaignObjectivesByBusinessGoal = {
  awareness: [
    CampaignObjectives.brand_awareness,
    CampaignObjectives.reach,
  ],
  consideration: [
    CampaignObjectives.page_likes,
    CampaignObjectives.link_clicks,
    CampaignObjectives.event_responses,
    CampaignObjectives.app_installs,
    CampaignObjectives.video_views,
    CampaignObjectives.lead_generation,
    CampaignObjectives.post_engagement,
    CampaignObjectives.messages,
  ],
  conversion: [
    CampaignObjectives.conversions,
    CampaignObjectives.product_catalog_sales,
  ],
}

export { CampaignObjectivesByBusinessGoal }
export default CampaignObjectives;
