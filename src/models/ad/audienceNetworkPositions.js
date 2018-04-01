const _AudienceNetworkPositions = {
  Classic: 'classic',
  InstreamVideo: 'instream_video',
  RewardedVideo: 'rewarded_video',
}
const _AudienceNetworkPositionDefault = [
  _AudienceNetworkPositions.Classic,
  _AudienceNetworkPositions.InstreamVideo,
  _AudienceNetworkPositions.RewardedVideo,
];

const AudienceNetworkPositions = {
  classic: _AudienceNetworkPositions.Classic,
  instream_video: _AudienceNetworkPositions.InstreamVideo,
  rewarded_video: _AudienceNetworkPositions.RewardedVideo,
  default: _AudienceNetworkPositionDefault
};

export default AudienceNetworkPositions;
