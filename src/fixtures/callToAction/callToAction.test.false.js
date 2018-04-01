module.exports = {
  validate: {
    params: {
      campaignObjective: 'REACH',
      adFormat: 'video',
      callToAction: 'GET_OFFER',
    },
    response: false,
  },
  map: {
    params: {
      campaignObjective: 'REACH',
      adFormat: 'video',
    },
    response: ["APPLY_NOW", "BOOK_TRAVEL", "CALL_NOW", "CONTACT_US", "DOWNLOAD", "GET_DIRECTIONS", "LEARN_MORE", "GET_SHOWTIMES", "SEND_MESSAGE", "REQUEST_TIME", "SAVE", "SEE_MENU", "SHOP_NOW", "SIGN_UP", "WATCH_MORE", "LISTEN_NOW", "GET_OFFER"]
  }
}