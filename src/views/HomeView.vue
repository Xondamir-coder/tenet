<template>
	<CursorCircle />
	<main class="main" ref="mainRef">
		<img class="pattern" src="@/assets/pattern.jpg" alt="" />
		<Logo class="logo" />
		<ul class="list">
			<li
				@click="navigateTo(link)"
				class="list__item"
				v-for="link in links"
				:class="{ 'list__item--active': link == activeLink }"
				:key="link">
				{{ link }}
			</li>
		</ul>
		<section id="we" class="create">
			<div class="create__left">
				<p class="create__big">Создаём</p>
				<p class="create__massive">Каноны</p>
			</div>
			<div class="create__right">
				<h1 class="create__right-title">
					TENET GROUP – Согласны ли вы с тем, что будущее – это не то, что нас ждет, а то,
					что мы создаем?
				</h1>
				<p class="create__right-text" v-html="createText"></p>
				<button class="more-button" @click="showOrCollapseCreateText" type="button">
					{{ createText.length > 153 ? 'Скрыть...' : 'Показать еще...' }}
				</button>
			</div>
		</section>
		<section class="boss">
			<div class="boss__speech">
				<svg
					width="33"
					height="25"
					viewBox="0 0 33 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M5.35654 24.3179H0L4.41127 11.7961H0.420121V0.317871H11.9734V10.6483L5.35654 24.3179Z"
						fill="white" />
					<path
						d="M26.3831 24.3179H21.0266L25.4378 11.7961H21.4467V0.317871H33V10.6483L26.3831 24.3179Z"
						fill="white" />
				</svg>
				<p class="boss__text">
					Комфорт, безопасность, принадлежность, свобода — это основные потребности,
					врожденные нам природой с самого рождения. Правильная архитектура служит
					связующим звеном между человеком и бескрайними просторами природы, удовлетворяя
					эти важные человеческие нужды.
				</p>
				<p class="boss__text">
					Мы стремимся создавать пространства, которые не просто существуют, а живут в
					гармонии с окружающим миром и с нашими будущими резидентами.
				</p>
			</div>
			<div class="boss__image">
				<div class="boss__image-container">
					<img src="@/assets/images/boss.avif" alt="boss pic" />
				</div>
				<svg
					class="boss__signature"
					width="249"
					height="231"
					viewBox="0 0 249 231"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M154.034 97.4153C158.755 92.7937 163.692 86.9085 166.324 83.9214C167.158 85.0236 165.761 89.8831 171.937 85.0222C175.528 82.1956 183.594 73.6635 184.922 73.7683C185.838 73.8409 184.798 74.3032 186.498 74.074C187.206 73.9778 187.854 73.597 188.468 73.2024C189.862 72.3062 190.804 71.1907 191.987 70.3018C191.495 74.5424 185.426 102.72 197.442 98.1537C200.445 97.0123 204.008 92.817 203.531 90.1086C200.883 88.649 200.249 93.484 197.798 94.8265C189.477 99.3842 191.109 79.7092 193.312 71.5678C194.051 68.8347 194.31 69.8593 195.374 68.0186L199.907 54.3078C201.376 49.6948 205.104 39.3504 204.284 35.2897C201.106 36.2056 199.681 41.4525 198.067 46.8175C196.717 51.2937 195.231 56.0867 194.26 60.685C188.126 63.1456 189.559 64.3857 181.955 72.7524C179.137 75.8554 172.582 82.4198 169.007 84.4921C170.073 78.6576 172.942 79.4021 174.83 76.7591C181.177 67.8757 178.258 65.5875 173.46 71.5789L161.67 85.6608C158.055 89.8511 149.825 100.785 144.501 101.754V101.931C129.819 106.379 150.287 86.1478 153.343 80.6879C155.418 76.9821 156.91 73.8905 158.757 69.7814C159.718 67.644 163.668 60.0931 162.272 58.4733C159.909 56.0867 153.755 69.4129 152.201 72.3246C148.358 79.5289 148.327 81.3943 145.607 85.5265C145.143 85.7582 144.682 86.0023 144.228 86.2574C138.226 94.8857 130.509 107.841 142.99 104.803C147.24 103.767 153.589 99.9621 154.243 97.5079C154.174 97.472 154.104 97.4426 154.034 97.4153ZM211.103 62.6377C210.565 56.0558 211.136 59.5397 207.588 57.9443C203.393 56.0569 199.241 64.7815 201.026 66.5356C202.416 67.6598 202.923 66.3051 204.614 65.3806C206.312 64.4511 206.551 64.8641 208.468 63.5633C210.506 66.1338 212.63 64.7938 217.771 61.919L247.881 44.3901C249.661 42.7419 249.35 40.6843 246.716 41.742C239.551 44.6217 218.774 60.1671 211.103 62.6377Z"
						fill="white" />
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M124.006 136.974C116.344 125.662 124.016 113.828 131.239 108.869C131.322 117.667 133.399 117.141 130.528 124.13C129.353 126.994 128.616 128.741 127.382 131.562L124.006 136.974ZM154.815 5.34955C155.438 5.34955 153.159 12.9705 149.722 22.3709C148.995 24.3621 148.275 26.2706 147.584 28.0456C146.329 31.5961 144.955 35.4157 143.501 39.3957C141.364 45.2375 139.306 50.7358 137.464 55.5407C136.924 57.2531 136.255 59.2153 135.494 61.299C133.042 68.0047 130.548 73.4418 129.926 73.4418C129.303 73.4418 130.781 68.0047 133.234 61.299C133.995 59.2153 134.762 57.2531 135.474 55.5407C137.146 50.7358 139.104 45.2375 141.241 39.3957C142.695 35.4157 144.115 31.5961 145.455 28.0456C146.059 26.2706 146.737 24.3621 147.462 22.3709C150.9 12.9705 154.191 5.34955 154.815 5.34955ZM138.423 105.052L135.321 110.561C135.147 110.254 134.427 111.21 133.991 111.551C135.508 103.742 135.887 106.81 138.423 105.052ZM123.938 109.026C124.196 101.947 125.729 97.6594 127.864 91.9403C129.931 95.7487 130.675 99.0084 130.762 103.762L123.938 109.026ZM120.559 89.8477C116.008 105.72 109.739 118.669 117.383 143.649C123.798 164.613 34.7011 264.503 9.49774 213.05C-7.78676 177.763 17.4255 131.545 35.3085 112.67C70.911 75.0961 128.231 63.0882 120.559 89.8477ZM125.147 75.3558C117.383 74.6091 118.477 72.4049 104.836 72.4049C58.7716 72.4049 1.00513 124.804 0.0127681 187.475C-0.991549 250.839 57.4605 241.45 101.877 181.014C113.152 165.672 115.289 159.376 124.467 145.877C129.575 138.362 131.059 140.653 134.329 127.969C136.944 117.823 141.366 114.924 141.391 103.791C136.769 97.6561 132.703 102.727 131.317 89.3763C129.882 75.5578 166.726 4.28712 156.428 0.347442C147.647 -1.25819 128.345 63.0045 125.147 75.3558Z"
						fill="white" />
				</svg>
			</div>
			<div class="boss__id">
				<h1 class="boss__name">Дониер Алимов</h1>
				<p class="boss__job">Генеральный директор</p>
			</div>
		</section>
		<section id="mission" class="mission">
			<div class="mission__box" v-for="mission in missions" :key="mission.title">
				<h1 class="mission__title">
					{{ mission.title }}
				</h1>
				<p class="mission__subtitle">{{ mission.subtitle }}</p>
				<p class="mission__text" v-if="!isBig">
					{{ mission.fullText ? mission.text : `${mission.text.slice(0, 100)} ...` }}
				</p>
				<p class="mission__text" v-else>
					{{ mission.text }}
				</p>
				<button
					class="more-button"
					@click="mission.fullText = !mission.fullText"
					type="button"
					v-if="!isBig">
					{{ mission.fullText ? 'Скрыть...' : 'Показать еще...' }}
				</button>
			</div>
		</section>
		<section id="goals" class="goals">
			<h1 class="goals__title">Цели</h1>
			<div class="goals__container">
				<div class="goals__box" v-for="goal in goals" :key="goal.img">
					<div class="goals__box-banner">
						<img :src="goal.img" :alt="goal.title" />
						<div class="goals__box-content">
							<h2 class="goals__box-title">{{ goal.title }}</h2>
							<h3 class="goals__box-subtitle">{{ goal.subtitle }}</h3>
						</div>
					</div>
					<p class="goals__box-text">{{ goal.text }}</p>
				</div>
			</div>
		</section>
		<section class="partners">
			<h1 class="partners__title">Наши партнёры</h1>
			<ul class="partners__list">
				<li class="partners__item" v-for="partnerImg in partnerImgs" :key="partnerImg">
					<img :src="partnerImg" alt="partner img" />
				</li>
			</ul>
		</section>
		<Particles />
		<Footer />
		<nav class="navbar">
			<button
				@click="navigateTo(name)"
				class="navbar__button"
				v-for="{ link, name, icon } in bottomNavLinks"
				:key="name"
				:class="{ 'navbar__button--active': name == activeLink }">
				<component :is="icon"></component>
				<span>{{ name }}</span>
			</button>
		</nav>
	</main>
