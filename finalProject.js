document.addEventListener("DOMContentLoaded", function ready() {
	let body = document.querySelector('body');
	let dataWeather;
	let heightWindow = document.documentElement.clientHeight;
	let dayImg = './image/day.jpg';
	let nightImg = './image/night.jpg';

	body.style.cssText = `
		transition: background-image 0.3s;
		margin: 0;
		padding: 0;
		background-image:	url(${dayImg});
		background-size: 100% 100%;
		overflow: hidden;
		height: ${heightWindow}px;
	`;
	body.insertAdjacentHTML('afterbegin',
		`<div class="wrapper">
		 	<div class="time--line">
		 	</div>
		</div>`);

	let wrapper = document.querySelector('.wrapper');
	let line = document.querySelector('.time--line');
	let arrDaysOfTheWeek = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
	let arrWordMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	let day;
	let month;
	let year;

	wrapper.style.height = "100%";

	line.style.cssText = `
		display: flex;
		justify-content: center;
	`;

	function setDate() {
		day = checkLength(new Date().getDate());
		month = new Date().getMonth();
		year = checkLength(new Date().getFullYear());
	}
	setDate();

	line.insertAdjacentHTML('afterbegin',
		`<div class="time--box" onselectstart="return false" onmousedown="return false">
			<div>
				Click on me!
			</div>
			<div class="time">
				${checkLength(new Date().getHours())}:${checkLength(new Date().getMinutes())}
			</div>
			<div class="date">
				${day}.${checkLength(month + 1)}.${year}
			</div>
		</div>`);

	let timeBox = document.querySelector('.time--box');

	document.querySelector('.time').style.padding = '5px 10px';
	document.querySelector('.date').style.padding = '5px 10px';

	timeBox.style.cssText = `
		transition: all 0.2s;
		text-align: center;
		osition: relative;
		text-shadow: none;
		color: #919191;
	`;

	let timeOut;
	let titleShow;

	function dayOfTheWeek() {
		let daySun = new Date().getDay() - 1;
		daySun < 0 ? daySun = 6 : null;
		return daySun;
	}

	timeBox.onmouseover = function (event) {
		this.style.cssText = `
			transition: all 0.2s;
			text-align: center;
			text-shadow: 3px 3px  4px #000;
			cursor: pointer;
			color: #fff;
			position: relative;
		`;

		function title() {
			timeBox.insertAdjacentHTML('afterend',
				`<div class="title--show">
				<div>${Number(day)} ${arrWordMonths[month]} ${year} г.</div>
			 	<div>${arrDaysOfTheWeek[dayOfTheWeek()]}</div>
			</div>`);
			titleShow = document.getElementsByClassName('title--show')[0];
			let left = event.clientX - titleShow.getBoundingClientRect().width / 3;
			titleShow.style.cssText = `
				position: absolute;
				background-color: rgba(255, 255, 255, 0.4);
				top: 60px;
				left: ${left}px;
				padding: 5px;
				border-radius: 4px;
			`;
		}

		let checkCalendar = document.getElementsByClassName('calendar--wrapper')[0];
		checkCalendar ? clearTimeout(timeOut) : timeOut = setTimeout(title, 700);
	};

	timeBox.onmouseout = function () {
		this.style.cssText = `
			transition: all 0.2s;
			text-align: center;
			text-shadow: none;
			cursor: default;
			color: #919191;
			position: relative;
		`;
		clearTimeout(timeOut);
		titleShow ? titleShow.remove() : null;
	}

	function checkLength(num) {
		String(num).length < 2 ? num = `0${num}` : null;
		return num;
	}
	function showTime() {
		let time = document.querySelector('.time');
		time.innerText = `${checkLength(new Date().getHours())}:${checkLength(new Date().getMinutes())}`;
	}
	function showDate() {
		let date = document.querySelector('.date');
		date.innerText = `${checkLength(new Date().getDate())}.${checkLength(new Date().getMonth() + 1)}.${new Date().getFullYear()}`;
	}
	setInterval(showTime, 100);
	setInterval(showDate, 100);

	timeBox.addEventListener('click', function clickCalendar(event) {
		titleShow ? titleShow.remove() : null;
		clearTimeout(timeOut);
		let checkCalendar = document.getElementsByClassName('calendar--wrapper')[0];
		if (checkCalendar) {
			checkCalendar.remove();
			month = new Date().getMonth();
			year = checkLength(new Date().getFullYear());
		} else {
			line.insertAdjacentHTML('afterend',
				`<div class="calendar--wrapper" onselectstart="return false" onmousedown="return false">
				<div class="calendar--top">
					<div>
						<a href="" class="calendar--top--link">${Number(day)} ${arrWordMonths[month]} ${year} г.</a>
					</div>
					<div class="calendar--top--weather">
					</div>
				</div>
				<div class="calendar--center">
					<div class="calendar--center--date">
						<div class="calendar--center--blocks" id="calendarLeftRow">
							&#x25C4
						</div>
						<div class="calendar--center--blocks" id="calendarMonthYear">
							${monthSlice(arrWordMonths[month])} ${year}
						</div>
						<div class="calendar--center--blocks" id="calendarRightRow">
							&#x25BA
						</div>
					</div>
					<table class="calendar--center--table">
					</table>
				</div>
				<div class="calendar--bottom">
					<div class="calendar--bottom--time">
						${setInterval(showSeconds, 10)}
					</div>
					<div>
						${arrDaysOfTheWeek[dayOfTheWeek()]}
					</div>
				</div>
			</div>`);

			function monthSlice(month) {
				month === 'мая' ? month = `${month.slice(0, month.length - 1)}й` : month.slice(month.length - 1) === "я" ? month = `${month.slice(0, month.length - 1)}ь` : month = month.slice(0, month.length - 1);
				return month.slice(0, 1).toUpperCase() + month.slice(1);
			}

			function showSeconds() {
				let seconds = document.querySelector('.calendar--bottom--time');
				if (seconds) {
					let timeString = `${checkLength(new Date().getHours())}:${checkLength(new Date().getMinutes())}:${checkLength(new Date().getSeconds())}`;
					seconds.innerText = timeString;
					if ((timeString === `00:00:00`) && (new Date().getMilliseconds() < 10)) {
						setDate();
						if (document.getElementsByClassName('calendar--wrapper')[0]) {
							document.getElementsByClassName('calendar--wrapper')[0].remove();
							clickCalendar();
						}
					}
				}
			}

			let calendarWrapper = document.getElementsByClassName('calendar--wrapper')[0];
			let calendarTop = document.getElementsByClassName('calendar--top')[0];
			let calendarTopLink = document.getElementsByClassName('calendar--top--link')[0];
			let calendarTopWeather = document.getElementsByClassName('calendar--top--weather')[0];
			let calendarCenter = document.getElementsByClassName('calendar--center')[0];
			let calendarCenterBlocks = [...document.querySelectorAll('.calendar--center--blocks')];
			let calendarCenterDate = document.getElementsByClassName('calendar--center--date')[0];
			let calendarCenterTable = document.getElementsByClassName('calendar--center--table')[0];
			let calendarCenterMonths;
			let calendarBottom = document.getElementsByClassName('calendar--bottom')[0];
			let calendarBottomTime = document.getElementsByClassName('calendar--bottom--time')[0];

			calendarWrapper.style.cssText = `
				background-color: rgba(255, 255, 255, 0.4);
				width: 400px;
				margin: auto;
				border: 4px double #000;
				border-radius: 6px;
				font-size: 14px;
				
			`;
			calendarTop.style.cssText = `
				padding:  15px 10px 10px;
				text-align: center;
				margin: auto;
				width: 65%;
			`;
			calendarTopLink.style.cssText = `
				text-decoration: none;
				color:#430fff;
				font-size: 16px;
			`;
			calendarTopWeather.style.cssText = `
				display: flex;
				justify-content: space-between;
				align-items: center;
				min-height: 110px;
				font-size: 16px;
			`;
			calendarCenter.style.cssText = `
				display: flex;
				flex-flow: column;
				align-items: center;
				padding: 20px 10px;
				font-size: 18px;
			`;
			calendarBottom.style.cssText = `
				padding: 15px;
				text-align: center;
				font-size: 16px;
			`;
			calendarBottomTime.style.cssText = `
				padding-bottom: 10px;
			`;
			calendarTopLink.onmouseover = function () {
				this.style.cssText = `
					text-decoration: uppercase;
					color:#430fff;
					font-size: 16px;
				`;
			};
			calendarTopLink.onmouseout = function () {
				this.style.cssText = `
					text-decoration: none;
					color:#430fff;
					font-size: 16px;
				`;
			};
			calendarCenterBlocks.forEach(item => {
				item.onmouseover = function () {
					this.style.cssText = `
						color:#429dff;
						cursor: default;
					`;
				};
				item.onmouseout = function () {
					this.style.cssText = `
						color:#000;
						cursor: default;
					`;
				};
			});

			function makeLoad() {
				calendarTopWeather.insertAdjacentHTML('beforeend',
					`<div class="loader-1"></div>`);

			}

			let dobleArr;
			let firstString;
			let lastString;

			function makeStyles1(itm) {
				itm.style.cssText = `
					border: 1px dotted #430fff;
					text-align: center;
					cursor: default;
					border-radius: 3px;
					background-color: rgba(67, 15, 255, 0.1);
				`;
			}
			function makeStyles2(itm) {
				itm.style.cssText = `
					color: #430fff;
					border: 1px solid #430fff;
					border-radius: 3px;
					text-align: center;
					cursor: default;
				`;
			}
			function makeStyles3(itm) {
				itm.style.cssText = `
					color:#000;
					cursor: default;
					text-align: center;
					border: 1px solid transparent;
					border-radius: 3px;
				`;
			}
			function makeStyles4(itm) {
				itm.style.cssText = `
					color:#429dff;
					cursor: default;
					text-align: center;
					border: 1px solid #429dff;
					border-radius: 3px;
				`;
			}

			makeCalendar();
			function makeCalendar() {
				calendarCenterMonths = document.getElementsByClassName('calendar--center--months')[0];

				calendarCenterTable ? calendarCenterTable.remove() : null;
				calendarCenter.insertAdjacentHTML('beforeend', `
					<table class="calendar--center--table">
					</table>
				`);
				calendarCenterTable = document.getElementsByClassName('calendar--center--table')[0];

				Date.prototype.daysInMonth = function (m) {
					return 33 - new Date(year, m, 33).getDate();
				};

				let firstDayOnTheWeek = new Date(year, month, 1).getDay();
				let sumDays = new Date().daysInMonth(month);

				calendarCenterDate.style.cssText = `
					width: 65%;
					display: flex;
					justify-content: space-between;
					padding: 0 10px 10px;
				`;
				calendarCenterTable.style.cssText = `
					width: 70%;
				`;

				for (let i = 1; i <= 8; i++) {
					calendarCenterTable.insertAdjacentHTML('beforeend',
						`<tr class="calendar--table--rows" id="calendar--table--row${i}">
							<td class="row${i}--columns" id="row${i}Column1"></td>
							<td class="row${i}--columns" id="row${i}Column2"></td>
							<td class="row${i}--columns" id="row${i}Column3"></td>
							<td class="row${i}--columns" id="row${i}Column4"></td>
							<td class="row${i}--columns" id="row${i}Column5"></td>
							<td class="row${i}--columns" id="row${i}Column6"></td>
							<td class="row${i}--columns" id="row${i}Column7"></td>
						</tr>`);
				}

				let arrDaysLittle = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
				let row1 = [...document.querySelectorAll('.row1--columns')];
				row1.forEach((item, index) => {
					item.innerHTML = arrDaysLittle[index];
					item.style.cssText = `
						text-align: center;
						font-weight: 600;
						font-size: 18px;
						cursor: default;
					`;
				});

				let bigArrColumns = [];

				for (let i = 2; i <= 8; i++) {
					[...document.querySelectorAll(`.row${i}--columns`)].forEach(item => bigArrColumns.push(item));
				}

				dobleArr = bigArrColumns;

				let sumDaysLast = new Date().daysInMonth(month - 1);
				let sunday = firstDayOnTheWeek - 1;
				sunday < 0 ? sunday = sunday + 7 : null;

				bigArrColumns.forEach((item, index) => {
					makeStyles3(item);
					item.onmouseover = function () {
						makeStyles4(item);
					};
					item.onmouseout = function () {
						makeStyles3(item);
						if (item.classList.contains('highlightDay')) {
							makeStyles1(item);
						}
					};
					item.addEventListener("click", function clickOnDay() {
						function eventCkick() {
							let highlightDay = document.getElementsByClassName('highlightDay')[0];
							if (highlightDay) {
								makeStyles3(highlightDay);
								highlightDay.style.backgroundColor = `transparent`;
								highlightDay.classList.remove('highlightDay');
							}
							if (item.classList.contains('now--day')) {
								makeStyles1(item);
								item.style.color = '#fff';
								item.onmouseout = function () {
									makeStyles1(item);
									item.style.color = '#fff';
								};
							} else {
								let nowDayhigh = document.getElementsByClassName('now--day')[0];
								if (nowDayhigh) {
									makeStyles2(nowDayhigh);
									nowDayhigh.style.backgroundColor = `transparent`;
									document.getElementsByClassName('now--day')[0].onmouseout = function () {
										return makeStyles2(this);
									};
								}
								item.classList.add('highlightDay');
								highlightDay = document.getElementsByClassName('highlightDay')[0];
								makeStyles1(highlightDay);
							}
						}
						if (index < firstBlock) {
							clickMinus();
							let i = index;
							i > 6 ? i = i - 7 : null;
							lastString[i].classList.add('highlightDay');
							highlightDay = document.getElementsByClassName('highlightDay')[0];
							makeStyles1(highlightDay);
							highlightDay.onmouseout = function () {
								lastString[i].classList.contains('highlightDay') ? makeStyles1(this) : makeStyles3(this);
							};
						} else if (index > lastBlock) {
							document.getElementById(`calendar--table--row8`) ? lastString = [...document.querySelectorAll(`.row8--columns`)] : lastString = [...document.querySelectorAll(`.row7--columns`)];
							let i = lastString.findIndex(item2 => item === item2);
							clickPlus();
							i > 6 ? i = i - 7 : null;
							firstString[i].classList.add('highlightDay');
							highlightDay = document.getElementsByClassName('highlightDay')[0];
							makeStyles1(highlightDay);
							highlightDay.onmouseout = function () {
								firstString[i].classList.contains('highlightDay') ? makeStyles1(this) : makeStyles3(this);
							};
						} else {
							eventCkick();
						}
					});
				});

				let firstBlock = 0;
				let lastBlock = 0;
				for (let i = 1; i <= sumDays; i++) {
					let start = firstDayOnTheWeek + i + 5;
					i === 1 ? firstBlock = start : i === sumDays ? lastBlock = start : null;
					if (`${year},${month},${i}` === `${new Date().getFullYear()},${new Date().getMonth()},${new Date().getDate()}`) {

						function highlightDay(item) {
							makeStyles2(item);
							item.classList.add('now--day');
						}

						highlightDay(bigArrColumns[start]);
						bigArrColumns[start].onmouseout = function () {
							highlightDay(bigArrColumns[start]);
						};
					}
					bigArrColumns[start].innerHTML = i;
				}

				for (let i = 0; i < sunday; i++) {
					let end = firstBlock - i - 1;
					bigArrColumns[end].innerHTML = sumDaysLast - i;
					bigArrColumns[end].style.opacity = "0.5";
					bigArrColumns[end].onmouseout = function () {
						makeStyles3(this);
						this.style.opacity = `0.5`;
					};
				}
				let afterDays;
				for (let i = 1; bigArrColumns.length - 1 !== afterDays; i++) {
					afterDays = lastBlock + i;
					bigArrColumns[afterDays].innerHTML = i;
					bigArrColumns[afterDays].style.opacity = "0.5";
					bigArrColumns[afterDays].onmouseout = function () {
						makeStyles3(this);
						this.style.opacity = `0.5`;
					};
				}
				firstBlock > 6 ? document.getElementById('calendar--table--row2').remove() : null;
				lastBlock < 42 ? document.getElementById(`calendar--table--row8`).remove() : null;
			}
			function clickMinus() {
				if (calendarCenterMonths) {
					year = --year;
					clickOnMonthYear();
				} else {
					month = --month;
					if (month < 0) {
						year = --year;
						month = 11;
					}
					makeCalendar();
					document.getElementById(`calendar--table--row8`) ? lastString = [...document.querySelectorAll(`.row8--columns`)] : lastString = [...document.querySelectorAll(`.row7--columns`)];
					calendarMonthYear.innerHTML = `${monthSlice(arrWordMonths[month])} ${year}`;
				}
			}
			function clickPlus() {
				if (calendarCenterMonths) {
					year = ++year;
					clickOnMonthYear();
				} else {
					month = ++month;
					if (month > 11) {
						year = ++year;
						month = 0;
					}
					makeCalendar();
					document.getElementById(`calendar--table--row2`) ? firstString = [...document.querySelectorAll(`.row2--columns`)] : firstString = [...document.querySelectorAll(`.row3--columns`)];
					calendarMonthYear.innerHTML = `${monthSlice(arrWordMonths[month])} ${year}`;
				}
			}
			function clickOnMonthYear() {
				calendarCenterTable.remove();
				calendarCenterMonths ? calendarCenterMonths.remove() : null;
				calendarCenter.insertAdjacentHTML('beforeend', `
					<table class="calendar--center--months">
					</table>
				`);
				calendarCenterMonths = document.getElementsByClassName('calendar--center--months')[0];
				calendarCenterMonths.style.cssText = `
					text-align: center;
				`;

				for (let i = 1; i <= 3; i++) {
					calendarCenterMonths.insertAdjacentHTML('beforeend',
						`<tr class="calendar--month--rows" id="calendar--month--row${i}">
							<td class="month--row${i}--columns" id="month--row${i}Column1"></td>
							<td class="month--row${i}--columns" id="month--row${i}Column2"></td>
							<td class="month--row${i}--columns" id="month--row${i}Column3"></td>
							<td class="month--row${i}--columns" id="month--row${i}Column4"></td>
						</tr>`);
				}

				let bigArrMonths = [];

				for (let i = 1; i <= 3; i++) {
					[...document.querySelectorAll(`.month--row${i}--columns`)].forEach(item => bigArrMonths.push(item));
				}
				bigArrMonths.forEach((item, index) => {
					item.innerHTML = `${monthSlice(arrWordMonths[index])}`;
					makeStyles3(item);
					item.style.padding = `5px`;
					item.onmouseover = function () {
						makeStyles4(item);
						item.style.padding = `5px`;
					};
					item.onmouseout = function () {
						makeStyles3(item);
						item.style.padding = `5px`;
					};
					if (index === new Date().getMonth() && year === new Date().getFullYear()) {
						makeStyles2(item);
						item.style.padding = `5px`;

						item.onmouseout = function () {
							makeStyles2(item);
							item.style.padding = `5px`;
						}
					}
					item.addEventListener("click", function clickOnMonth() {
						month = index;
						calendarMonthYear.innerHTML = `${monthSlice(arrWordMonths[month])} ${year}`;
						calendarCenterMonths.remove();
						makeCalendar();
					});
				});

				calendarMonthYear.innerHTML = year;
			}

			calendarLeftRow.addEventListener("click", function clickLeft() {
				return clickMinus();
			});
			calendarRightRow.addEventListener("click", function clickRight() {
				return clickPlus();
			});
			calendarMonthYear.addEventListener("click", function clickCenter() {
				return clickOnMonthYear();
			});
			calendarTopLink.addEventListener("click", function clickOnLinkTop(event) {
				month = new Date().getMonth();
				year = new Date().getFullYear();
				calendarCenterMonths ? calendarCenterMonths.remove() : null;
				makeCalendar();
				calendarMonthYear.innerHTML = `${monthSlice(arrWordMonths[month])} ${year}`;
				getWeather();
				event.preventDefault();
			});
			function getWeather(argument) {
				return (async function showWeather() {
					try {
						await getData();

						let main = dataWeather.main;
						let weather = dataWeather.weather[0];
						let icon = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
						calendarTopWeather.insertAdjacentHTML('beforeend', `
								<div class="center--weather--left">
									${Math.round(main.temp)}C&#176;
								</div>
								<div class="center--weather--right">
									<img class="center--weather--icon" src="${icon}">
									<div class="center--weather--text">
										${weather.description}
									</div>
								</div>
							`);

						let degCelsium = document.getElementsByClassName('center--weather--left')[0];
						let iconWeather = document.getElementsByClassName('center--weather--icon')[0];
						let textWeather = document.getElementsByClassName('center--weather--text')[0];

						degCelsium.style.cssText = `
							font-size: 36px;
							padding-top: 20px; 
						`;
						iconWeather.style.cssText = `
							display:block;
							margin: auto;
							width: 80px;
							height: 80px;
						`;
						textWeather.style.cssText = `
							font-size: 18px;
						`;
					} catch (e) {
						console.log(e);
					}
				})();
			}
			getWeather();
		}
	});

	async function findIpUser() {
		try {
			const response = await fetch(`https://ipwhois.app/json/`);
			const data = await response.json();
			return data;
		} catch (e) {
			console.error(e);
		}
	}

	function getData() {
		return (async function () {
			try {
				if (document.getElementsByClassName('center--weather--left')[0]) {
					document.getElementsByClassName('center--weather--left')[0].remove();
					document.getElementsByClassName('center--weather--right')[0].remove();
				}
				let result = await findIpUser();
				let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${result.city},${result.country_code}&appid=8a0a00bf5076e76c43dbca5ec079c9df&units=metric`);
				const data = await response.json();
				let sys = data.sys;
				let sunrise = new Date(sys.sunrise * 1000);
				let sunset = new Date(sys.sunset * 1000);
				if (sunrise.getHours() > new Date().getHours() || sunset.getHours() < new Date().getHours()) {
					body.style.backgroundImage = `url(${nightImg})`;
				} else if (sunrise.getHours() === new Date().getHours()) {
					if (sunrise.getMinutes() > new Date().getMinutes()) {
						body.style.backgroundImage = `url(${nightImg})`;
					} else {
						body.style.backgroundImage = `url(${dayImg})`;
					}
				} else if (sunset.getHours() === new Date().getHours()) {
					if (sunset.getMinutes() < new Date().getMinutes()) {
						body.style.backgroundImage = `url(${nightImg})`;
					} else {
						body.style.backgroundImage = `url(${dayImg})`;
					}
				} else {
					body.style.backgroundImage = `url(${dayImg})`;
				}
				dataWeather = data;
			} catch (e) {
				console.error(e);
			}
		})();
	}
	getData();
});

