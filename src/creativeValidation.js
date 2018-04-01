import {
  CreativeMappingByAdFormat,
  CreativeMappingByObjective
} from './mappings/creativeMapping';

const validate = (campaignObjective, adFormat) => {
  return CreativeMappingByAdFormat[adFormat].indexOf(campaignObjective) >= 0;
}

export { CreativeMappingByAdFormat, CreativeMappingByObjective };
export var validateAdFormat = validate;
export default CreativeMappingByObjective;


