export class UserDetail {
    _rulesDisposed = false;

    payload;

    roles;

    permissions;

    constructor(payload) {
        this.payload = payload;
    }

    areRulesDisposed() {
        return !!this._rulesDisposed;
    }

    disposeRules() {
        this._rulesDisposed = true;
    }

    toRoles() {
        this.roles = this.payload?.roles ?? [];
    }

    toPermissions() {
        this.permissions = this.payload?.permissions ?? [];
    }
}
