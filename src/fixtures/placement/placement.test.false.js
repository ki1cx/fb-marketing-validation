module.exports = {
  validate: {
    preprocess: {
      params: {
        placements: {
          "facebook": ["feed", "right_hand_column", "marketplace", "instant_article"],
          "instagram": ["stream", "story"],
          "audience_network": ["classic", "rewarded_video"],
          "messenger": ["messenger_home"]
        },
      },
      response: {
        "facebook": ["feed", "right_hand_column", "marketplace", "instant_article"],
        "instagram": ["stream"],
        "audience_network": ["classic", "rewarded_video"],
        "messenger": ["messenger_home"]
      }
    },
    postprocess: [{
      //selecting story should auto unselect all
      params: {
        selectedDevicePlatform: 'all',
        publisher: 'instagram',
        placement: 'story',
        placements: {
          "facebook": ["feed", "right_hand_column", "marketplace", "instant_article"],
          "instagram": ["stream"],
          "audience_network": ["classic", "rewarded_video"],
          "messenger": ["messenger_home"]
        },
      },
      response: {"devicePlatforms":[],"placements":{"add":{"facebook":[],"instagram":["story"],"audience_network":[],"messenger":[]},"remove":{"facebook":["feed","right_hand_column","marketplace","instant_article"],"instagram":["stream"],"audience_network":["classic","rewarded_video"],"messenger":["messenger_home"]}},"messages":["story cannot be used with the other placements, including stream and Facebook ones."]},
      placementAfterChanges: {
        "facebook": [],
        "instagram": ["story"],
        "audience_network": [],
        "messenger": []
      },
    }, {
      //instant article must be used with feed
      params: {
        selectedDevicePlatform: 'all',
        publisher: 'facebook',
        placement: 'instant_article',
        placements: {
          "facebook": ["right_hand_column", "marketplace"],
          "instagram": ["stream"],
          "audience_network": ["classic", "rewarded_video"],
          "messenger": []
        },
      },
      response: {"devicePlatforms":[],"placements":{"add":{"facebook":["feed"],"instagram":[],"audience_network":[],"messenger":[]},"remove":{"facebook":[],"instagram":[],"audience_network":[],"messenger":[]}},"messages":["feed must be used with instant_article"]},
      placementAfterChanges: {"audience_network": ["classic", "rewarded_video"], "facebook": ["right_hand_column", "marketplace", "instant_article", "feed"], "instagram": ["stream"], "messenger": []},
    }, {
      //messenger home must be used with feed
      params: {
        selectedDevicePlatform: 'all',
        publisher: 'messenger',
        placement: 'messenger_home',
        placements: {
          "facebook": ["right_hand_column", "marketplace"],
          "instagram": ["stream"],
          "audience_network": ["classic", "rewarded_video"],
          "messenger": []
        },
      },
      response: {"devicePlatforms":[],"placements":{"add":{"facebook":["feed"],"instagram":[],"audience_network":[],"messenger":[]},"remove":{"facebook":[],"instagram":[],"audience_network":[],"messenger":[]}},"messages":["If you select messenger_home, you must also select facebook publisher_platform and feed in facebook_positions."]},
      placementAfterChanges: {
        "facebook": ["right_hand_column", "marketplace", "feed"],
        "instagram": ["stream"],
        "audience_network": ["classic", "rewarded_video"],
        "messenger": ["messenger_home"]
      },
    }, {
      //unselect last remaining placement
      params: {
        selectedDevicePlatform: 'all',
        publisher: 'facebook',
        placement: 'feed',
        placements: {
          "facebook": ["feed"],
          "instagram": [],
          "audience_network": [],
          "messenger": []
        },
      },
      response: {"devicePlatforms":[],"placements":{"add":{"facebook":[],"instagram":[],"audience_network":[],"messenger":[]},"remove":{"facebook":[],"instagram":[],"audience_network":[],"messenger":[]}},"messages":[]},
      placementAfterChanges: {
        "facebook": [],
        "instagram": [],
        "audience_network": [],
        "messenger": []
      },
    }, {
      //audience network can't be used by itself
      params: {
        selectedDevicePlatform: 'all',
        publisher: 'audience_network',
        placement: 'classic',
        placements: {
          "facebook": [],
          "instagram": [],
          "audience_network": [],
          "messenger": []
        },
      },
      response: {"devicePlatforms":[],"placements":{"add":{"facebook":[],"instagram":[],"audience_network":[],"messenger":[]},"remove":{"facebook":[],"instagram":[],"audience_network":[],"messenger":[]}},"messages":["audience_network cannot be selected by itself only."]},
      placementAfterChanges: {"audience_network": ["classic"], "facebook": [], "instagram": [], "messenger": []},
    }, {
      params: {
        selectedDevicePlatform: 'all',
        publisher: 'facebook',
        placement: 'feed',
        placements: {
          "facebook": ["feed", "right_hand_column", "marketplace", "instant_article"],
          "instagram": ["stream"],
          "audience_network": ["classic", "rewarded_video"],
          "messenger": ["messenger_home"]
        },
      },
      response: {"devicePlatforms":[],"placements":{"add":{"facebook":["feed"],"instagram":[],"audience_network":[],"messenger":[]},"remove":{"facebook":[],"instagram":[],"audience_network":[],"messenger":[]}},"messages":["feed must be used with instant_article","If you select messenger_home, you must also select facebook publisher_platform and feed in facebook_positions."]},
      placementAfterChanges: {"audience_network": ["classic", "rewarded_video"], "facebook": ["right_hand_column", "marketplace", "instant_article", "feed"], "instagram": ["stream"], "messenger": ["messenger_home"]},
    }]
  }
}