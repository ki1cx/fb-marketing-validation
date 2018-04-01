const _PublisherPlatforms = {
  Facebook: 'facebook',
  Instagram: 'instagram',
  Messenger: 'messenger',
  AudienceNetwork: 'audience_network',
};
const _PublisherPlatformDefault = [
  _PublisherPlatforms.Facebook,
  _PublisherPlatforms.AudienceNetwork,
  _PublisherPlatforms.Messenger
];

const PublisherPlatforms = {
  facebook: _PublisherPlatforms.Facebook,
  instagram: _PublisherPlatforms.Instagram,
  messenger: _PublisherPlatforms.Messenger,
  audience_network: _PublisherPlatforms.AudienceNetwork,
  default: _PublisherPlatformDefault
};

export default PublisherPlatforms;
