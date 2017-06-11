// silent-notifications.js
// preload script forcing all notifications to be silent

const NativeNotification = window.Notification;
class SilentNotification extends NativeNotification {
    constructor(title, opts) {
        opts.silent = true;
        super(title, opts);
    }
}

window.Notification = SilentNotification;
