/* play list music button */
$(document).ready(function () {
  var obj = document.createElement("audio");
  obj.src = "../Code/audio/audio.mp3";
  obj.volume = 1;
  obj.autoPlay = true;
  obj.preLoad = true;

  $("#playNowBtn").click(function (e) {
    var $playNowButton = $(this); /* button variable */
    var $playlist = $playNowButton
      .parent()
      .parent(); /* play list section class */
    var $disk = $playlist.children().children(".disk"); /* disk image */

    if ($disk.hasClass("rotating")) {
      $disk.removeClass("rotating");
      $playNowButton.children("i").removeClass("fa-pause").addClass("fa-play");
      obj.pause();
    } else {
      $disk.addClass("rotating");
      $playNowButton.children("i").removeClass("fa-play").addClass("fa-pause");
      obj.play();
    }
    e.preventDefault();
  });
});

// $(document).ready(function () {
//   var song = document.createElement("audio");
//   song.src = "../Code/audio/audio.mp3";
//   song.volume = 1;
//   song.autoPlay = true;
//   song.preLoad = true;

//   $("#play").click(function (e) {
//     var $play = $(this); /* button variable */
//     var $playing = $play;

//     if (e) {
//       $play.children("i").removeClass("fa-pause").addClass("fa-play");
//       song.pause();
//     } else {
//       $play.children("i").removeClass("fa-play").addClass("fa-pause");
//       song.play();
//     }
//     e.preventDefault();
//   });
// });
