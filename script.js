const slideshowImage = document.getElementById("slideshow-image");
const toggleSlideshow = document.getElementById("toggle-slideshow");
const toggleMusic = document.getElementById("toggle-music");
const bgMusic = document.getElementById("bg-music");
const prevSlide = document.getElementById("prev-slide");
const nextSlideBottom = document.getElementById("next-slide-bottom");
const goHome = document.getElementById("go-home");
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
let slideIntervalSeconds = 3.5;
let hasStartedMusic = false;

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
    return;
  }
  bgMusic.src = musicTrack.src;
};

const setMusicPaused = (isPaused) => {
  toggleMusic.classList.toggle("control--music-paused", isPaused);
};

toggleMusic.addEventListener("click", async () => {
  if (!bgMusic.src) {
    return;
  }

  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      hasStartedMusic = true;
      setMusicPaused(false);
    } catch (error) {
      setMusicPaused(true);
    }
  } else {
    bgMusic.pause();
    setMusicPaused(true);
  }
});

bgMusic.addEventListener("pause", () => {
  if (hasStartedMusic) {
    setMusicPaused(true);
  }
});
bgMusic.addEventListener("ended", () => {
  if (hasStartedMusic) {
    setMusicPaused(true);
  }
});
bgMusic.addEventListener("play", () => setMusicPaused(false));

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

nextSlideBottom.addEventListener("click", () => {
  showSlide(currentIndex + 1);
  stopSlideshow();
});

enterSite.addEventListener("click", () => {
  intro.classList.add("hidden");
  gallery.classList.remove("hidden");
  document.body.classList.remove("intro-mode");
  startSlideshow();
  if (bgMusic.src) {
    bgMusic.play().then(() => {
      hasStartedMusic = true;
      setMusicPaused(false);
    }).catch(() => setMusicPaused(true));
  }
});

const init = () => {
  if (photos.length === 0) {
    slideshowImage.alt = "No photos yet";
    return;
  }
  initMusic();
  showSlide(0);
  setMusicPaused(false);
};

init();

const returnHome = () => {
  stopSlideshow();
  bgMusic.pause();
  setMusicPaused(false);
  intro.classList.remove("hidden");
  gallery.classList.add("hidden");
  document.body.classList.add("intro-mode");
};

goHome.addEventListener("click", returnHome);
