import {
  calculateMediaRequirements,
  validateMedia,
  MediaRequirements,
} from '../mediaValidation';

import CampaignObjectives from '../models/ad/campaignObjectives';
import AdFormat from '../models/ad/adFormats';
import CallToActions from "../models/ad/callToActions";

it('Media Requirements Validation - image - valid', () => {
  expect.assertions(2);

  const test = require('../fixtures/mediaRequirements/mediaRequirements.test.true');
  const mediaRequirements = calculateMediaRequirements(test.validate.image.params.assetTypes, test.validate.image.params.placements);
  expect(mediaRequirements).toEqual(test.validate.image.mediaRequirements);

  const response = validateMedia(mediaRequirements, test.validate.image.params.media);
  expect(response).toEqual(test.validate.image.response);
});

it('Media Requirements Validation - video - valid', () => {
  expect.assertions(2);

  const test = require('../fixtures/mediaRequirements/mediaRequirements.test.true');
  const mediaRequirements = calculateMediaRequirements(test.validate.video.params.assetTypes, test.validate.video.params.placements);
  expect(mediaRequirements).toEqual(test.validate.video.mediaRequirements);

  const response = validateMedia(mediaRequirements, test.validate.video.params.media);
  expect(response).toEqual(test.validate.video.response);
});

it('Media Requirements Validation - image - invalid', () => {
  expect.assertions(2);

  const test = require('../fixtures/mediaRequirements/mediaRequirements.test.false');
  const mediaRequirements = calculateMediaRequirements(test.validate.image.params.assetTypes, test.validate.image.params.placements);
  expect(mediaRequirements).toEqual(test.validate.image.mediaRequirements);

  const response = validateMedia(mediaRequirements, test.validate.image.params.media);
  expect(response).toEqual(test.validate.image.response);
});

it('Media Requirements Validation - video - invalid', () => {
  expect.assertions(2);

  const test = require('../fixtures/mediaRequirements/mediaRequirements.test.false');
  const mediaRequirements = calculateMediaRequirements(test.validate.video.params.assetTypes, test.validate.video.params.placements);
  expect(mediaRequirements).toEqual(test.validate.video.mediaRequirements);

  const response = validateMedia(mediaRequirements, test.validate.video.params.media);
  expect(response).toEqual(test.validate.video.response);
});