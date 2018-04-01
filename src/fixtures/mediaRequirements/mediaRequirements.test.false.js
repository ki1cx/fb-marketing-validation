module.exports = {
  validate: {
    image: {
      params: {
        assetTypes: ['image'],
        placements: {
          facebook: ['feed', 'messenger_home'],
        },
        media: [{
          width: 1,
          height: 600,
          type: 'image',
        }],
      },
      response: [{"errorMessages": ["aspect ratio must be between 0.5625 and 1.777", "width must be at least 600"], "errors": {"height": false, "ratio": true, "width": true}, "height": 600, "type": "image", "valid": false, "width": 1}],
      mediaRequirements: {"image": {"height": {"max": Infinity, "min": 600}, "ratio": {"max": 1.777, "min": 0.5625}, "ratioTolerance": {"max": 0}, "width": {"max": Infinity, "min": 600}}}
    },
    video: {
      params: {
        assetTypes: ['video'],
        placements: {
          facebook: ['feed', 'story'],
        },
        media: [{
          width: 1,
          height: 600,
          type: 'video',
          length: 0,
          size: 0,
        }],
      },
      response: [{"errorMessages": ["aspect ratio must be between 0.557 and 0.568", "width must be at least 500", "length must be between 1 and 15", "size must be between 1 and 4000"], "errors": {"height": false, "length": true, "ratio": true, "size": true, "width": true}, "height": 600, "length": 0, "size": 0, "type": "video", "valid": false, "width": 1}],
      mediaRequirements: {"video": {"height": {"max": Infinity, "min": 300}, "length": {"max": 15, "min": 1}, "ratio": {"max": 0.568, "min": 0.557}, "ratioTolerance": {"max": 1}, "size": {"max": 4000, "min": 1}, "width": {"max": Infinity, "min": 500}}}
    }
  },
}