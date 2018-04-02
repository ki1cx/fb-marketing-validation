import { AspectRatios } from '../models/ad/aspectRatios';
import InstagramPositions from '../models/ad/instagramPositions';
import AudienceNetworkPositions from '../models/ad/audienceNetworkPositions';
import MessengerPositions from '../models/ad/messengerPositions';
import FacebookPositions from '../models/ad/facebookPositions';
import AssetTypes from '../models/ad/assetTypes';

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

// https://developers.facebook.com/docs/marketing-api/validation/v2.12
// https://www.facebook.com/business/m/one-sheeters/video-requirements
// https://www.facebook.com/business/ads-guide

// const Mapping = {
//   [AssetTypes.video]: {
//     position: {
//       ratios: {
//         min: number
//         max: number
//       },
//       ratioTolerance: percent
//       width: {
//         min: number pixels
//         max: number pixels,
//       },
//       height: {
//         min: number pixels,
//         max: number pixels,
//       },
//       size: {
//         max: number in MB
//       },
//       length: {
//         min: number in seconds
//         max: number in seconds
//       },
//       messages: [],
//     }
//   },
//   [AssetTypes.image]: {
//     position: {
//       ratios: [],
//       ratioTolerance: percent,
//       width: {
//         min: number pixels,
//         max: number pixels,
//       },
//       height: {
//         min: number pixels,
//         max: number pixels,
//       },
//       size: {
//         max: number in MB
//       },
//       recommended: {
//         width: number,
//         height: number
//       },
//       messages: [],
//     }
//   }
// };


const defaults = {
  width: {
    min: 300,
    max: Infinity,
  },
  height: {
    min: 300,
    max: Infinity,
  },
  size: {
    min: 1,
    max: Infinity,
  }
}

