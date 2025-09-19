

// ======== SONG DATA ========
const songs = [
  { title: "PERFECT", artist: "ED Shreen", src: "perfectSong.mp3", cover: "pic2.jpeg" },
  { title: "CLOSER", artist: "ChainSmoker", src: "CloserSong.mp3", cover: "pic5.jpeg" },
  { title: "FASALE", artist: "Kaavish", src: "fasaleSong.mp3", cover: "pic4.jpeg" },
  { title: "Ek din ap yu hmko mil jyenge", artist: "Alka Yagnik & Kumar Sanu", src: "EkDinApYuHmkoMilJyengeSong.mp3", cover: "pic3.jpeg" },
  { title: "Die with a smile", artist: "Lady Gaga & Bruno Mars", src: "DieWithASmileSong.mp3", cover: "pic1.jpg" },
  { title: "Senorita", artist: "Camila Cabello & Shawn Mendes", src: "SenoritaSong.mp3", cover: "pic6.jpeg" },
  { title: "Lily", artist: "Alan Walker", src: "lilySong.mp3", cover: "pic7.jpeg" }
];

let currentSong = 0;
const audio = new Audio(songs[currentSong].src);

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.style.backgroundImage = `url(${song.cover})`;
  audio.src = song.src;
  audio.currentTime = 0;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    duration.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2,"0")} / ${totalMinutes}:${totalSeconds.toString().padStart(2,"0")}`;
  }
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Auto play next
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Load first song
loadSong(currentSong);
// Set initial volume