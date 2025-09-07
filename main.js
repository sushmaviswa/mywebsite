// This file contains JavaScript functionality for the website, including interactive elements and animations.

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('dreamer-audio');
    const playBtn = document.getElementById('play-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTime = document.getElementById('current-time');
    const duration = document.getElementById('duration');
    audio.volume = 0.5; // Set volume to 50%

    let isPlaying = false;

    // Set duration when metadata is loaded
    audio.addEventListener('loadedmetadata', function() {
        duration.textContent = formatTime(audio.duration);
        progressBar.max = Math.floor(audio.duration);
    });

    // Play/pause toggle
    playBtn.addEventListener('click', function() {
        const playIcon = playBtn.querySelector('img'); // Get the <img> inside the button
        const vinylImg = document.getElementById('vinyl-img');
        if (!isPlaying) {
            audio.muted = false;
            audio.play();
            playIcon.src = 'assets/icons/play.png';
            playIcon.alt = 'Pause';
            vinylImg.src = 'assets/gif/vinyl.gif'; // Show animated vinyl
            isPlaying = true;
        } else {
            audio.pause();
            playIcon.src = 'assets/icons/pause.png';
            playIcon.alt = 'Play';
            vinylImg.src = 'assets/images/static.jpg'; // Show static vinyl
            isPlaying = false;
        }
    });

    // Update progress bar and time
    audio.addEventListener('timeupdate', function() {
        progressBar.value = Math.floor(audio.currentTime);
        currentTime.textContent = formatTime(audio.currentTime);
    });

    // Seek functionality
    progressBar.addEventListener('input', function() {
        audio.currentTime = progressBar.value;
    });

    function formatTime(sec) {
        sec = Math.floor(sec);
        let min = Math.floor(sec / 60);
        let s = sec % 60;
        return `${min}:${s < 10 ? '0' : ''}${s}`;
    }

    // Bottom navigation active dot logic
    const navLinks = document.querySelectorAll('.bottom-nav .nav-link');
    const sections = {
        welcome: document.getElementById('welcome-section'),
        about: document.getElementById('about-section'),
        drawings: document.getElementById('drawings-section'),
        sky: document.getElementById('sky-section')
    };

    function showSection(page) {
        Object.keys(sections).forEach(key => {
            sections[key].style.display = (key === page) ? 'block' : 'none';
        });
    }

    // Set Welcome as default on load
    showSection('welcome');
    navLinks.forEach(l => l.classList.remove('active'));
    const defaultLink = document.querySelector('.bottom-nav .nav-link[data-page="welcome"]');
    if (defaultLink) defaultLink.classList.add('active');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const page = this.getAttribute('data-page');
            showSection(page);
        });
    });

    const firefly = document.querySelector('.firefly');

    document.addEventListener('mousemove', (e) => {
        firefly.style.left = e.pageX + 'px';
        firefly.style.top = e.pageY + 'px';
    });

    // Artwork carousel logic
  const artworks = [
    'assets/images/Art1.jpg',
    'assets/images/Art2.jpg',
    'assets/images/Art3.jpg',
    'assets/images/Art4.jpg'
  ];
  let currentArt = 0;
  const artworkImg = document.getElementById('artwork-img');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  function showArtwork(index) {
    artworkImg.style.opacity = 0;
    setTimeout(() => {
      artworkImg.src = artworks[index];
      artworkImg.style.opacity = 1;
    }, 150);
  }

  if (leftArrow && rightArrow && artworkImg) {
    leftArrow.addEventListener('click', () => {
      currentArt = (currentArt - 1 + artworks.length) % artworks.length;
      showArtwork(currentArt);
    });
    rightArrow.addEventListener('click', () => {
      currentArt = (currentArt + 1) % artworks.length;
      showArtwork(currentArt);
    });
  }

  // Sky photo carousel logic
  const skyPhotos = [
    'assets/images/sky1.jpg',
    'assets/images/sky2.jpg',
    'assets/images/sky3.jpg',
    'assets/images/sky4.jpg',
    'assets/images/sky5.jpg',
    'assets/images/sky6.jpg',
    'assets/images/sky7.jpg',
    'assets/images/sky8.jpg',
    'assets/images/sky9.jpg'
  ];
  let currentSky = 0;
  const skyImg = document.getElementById('sky-img');
  const skyLeftArrow = document.querySelector('.sky-left-arrow');
  const skyRightArrow = document.querySelector('.sky-right-arrow');

  function showSky(index) {
    if (skyImg) {
      skyImg.style.opacity = 0;
      setTimeout(() => {
        skyImg.src = skyPhotos[index];
        skyImg.style.opacity = 1;
      }, 150);
    }
  }

  if (skyLeftArrow && skyRightArrow && skyImg) {
    skyLeftArrow.addEventListener('click', () => {
      currentSky = (currentSky - 1 + skyPhotos.length) % skyPhotos.length;
      showSky(currentSky);
    });
    skyRightArrow.addEventListener('click', () => {
      currentSky = (currentSky + 1) % skyPhotos.length;
      showSky(currentSky);
    });
  }
});

