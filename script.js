const slideshowImage = document.getElementById("slideshow-image");
const thumbsContainer = document.getElementById("thumbs");
const toggleSlideshow = document.getElementById("toggle-slideshow");
const toggleMusic = document.getElementById("toggle-music");
const bgMusic = document.getElementById("bg-music");
const volumeSlider = document.getElementById("volume");
const speedSlider = document.getElementById("speed");
const speedValue = document.getElementById("speed-value");
const trackName = document.getElementById("track-name");
const slideshowStatus = document.getElementById("slideshow-status");
const prevSlide = document.getElementById("prev-slide");
const nextSlide = document.getElementById("next-slide");

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

const clearThumbs = () => {
  thumbsContainer.innerHTML = "";
};

const renderThumbs = () => {
  clearThumbs();
  photos.forEach((photo, index) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "thumb";
    if (index === currentIndex) {
      thumb.classList.add("active");
    }

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.name;
    thumb.appendChild(img);

    thumb.addEventListener("click", () => {
      showSlide(index);
      stopSlideshow();
    });

    thumbsContainer.appendChild(thumb);
  });
};

const showSlide = (index) => {
  if (photos.length === 0) {
    return;
  }
  currentIndex = (index + photos.length) % photos.length;
  slideshowImage.src = photos[currentIndex].src;
  slideshowImage.alt = photos[currentIndex].name;

  document.querySelectorAll(".thumb").forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("active", thumbIndex === currentIndex);
  });
};

const nextSlideShow = () => {
  showSlide(currentIndex + 1);
};

const startSlideshow = () => {
  if (photos.length === 0) {
    return;
  }
  stopSlideshow();
  const interval = Number(speedSlider.value) * 1000;
  slideshowTimer = window.setInterval(nextSlideShow, interval);
  toggleSlideshow.textContent = "Pause slideshow";
  slideshowStatus.textContent = "Slideshow auto-playing.";
};

const stopSlideshow = () => {
  if (slideshowTimer) {
    window.clearInterval(slideshowTimer);
    slideshowTimer = null;
  }
  toggleSlideshow.textContent = "Start slideshow";
  slideshowStatus.textContent = "Slideshow paused.";
};

const initMusic = () => {
  if (!musicTrack.src) {
    trackName.textContent = "No track set yet.";
    return;
  }
  bgMusic.src = musicTrack.src;
  trackName.textContent = musicTrack.name;
};

toggleMusic.addEventListener("click", () => {
  if (!bgMusic.src) {
    trackName.textContent = "Add a music file in assets/music.mp3.";
    return;
  }

  if (bgMusic.paused) {
    bgMusic.play();
    toggleMusic.textContent = "Pause music";
  } else {
    bgMusic.pause();
    toggleMusic.textContent = "Play music";
  }
});

volumeSlider.addEventListener("input", (event) => {
  bgMusic.volume = Number(event.target.value);
});

speedSlider.addEventListener("input", (event) => {
  speedValue.textContent = event.target.value;
  if (slideshowTimer) {
    startSlideshow();
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

const init = () => {
  if (photos.length === 0) {
    slideshowImage.alt = "No photos yet";
    return;
  }
  initMusic();
  renderThumbs();
  showSlide(0);
  startSlideshow();
};

bgMusic.volume = Number(volumeSlider.value);
init();
