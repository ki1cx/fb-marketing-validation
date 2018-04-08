import OptimizationGoalMapping from './mappings/optimizationGoalMapping';

const validate = (campaignObjective, optimizationGoal) => {
  return OptimizationGoalMapping[campaignObjective].indexOf(optimizationGoal) >= 0;
}

export default OptimizationGoalMapping;
export { OptimizationGoalMapping };
export var validateOptimizationGoal = validate;


