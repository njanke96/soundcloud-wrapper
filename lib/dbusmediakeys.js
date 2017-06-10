// stolen from: https://github.com/jostrander/Google-Play-Music-Desktop-Player-UNOFFICIAL-/blob/85b0eb57447b99d5d4d1cf443e5bba1f86b3912d/src/main/features/linux/mediaKeysDBus.js

const {DBus} = require('dbus');

try {
    const dbus = new DBus();
    const session = dbus.getBus('session');

    session.getInterface('org.gnome.SettingsDaemon', '/org/gnome/SettingsDaemon/MediaKeys',
    'org.gnome.SettingsDaemon.MediaKeys', (err, iface) => {
        if (!err) {
            iface.on('MediaPlayerKeyPressed', (n, keyName) => {
                switch (keyName) {
                    case 'Next': console.log('next'); return;
                    case 'Previous': console.log('next'); return;
                    case 'Play': console.log('next'); return;
                    case 'Stop': console.log('next'); return;
                    default: return;
                }
                iface.GrabMediaPlayerKeys(0, 'org.gnome.SettingsDaemon.MediaKeys'); // eslint-disable-line
            });
        }
    });
} catch (e) {
    // do nothing.
}
