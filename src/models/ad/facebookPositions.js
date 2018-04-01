const _FacebookPositions = {
  Feed: 'feed',
  RightHandColumn: 'right_hand_column',
  InstantArticle: 'instant_article',
  InstreamVideo: 'instream_video',
  SuggestedVideo: 'suggested_video',
  Marketplace: 'marketplace'
};
const _FacebookPositionDefault = [
  _FacebookPositions.Feed,
  _FacebookPositions.RightHandColumn,
  _FacebookPositions.InstantArticle,
  _FacebookPositions.InstreamVideo,
  _FacebookPositions.SuggestedVideo,
  _FacebookPositions.Marketplace,
];

const FacebookPositions = {
  feed: _FacebookPositions.Feed,
  right_hand_column: _FacebookPositions.RightHandColumn,
  instant_article: _FacebookPositions.InstantArticle,
  instream_video: _FacebookPositions.InstreamVideo,
  suggested_video: _FacebookPositions.SuggestedVideo,
  marketplace: _FacebookPositions.Marketplace,
  default: _FacebookPositionDefault,
};

export default FacebookPositions;
