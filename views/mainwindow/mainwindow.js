// mainwindow.js
const $ = require('jquery');
const {remote} = require('electron');
const path = require('path');
const url = require('url');

const injections = require('../../lib/injections');

let webview;
let getUrlEnabled = true;
let currentUrl = "";

onload = () => {
    webview = document.querySelector('#scWebView');

    webview.addEventListener('page-title-updated', (e) => {
        document.title = e.title + ' - SoundCloud Wrapper';
        $('.window-title').text(e.title + ' - SoundCloud Wrapper');
    });

    // update current url
    webview.addEventListener('did-navigate', (e) => {
        currentUrl = e.url;
    });

    webview.addEventListener('did-navigate-in-page', (e) => {
        currentUrl = e.url;
    });

    // nav buttons
    $('#btnBack').click( () => {
        webview.goBack();
    });

    $('#btnForward').click( () => {
        webview.goForward();
    });

    $('#btnRefresh').click( () => {
        webview.reload();
    });

    $('#btnGetUrl').click( () => {
        if (!getUrlEnabled) return;

        $('#urlCopied').fadeIn();
        getUrlEnabled = false;

        setTimeout( () => {
            getUrlEnabled = true;
            $('#urlCopied').fadeOut();
        }, 4000);

        require('electron').clipboard.writeText(currentUrl);
    });

    // window control buttons
    $('#btnMinimize').click( () => {
        let window = remote.getCurrentWindow();
        window.minimize();
    });

    $('#btnMaximize').click( () => {
        let window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    });

    $('#btnClose').click( () => {
        let window = remote.getCurrentWindow();
        window.close();
    });

    // info button
    $('#btnInfo').click( () => {
        // spawn info dialogue
        let window = remote.getCurrentWindow();
        const BrowserWindow = remote.BrowserWindow;

        var win = new BrowserWindow({
            width: 400,
            height: 350,
            parent: window,
            modal: true,
            resizable: false
        });

        win.setMenu(null);
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../info/info.html'),
            protocol: 'file:',
            slashes: true
        }));
    });
}

function onMediaNext() {
    webview.executeJavaScript(injections.soundcloud.skipAhead);
}

function onMediaPrev() {
    webview.executeJavaScript(injections.soundcloud.skipBack);
}

function onMediaPlayPause() {
    webview.executeJavaScript(injections.soundcloud.playPause);
}
