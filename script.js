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
  { src: "assets/photo- (1).jpg", name: "Ball memory 1" },
  { src: "assets/photo- (2).jpg", name: "Ball memory 2" },
  { src: "assets/photo- (3).jpg", name: "Ball memory 3" },
  { src: "assets/photo- (4).jpg", name: "Ball memory 4" },
  { src: "assets/photo- (5).jpg", name: "Ball memory 5" },
  { src: "assets/photo- (6).jpg", name: "Ball memory 6" },
  { src: "assets/photo- (7).jpg", name: "Ball memory 7" },
  { src: "assets/photo- (8).jpg", name: "Ball memory 8" },
  { src: "assets/photo- (9).jpg", name: "Ball memory 9" },
  { src: "assets/photo- (10).jpg", name: "Ball memory 10" },
  { src: "assets/photo- (11).jpg", name: "Ball memory 11" },
  { src: "assets/photo- (12).jpg", name: "Ball memory 12" },
  { src: "assets/photo- (13).jpg", name: "Ball memory 13" },
  { src: "assets/photo- (14).jpg", name: "Ball memory 14" },
  { src: "assets/photo- (15).jpg", name: "Ball memory 15" },
  { src: "assets/photo- (16).jpg", name: "Ball memory 16" },
  { src: "assets/photo- (17).jpg", name: "Ball memory 17" },
  { src: "assets/photo- (18).jpg", name: "Ball memory 18" },
  { src: "assets/photo- (19).jpg", name: "Ball memory 19" },
  { src: "assets/photo- (20).jpg", name: "Ball memory 20" },
  { src: "assets/photo- (21).jpg", name: "Ball memory 21" },
  { src: "assets/photo- (22).jpg", name: "Ball memory 22" },
  { src: "assets/photo- (23).jpg", name: "Ball memory 23" },
  { src: "assets/photo- (24).jpg", name: "Ball memory 24" },
  { src: "assets/photo- (25).jpg", name: "Ball memory 25" },
  { src: "assets/photo- (26).jpg", name: "Ball memory 26" }
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