</template>

<script setup>
import Logo from '@/components/icons/Logo.vue';
import goalImg1 from '@/assets/images/goal-1.avif';
import goalImg2 from '@/assets/images/goal-2.avif';
import goalImg3 from '@/assets/images/goal-3.avif';
import partnerImg1 from '@/assets/images/partner-1.avif';
import partnerImg2 from '@/assets/images/partner-2.png';
import Footer from '@/components/Footer.vue';
import lenis from '@/js/lenis';
import { onMounted, ref } from 'vue';
import Particles from '@/components/Particles.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Crown from '@/components/icons/Crown.vue';
import Briefcase from '@/components/icons/Briefcase.vue';
import Eye from '@/components/icons/Eye.vue';
import Radar from '@/components/icons/Radar.vue';
import Timer from '@/components/icons/Timer.vue';
import CursorCircle from '@/components/CursorCircle.vue';

gsap.registerPlugin(ScrollTrigger);

const isBig = window.innerWidth > 500;
const goals = [
	{
		title: 'Статус',
		subtitle: 'лидера',
		text: 'Мы нацелены на достижение позиции лидера на рынке недвижимости, постоянно расширяя наше присутствие и предлагая инновационные продукты, которые будут превосходить ожидания клиентов.',
		img: goalImg1
	},
	{
		title: 'Надежность',
		subtitle: 'и вдохновение',
		text: 'Мы стремимся выходить за привычные рамки, создавая пространства, которые смогут не только отлично выполнять свою практическую функцию, но и будут иметь значимую ценность, вдохновляя на развитие и улучшая качество жизни.',
		img: goalImg2
	},
	{
		title: 'Довольство',
		subtitle: 'клиентов',
		text: 'Мы ориентируемся на потребности и желания наших клиентов, обеспечивая высокий уровень обслуживания и индивидуальный подход. Мы стремимся превзойти их ожидания, создавая пространства, где люди чувствуют себя счастливыми и защищенными.',
		img: goalImg3
	}
];
const partnerImgs = [partnerImg1, partnerImg2];
const links = ['Мы', 'Миссия', 'Видение', 'Цели', 'Скоро'];
const bottomNavLinks = [
	{
		name: 'Мы',
		link: 'we',
		icon: Crown
	},
	{
		name: 'Миссия',
		link: 'mission',
		icon: Briefcase
	},
	{
		name: 'Видение',
		link: 'mission',
		icon: Eye
	},
	{
		name: 'Цели',
		link: 'goals',
		icon: Radar
	},
	{
		name: 'Скоро',
		link: 'soon',
		icon: Timer
	}
];
const linkMap = {
	Миссия: 'mission',
	Видение: 'mission',
	Цели: 'goals',
	Скоро: 'soon',
	Мы: 'we'
};
const craeteInitialText = `Компания Tenet Group выходит за рамки привычного представления о девелопменте и
					строительстве. Мы тщательно прорабатываем каждую деталь наших проектов, четко
					осознавая как целостную природу строительства, так и значение каждой отдельной
					части в создании единого сооружения.
					<br />
					<br />
					Наши дома — это не просто стены и крыша, это фундамент для самых важных моментов
					вашей жизни. Мы воплощаем пространства, где вы сможете созидать моменты счастья
					и создавать историю, которая останется с вами навсегда.`;

