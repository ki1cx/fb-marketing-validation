import { validateCallToAction, CallToActionMapping } from '../callToActionValidation';

import CampaignObjectives from '../models/ad/campaignObjectives';
import AdFormat from '../models/ad/adFormats';
import CallToActions from "../models/ad/callToActions";


it('Call-To-Action Validation - valid', () => {
  expect.assertions(2);

  const testTrue = require('../fixtures/callToAction/callToAction.test.true');

  const response = validateCallToAction(testTrue.validate.params.campaignObjective, testTrue.validate.params.adFormat, testTrue.validate.params.callToAction);
  expect(response).toEqual(testTrue.validate.response);

  const value = CallToActionMapping[testTrue.map.params.adFormat][testTrue.map.params.campaignObjective];
  expect(value).toEqual(testTrue.map.response);
});

it('Call-To-Action Validation - invalid', () => {
  expect.assertions(2);

  const testFalse = require('../fixtures/callToAction/callToAction.test.false');

  const response = validateCallToAction(testFalse.validate.params.campaignObjective, testFalse.validate.params.adFormat, testFalse.validate.params.callToAction);
  expect(response).toEqual(testFalse.validate.response);

  const value = CallToActionMapping[testFalse.map.params.adFormat][testFalse.map.params.campaignObjective];
  expect(value).not.toEqual(testFalse.map.response);
});
