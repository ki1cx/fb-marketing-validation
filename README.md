# fb-markting-validation

FB Marketing API Validation Utility

https://developers.facebook.com/docs/marketing-api/validation/v2.12
https://www.facebook.com/business/m/one-sheeters/video-requirements
https://www.facebook.com/business/ads-guide


## Install

```bash
npm install fb-marketing-validation --save
```

## Usage

### Example
```javascript
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

```


### Output

```javascript
allValidCTAValues: APPLY_NOW,BOOK_TRAVEL,CALL_NOW,CONTACT_US,DOWNLOAD,GET_DIRECTIONS,LEARN_MORE,GET_SHOWTIMES,SEND_MESSAGE,REQUEST_TIME,SAVE,SEE_MENU,SHOP_NOW,SIGN_UP,WATCH_MORE,LISTEN_NOW

isCTAValid: true

allValidObjectivesGivenAdFormat: REACH,BRAND_AWARENESS,LINK_CLICKS,POST_ENGAGEMENT,PAGE_LIKES,EVENT_RESPONSES,APP_INSTALLS,LEAD_GENERATION,MESSAGES,CONVERSIONS,VIDEO_VIEWS

allValidAdFormatsGivenObjective: image,video,slideshow,carousel

isObjectiveAdformatPairValid: true

mediaRequirement: {"image":{"ratio":{"min":0.8,"max":1.777},"ratioTolerance":{"max":0},"width":{"min":600,"max":null},"height":{"min":600,"max":null}},"video":{"ratio":{"min":0.8,"max":1.777},"ratioTolerance":{"max":0},"width":{"min":500,"max":null},"height":{"min":300,"max":null},"size":{"min":1,"max":4000},"length":{"min":5,"max":15}}}

isMediaValid: [{"width":600,"height":600,"type":"image","valid":true,"errors":{"ratio":false,"width":false,"height":false},"errorMessages":[]},{"width":100,"height":100,"length":0,"size":999999,"type":"video","valid":false,"errors":{"ratio":false,"width":true,"height":true,"length":true,"size":true},"errorMessages":["width must be at least 500","height must be at least 300","length must be between 5 and 15","size must be between 1 and 4000"]}]

mediaRequirementForImageFacebookFeedPlacement: {"ratio":{"min":0.5625,"max":1.777},"ratioTolerance":{"max":3},"width":{"min":600,"max":null},"height":{"min":600,"max":null}}

preProcessedPlacements: {"facebook":["feed","right_hand_column","marketplace","instant_article"],"instagram":["stream"],"audience_network":["classic","rewarded_video"],"messenger":["messenger_home"]}

postProcessedPlacements: {"devicePlatforms":[],"placements":{"add":{"facebook":[],"instagram":["story"],"audience_network":[],"messenger":[]},"remove":{"facebook":["feed","right_hand_column","marketplace","instant_article"],"instagram":["stream"],"audience_network":["classic","rewarded_video"],"messenger":["messenger_home"]}},"messages":["story cannot be used with the other placements, including stream and Facebook ones."]}
```

## Contributing Guide

If missing or incorrect mapping is found, please make a request with the detail or submit a pull request with fixes. 

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Change Log

See [CHANGELOG.md](CHANGELOG.md)

## License

See [LICENSE](LICENSE)

