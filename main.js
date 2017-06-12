// main.js

const {
    app,
    BrowserWindow,
    globalShortcut
} = require('electron');

const url = require('url');
const path = require('path');

let win;

function spawnWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        title: 'SoundCloud Wrapper',
        icon: path.join(__dirname, 'resources/icon/icon.png'),
        center: true,
        frame: false
    });

    // disable menu bar (for now)
    win.setMenu(null);

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'views/mainwindow/mainwindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    registerMediaKeys();

    // Open the DevTools in devel env
    if (process.env.NODE_ENV !== 'development') {
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        // fix for 'windows-all-closed' never firing, luckily also desired behavior
        app.quit();
    });
}

function registerMediaKeys() {
    let ret = globalShortcut.register('MediaNextTrack', () => {
        win.webContents.executeJavaScript('onMediaNext();');
    });

    if (!ret) {
        console.error('Failed to register MediaNextTrack. Is another application using it?');
    }

    ret = globalShortcut.register('MediaPreviousTrack', () => {
        win.webContents.executeJavaScript('onMediaPrev();');
    });

    if (!ret) {
        console.error('Failed to register MediaPreviousTrack. Is another application using it?');
    }

    ret = globalShortcut.register('MediaPlayPause', () => {
        win.webContents.executeJavaScript('onMediaPlayPause();');
    });

    if (!ret) {
        console.error('Failed to register MediaPlayPause. Is another application using it?');
    }
}

app.on('ready', spawnWindow);

app.on('windows-all-closed', () => {
    // this never fires... even on windows and linux

    // osx support
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // osx support
    if (win === null) {
        createWindow();
    }
});

app.on('will-quit', () => {
    // cleanup
    globalShortcut.unregisterAll();
});
