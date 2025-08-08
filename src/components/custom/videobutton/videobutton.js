import "./videobutton.scss"

  const videoYoutubeButtons = document.querySelectorAll('.video-youtube__button');
    videoYoutubeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const youTubeCode = this.getAttribute('data-youtube');
            let autoplay = true; // Автоплей разрешено (true) или нет (false)
    
            let urlVideo = `https://www.youtube.com/embed/${youTubeCode}?rel=0&showinfo=0`;
    
            const iframe = document.createElement('iframe');
            iframe.setAttribute('allowfullscreen', '');
    
            if (autoplay) {
                urlVideo += '&autoplay=1';
                iframe.setAttribute('allow', 'autoplay; encrypted-media');
            }
    
            iframe.setAttribute('src', urlVideo);
    
            const body = this.closest('.video-youtube__body');
            body.innerHTML = '';
            body.appendChild(iframe);
            body.classList.add('video-added');
        });
    });


//   const videoYoutubeButtons = document.querySelectorAll('.video-youtube__button');

// videoYoutubeButtons.forEach(button => {
// 	button.addEventListener('click', function () {
// 		const youTubeCode = this.getAttribute('data-youtube');
// 		const currentBody = this.closest('.video-youtube__body');

// 		// 1. Поставить на паузу все другие iframe
// 		document.querySelectorAll('.video-youtube__body.video-added iframe').forEach(iframe => {
// 			// Пропускаем iframe, который уже внутри текущего блока
// 			if (!currentBody.contains(iframe)) {
// 				iframe.contentWindow.postMessage(JSON.stringify({
// 					event: 'command',
// 					func: 'pauseVideo',
// 					args: ''
// 				}), '*');
// 			}
// 		});

// 		// 2. Если iframe уже вставлен — просто ничего не делаем
// 		if (currentBody.classList.contains('video-added')) return;

// 		// 3. Сохранить оригинальную кнопку (для возможного восстановления)
// 		if (!currentBody.getAttribute('data-button-html')) {
// 			currentBody.setAttribute('data-button-html', currentBody.innerHTML);
// 		}

// 		// 4. Вставить новый iframe с autoplay
// 		let urlVideo = `https://www.youtube.com/embed/${youTubeCode}?rel=0&showinfo=0&autoplay=1&enablejsapi=1`;
// 		const iframe = document.createElement('iframe');
// 		iframe.setAttribute('allowfullscreen', '');
// 		iframe.setAttribute('allow', 'autoplay; encrypted-media');
// 		iframe.setAttribute('src', urlVideo);

// 		currentBody.innerHTML = '';
// 		currentBody.appendChild(iframe);
// 		currentBody.classList.add('video-added');
// 	});
// });


// function initYouTubeSlide(button) {
// 	const youTubeCode = button.getAttribute('data-youtube');
// 	const currentBody = button.closest('.video-youtube__body');

// 	// Пауза всех остальных
// 	document.querySelectorAll('.video-youtube__body.video-added iframe').forEach(iframe => {
// 		if (!currentBody.contains(iframe)) {
// 			iframe.contentWindow.postMessage(JSON.stringify({
// 				event: 'command',
// 				func: 'pauseVideo',
// 				args: ''
// 			}), '*');
// 		}
// 	});

// 	if (currentBody.classList.contains('video-added')) return;

// 	// Создаём обёртку
// 	const iframeWrapper = document.createElement('div');
// 	iframeWrapper.classList.add('video-youtube__iframe-wrapper');

// 	// Создаём iframe
// 	const iframe = document.createElement('iframe');
// 	iframe.src = `https://www.youtube.com/embed/${youTubeCode}?rel=0&showinfo=0&autoplay=1&enablejsapi=1`;
// 	iframe.setAttribute('allowfullscreen', '');
// 	iframe.setAttribute('allow', 'autoplay; encrypted-media');

// 	iframeWrapper.appendChild(iframe);

// 	// Создаём proxy div для свайпа и нажатий
// 	const gestureLayer = document.createElement('div');
// 	gestureLayer.classList.add('video-youtube__gesture-capture');
// 	iframeWrapper.appendChild(gestureLayer);

// 	// Пропускаем клик по центру (играть видео)
// 	gestureLayer.addEventListener('click', e => {
// 		const bounds = gestureLayer.getBoundingClientRect();
// 		const centerX = bounds.left + bounds.width / 2;
// 		const centerY = bounds.top + bounds.height / 2;
// 		const dx = Math.abs(e.clientX - centerX);
// 		const dy = Math.abs(e.clientY - centerY);
// 		const radius = 60; // допустимая зона центра

// 		if (dx < radius && dy < radius) {
// 			iframe.style.pointerEvents = 'auto'; // включаем доступ к iframe
// 			gestureLayer.style.pointerEvents = 'none'; // убираем перекрытие
// 		}
// 	});

// 	currentBody.innerHTML = '';
// 	currentBody.appendChild(iframeWrapper);
// 	currentBody.classList.add('video-added');
// }

// document.querySelectorAll('.video-youtube__button').forEach(button => {
// 	button.addEventListener('click', () => {
// 		initYouTubeSlide(button);
// 	});
// });



document.querySelectorAll('.custom-video').forEach(wrapper => {
	const video = wrapper.querySelector('.custom-video__tag');
	const playBtn = wrapper.querySelector('.custom-video__play');
	const progress = wrapper.querySelector('.custom-video__progress');
	const currentTimeEl = wrapper.querySelector('.custom-video__current');
	const durationEl = wrapper.querySelector('.custom-video__duration');

	if (!video || !playBtn || !progress || !currentTimeEl || !durationEl) {
		console.warn('❗ Пропущен блок custom-video — не все элементы найдены', wrapper);
		return;
	}

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	video.addEventListener('loadedmetadata', () => {
		progress.max = video.duration;
		durationEl.textContent = formatTime(video.duration);
	});

	video.addEventListener('timeupdate', () => {
		// обновляем прогресс только если пользователь НЕ тащит ползунок
		if (!isDragging) {
			progress.value = video.currentTime;
			currentTimeEl.textContent = formatTime(video.currentTime);
		}
	});

	let isDragging = false;
	let wasPlaying = false;

	progress.addEventListener('input', () => {
		const value = parseFloat(progress.value);
		currentTimeEl.textContent = formatTime(value);
	});

	progress.addEventListener('mousedown', () => {
		isDragging = true;
		wasPlaying = !video.paused;
		video.pause();
	});

	progress.addEventListener('mouseup', () => {
		isDragging = false;
		video.currentTime = parseFloat(progress.value);
		if (wasPlaying) {
			video.play();
		}
	});

	// Для мобильных устройств
	progress.addEventListener('touchstart', () => {
		isDragging = true;
		wasPlaying = !video.paused;
		video.pause();
	}, { passive: true });

	progress.addEventListener('touchend', () => {
		isDragging = false;
		video.currentTime = parseFloat(progress.value);
		if (wasPlaying) {
			video.play();
		}
	}, { passive: true });

	const togglePlayback = () => {
		if (video.paused) {
			video.play().then(() => {
				playBtn.textContent = '⏸';
			}).catch(err => {
				console.warn('Ошибка воспроизведения:', err);
			});
		} else {
			video.pause();
			playBtn.textContent = '▶️';
		}
	};

	playBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		togglePlayback();
	});

	video.addEventListener('click', () => {
		togglePlayback();
	});

	video.addEventListener('ended', () => {
		playBtn.textContent = '▶️';
	});
});
