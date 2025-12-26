// /packages/hardware-abstraction/src/adapters/generic-bci.adapter.js
export class GenericBciAdapter {
  constructor({ id, profile, transport }) {
    this.id = id;
    this.profile = profile;
    this.transport = transport;
  }

  async readRawSignal(channelId, options = {}) {
    return this.transport.read(channelId, {
      windowMs: options.windowMs || 250,
      sampleRate: options.sampleRate || 1000
    });
  }

  async writeStimulation(channelId, pattern) {
    if (!this.profile.closedLoopCapable) {
      throw new Error("Closed-loop stimulation not supported for this device.");
    }
    return this.transport.write(channelId, pattern);
  }
}
