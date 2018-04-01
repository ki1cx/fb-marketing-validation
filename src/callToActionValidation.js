import CallToActionMapping from './mappings/callToActionMapping';

const validate = (campaignObjective, adFormat, callToAction) => {
  return CallToActionMapping[adFormat][campaignObjective].indexOf(callToAction) >= 0;
}

export default CallToActionMapping;
export { CallToActionMapping };
export var validateCallToAction = validate;


