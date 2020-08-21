/*
  Code injected into guest sites to make things happen. Placed in a module
  for convenience.
*/

module.exports.soundcloud = {
    skipBack: "document.getElementsByClassName('skipControl playControls__prev')[0].click();",
    skipAhead: "document.getElementsByClassName('skipControl playControls__next')[0].click();",
    playPause: "document.getElementsByClassName('playControl playControls__play')[0].click();"
}
