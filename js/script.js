// ===== Animation on scroll ========================================================================================================================================================

/* @@include('animation-on-scroll.js */

// ===== Burger ========================================================================================================================================================

const burger = document.querySelector('.icon-menu');

burger.addEventListener('click', () => {
	const menuList = document.querySelector('.menu__list');
	const sliderSwiper = document.querySelector('.slider');

	document.body.classList.toggle('hidden');
	menuList.classList.toggle('active');
	burger.classList.toggle('active');

	setTimeout(() => {
		sliderSwiper.classList.toggle('none');
	}, 100)
}); 

// ===== Dinamic adaptive ========================================================================================================================================================

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle
// copy from github 02.06.2020

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());; 

// ===== noUiSlider ===========================================================================================================================================================

// Подключать непосредственно выше этого файла в основом проекте

// ===== Slider ========================================================================================================================================================

let swiper = new Swiper('.slider', {
	pagination: {
		el: '.swiper-pagination',
    	type: 'bullets',
    	clickable: true,
	},
    grabCursor: true,
})

let items = document.querySelectorAll('.flex__item');

let allProgressBar = document.querySelectorAll('.item__progressbar');
	progressBar = items[swiper.activeIndex].querySelector('.item__progressbar');

function animationUp(elem, value) {
	 if (value < 100) {
		setTimeout(() => {
			elem.value += 2;
			animationUp(elem, elem.value)
		}, 1);
	}
}

function animationDown(elem, value) {
	if (value > 0) {
		setTimeout(() => {
			elem.value -= 2;
			animationDown(elem, elem.value)
		}, 1);
	}
}

function activeSlides(num) {
	for (let elem of allProgressBar) {
		if (i <= num) {
			animationUp(elem, elem.value);
			i++;
		} else if (i > num) {
			animationDown(elem, elem.value);
			i++;
		}
	}
}

animationUp(progressBar, progressBar.value);

swiper.on('slideChange', () => {
	let itemCount = document.querySelectorAll('.item__count');
	let itemName = document.querySelectorAll(".item__name");

	for (let elem of allProgressBar) {
		if (elem.value > 0 && elem.value < 100) {
			animationDown(elem, elem.value);
		}
	}

	for (let elem of itemCount) {
		if (elem.classList.contains('active')) {
			elem.classList.remove('active');
		}
	}

	for (let elem of itemName) {
		if (elem.classList.contains('active')) {
			elem.classList.remove('active');
		}
	}

	let childrenFirst = items[swiper.activeIndex].querySelector('.item__count');
	let childrenSecond = items[swiper.activeIndex].querySelector('.item__name');

	childrenFirst.classList.add('active');
	childrenSecond.classList.add('active');

	let swiperSlide = document.querySelectorAll('.swiper-slide');
		activeSlide = swiper.activeIndex;
		progressBar = items[swiper.activeIndex].querySelector('.item__progressbar');
		i = 0;

	activeSlides(activeSlide)
})

// ===== feadback slider ========================================================================================================================================================


let feadbackSlider = new Swiper('.feadback-slider', {
	pagination: {
		el: '.swiper-pagination',
    	type: 'bullets',
    	clickable: true,
	},
	navigation: {
   	  nextEl: '.swiper-button-next',
   	  prevEl: '.swiper-button-prev',
   	},
    grabCursor: true,
});

// ===== Number animation with slow motion ========================================================================================================================================================

/* let animationTime = 1000; // ms
let numb = 150;
let step = 1;
let value = animationTime / numb / step;
let i = 0;
let number = 0;

function animation(num, elem) {
	let timeout = setTimeout(() => {
		if (num >= number) {
			if (i > numb / step - 15) { // замедление "15" нужно менять
				value += 10;
			}
			i++;

			elem.firstChild.innerHTML = number; // изменение числа
			number += step;
			animation(num, elem);
		} else if (num < number) {
			clearTimeout(timeout)
		}
	}, value)
}; */

// ===== Dropdown menu ========================================================================================================================================================

/* 
let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

let body = document.querySelector('body');

if (isMobile.any()) {
	
	body.classList.add('touch');
	let arrow=document.querySelectorAll('.arrow');

	for (i = 0; i < arrow.length; i++) {
		let thisLink=arrow[i].previousElementSibling;
		let subMenu=arrow[i].nextElementSibling;
		let thisArrow=arrow[i];

		thisLink.classList.add('parent');
		arrow[i].addEventListener('click', function(){
			subMenu.classList.toggle('open');
			thisArrow.classList.toggle('active');
		});
	}

} else {
	body.classList.add('mouse');
}; */;

let flexElem = document.querySelectorAll('.flex__elem');

if (document.body.clientWidth < 992 && document.body.clientWidth > 768) {
	if (flexElem.length % 2 == 1) {
		flexElem[flexElem.length - 1].classList.add('excess');
	}
}

// ===== carousel ========================================================================================================================================================

let hide = document.querySelectorAll('.hide');
	carouselItem = document.querySelectorAll('.extra-block');
	normalItem = document.querySelectorAll('.normal-block');

for (let elem of normalItem) {
	elem.addEventListener('click', (event) => {
		for (let elem1 of carouselItem) {
			if (elem.nextElementSibling != elem1 && !elem1.classList.contains('hide')) {
				elem1.classList.add('hide');

				let arrowHide = document.querySelectorAll('.item-carousel__arrow');
				for (let arrow of arrowHide) {
					arrow.classList.remove('transform')
				}
			}
		}

		if (elem.nextElementSibling.classList.contains('hide')) {
			
			let arrowHide = elem.querySelector('.item-carousel__arrow');
				arrowHide.classList.add('transform')
			elem.nextElementSibling.classList.remove('hide');

		} else if (!elem.nextElementSibling.classList.contains('hide')) {
			let arrowHide = elem.querySelector('.item-carousel__arrow');
			
			arrowHide.classList.remove('transform')
			elem.nextElementSibling.classList.add('hide')

		}
	})
}