const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const trackList = document.getElementById("trackList");

const songs = [
  {
    name: "song1.mp3",
    title: "Memories of a Friend",
    artist: "Gary Strausbaugh"
  },
  {
    name: "song2.mp3",
    title: "What a Beautiful Sunset!",
    artist: "Angelwing"
  }
];


let songIndex = 0;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}`;
}

let isPlaying = false;

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100;
  updateTimeDisplay(currentTimeEl, currentTime);
  updateTimeDisplay(durationEl, duration);
});

function updateTimeDisplay(el, time) {
  let mins = Math.floor(time / 60);
  let secs = Math.floor(time % 60).toString().padStart(2, "0");
  el.textContent = `${mins}:${secs}`;
}

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title + " - " + song.artist;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(song);
    playSong();
  });
  trackList.appendChild(li);
});

audio.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

loadSong(songs[songIndex]);
audio.addEventListener("error", (e) => {
  console.error("Audio failed to load:", e);
  console.log("Tried to load:", audio.src);
});