const missions = ref([
	{
		title: 'Миссия',
		subtitle:
			'Мы верим, что каждое сооружение должно не только эффективно выполнять свои задачи, но и вдохновлять.',
		text: 'Миссией Tenet Group является создание новых стандартов жилого и коммерческого пространства, которые станут вектором для всей отрасли. Мы стремимся воплотить комфортные и современные пространства для жизни и работы людей, которые будут отражать их мечты и желания, а также соответствовать их ожиданиям о современной и продуманной недвижимости.',
		fullText: false
	},
	{
		title: 'Видение',
		subtitle: 'Строительство для нас больше, чем создание физической инфраструктуры',
		text: 'Мы нацелены на получении позиции лидера отрасли, создавая не просто здания, но и возможности для людей, поддерживая их ценности и укрепляя уверенность в будущем. Мы сотрудничаем с лучшими архитекторами и инженерами, чтобы гарантировать высокие стандарты строительства и долговечность наших объектов.',
		fullText: false
	}
]);
const createText = ref(craeteInitialText.slice(0, 150));
const mainRef = ref();
const activeLink = ref('Мы');

const showOrCollapseCreateText = () =>
	createText.value.length > 153
		? (createText.value = createText.value.slice(0, 150) + '...')
		: (createText.value = craeteInitialText);
