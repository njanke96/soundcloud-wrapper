// mainwindow.js
const $ = require('jquery');
const injections = require('../../lib/injections');

let webview;

onload = () => {
    webview = document.querySelector('#scWebView');

    webview.addEventListener('page-title-updated', (e) => {
        document.title = e.title + ' - SoundCloud Wrapper';
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
