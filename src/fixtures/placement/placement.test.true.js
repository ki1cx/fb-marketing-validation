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
      //normal valid operation
      params: {
        selectedDevicePlatform: 'all',
        publisher: 'facebook',
        placement: 'instant_article',
        placements: {
          "facebook": ["feed", "right_hand_column", "marketplace", "instant_article"],
          "instagram": ["stream"],
          "audience_network": ["classic", "rewarded_video"],
          "messenger": ["messenger_home"]
        },
      },
      response: {"devicePlatforms":[],"placements":{"add":{"facebook":[],"instagram":[],"audience_network":[],"messenger":[]},"remove":{"facebook":[],"instagram":[],"audience_network":[],"messenger":[]}},"messages":[]}
    }]
  },
}