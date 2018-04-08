import { validateBillingEvent, BillingEventMapping } from '../billingEventValidation';

it('Billing Event Validation - valid', () => {
  expect.assertions(2);

  const testTrue = require('../fixtures/billingEvent/billingEvent.test.true');

  const response = validateBillingEvent(testTrue.validate.params.optimizationGoal, testTrue.validate.params.billingEvent);
  expect(response).toEqual(testTrue.validate.response);

  const value = BillingEventMapping[testTrue.map.params.optimizationGoal];
  expect(value).toEqual(testTrue.map.response);
});

it('Billing Event Validation - invalid', () => {
  expect.assertions(2);

  const test = require('../fixtures/billingEvent/billingEvent.test.false');

  const response = validateBillingEvent(test.validate.params.optimizationGoal, test.validate.params.billingEvent);
  expect(response).toEqual(test.validate.response);

  const value = BillingEventMapping[test.map.params.optimizationGoal];
  expect(value).not.toEqual(test.map.response);
});