import {
  CreativeMappingByAdFormat,
  CreativeMappingByObjective,
  validateAdFormat
} from '../creativeValidation';

import CampaignObjectives from '../models/ad/campaignObjectives';
import AdFormat from '../models/ad/adFormats';

it('Creative Validation - valid', () => {
  expect.assertions(3);

  const testTrue = require('../fixtures/creative/creative.test.true');

  const response = validateAdFormat(testTrue.validate.params.campaignObjective, testTrue.validate.params.adFormat);
  expect(response).toEqual(testTrue.validate.response);

  const byFormatValue = CreativeMappingByAdFormat[testTrue.map.byFormat.params.adFormat];
  expect(byFormatValue).toEqual(testTrue.map.byFormat.response);

  const byObjectiveValue = CreativeMappingByObjective[testTrue.map.byObjective.params.campaignObjective];
  expect(byObjectiveValue).toEqual(testTrue.map.byObjective.response);
});

it('Creative Validation - invalid', () => {
  expect.assertions(3);

  const testFalse = require('../fixtures/creative/creative.test.false');

  const response = validateAdFormat(testFalse.validate.params.campaignObjective, testFalse.validate.params.adFormat);
  expect(response).toEqual(testFalse.validate.response);

  const byFormatValue = CreativeMappingByAdFormat[testFalse.map.byFormat.params.adFormat];
  expect(byFormatValue).not.toEqual(testFalse.map.byFormat.response);

  const byObjectiveValue = CreativeMappingByObjective[testFalse.map.byObjective.params.campaignObjective];
  expect(byObjectiveValue).not.toEqual(testFalse.map.byObjective.response);
});
