import AdFormats from '../models/ad/adFormats';
import CampaignObjectives from "../models/ad/campaignObjectives";

// https://developers.facebook.com/docs/marketing-api/validation/v2.12

// const mappingByAssetType = {
//   AdFormat: [supported objectives]
// }
//
// const mappingByObjectiveType = {
//   CampaignObjective: [supported asset types]
// }

const mappingByAdFormat = {
  [AdFormats.image]: [
    CampaignObjectives.reach,
    CampaignObjectives.brand_awareness,
    CampaignObjectives.link_clicks,
    CampaignObjectives.post_engagement,
    CampaignObjectives.page_likes,
    CampaignObjectives.event_responses,
    CampaignObjectives.app_installs,
    CampaignObjectives.lead_generation,
    CampaignObjectives.messages,
    CampaignObjectives.conversions,
  ],
  [AdFormats.video]: [
    CampaignObjectives.reach,
    CampaignObjectives.brand_awareness,
    CampaignObjectives.link_clicks,
    CampaignObjectives.post_engagement,
    CampaignObjectives.page_likes,
    CampaignObjectives.event_responses,
    CampaignObjectives.app_installs,
    CampaignObjectives.lead_generation,
    CampaignObjectives.messages,
    CampaignObjectives.conversions,
    CampaignObjectives.video_views,
  ],
  [AdFormats.slideshow]: [
    CampaignObjectives.reach,
    CampaignObjectives.brand_awareness,
    CampaignObjectives.link_clicks,
    CampaignObjectives.post_engagement,
    CampaignObjectives.page_likes,
    CampaignObjectives.event_responses,
    CampaignObjectives.app_installs,
    CampaignObjectives.lead_generation,
    CampaignObjectives.messages,
    CampaignObjectives.conversions,
    CampaignObjectives.video_views,
  ],
  [AdFormats.carousel]: [
    CampaignObjectives.reach,
    CampaignObjectives.brand_awareness,
    CampaignObjectives.link_clicks,
    CampaignObjectives.app_installs,
    CampaignObjectives.lead_generation,
    CampaignObjectives.conversions,
    CampaignObjectives.product_catalog_sales,
    CampaignObjectives.lead_generation,
    CampaignObjectives.messages,
    CampaignObjectives.conversions,
  ],
}

let mappingByObjective = {};

Object.keys(mappingByAdFormat).map(adFormat => {
  const supportedObjectives = mappingByAdFormat[adFormat];

  supportedObjectives.map(objective => {
    !mappingByObjective[objective] && (mappingByObjective[objective] = []);

    if(mappingByObjective[objective].indexOf(adFormat) < 0) {
      mappingByObjective[objective].push(adFormat);
    }
  })
});

export var CreativeMappingByAdFormat = mappingByAdFormat;
export var CreativeMappingByObjective = mappingByObjective;
export default mappingByObjective;