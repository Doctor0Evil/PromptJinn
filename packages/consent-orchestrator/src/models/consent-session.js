// /packages/consent-orchestrator/src/models/consent-session.js
export class ConsentSession {
  constructor({ userId, context, scopes }) {
    this.userId = userId;
    this.context = context;
    this.scopes = scopes;
    this.history = [];
    this.revoked = false;
  }

  recordDecision({ scopeId, decision }) {
    this.history.push({
      scopeId,
      decision,
      at: new Date().toISOString(),
    });
  }

  revokeAll() {
    this.revoked = true;
  }
}
