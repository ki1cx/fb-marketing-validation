import CampaignObjectives from '../models/ad/campaignObjectives';
import AdFormats from '../models/ad//adFormats';
import CallToActions from '../models/ad/callToActions';
import DevicePlatforms from '../models/ad/devicePlatforms';
import PublisherPlatforms from '../models/ad/publisherPlatforms';
import FacebookPositions from '../models/ad/facebookPositions';
import MessengerPositions from '../models/ad/messengerPositions';
import InstagramPositions from '../models/ad/instagramPositions';
import AudienceNetworkPositions from '../models/ad/audienceNetworkPositions';

// https://developers.facebook.com/docs/marketing-api/validation/v2.12
// https://www.facebook.com/business/ads-guide

const excludeItem = function (positions, items) {
  return positions.filter(position => items.indexOf(position) < 0);
}

const validation = {
  getNumberOfPositionsForPublishers: function(placements, publishers) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const numberOfOtherPositions = publishers.map(publisher => {
      return placements[publisher].length;
    }).reduce(reducer);

    return numberOfOtherPositions;
  },
  addPositions: function(placement, addPlacement) {
    Object.keys(addPlacement).map(publisher => {
      placement[publisher] = [... new Set(placement[publisher].concat(addPlacement[publisher]))];
    })

    return placement;
  },
  removePositions: function(placement, removePlacement) {
    Object.keys(removePlacement).map(publisher => {
      removePlacement[publisher].map(position => {
        const index = placement[publisher].indexOf(position);
        if(index >= 0) {
          placement[publisher].splice(index, 1);
        }
      })
    })

    return placement;
  },
  //placements is a mutable parameter
  preProcess: function (placements) {
    const publishers = Object.keys(placements);

    for (const publisher of publishers) {
      switch(publisher) {
        case PublisherPlatforms.instagram:
          //story cannot be used with the other placements, including stream and Facebook ones.
          //so remove from default selection
          const indexOfStory = placements[publisher].indexOf(InstagramPositions.story)
          indexOfStory >= 0 && placements[publisher].splice(indexOfStory, 1);
          break;
      }
    }
    return placements;
  },
  //placements is a mutable parameter
  postProcess: function (placements, devicePlatform, selectedPublisher, selectedPosition) {
    !placements[selectedPublisher] && (placements[selectedPublisher] = []);

    let publisherPositions = placements[selectedPublisher];
    const indexOfSelectedPosition = publisherPositions.indexOf(selectedPosition);
    const publishers = Object.keys(placements);
    let returnObject = {
      devicePlatforms: [],
      placements: {
        add: {},
        remove: {},
      },
      messages: [],
    };

    if(indexOfSelectedPosition >= 0) {
      //since creating a new array, need to reassociate with original
      placements[selectedPublisher] = [].concat(
        publisherPositions.slice(0, indexOfSelectedPosition),
        publisherPositions.slice(indexOfSelectedPosition + 1)
      );
    } else {
      publisherPositions.push(selectedPosition);
    }

    //init array first across all publishers, since some publishers require other publishers
    for (const publisher of publishers) {
      returnObject.placements.add[publisher] = [];
      returnObject.placements.remove[publisher] = [];
    }

    for (const publisher of publishers) {
      const positions = placements[publisher];

      switch (publisher) {
        case PublisherPlatforms.instagram:
          //story cannot be used with the other placements, including stream and Facebook ones.
          if (positions.indexOf(InstagramPositions.story) >= 0) {
            if(selectedPublisher === publisher &&
              selectedPosition === InstagramPositions.story
            ) {
              returnObject.placements.add[publisher].push(InstagramPositions.story);

              //clone
              let placementCopy = placements[publisher].slice(0);
              placementCopy.splice(placements[publisher].indexOf(InstagramPositions.story), 1);
              returnObject.placements.remove[publisher] = placementCopy;

              Object.keys(placements).map(_publisher => {
                if (_publisher !== publisher) {
                  returnObject.placements.remove[_publisher] = placements[_publisher].slice(0);
                }
              });

              returnObject.messages.push('story cannot be used with the other placements, including stream and Facebook ones.');
            } else {
              returnObject.placements.remove[publisher].push(InstagramPositions.story);
            }
          }
          break;
        case PublisherPlatforms.facebook:
          //If you select instant_article, you must use feed and for device_platforms, you must use mobile since Instant Articles is mobile only.
          if (positions.indexOf(FacebookPositions.instant_article) >= 0) {
            if(positions.indexOf(FacebookPositions.feed) < 0) {
              returnObject.placements.add[publisher] = [FacebookPositions.feed];
              returnObject.messages.push('feed must be used with instant_article');
            }

            if(devicePlatform !== DevicePlatforms.mobile && devicePlatform !== DevicePlatforms.all) {
              returnObject.devicePlatforms = [DevicePlatforms.mobile];
              returnObject.messages.push('If you select instant_article, you must use feed and for device_platforms, you must use mobile since Instant Articles is mobile only.');
            }
          }

          //instream_video must be used with feed
          if ((positions.indexOf(FacebookPositions.instream_video) >= 0 || positions.indexOf(FacebookPositions.suggested_video) >= 0) &&
            positions.indexOf(FacebookPositions.feed) < 0
          ) {
            returnObject.placements.add[publisher] = [FacebookPositions.feed];
            returnObject.messages.push('instream_video must be used with feed');
          }
          break;
        case PublisherPlatforms.messenger:
          //If you select messenger_home, you must also select facebook publisher_platform and feed in facebook_positions.
          if (positions.indexOf(MessengerPositions.messenger_home) >= 0 && placements[PublisherPlatforms.facebook].indexOf(FacebookPositions.feed) < 0) {
            returnObject.placements.add[PublisherPlatforms.facebook] = [FacebookPositions.feed];
            returnObject.messages.push('If you select messenger_home, you must also select facebook publisher_platform and feed in facebook_positions.');
          }
          break;
        case PublisherPlatforms.audience_network:
          if(placements[publisher].length) {
            let copyOfPublishers = publishers.slice(0);
            copyOfPublishers.splice(copyOfPublishers.indexOf(publisher), 1);

            const numberOfOtherPositions = this.getNumberOfPositionsForPublishers(placements, copyOfPublishers);

            if (!numberOfOtherPositions) {
              returnObject.messages.push('audience_network cannot be selected by itself only.');
            }
          }
          break;
      }
    }

    return returnObject;
  },
}

