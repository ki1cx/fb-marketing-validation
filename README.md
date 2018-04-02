# FB Markting Validation

Validates Call-To-Action, Creative, Media, Placement.

- https://developers.facebook.com/docs/marketing-api/validation/v2.12
- https://www.facebook.com/business/m/one-sheeters/video-requirements
- https://www.facebook.com/business/ads-guide

## Validations

### Creative

- CreativeMappingByAdFormat - valid campaign objectives by ad format

	```
	{
	  [AdFormat]: [supported objectives]
	}
	```

- CreativeMappingByObjective - valid ad formats by campaign objectives

	```
	{
	  [CampaignObjective]: [supported ad formats]
	}
	```

- validateAdFormat - function (campaignObjective, adFormat)

### Call-To-Action

- CallToActionMapping - valid call-to-actions by ad format, campaign objective

	```
	{
	  [AdFormat]: {
	    [CampaignObjective]: [CallToActions]
	  }
	}
	```

- validateAdFormat - function (campaignObjective, adFormat, callToAction)

### Media

- MediaRequirements - valid metadata by asset type, position

	```
	{
	  [AssetTypes.video]: {
	    [position]: {
	      ratios: {
	        min: number
	        max: number
	      },
	      ratioTolerance: percent
	      width: {
	        min: number pixels
	        max: number pixels,
	      },
	      height: {
	        min: number pixels,
	        max: number pixels,
	      },
	      size: {
	        max: number in MB
	      },
	      length: {
	        min: number in seconds
	        max: number in seconds
	      },
	      errors: [],
	      errorMessages: [],
	    }
	  },
	  [AssetTypes.image]: {
	    [position]: {
	      ratios: [],
	      ratioTolerance: percent,
	      width: {
	        min: number pixels,
	        max: number pixels,
	      },
	      height: {
	        min: number pixels,
	        max: number pixels,
	      },
	      size: {
	        max: number in MB
	      },
	      recommended: {
	        width: number,
	        height: number
	      },
	      errors: [],
	      errorMessages: [],
	    }
	  }
	}
	```

- calculateMediaRequirements - function (assetTypes, placements)
	
	- placements
	
		```
		{
		  [CampaignObjective]: {
		    [DevicePlatform]: {
		      [PublisherPlatform]: [positions]
		    }
		  }
		}
		```

- validateMedia - function (mediaRequirements, media)

	- returns media with errors and errorMessages

### Placement

- PlacementValidations.preProcess - function (**placements**)

	- returns **placements** after removing the least number of placements to make a valid set
	- **placements** is a mutable parameter

- PlacementValidations.postProcess - function (**placements**, devicePlatform, selectedPublisher, selectedPosition)

	- modifies placements given selectedPublisher, selectedPosition
	
		- if (selectedPublisher, selectedPosition) already exist, it is removed
		- if (selectedPublisher, selectedPosition) does not exist, it is added

	- with the modifications made above, runs validation and returns changes needed to make a valid set of placements
	
		```
		{
	      devicePlatforms: [],
	      placements: {
	        add: {},
	        remove: {},
	      },
	      messages: [],
	    }
		```
	- **placements** is a mutable parameter
		
- PlacementValidations.addPositions - function (**placements**, addPlacements)

	- Applies the changes returned by postProcess
	- **placements** is a mutable parameter
	
- PlacementValidations.removePositions - function (**placements**, removePlacements)

	- Applies the changes returned by postProcess
	- **placements** is a mutable parameter

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
} from 'fb-marketing-validation/lib/callToActionValidation';
import {
  CreativeMappingByAdFormat,
  CreativeMappingByObjective,
  validateAdFormat
} from "fb-marketing-validation/lib/creativeValidation";
import {
  calculateMediaRequirements,
  validateMedia,
  MediaRequirements,
} from 'fb-marketing-validation/lib/mediaValidation';
import {
  PlacementValidations,
  PlacementMapping,
} from 'fb-marketing-validation/lib/placementValidation';

import CampaignObjectives from 'fb-marketing-validation/lib/models/ad/campaignObjectives';
import AdFormats from 'fb-marketing-validation/lib/models/ad/adFormats';
import CallToActions from 'fb-marketing-validation/lib/models/ad/callToActions';
import AssetTypes from "fb-marketing-validation/lib/models/ad/assetTypes";
import FacebookPositions from "fb-marketing-validation/lib/models/ad/facebookPositions";
import InstagramPositions from "fb-marketing-validation/lib/models/ad/instagramPositions";
import DevicePlatforms from "fb-marketing-validation/lib/models/ad/devicePlatforms";
import PublisherPlatforms from "fb-marketing-validation/lib/models/ad/publisherPlatforms";


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

  //preprocess placements - cleanup a set of placements by automatically removing the least number of placements to make a valid set
  const preProcessedPlacements = PlacementValidations.preProcess(placementsToPreProcess);
  console.log(`preProcessedPlacements: ${JSON.stringify(preProcessedPlacements)}\n`);

  //postprocess placements - given a set of placements, process how a newly selected device platform, publisher, and position validates
  const changesNeededToMakeValidSetOfPlacements = PlacementValidations.postProcess(previousPlacement, selectedDevicePlatform, selectedPublisher, selectedPosition);
  console.log(`changesNeededToMakeValidSetOfPlacements: ${JSON.stringify(changesNeededToMakeValidSetOfPlacements)}\n`);

  PlacementValidations.addPositions(previousPlacement, changesNeededToMakeValidSetOfPlacements.placements.add);
  PlacementValidations.removePositions(previousPlacement, changesNeededToMakeValidSetOfPlacements.placements.remove);

  console.log(`valid placements after applying validation changes: ${JSON.stringify(previousPlacement)}\n`);

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

changesNeededToMakeValidSetOfPlacements: {"devicePlatforms":[],"placements":{"add":{"facebook":[],"instagram":["story"],"audience_network":[],"messenger":[]},"remove":{"facebook":["feed","right_hand_column","marketplace","instant_article"],"instagram":["stream"],"audience_network":["classic","rewarded_video"],"messenger":["messenger_home"]}},"messages":["story cannot be used with the other placements, including stream and Facebook ones."]}

valid placements after applying validation changes: {"facebook":[],"instagram":["story"],"audience_network":[],"messenger":[]}
```

## Contributing Guide

If missing or incorrect mapping is found, please make a request with the detail or submit a pull request with fixes. 

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Change Log

See [CHANGELOG.md](CHANGELOG.md)

## License

See [LICENSE](LICENSE)

