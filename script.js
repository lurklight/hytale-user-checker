const slideshowImage = document.getElementById("slideshow-image");
const toggleSlideshow = document.getElementById("toggle-slideshow");
const toggleMusic = document.getElementById("toggle-music");
const bgMusic = document.getElementById("bg-music");
const speedValue = document.getElementById("speed-value");
const trackName = document.getElementById("track-name");
const prevSlide = document.getElementById("prev-slide");
const nextSlide = document.getElementById("next-slide");
const nextSlideBottom = document.getElementById("next-slide-bottom");
const intro = document.getElementById("intro");
const gallery = document.getElementById("gallery");
const enterSite = document.getElementById("enter-site");

const photoList = [
  { src: "assets/photo-1.jpg", name: "Ball memory 1" },
  { src: "assets/photo-2.jpg", name: "Ball memory 2" },
  { src: "assets/photo-3.jpg", name: "Ball memory 3" },
  { src: "assets/photo-4.jpg", name: "Ball memory 4" }
];

const musicTrack = {
  src: "assets/music.mp3",
  name: "Your ball soundtrack"
};

let photos = [...photoList];
let currentIndex = 0;
let slideshowTimer = null;
let slideIntervalSeconds = 5;

const showSlide = (index) => {
  if (photos.length === 0) {
    return;
  }
  currentIndex = (index + photos.length) % photos.length;
  slideshowImage.src = photos[currentIndex].src;
  slideshowImage.alt = photos[currentIndex].name;
};

const nextSlideShow = () => {
  showSlide(currentIndex + 1);
};

const startSlideshow = () => {
  if (photos.length === 0) {
    return;
  }
  stopSlideshow();
  slideshowTimer = window.setInterval(nextSlideShow, slideIntervalSeconds * 1000);
  toggleSlideshow.textContent = "⏸";
};

const stopSlideshow = () => {
  if (slideshowTimer) {
    window.clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
  toggleSlideshow.textContent = "▶";
};

const initMusic = () => {
  if (!musicTrack.src) {
    trackName.textContent = "No track set yet.";
    return;
  }
  bgMusic.src = musicTrack.src;
  trackName.textContent = `Soundtrack: ${musicTrack.name}`;
};

toggleMusic.addEventListener("click", () => {
  if (!bgMusic.src) {
    trackName.textContent = "Add a music file in assets/music.mp3.";
    return;
  }

  if (bgMusic.paused) {
    bgMusic.play();
    toggleMusic.textContent = "⏸";
  } else {
    bgMusic.pause();
    toggleMusic.textContent = "♪";
  }
});

toggleSlideshow.addEventListener("click", () => {
  if (slideshowTimer) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});

prevSlide.addEventListener("click", () => {
  showSlide(currentIndex - 1);
  stopSlideshow();
});

nextSlide.addEventListener("click", () => {
  showSlide(currentIndex + 1);
  stopSlideshow();
});

nextSlideBottom.addEventListener("click", () => {
  showSlide(currentIndex + 1);
  stopSlideshow();
});

enterSite.addEventListener("click", () => {
  intro.classList.add("hidden");
  gallery.classList.remove("hidden");
  startSlideshow();
});

const init = () => {
  if (photos.length === 0) {
    slideshowImage.alt = "No photos yet";
    return;
  }
  initMusic();
  showSlide(0);
  speedValue.textContent = slideIntervalSeconds;
};

init();
