import BillingEventMapping from './mappings/billingEventMapping';

const validate = (optimizationGoal, billingEvent) => {
  return BillingEventMapping[optimizationGoal].indexOf(billingEvent) >= 0;
}

export default BillingEventMapping;
export { BillingEventMapping };
export var validateBillingEvent = validate;


