// enum
var playerState = {
  unstarted: -1,
  stopped:0,
  playing:1,
  pause:2,
  buffering:3,
  waiting:5
};
var playerStateDisplay = ['arrêtée', 'en lecture', 'en pause', 'en mémoire tampon', ' ', 'en file d\'attente'];

// async script loading hack (see http://stackoverflow.com/questions/1834077/which-browsers-support-script-async-async/1834129#1834129)
function asyncScriptLoader(src, cb) {
  var tag, firstScriptTag;

  tag = document.createElement('script');
  tag.type = "text/javascript";
  tag.src = src;
  firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  cb();
}

// frozen onReady function called by the API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'FGTrtHuO6dI',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// events handled by the onReady function
function onPlayerReady(event) {
  console.log(event);
  event.target.playVideo();
}
function onPlayerStateChange(event) {
  var i = event.data;
  if (i !== -1)
    console.log(playerStateDisplay[i]);
  else
    console.log('non commencée');
}

// ui events
function uiEventsHandler() {
  var playBtn = document.getElementById('playBtn');
  var stopBtn = document.getElementById('stopBtn');
  var pauseBtn = document.getElementById('pauseBtn');
  var seekBtn = document.getElementById('seekBtn');

  playBtn.addEventListener('click', function () {
    player.playVideo();
  });

  stopBtn.addEventListener('click', function () {
    player.stopVideo();
  });

  pauseBtn.addEventListener('click', function () {
    player.pauseVideo();
  });

  seekBtn.addEventListener('change', function () {
    player.seekTo(this.value, true);
  });
}

function main() {
  asyncScriptLoader('https://www.youtube.com/iframe_api', function () {
    uiEventsHandler();
  });
}

main();