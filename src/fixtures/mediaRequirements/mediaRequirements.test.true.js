module.exports = {
  validate: {
    image: {
      params: {
        assetTypes: ['image'],
        placements: {
          facebook: ['feed'],
        },
        media: [{
          width: 600,
          height: 600,
          type: 'image',
        }],
      },
      response: [{"errorMessages": [], "errors": {"height": false, "ratio": false, "width": false}, "height": 600, "type": "image", "valid": true, "width": 600}],
      mediaRequirements: {"image": {"height": {"max": Infinity, "min": 600}, "ratio": {"max": 1.83, "min": 0.546}, "ratioTolerance": {"max": 3}, "width": {"max": Infinity, "min": 600}}}
    },
    video: {
      params: {
        assetTypes: ['video'],
        placements: {
          facebook: ['feed', 'stream'],
        },
        media: [{
          width: 600,
          height: 600,
          type: 'video',
          length: 5,
          size: 100,
        }],
      },
      response: [{"errorMessages": [], "errors": {"height": false, "length": false, "ratio": false, "size": false, "width": false}, "height": 600, "length": 5, "size": 100, "type": "video", "valid": true, "width": 600}],
      mediaRequirements: {"video": {"height": {"max": Infinity, "min": 300}, "length": {"max": 60, "min": 1}, "ratio": {"max": 1.795, "min": 0.792}, "ratioTolerance": {"max": 1}, "size": {"max": 4000, "min": 1}, "width": {"max": Infinity, "min": 500}}}
    }
  },
}