// const Mapping = {
//   CampaignObjective: {
//     DevicePlatform: {
//       PublisherPlatform: [positions]
//     }
//   }
// }

// ===========================
// consolidated mappings
// ===========================

// Applied exceptions
// - suggested_video only available for Video View, Brand Awareness, Post Engagement and Mobile App Install objectives.
// - instream_video only available for Video View, Brand Awareness, and Post Engagement objectives
// - With LEAD_GENERATION, device_platforms: desktop cannot be selected together with publisher_platforms: instagram.


const AllFacebookPositions = [
  FacebookPositions.feed,
  FacebookPositions.right_hand_column,
  FacebookPositions.instant_article,
  FacebookPositions.instream_video,
  FacebookPositions.suggested_video,
  FacebookPositions.marketplace,
];

const AllInstagramPositions = [
  InstagramPositions.stream,
  InstagramPositions.story,
];

const AllAudiendNetworkPositions = [
  AudienceNetworkPositions.classic,
  AudienceNetworkPositions.instream_video,
  AudienceNetworkPositions.rewarded_video,
];

const AllMessengerPositions = [
  MessengerPositions.messenger_home,
  MessengerPositions.sponsored_messages,
];

const mapping = {
  [CampaignObjectives.brand_awareness]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.right_hand_column, FacebookPositions.marketplace, FacebookPositions.instant_article,]),
      [PublisherPlatforms.instagram]: [ InstagramPositions.stream ],
      [PublisherPlatforms.audience_network]: excludeItem(AllAudiendNetworkPositions, [AudienceNetworkPositions.rewarded_video]),
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.right_hand_column, FacebookPositions.marketplace]),
      [PublisherPlatforms.instagram]: [ InstagramPositions.stream ],
      [PublisherPlatforms.audience_network]: excludeItem(AllAudiendNetworkPositions, [AudienceNetworkPositions.rewarded_video]),
    },
  },
  [CampaignObjectives.app_installs + '_canvas_app']: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article, FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: excludeItem(AllAudiendNetworkPositions, [AudienceNetworkPositions.instream_video]),
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    }
  },
  [CampaignObjectives.app_installs + '_mobile_app']: {
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: [ FacebookPositions.feed, FacebookPositions.instant_article, FacebookPositions.instream_video ],
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: excludeItem(AllAudiendNetworkPositions, [AudienceNetworkPositions.instream_video]),
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    },
  },
  [CampaignObjectives.conversions]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article, FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    },
  },
  [CampaignObjectives.conversions + '_mobile_app']: {
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
    },
  },
  [CampaignObjectives.event_responses]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article, FacebookPositions.instream_video, FacebookPositions.suggested_video]),
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instream_video, FacebookPositions.suggested_video]),
    },
  },
  [CampaignObjectives.lead_generation]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: [ FacebookPositions.feed ],
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: [ FacebookPositions.feed ],
      [PublisherPlatforms.instagram]: [ InstagramPositions.stream ],
    },
  },
  [CampaignObjectives.link_clicks]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article, FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: excludeItem(AllAudiendNetworkPositions, [AudienceNetworkPositions.instream_video]),
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: excludeItem(AllAudiendNetworkPositions, [AudienceNetworkPositions.instream_video]),
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    },
  },
  [CampaignObjectives.link_clicks + '_canvas_app']: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article, FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    },
  },
  [CampaignObjectives.link_clicks + '_mobile_app']: {
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    },
  },
  [CampaignObjectives.page_likes]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article, FacebookPositions.instream_video, FacebookPositions.suggested_video]),
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instream_video, FacebookPositions.suggested_video]),
    },
  },
  [CampaignObjectives.post_engagement]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article]),
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: AllFacebookPositions,
      [PublisherPlatforms.instagram]: AllInstagramPositions,
    },
  },
  [CampaignObjectives.video_views]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: AllFacebookPositions,
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
    },
  },
  [CampaignObjectives.reach]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article, FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    },
  },
  [CampaignObjectives.product_catalog_sales]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article, FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instream_video, FacebookPositions.suggested_video]),
      [PublisherPlatforms.instagram]: AllInstagramPositions,
      [PublisherPlatforms.audience_network]: AllAudiendNetworkPositions,
    },
  },
  [CampaignObjectives.store_visits]: {
    [DevicePlatforms.desktop]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instant_article, FacebookPositions.instream_video, FacebookPositions.suggested_video]),
    },
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.facebook]: excludeItem(AllFacebookPositions, [FacebookPositions.instream_video, FacebookPositions.suggested_video]),
    },
  },
  [CampaignObjectives.messages]: {
    [DevicePlatforms.mobile]: {
      [PublisherPlatforms.messenger]: [ MessengerPositions.messenger_home ],
    },
  },
};


export var PlacementValidations = validation;
export var PlacementMapping = mapping;
export default mapping;
