// mainwindow.js
const $ = require('jquery');
const {remote} = require('electron');

const injections = require('../../lib/injections');

let webview;
let getUrlEnabled = true;

onload = () => {
    webview = document.querySelector('#scWebView');

    webview.addEventListener('page-title-updated', (e) => {
        document.title = e.title + ' - SoundCloud Wrapper';
        $('.window-title').text(e.title + ' - SoundCloud Wrapper');
    });

    // update address bar
    webview.addEventListener('did-navigate', (e) => {
        $('#scUrlBox').val(e.url);
    });

    webview.addEventListener('did-navigate-in-page', (e) => {
        $('#scUrlBox').val(e.url);
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
    });

    // window control buttons
    $('#btnMinimize').click( () => {
        var window = remote.getCurrentWindow();
        window.minimize();
    });

    $('#btnMaximize').click( () => {
        var window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    });

    $('#btnClose').click( () => {
        var window = remote.getCurrentWindow();
        window.close();
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
