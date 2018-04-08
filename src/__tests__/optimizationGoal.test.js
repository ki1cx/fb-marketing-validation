import { validateOptimizationGoal, OptimizationGoalMapping } from '../optimizationGoalValidation';

it('Optimization Goal Validation - valid', () => {
  expect.assertions(2);

  const testTrue = require('../fixtures/optimizationGoal/optimizationGoal.test.true');

  const response = validateOptimizationGoal(testTrue.validate.params.campaignObjective, testTrue.validate.params.optimizationGoal);
  expect(response).toEqual(testTrue.validate.response);

  const value = OptimizationGoalMapping[testTrue.map.params.campaignObjective];
  expect(value).toEqual(testTrue.map.response);
});

it('Optimization Goal Validation - invalid', () => {
  expect.assertions(2);

  const test = require('../fixtures/optimizationGoal/optimizationGoal.test.false');

  const response = validateOptimizationGoal(test.validate.params.campaignObjective, test.validate.params.optimizationGoal);
  expect(response).toEqual(test.validate.response);

  const value = OptimizationGoalMapping[test.map.params.campaignObjective];
  expect(value).not.toEqual(test.map.response);
});
