/*
  Code injected into guest sites to make things happen. Placed in a module
  for convenience.
*/

module.exports.soundcloud = {
    skipBack: "var xxxxa = document.getElementsByClassName('skipControl playControls__prev')[0]; xxxxa.click();",
    skipAhead: "var xxxxb = document.getElementsByClassName('skipControl playControls__next')[0]; xxxxb.click();",
    playPause: "var xxxxc = document.getElementsByClassName('playControl playControls__play')[0]; xxxxc.click();"
}
