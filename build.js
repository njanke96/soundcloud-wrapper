// build.js

if (!process.argv[2] || !/darwin|linux|win32/.test(process.argv[2])) {
    console.error('Unsupported platform. Use darwin|linux|win32');
    process.exit(1);
}

let plat = process.argv[2];

let options = {
    dir: '.',
    arch: 'x64',
    out: 'dist/',
    overwrite: true,
    platform: plat,
    icon: 'resources/icon/icon'
};

if (plat === 'win32') {
    options.win32metadata = {
        CompanyName: '',
        FileDescription: 'Extends media keys to the SoundCloud web app.',
        OriginalFilename: 'soundcloud-wrapper.exe',
        ProductName: 'SoundCloud Wrapper',
        InternalName: 'soundcloud-wrapper'
    };
}

require('electron-packager')(options, done);

function done(err, appPaths) {
    if (err) {
        console.error(err.message);
        return;
    }

    appPaths.forEach((el, i) => {
        console.log('Wrote to ' + el);
    });
}
