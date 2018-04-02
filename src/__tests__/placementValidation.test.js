import {
  PlacementValidations,
  PlacementMapping,
} from '../placementValidation';

it('Placement Validation - preprocess - valid', () => {
  expect.assertions(1);

  const test = require('../fixtures/placement/placement.test.true');
  const response = PlacementValidations.preProcess(test.validate.preprocess.params.placements);
  expect(response).toEqual(test.validate.preprocess.response);
});

it('Placement Validation - postprocess - valid', () => {
  expect.assertions(1);

  const test = require('../fixtures/placement/placement.test.true');
  const postprocessTests = test.validate.postprocess;

  postprocessTests.map(postprocess => {
    const response = PlacementValidations.postProcess(postprocess.params.placements, postprocess.params.selectedDevicePlatform, postprocess.params.publisher, postprocess.params.placement);
    expect(response).toEqual(postprocess.response);
  });
});

it('Placement Validation - postprocess - invalid', () => {
  expect.assertions(12);

  const test = require('../fixtures/placement/placement.test.false');
  const postprocessTests = test.validate.postprocess;

  postprocessTests.map(postprocess => {
    const response = PlacementValidations.postProcess(postprocess.params.placements, postprocess.params.selectedDevicePlatform, postprocess.params.publisher, postprocess.params.placement);
    expect(response).toEqual(postprocess.response);

    PlacementValidations.addPositions(postprocess.params.placements, response.placements.add);
    PlacementValidations.removePositions(postprocess.params.placements, response.placements.remove);

    expect(postprocess.params.placements).toEqual(postprocess.placementAfterChanges);
  });
});