import {
  validateCallToAction,
  CallToActionMapping
} from '../lib/callToActionValidation';
import {
  CreativeMappingByAdFormat,
  CreativeMappingByObjective,
  validateAdFormat
} from "../lib/creativeValidation";
import {
  calculateMediaRequirements,
  validateMedia,
  MediaRequirements,
} from '../lib/mediaValidation';
import {
  PlacementValidations,
  PlacementMapping,
} from '../lib/placementValidation';

import CampaignObjectives from '../lib/models/ad/campaignObjectives';
import AdFormats from '../lib/models/ad/adFormats';
import CallToActions from '../lib/models/ad/callToActions';
import AssetTypes from "../lib/models/ad/assetTypes";
import FacebookPositions from "../lib/models/ad/facebookPositions";
import InstagramPositions from "../lib/models/ad/instagramPositions";
import DevicePlatforms from "../lib/models/ad/devicePlatforms";
import PublisherPlatforms from "../lib/models/ad/publisherPlatforms";


void function () {

  const campaignObjective = CampaignObjectives.reach;
  const adFormat = AdFormats.video;
  const callToAction = CallToActions.apply_now;
  const assetTypes = [AssetTypes.image, AssetTypes.video];
  const placements = {
    "facebook": ["feed", "right_hand_column", "marketplace", "instant_article"],
    "instagram": ["stream"],
    "audience_network": ["classic", "rewarded_video"],
    "messenger": ["messenger_home"]
  };
  const media = [{
    width: 600,
    height: 600,
    type: AssetTypes.image,
  }, {
    width: 100,
    height: 100,
    length: 0,
    size: 999999,
    type: AssetTypes.video,
  }];
  const placementsToPreProcess = {
    "facebook": ["feed", "right_hand_column", "marketplace", "instant_article"],
    "instagram": ["stream", "story"],
    "audience_network": ["classic", "rewarded_video"],
    "messenger": ["messenger_home"]
  };
  const selectedDevicePlatform = DevicePlatforms.all;
  const selectedPublisher = PublisherPlatforms.instagram;
  const selectedPosition = InstagramPositions.story;
  const previousPlacement = {
    "facebook": ["feed", "right_hand_column", "marketplace", "instant_article"],
    "instagram": ["stream"],
    "audience_network": ["classic", "rewarded_video"],
    "messenger": ["messenger_home"]
  };


  //===================================
  // Call-To-Action Mapping, Validation
  //===================================

  //get all valid call-to-action values
  const allValidCTAValues = CallToActionMapping[adFormat][campaignObjective];
  console.log(`allValidCTAValues: ${allValidCTAValues}\n`);

  //validate a call-to-action value
  const isCTAValid = validateCallToAction(campaignObjective, adFormat, callToAction);
  console.log(`isCTAValid: ${isCTAValid}\n`);


  //===================================
  // Creative Mapping, Validation
  //===================================

  //get all valid objectives for an ad format
  const allValidObjectivesGivenAdFormat = CreativeMappingByAdFormat[adFormat];
  console.log(`allValidObjectivesGivenAdFormat: ${allValidObjectivesGivenAdFormat}\n`);

  //get all valid adformats given objective
  const allValidAdFormatsGivenObjective = CreativeMappingByObjective[campaignObjective];
  console.log(`allValidAdFormatsGivenObjective: ${allValidAdFormatsGivenObjective}\n`);

  //validate a objective, adformat pair
  const isObjectiveAdformatPairValid = validateAdFormat(campaignObjective, adFormat);
  console.log(`isObjectiveAdformatPairValid: ${isObjectiveAdformatPairValid}\n`);


  //===================================
  // Media Requirement Validation
  //===================================

  //get media requirement that satisfies given asset types and placements
  const mediaRequirements = calculateMediaRequirements(assetTypes, placements);
  console.log(`mediaRequirement: ${JSON.stringify(mediaRequirements)}\n`);

  const isMediaValid = validateMedia(mediaRequirements, media);
  console.log(`isMediaValid: ${JSON.stringify(isMediaValid)}\n`);

  //get media requirement for image media for use with facebook feed placement
  const mediaRequirementForImageFacebookFeedPlacement = MediaRequirements[AssetTypes.image][FacebookPositions.feed];
  console.log(`mediaRequirementForImageFacebookFeedPlacement: ${JSON.stringify(mediaRequirementForImageFacebookFeedPlacement)}\n`);


  //===================================
  // Placement Validation
  //===================================

  //preprocess placements - cleanup a set of placements by automatically removing the least number ofplacements to make a valid set
  const preProcessedPlacements = PlacementValidations.preProcess(placementsToPreProcess);
  console.log(`preProcessedPlacements: ${JSON.stringify(preProcessedPlacements)}\n`);

  //postprocess placements - given a set of placements, process how a newly selected device platform, publisher, and position validates
  const postProcessedPlacements = PlacementValidations.postProcess(previousPlacement, selectedDevicePlatform, selectedPublisher, selectedPosition);
  console.log(`postProcessedPlacements: ${JSON.stringify(postProcessedPlacements)}\n`);

}();