const _MessengerPositions = {
  MessengerHome: 'messenger_home',
  SponsoredMessages: 'sponsored_messages'
};
const _MessengerPositionDefault = [
  _MessengerPositions.MessengerHome
];

const MessengerPositions = {
  messenger_home: _MessengerPositions.MessengerHome,
  sponsored_messages: _MessengerPositions.SponsoredMessages,
  default: _MessengerPositionDefault
};

export default MessengerPositions;
