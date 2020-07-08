const songRoot = document.getElementById("song-content");
const audio = document.getElementById("audio");

const songProps = {
  play: "play",
  prev: "prev",
  next: "next",
  title: "title",
  progressRoot: "progress_container",
  progress: "progress",
};

// Song titles
const songs = ["audio", "hey", "summer", "ukulele"];
const songsArr = [
  {
    id: 1,
    file: "audio",
    title: "Audio Mac",
  },
  {
    id: 2,
    file: "hey",
    title: "Hey",
  },
  {
    id: 3,
    file: "summer",
    title: "Summer",
  },
  {
    id: 4,
    file: "ukulele",
    title: "Ukulele",
  },
];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong();
init();

// Update song details
function loadSong(index = songIndex) {
  const song = songsArr[index];
  //   title.innerText = song.title;
  audio.src = `./audio/${song.file}.mp3`;
}

function init() {
  songsArr.forEach((song, index) => {
    displaySong(song);
    setListeners(song, index);
    console.log("object :>> ", song);
  });
}

function displaySong(song) {
  $("#song-content").append(
    `<li class="playlist-number">
       <!-- song information -->
       <div class="song-info">

           <!-- Progress bar -->
           <div class="music-info">
               <h4 id="${songProps.title}${song.id}">${song.title}</h4>
               <div class="progress-container" id="${songProps.progressRoot}${song.id}">
                 <div class="progress" id="${songProps.progress}${song.id}"></div>
               </div>
             </div>
           <!-- song title -->
           <h4>Melodi Song Track One</h4>
           <p><strong>Album</strong>: Title &nbsp;|&nbsp; <strong>Type</strong>: Rock &nbsp;|&nbsp; <strong>Singer</strong>: Dawn</p>
       </div>

       <!-- music icon -->
       <div class="music-icon">
           <a href="#prev" class="prev" id="${songProps.prev}${song.id}"> <i class="fa fa-backward"></i></a>
           <a href="#play" class="play" id="${songProps.play}${song.id}"><i class="fa fa-play"></i></a>
           <a href="#next" class="next" id="${songProps.next}${song.id}"> <i class="fa fa-forward"></i></a>
           
       </div>
       <div id="volume-btn">
           <i class="fas fa-volume-down"></i>
           <input type="range" id="volume-slider" min="0" max="1" step="0.01" />
           <i class="fas fa-volume-up"></i>
         </div>
          <!-- Links -->
          <div class="links">
           <a href="amazon.com">Amazon</a>
           <a href="Itunes.com">Itunes</a>
           <a href="spotify.com">Spotify</a>
         </div>

       <div class="clearfix"></div>
   </li>`
  );
}

function setListeners(song, index) {
  const element = document.getElementById(`${songProps.play}${song.id}`);
  element.addEventListener("click", (event) => {
    event.preventDefault();
    const play = element.classList.contains("play");
    songIndex = index;
    if (play) {
      console.log("Playing song");
      playSongUI(element);
      loadSong();
      audio.play();
    } else {
      console.log("Pause song");
      pauseSongUI(element);
      audio.pause();
    }
  });
}

// Play song
function playSongUI(element) {
  element.classList.remove("play");
  element.querySelector("i.fa").classList.remove("fa-play");
  element.querySelector("i.fa").classList.add("fa-pause");
}

// Pause song
function pauseSongUI(element) {
  element.classList.add("play");
  element.querySelector("i.fa").classList.add("fa-play");
  element.querySelector("i.fa").classList.remove("fa-pause");
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSongUI();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSongUI();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  //   progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// // Event listeners
// Array.from(playBtn).forEach((element) => {
//   element.addEventListener("click", (event) => {
//     const isPlaying = element.classList.contains("play");
//     event.preventDefault();
//     if (!isPlaying) {
//       pauseSong(element);
//     } else {
//       playSong(element);
//     }
//   });
// });

// Change song
// prevBtn.addEventListener("click", prevSong);
// nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// // Click on progress bar
// progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

// volume button
// volume.oninput = (e) => {
//   const slider = e.target.value;
//   // playBtn.volume = slider;
//   audio.volume = slider;
//   console.log(slider);
// };

audio.addEventListener("onvolumechange", (e) => {
  const slider = e.target.value;
  console.log("Volume changed", slider);
});
