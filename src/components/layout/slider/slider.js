import Swiper from 'swiper';
import { Navigation,Pagination } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
*/

import "./slider.scss";
// import 'swiper/css/bundle';

// Ініціалізація слайдерів
function initSliders() {
	if (document.querySelector('.slider-main__slider')) { 
		new Swiper('.slider-main__slider', { 
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 800,
			
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,
			
			
			pagination: {
				el: '.slider-main__slider .swiper-pagination',
				clickable: true,
			},
			
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
				},
				*/
				
				navigation: {
					prevEl: '.slider-main__slider .swiper-button-prev',
					nextEl: '.slider-main__slider .swiper-button-next',
				},
				breakpoints: {
					320: {
						spaceBetween: 8,
						speed: 500,
					},
					480: {
						speed: 800,
						spaceBetween: 20,
					}
			},
		
			on: {

			}
		});
	}
	if (document.querySelector('.slider-events__slider')) { 
		new Swiper('.slider-events__slider', { 
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			spaceBetween: 20,
			speed: 500,
			initialSlide: 1,



			// centeredSlides: true,
			
			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			//lazy: true,
			
			
				navigation: {
					prevEl: '.slider-events__slider .swiper-button-prev',
					nextEl: '.slider-events__slider .swiper-button-next',
				},
				breakpoints: {
					320: {
						spaceBetween: 8,
						slidesPerView: 1,
					},
					768: {
						spaceBetween: 20,
						slidesPerView: 2,

					}
			},
		
			on: {

			}
		});
	}
	if (document.querySelector('.video-block__slider')) { 
		new Swiper('.video-block__slider', { 
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			spaceBetween: 20,
			speed: 500,
			initialSlide: 1,

			// allowTouchMove: false,

			// centeredSlides: true,
			
			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			//lazy: true,
			
			
				navigation: {
					prevEl: '.video-block__slider .swiper-button-prev',
					nextEl: '.video-block__slider .swiper-button-next',
				},
				breakpoints: {
					320: {
						spaceBetween: 8,
						slidesPerView: 1,
						allowTouchMove: false,
					},
					768: {
						spaceBetween: 20,
						slidesPerView: 2,
						allowTouchMove: true,
					}
			},
		
			on: {

			}
		});
	}

// 	const slidersCards = document.querySelectorAll('.block-cards__slider');

// if (slidersCards.length) {
//   const mq = window.matchMedia("(max-width: 37.561em)"); // 600рх

//   slidersCards.forEach(slider => {
//     let swiperInstance = null;

//     function enable() {
//       if (!swiperInstance) {
//         swiperInstance = new Swiper(slider, {
//           modules: [Navigation],
//           observer: true,
//           observeParents: true,
//           slidesPerView: 1,
//           spaceBetween: 8,
//           speed: 500,
//         });
//       }
//     }

//     function disable() {
//       if (swiperInstance) {
//         swiperInstance.destroy(true, true);
//         swiperInstance = null;
//       }
//     }

//     function check() {
//       if (mq.matches) {
//         enable();
//       } else {
//         disable();
//       }
//     }

//     // проверка при загрузке
//     check();

//     // слушаем изменение брейкпоинта
//     mq.addEventListener("change", check);
//   });
// }

	// функция инициализации разных салйдеров на ширине меньше чем 37.561em (600px) ===
	function initAdaptiveSliders(selector, options, breakpoint = "(max-width: 37.561em)") {
	  const sliders = document.querySelectorAll(selector);
	  if (!sliders.length) return;

	  const mq = window.matchMedia(breakpoint);

	  sliders.forEach(slider => {
	    let swiperInstance = null;

	    function enable() {
	      if (!swiperInstance) {
	        swiperInstance = new Swiper(slider, options);
	      }
	    }

	    function disable() {
	      if (swiperInstance) {
	        swiperInstance.destroy(true, true);
	        swiperInstance = null;
	      }
	    }

	    function check() {
	      if (mq.matches) {
	        enable();
	      } else {
	        disable();
	      }
	    }

	    check();
	    mq.addEventListener("change", check);
	  });
	}

	initAdaptiveSliders('.block-cards__slider', {
	  modules: [Navigation],
	  observer: true,
	  observeParents: true,
	  slidesPerView: 1,
	  spaceBetween: 8,
	  speed: 500,
	});

	initAdaptiveSliders('.all-news__slider', {
	  modules: [Navigation],
	  observer: true,
	  observeParents: true,
	  slidesPerView: 1,
	  spaceBetween: 8,
	  speed: 500,
	}, "(max-width: 48.061em");




	// if (document.querySelector('.swiper')) { 
	// 	new Swiper('.swiper', { 
	// 		modules: [Navigation],
	// 		observer: true,
	// 		observeParents: true,
	// 		slidesPerView: 1,
	// 		spaceBetween: 0,
	// 		speed: 800,

	// 		//touchRatio: 0,
	// 		//simulateTouch: false,
	// 		//loop: true,
	// 		//preloadImages: false,
	// 		//lazy: true,

	// 		/*
	// 		// Ефекти
	// 		effect: 'fade',
	// 		autoplay: {
	// 			delay: 3000,
	// 			disableOnInteraction: false,
	// 		},
	// 		*/

	// 		// Пагінація
	// 		/*
	// 		pagination: {
	// 			el: '.swiper-pagination',
	// 			clickable: true,
	// 		},
	// 		*/

	// 		// Скроллбар
	// 		/*
	// 		scrollbar: {
	// 			el: '.swiper-scrollbar',
	// 			draggable: true,
	// 		},
	// 		*/

	// 		// Кнопки "вліво/вправо"
	// 		navigation: {
	// 			prevEl: '.swiper-button-prev',
	// 			nextEl: '.swiper-button-next',
	// 		},
	// 		/*
	// 		// Брейкпоінти
	// 		breakpoints: {
	// 			640: {
	// 				slidesPerView: 1,
	// 				spaceBetween: 0,
	// 				autoHeight: true,
	// 			},
	// 			768: {
	// 				slidesPerView: 2,
	// 				spaceBetween: 20,
	// 			},
	// 			992: {
	// 				slidesPerView: 3,
	// 				spaceBetween: 20,
	// 			},
	// 			1268: {
	// 				slidesPerView: 4,
	// 				spaceBetween: 30,
	// 			},
	// 		},
	// 		*/
	// 		// Події
	// 		on: {

	// 		}
	// 	});
	// }
}
document.querySelector('[data-fls-slider]') ?
	window.addEventListener("load", initSliders) : null