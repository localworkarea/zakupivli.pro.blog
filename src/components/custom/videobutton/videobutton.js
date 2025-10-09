import "./videobutton.scss"

  // const videoYoutubeButtons = document.querySelectorAll('.video-youtube__button');
  //   videoYoutubeButtons.forEach(button => {
  //       button.addEventListener('click', function() {
  //           const youTubeCode = this.getAttribute('data-youtube');
  //           let autoplay = true; // Автоплей разрешено (true) или нет (false)
    
  //           let urlVideo = `https://www.youtube.com/embed/${youTubeCode}?rel=0&showinfo=0`;
    
  //           const iframe = document.createElement('iframe');
  //           iframe.setAttribute('allowfullscreen', '');
    
  //           if (autoplay) {
  //               urlVideo += '&autoplay=1';
  //               iframe.setAttribute('allow', 'autoplay; encrypted-media');
  //           }
    
  //           iframe.setAttribute('src', urlVideo);
    
  //           const body = this.closest('.video-youtube__body');
  //           body.innerHTML = '';
  //           body.appendChild(iframe);
  //           body.classList.add('video-added');
  //       });
  //   });



document.addEventListener("DOMContentLoaded", () => {
  const videoButtons = document.querySelectorAll(".video-youtube__button");
  const players = new Map();
  let apiLoaded = false;
  let apiReadyCallbacks = [];

  // Загружаем API один раз
  function loadYouTubeAPI(callback) {
    if (apiLoaded) {
      if (typeof YT !== "undefined" && YT.Player) {
        callback();
      } else {
        apiReadyCallbacks.push(callback);
      }
      return;
    }

    apiLoaded = true;
    apiReadyCallbacks.push(callback);

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    // YouTube вызовет эту функцию, когда API будет готов
    window.onYouTubeIframeAPIReady = function () {
      apiReadyCallbacks.forEach(cb => cb());
      apiReadyCallbacks = [];
    };
  }

  function pauseAll(exceptId = null) {
    players.forEach((player, id) => {
      if (id !== exceptId && player.pauseVideo) {
        player.pauseVideo();
      }
    });
  }

  function createPlayer(container, youTubeCode, autoplay = true) {
    const iframeId = "yt-" + youTubeCode + "-" + Date.now();
    const iframe = document.createElement("div");
    iframe.setAttribute("id", iframeId);

    container.innerHTML = "";
    container.appendChild(iframe);
    container.classList.add("video-added");

    const player = new YT.Player(iframeId, {
      videoId: youTubeCode,
      playerVars: {
        rel: 0,
        showinfo: 0,
        autoplay: autoplay ? 1 : 0
      },
      events: {
        onStateChange: function (event) {
          if (event.data === YT.PlayerState.PLAYING) {
            pauseAll(iframeId);
          }
        }
      }
    });

    players.set(iframeId, player);
  }

  videoButtons.forEach(button => {
    button.addEventListener("click", function () {
      const youTubeCode = this.getAttribute("data-youtube");
      const container = this.closest(".video-youtube__body");

      // Загружаем API и создаём плеер только при первом клике
      loadYouTubeAPI(() => {
        createPlayer(container, youTubeCode, true);
      });
    });
  });
});


// document.querySelectorAll('.custom-video').forEach(wrapper => {
// 	const video = wrapper.querySelector('.custom-video__tag');
// 	const playBtn = wrapper.querySelector('.custom-video__play');
// 	const progress = wrapper.querySelector('.custom-video__progress');
// 	const currentTimeEl = wrapper.querySelector('.custom-video__current');
// 	const durationEl = wrapper.querySelector('.custom-video__duration');

// 	if (!video || !playBtn || !progress || !currentTimeEl || !durationEl) {
// 		console.warn('❗ Пропущен блок custom-video — не все элементы найдены', wrapper);
// 		return;
// 	}

// 	const formatTime = (seconds) => {
// 		const mins = Math.floor(seconds / 60);
// 		const secs = Math.floor(seconds % 60);
// 		return `${mins}:${secs.toString().padStart(2, '0')}`;
// 	};

// 	video.addEventListener('loadedmetadata', () => {
// 		progress.max = video.duration;
// 		durationEl.textContent = formatTime(video.duration);
// 	});

// 	video.addEventListener('timeupdate', () => {
// 		// обновляем прогресс только если пользователь НЕ тащит ползунок
// 		if (!isDragging) {
// 			progress.value = video.currentTime;
// 			currentTimeEl.textContent = formatTime(video.currentTime);
// 		}
// 	});

// 	let isDragging = false;
// 	let wasPlaying = false;

// 	progress.addEventListener('input', () => {
// 		const value = parseFloat(progress.value);
// 		currentTimeEl.textContent = formatTime(value);
// 	});

// 	progress.addEventListener('mousedown', () => {
// 		isDragging = true;
// 		wasPlaying = !video.paused;
// 		video.pause();
// 	});

// 	progress.addEventListener('mouseup', () => {
// 		isDragging = false;
// 		video.currentTime = parseFloat(progress.value);
// 		if (wasPlaying) {
// 			video.play();
// 		}
// 	});

// 	// Для мобильных устройств
// 	progress.addEventListener('touchstart', () => {
// 		isDragging = true;
// 		wasPlaying = !video.paused;
// 		video.pause();
// 	}, { passive: true });

// 	progress.addEventListener('touchend', () => {
// 		isDragging = false;
// 		video.currentTime = parseFloat(progress.value);
// 		if (wasPlaying) {
// 			video.play();
// 		}
// 	}, { passive: true });

// 	const togglePlayback = () => {
// 		if (video.paused) {
// 			video.play().then(() => {
// 				playBtn.textContent = '⏸';
// 			}).catch(err => {
// 				console.warn('Ошибка воспроизведения:', err);
// 			});
// 		} else {
// 			video.pause();
// 			playBtn.textContent = '▶️';
// 		}
// 	};

// 	playBtn.addEventListener('click', (e) => {
// 		e.stopPropagation();
// 		togglePlayback();
// 	});

// 	video.addEventListener('click', () => {
// 		togglePlayback();
// 	});

// 	video.addEventListener('ended', () => {
// 		playBtn.textContent = '▶️';
// 	});
// });