const MediaRequirements = {
  [AssetTypes.video]: {
    [FacebookPositions.feed]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 3,
      },
      size: {
        min: defaults.size.min,
        max: 4000,
      },
      length: {
        min: 1,
        max: 14400
      },
      width: {
        min: defaults.width.min,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
      messages: [
        "Vertical videos (with aspect ratio taller than 2:3) may be masked to 2:3",
      ]
    },
    [FacebookPositions.marketplace]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 3,
      },
      size: {
        min: defaults.size.min,
        max: 4000,
      },
      length: {
        min: 1,
        max: 14400
      },
      width: {
        min: defaults.width.min,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
      messages: [
        "Vertical videos (with aspect ratio taller than 2:3) may be masked to 2:3",
      ]
    },
    [FacebookPositions.instream_video]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 3,
      },
      size: {
        min: defaults.size.min,
        max: 4000,
      },
      length: {
        min: 5,
        max: 15
      },
      width: {
        min: defaults.width.min,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
    },
    [FacebookPositions.instant_article]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 3,
      },
      size: {
        min: defaults.size.min,
        max: 4000,
      },
      length: {
        min: 5,
        max: 15
      },
      width: {
        min: defaults.width.min,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
      messages: [
        "Vertical videos may be masked to a ratio of 1:1",
      ]
    },
    [InstagramPositions.stream]: {
      ratio: {
        min: AspectRatios["4:5"],
        max: AspectRatios["1.91:1"],
      },
      ratioTolerance: {
        max: 1,
      },
      width: {
        min: 500,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
      size: {
        min: defaults.size.min,
        max: 4000,
      },
      length: {
        min: 1,
        max: 60
      },
    },
    [InstagramPositions.story]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["9:16"],
      },
      ratioTolerance: {
        max: 1,
      },
      width: {
        min: 500,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
      size: {
        min: defaults.size.min,
        max: 4000,
      },
      length: {
        min: 1,
        max: 15
      },
    },
    [AudienceNetworkPositions.classic]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 0,
      },
      size: {
        min: defaults.size.min,
        max: 4000,
      },
      length: {
        min: 1,
        max: 120
      },
      width: {
        min: defaults.width.min,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
    },
    [AudienceNetworkPositions.instream_video]: {
      ratio: {
        min: AspectRatios["1:1"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 0,
      },
      size: {
        min: defaults.size.min,
        max: 4000,
      },
      length: {
        min: 10,
        max: 120
      },
      width: {
        min: defaults.width.min,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
    },
    [AudienceNetworkPositions.rewarded_video]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 0,
      },
      size: {
        min: defaults.size.min,
        max: 4000,
      },
      length: {
        min: 5,
        max: 120
      },
      width: {
        min: defaults.width.min,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
    }
  },
  [AssetTypes.image]: {
    [FacebookPositions.feed]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 3,
      },
      width: {
        min: 600,
        max: defaults.width.max,
      },
      height: {
        min: 600,
        max: defaults.height.max,
      },
    },
    [FacebookPositions.right_hand_column]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 3,
      },
      width: {
        min: 600,
        max: defaults.width.max,
      },
      height: {
        min: 600,
        max: defaults.height.max,
      },
    },
    [FacebookPositions.marketplace]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 3,
      },
      width: {
        min: 600,
        max: defaults.width.max,
      },
      height: {
        min: 600,
        max: defaults.height.max,
      },
    },
    [FacebookPositions.instant_article]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 3,
      },
      width: {
        min: 600,
        max: defaults.width.max,
      },
      height: {
        min: 600,
        max: defaults.height.max,
      },
    },
    [InstagramPositions.stream]: {
      ratio: {
        min: AspectRatios["4:5"],
        max: AspectRatios["1.91:1"],
      },
      size: {
        max: 30
      },
      ratioTolerance: {
        max: 1,
      },
      width: {
        min: 500,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
    },
    [InstagramPositions.story]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["9:16"],
      },
      ratioTolerance: {
        max: 1,
      },
      width: {
        min: 500,
        max: defaults.width.max,
      },
      height: {
        min: defaults.height.min,
        max: defaults.height.max,
      },
    },
    [AudienceNetworkPositions.classic]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 0,
      },
      width: {
        min: 254,
        max: defaults.width.max,
      },
      height: {
        min: 133,
        max: defaults.height.max,
      },
    },
    [MessengerPositions.sponsored_messages]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 0,
      },
      width: {
        min: 254,
        max: defaults.width.max,
      },
      height: {
        min: 133,
        max: defaults.height.max,
      },
    },
    [MessengerPositions.messenger_home]: {
      ratio: {
        min: AspectRatios["9:16"],
        max: AspectRatios["16:9"],
      },
      ratioTolerance: {
        max: 0,
      },
      width: {
        min: 254,
        max: defaults.width.max,
      },
      height: {
        min: 133,
        max: defaults.height.max,
      },
    }
  }
};

