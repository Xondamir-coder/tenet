<template>
	<CursorCircle />
	<main class="main" ref="mainRef">
		<BgPattern />
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
			<div class="boss__content">
				<div class="boss__speech">
					<p class="boss__text">
						Комфорт, безопасность, принадлежность, свобода — это основные потребности,
						врожденные нам природой с самого рождения. Правильная архитектура служит
						связующим звеном между человеком и бескрайними просторами природы,
						удовлетворяя эти важные человеческие нужды.
					</p>
				</div>
				<div class="boss__speech">
					<p class="boss__text">
						Мы стремимся создавать пространства, которые не просто существуют, а живут в
						гармонии с окружающим миром и с нашими будущими резидентами.
					</p>
				</div>
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
import BgPattern from '@/components/BgPattern.vue';

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
	position: relative;
	cursor: none;
	display: grid;
	gap: 3.4rem;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	z-index: 1;
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
	padding-top: 3rem !important;
	padding-bottom: 3rem !important;
	font-family: var(--font-roboto);
	display: flex;
	flex-direction: column;
	gap: 3rem;

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
	&__content {
		display: flex;
		flex-wrap: wrap;
		column-gap: 1rem;
		row-gap: 4rem;
		& > * {
			flex: 1;
			min-width: 300px;
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
	cursor: none;

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
		align-items: flex-start;
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
	cursor: none;
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
	& > *:not(.list):not(.logo):not(.pattern__container):not(.mission) {
		z-index: 4;
	}
}
</style>