const navigateTo = linkName => {
	activeLink.value = linkName;
	lenisScrollTo(document.getElementById(linkMap[linkName]));
};
const lenisScrollTo = name =>
	lenis.scrollTo(name, {
		duration: 1.2,
		ease: 'power3.inOut'
	});

onMounted(() => {
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('active');
				} else {
					entry.target.classList.remove('active');
				}
			});
		},
		{
			threshold: 0.3
		}
	);
	Array.from(mainRef.value.children).forEach(el => {
		observer.observe(el);
	});
	gsap.to('.list', {
		scrollTrigger: {
			trigger: '.list',
			pin: true,
			endTrigger: '.main',
			toggleClass: 'pinned'
		}
	});
});
</script>

<style lang="scss" scoped>
.navbar {
	padding: 1rem 0 !important;
	width: 100%;
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: space-around;
	background-color: #000;
	box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.08);
	@media only screen and (min-width: 768px) {
		display: none;
	}

	&__button {
		background-color: transparent;
		border: none;
		display: flex;
		flex-direction: column;
		color: #fff;
		align-items: center;
		gap: 3px;
		font: inherit;
		opacity: 0.4;
		transition: opacity 500ms;
		&--active {
			opacity: 1;
		}
	}
}
.more-button {
	cursor: pointer;
	font-family: var(--font-roboto);
	background-color: transparent;
	border: none;
	text-decoration: underline;
	font-size: 1.4rem;
	font-weight: 700;
	color: #000;
	display: flex;
	justify-content: flex-start;
	padding: 1rem 0;
	@media only screen and (min-width: 500px) {
		display: none;
	}
}
.partners {
	display: flex;
	flex-direction: column;
	gap: 3rem;
	&.active {
		.partners__title {
			transform: translateY(0);
			opacity: 1;
		}
		.partners__item {
			transform: translateX(0);
			opacity: 1;
		}
	}
	&__title {
		align-self: center;
		font-size: 9rem;
		font-weight: bold;
		transform: translateY(3rem);
		opacity: 0;
		transition: opacity 0.5s, transform 0.5s;
		@media only screen and (max-width: 768px) {
			font-size: 6rem;
		}
	}
	&__list {
		list-style: none;
		display: flex;
		gap: 3rem;
		justify-content: center;
		padding: 0 5rem;
	}
	&__item {
		transform: translateX(100%);
		opacity: 0;
		transition: opacity 0.5s, transform 0.5s;
		height: 6rem;
		&:nth-child(2) {
			transition-delay: 150ms;
		}
		img {
			width: 100%;
			height: 100%;
		}
	}
}
.goals {
	background-color: #000;
	padding: 5rem 10rem !important;
	display: flex;
	gap: 4.4rem;
	flex-direction: column;
	&.active {
		.goals__box {
			transform: scale(1);
			opacity: 1;
		}
		.goals__title {
			opacity: 1;
			transform: translateY(0);
		}
	}
	&__box {
		border-radius: 40px;
		overflow: hidden;
		color: #fff;
		transform: scale(0);
		opacity: 0;
		transition: opacity 1s, transform 1s;
		&:nth-child(2) {
			transition-delay: 300ms;
		}
		&:nth-child(3) {
			transition-delay: 600ms;
		}
		&-banner {
			position: relative;
			&::before {
				content: '';
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
				background-image: linear-gradient(to bottom, transparent, #000000);
			}
		}
		&-content {
			position: absolute;
			bottom: 0;
			padding: 2rem;
		}
		&-title {
			font-size: 50px;
			font-weight: bold;
		}
		&-subtitle {
			font-size: 24px;
			font-weight: bold;
		}
		&-text {
			font-size: max(2rem, 17px);
			padding: 2rem;
		}
		img {
			border-radius: 40px;
			width: 100%;
			height: 44rem;
			object-fit: cover;
		}
	}
	&__container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		justify-content: center;
		gap: 2.4rem;
	}
	&__title {
		align-self: center;
		color: #fff;
		font-size: 9rem;
		font-weight: bold;
		transform: translateY(3rem);
		opacity: 0;
		transition: opacity 0.5s, transform 0.5s;
		@media only screen and (max-width: 768px) {
			font-size: 6rem;
		}
	}
}
.mission {
	display: grid;
	gap: 3.4rem;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	&.active {
		.mission__box {
			transform: translateX(0);
			opacity: 1;
		}
	}
	&__box {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		opacity: 0;
		transition: opacity 1s, transform 1s;
		&:first-child {
			transform: translateX(-100%);
		}
		&:last-child {
			transform: translateX(100%);
		}
	}
	&__title {
		font-size: 6.4rem;
		font-weight: bold;
		@media only screen and (max-width: 768px) {
			font-size: max(4rem, 32px);
		}
	}
	&__subtitle {
		font-size: max(1.5rem, 14px);
		font-style: italic;
		font-family: var(--font-roboto);
	}
	&__text {
		font-family: var(--font-roboto);
		font-size: max(1.8rem, 14px);
		font-weight: 500;
	}
}
.boss {
	background-color: black;
	color: white;
	display: grid;
	grid-template-areas: 'speech speech pic id';
	gap: 7rem;
	padding-top: 3rem !important;
	padding-bottom: 3rem !important;
	font-family: var(--font-roboto);
	&.active {
		.boss__id,
		.boss__speech {
			transform: translateX(0);
			opacity: 1;
		}
		.boss__image-container,
		.boss__signature {
			scale: 1;
		}
	}

	@media only screen and (max-width: 1200px) {
		grid-template-areas:
			'speech'
			'pic'
			'id';
	}
	&__signature {
		position: absolute;
		right: -3rem;
		bottom: 5rem;
		width: 24.9rem;
		height: 23rem;
		scale: 0;
		transition: scale 0.5s 200ms;
		@media only screen and (max-width: 1200px) {
			right: 0;
			bottom: -10rem;
		}
	}
	&__text {
		font-size: 16px;
	}
	&__id {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 5px;
		font-style: italic;
	}
	&__name {
		font-size: 22px;
		font-weight: 700;
	}
	&__job {
		font-size: 18px;
		font-weight: 400;
	}
	&__speech {
		grid-area: speech;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		transform: translateX(-100%);
		opacity: 0;
		transition: opacity 1s, transform 1s;
	}
	&__image {
		grid-area: pic;
		position: relative;
		display: flex;
		padding-right: 15rem;
		@media only screen and (max-width: 1200px) {
			padding-right: 0;
		}
		&-container {
			background-color: #fff;
			border-radius: 50%;
			transform: translateY(-30px) scale(1.3);
			scale: 0;
			transition: scale 0.5s;
			@media only screen and (max-width: 1200px) {
				transform: none;
			}
		}
		img {
			transform: scale(0.95);
			border-radius: 50%;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	&__id {
		grid-area: id;
		transform: translateX(200%);
		opacity: 0;
		transition: opacity 1s, transform 1s;
	}
}
.create {
	display: flex;
	align-items: flex-start;
	gap: 2rem;
	margin-bottom: 5rem;
	@media only screen and (max-width: 1000px) {
		flex-direction: column;
	}
	&.active {
		.create__big,
		.create__massive {
			transform: translateX(0);
			opacity: 1;
		}
		.create__right > * {
			transform: translateX(0);
			opacity: 1;
		}
	}
	& > * {
		flex: 1;
	}
	&__left {
		line-height: 0.7;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	&__right {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		& > * {
			transform: translateX(100%);
			opacity: 0;
			transition: transform 1s, opacity 1s;
		}
		&-text {
			font-family: var(--font-roboto);
			font-weight: 500;
			font-size: max(1.8rem, 14px);
			line-height: 1.5;
			transition-delay: 200ms;
		}
		&-title {
			font-size: 3.8rem;
			font-weight: bold;
		}
	}
	&__big {
		font-size: 14rem;
		transform: translateX(-100%);
		opacity: 0;
		transition: opacity 1s, transform 1s;
		@media only screen and (max-width: 500px) {
			font-size: 54px;
		}
	}
	&__massive {
		font-size: 18rem;
		font-weight: 600;
		line-height: 1;
		transform: translateX(-100%);
		opacity: 0;
		transition: opacity 1s, transform 1s 200ms;
		@media only screen and (max-width: 500px) {
			font-size: 100px;
		}
	}
}
.list {
	display: flex;
	justify-content: space-between;
	margin: 5rem 0;
	z-index: 10;
	list-style: none;
	transition: background-color 1s;
	padding-top: 8px !important;
	padding-bottom: 8px !important;
	&.pinned {
		background-color: rgba(255, 255, 255, 0.8);
	}
	@media only screen and (max-width: 768px) {
		display: none;
	}
	&__item {
		padding: 1.5rem 2rem;
		border-radius: 15px;
		cursor: pointer;
		font-family: var(--font-gilroy);
		font-weight: 700;
		font-size: 20px;
		opacity: 0.7;

		transition: opacity 300ms, background-color 300ms, color 300ms;
		&--active {
			background-color: #000;
			color: #fff;
			opacity: 1;
		}
	}
}
.logo {
	align-self: center;
	width: 80%;
	max-width: 41.2rem;
	transform: scale(0);
	transition: transform 1s;
	&.active {
		transform: scale(1);
	}
}
.pattern {
	position: absolute;
	inset: 0;
	top: 10rem;
	width: 100%;
	padding: 0 !important;
	z-index: -1;
	opacity: 0.1;
	@media only screen and (max-width: 500px) {
		top: -8rem;
		width: 300%;
	}
}
.main {
	position: relative;
	padding-top: 6rem;
	display: flex;
	flex-direction: column;
	gap: 5rem;
	line-height: 1.5;
	overflow: hidden;
	& > *:not(.partners):not(svg) {
		padding: 0 10rem;
		@media only screen and (max-width: 1280px) {
			padding: 0 7rem;
		}
		@media only screen and (max-width: 768px) {
			padding: 0 4rem;
		}
		@media only screen and (max-width: 400px) {
			padding: 0 2rem;
		}
	}
}
</style>