const _calculateMediaRequirements = (assetTypes, placements) => {
  let mappingsByAssetType = {};

  const getMin = (a, b, name, property) => a[name][property] > b[name][property] ? b[name][property] : a[name][property];
  const getMax = (a, b, name, property) => a[name][property] < b[name][property] ? b[name][property] : a[name][property];
  const reducer = (accumulator, currentValue) => {
    let newValue = {
      ratio: {},
      ratioTolerance: {},
      width: {},
      height: {},
    };

    //ratio compare
    //no overlap
    if (accumulator.ratio.min > currentValue.ratio.max || accumulator.ratio.max < currentValue.ratio.min) {
      newValue.ratio.min = Infinity;
      newValue.ratio.max = -1;
    } else {
      newValue.ratio.min = getMax(accumulator, currentValue, "ratio", "min");
      newValue.ratio.max = getMin(accumulator, currentValue, "ratio", "max");
    }

    //size compare
    if(accumulator.size) {
      newValue.size = {};
      newValue.size.min = getMax(accumulator, currentValue, "size", "min");
      newValue.size.max = getMin(accumulator, currentValue, "size", "max");
    }

    //length compare
    if(accumulator.length) {
      newValue.length = {};
      newValue.length.min = getMax(accumulator, currentValue, "length", "min");
      newValue.length.max = getMin(accumulator, currentValue, "length", "max");
    }

    //ratio tolerance compare
    newValue.ratioTolerance.max = getMin(accumulator, currentValue, "ratioTolerance", "max");

    //width compare
    newValue.width.min = getMax(accumulator, currentValue, "width", "min");
    newValue.width.max = getMin(accumulator, currentValue, "width", "max");

    //height compare
    newValue.height.min = getMax(accumulator, currentValue, "height", "min");
    newValue.height.max = getMin(accumulator, currentValue, "height", "max");

    return newValue;
  }

  assetTypes.map(assetType => {
    const requirementMapping = MediaRequirements[assetType];
    let requirements = [];

    Object.keys(placements).map(publisher => {
      placements[publisher].map(placement => {
        const requirement = requirementMapping[placement];
        requirement && requirements.push(requirement);
      });
    });

    if(requirements.length) {
      const requirement = requirements.reduce(reducer);

      if(requirement.ratioTolerance.max) {
        requirement.ratio.min -= requirement.ratio.min * requirement.ratioTolerance.max / 100;
        requirement.ratio.max += requirement.ratio.max * requirement.ratioTolerance.max / 100;

        requirement.ratio.min = precisionRound(requirement.ratio.min, 3);
        requirement.ratio.max = precisionRound(requirement.ratio.max, 3);
      }

      mappingsByAssetType[assetType] = requirement;
    }
  });

  return mappingsByAssetType;
}

const _getErrorMessage = (requirement, key) => {
  let message = '';

  switch(key) {
    case "ratio":
      message += `aspect ratio must be between ${requirement.min} and ${requirement.max}`;
      break;
    case "width":
      message += `width must be at least ${requirement.min}`;
      break;
    case "height":
      message += `height must be at least ${requirement.min}`;
      break;
    case "length":
      message += `length must be between ${requirement.min} and ${requirement.max}`;
      break;
    case "size":
      message += `size must be between ${requirement.min} and ${requirement.max}`;
      break;
    default:
      break;
  }

  return message;
}

const _validateMedia = (mediaRequirements, media) => {
  const isBetween = (requirement, valueToCheck) => requirement.min <= valueToCheck && valueToCheck <= requirement.max;

  media.map(m => {
    const height = m.height;
    const width = m.width;
    const ratio = width / height;
    const length = m.length;
    const size = m.size;
    const requirements = mediaRequirements[m.type];
    let errors = {};
    let errorMessages = [];

    switch(m.type) {
      case AssetTypes.image:
        errors.ratio = !isBetween(requirements.ratio, ratio);
        errors.width = !isBetween(requirements.width, width);
        errors.height = !isBetween(requirements.height, height);
        m.valid = !(errors.ratio || errors.width || errors.height);
        m.errors = errors;

        if(!m.valid) {
          Object.keys(errors).map(key => {
            if(errors[key]) {
              errorMessages.push(_getErrorMessage(requirements[key], key));
            }
          });
        }

        m.errorMessages = errorMessages;
        break;
      case AssetTypes.video:
        errors.ratio = !isBetween(requirements.ratio, ratio);
        errors.width = !isBetween(requirements.width, width);
        errors.height = !isBetween(requirements.height, height);
        errors.length = !isBetween(requirements.length, length);
        errors.size = !isBetween(requirements.size, size);
        m.valid = !(errors.ratio || errors.width || errors.height || errors.length || errors.size);
        m.errors = errors;

        if(!m.valid) {
          Object.keys(errors).map(key => {
            if(errors[key]) {
              errorMessages.push(_getErrorMessage(requirements[key], key));
            }
          });
        }

        m.errorMessages = errorMessages;
        break;
    }
  });

  return media;
}

export var calculateMediaRequirements = _calculateMediaRequirements;
export var validateMedia = _validateMedia;
export { MediaRequirements };
export default MediaRequirements;

