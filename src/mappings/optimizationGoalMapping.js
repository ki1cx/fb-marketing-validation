import CampaignObjectives from '../models/ad/campaignObjectives';
import OptimizationGoals from '../models/ad/optimizationGoals';

// https://developers.facebook.com/docs/marketing-api/validation/v2.12

// const Mapping = {
//   [CampaignObjective]: [OptimizationGoals]
// }

const OptimizationGoalMapping = {
  [CampaignObjectives.brand_awareness]: [
    OptimizationGoals.brand_awareness,
    OptimizationGoals.reach,
  ],

  [CampaignObjectives.app_installs + '_canvas']: [
    OptimizationGoals.app_installs,
    OptimizationGoals.impressions,
    OptimizationGoals.post_engagement,
  ],

  [CampaignObjectives.app_installs + '_mobile']: [
    OptimizationGoals.app_installs,
    OptimizationGoals.offsite_conversions,
    OptimizationGoals.link_clicks,
    OptimizationGoals.reach,
    OptimizationGoals.value,
    OptimizationGoals.video_views,
  ],

  [CampaignObjectives.conversions]: [
    OptimizationGoals.impressions,
    OptimizationGoals.post_engagement,
    OptimizationGoals.reach,
    OptimizationGoals.social_impressions,
    OptimizationGoals.value,
    OptimizationGoals.landing_page_views,
  ],

  [CampaignObjectives.event_responses + '_event']: [
    OptimizationGoals.event_responses,
    OptimizationGoals.impressions,
    OptimizationGoals.reach,
  ],

  [CampaignObjectives.event_responses + '_page']: [
    OptimizationGoals.event_responses,
    OptimizationGoals.impressions,
    OptimizationGoals.post_engagement,
    OptimizationGoals.reach,
  ],

  [CampaignObjectives.lead_generation]: [
    OptimizationGoals.lead_generation,
    OptimizationGoals.link_clicks,
  ],

  [CampaignObjectives.link_clicks]: [
    OptimizationGoals.link_clicks,
    OptimizationGoals.impressions,
    OptimizationGoals.page_engagement,
    OptimizationGoals.post_engagement,
    OptimizationGoals.reach,
    OptimizationGoals.landing_page_views,
  ],

  [CampaignObjectives.link_clicks + '_canvas']: [
    OptimizationGoals.engaged_users,
    OptimizationGoals.app_installs,
    OptimizationGoals.impressions,
    OptimizationGoals.post_engagement,
    OptimizationGoals.reach,
  ],

  [CampaignObjectives.link_clicks + '_mobile']: [
    OptimizationGoals.link_clicks,
    OptimizationGoals.impressions,
    OptimizationGoals.reach,
    OptimizationGoals.offsite_conversions,
  ],

  [CampaignObjectives.messages]: [
    OptimizationGoals.replies,
    OptimizationGoals.impressions,
  ],

  [CampaignObjectives.page_likes]: [
    OptimizationGoals.page_likes,
    OptimizationGoals.impressions,
    OptimizationGoals.page_engagement,
    OptimizationGoals.post_engagement,
    OptimizationGoals.reach,
  ],

  [CampaignObjectives.post_engagement]: [
    OptimizationGoals.post_engagement,
    OptimizationGoals.impressions,
    OptimizationGoals.page_engagement,
    OptimizationGoals.reach,
    OptimizationGoals.video_views,
    OptimizationGoals.link_clicks,
  ],

  [CampaignObjectives.product_catalog_sales]: [
    OptimizationGoals.offsite_conversions,
    OptimizationGoals.impressions,
    OptimizationGoals.post_engagement,
    OptimizationGoals.reach,
    OptimizationGoals.link_clicks,
  ],

  [CampaignObjectives.reach]: [
    OptimizationGoals.reach,
    OptimizationGoals.impressions,
  ],

  [CampaignObjectives.video_views]: [
    OptimizationGoals.video_views,
  ],
};


export default OptimizationGoalMapping;
