var VERBOSE = false;
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
  event.target.playVideo();
}
function onPlayerStateChange(event) {
  if (VERBOSE) {
    var i = event.data;
    if (i !== -1)
      console.log(playerStateDisplay[i]);
    else
      console.log('non commencée');
  }
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
  // stock that data elsewhere
  var content = [{
    displayTime: 3,
    eraseTime: 4,
    text: 'This is my first comment, youhou !'
  }, {
    displayTime: 7,
    eraseTime: 9,
    text: 'And another one !'
  }];

  // contentZone
  var contentZone = document.getElementById('contentZone');

  asyncScriptLoader('https://www.youtube.com/iframe_api', function () {
    uiEventsHandler();

    // each second, check for current time value and check in the content if there is a message to display or erase
    window.setInterval(function () {
      if (typeof player.getCurrentTime == 'function') {
        var time = Math.ceil(player.getCurrentTime()); // perhaps use Math.floor instead of Math.ceil
        content.forEach(function (c) {
          if (time === c.eraseTime)
            contentZone.firstChild.nodeValue = '';
          else if (time === c.displayTime)
            contentZone.firstChild.nodeValue = c.text;
        });
      }
    }, 1000);
  }); /* asyncScriptLoader */
}

main();