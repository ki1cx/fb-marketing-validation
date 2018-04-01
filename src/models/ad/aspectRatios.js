
const aspectRatios = {
  "1.91:1": 1.91,
  "16:9": 1.777,
  "1:1": 1,
  "4:5": 0.8,
  "2:3": 0.666,
  "9:16": 0.5625,
};

export var AspectRatiosLowToHigh = Object.values(aspectRatios).sort();
export var AspectRatios = aspectRatios;
export default aspectRatios;
