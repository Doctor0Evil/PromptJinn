// /packages/simulation-lab/src/scenarios/closed-loop-unknown.sim.js
export function simulateClosedLoopUnknown({ unknownFunction, hardwareProfile, durationSec }) {
  const timeline = [];
  const stepMs = 50;
  const totalSteps = Math.floor((durationSec * 1000) / stepMs);

  for (let i = 0; i < totalSteps; i++) {
    timeline.push({
      t: i * stepMs,
      neuralStateDeviation: Math.random() * 0.1,
      actuatorLoad: Math.random() * 0.3,
      anomalyScore: Math.random(),
    });
  }

  return timeline;
}
