// /packages/simulation-lab/src/scenarios/closed-loop-unknown.sim.js
export function simulateClosedLoopUnknown({
  unknownFunction,
  hardwareProfile,
  durationSec
}) {
  const timeline = [];
  const stepMs = 50;
  const totalSteps = Math.floor((durationSec * 1000) / stepMs);

  for (let i = 0; i < totalSteps; i++) {
    const t = i * stepMs;
    const anomalyScore = Math.random();

    timeline.push({
      t,
      hardwareId: hardwareProfile.id,
      functionId: unknownFunction.id,
      neuralStateDeviation: Math.random() * 0.1,
      actuatorLoad: Math.random() * 0.3,
      anomalyScore
    });
  }

  return timeline;
}
