import OptimizationGoals from '../models/ad/optimizationGoals';
import BillingEvents from "../models/ad/billingEvents";

// https://developers.facebook.com/docs/marketing-api/validation/v2.12
// https://www.facebook.com/business/ads-guide

// const Mapping = {
//   [OptimizationGoal]: [BillingEvents]
// }

const BillingEventMapping = {
  [OptimizationGoals.app_installs]: [
    BillingEvents.impressions,
    BillingEvents.app_installs,
  ],

  [OptimizationGoals.brand_awareness]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.engaged_users]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.event_responses]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.impressions]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.lead_generation]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.link_clicks]: [
    BillingEvents.link_clicks,
    BillingEvents.impressions,
  ],

  [OptimizationGoals.offer_claims]: [
    BillingEvents.impressions,
    BillingEvents.offer_claims,
  ],

  [OptimizationGoals.offsite_conversions]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.page_engagement]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.page_likes]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.post_engagement]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.reach]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.replies]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.social_impressions]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.video_views]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.value]: [
    BillingEvents.impressions,
  ],

  [OptimizationGoals.landing_page_views]: [
    BillingEvents.impressions,
  ],
};


export default BillingEventMapping;
