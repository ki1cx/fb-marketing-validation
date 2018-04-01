const _DevicePlatforms = {
  Mobile: 'mobile',
  Desktop: 'desktop',
  All: 'all',
};
const _DevicePlatformDefault = [
  _DevicePlatforms.Mobile,
  _DevicePlatforms.Desktop,
];

const DevicePlatforms = {
  mobile: _DevicePlatforms.Mobile,
  desktop: _DevicePlatforms.Desktop,
  all: _DevicePlatforms.All,
  default: _DevicePlatformDefault,
};

export default DevicePlatforms;
