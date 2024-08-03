<template>
	<main class="main" ref="mainRef">
		<img class="pattern" src="@/assets/images/big-pattern.png" alt="" />
		<Logo class="logo" />
		<ul class="list">
			<li
				@click="navigateTo(link)"
				class="list__item"
				v-for="link in links"
				:class="{ 'list__item--active': link == 'Мы' }"
				:key="link">
				{{ link }}
			</li>
		</ul>
		<section class="create">
			<div class="create__left">
				<p class="create__big">Создаём</p>
				<p class="create__massive">Каноны</p>
			</div>
			<div class="create__right">
				<h1 class="create__right-title">
					TENET GROUP – Согласны ли вы с тем, что будущее – это не то, что нас ждет, а то,
					что мы создаем?
				</h1>
				<p class="create__right-text">
					Компания Tenet Group выходит за рамки привычного представления о девелопменте и
					строительстве. Мы тщательно прорабатываем каждую деталь наших проектов, четко
					осознавая как целостную природу строительства, так и значение каждой отдельной
					части в создании единого сооружения.
				</p>
				<p class="create__right-text">
					Наши дома — это не просто стены и крыша, это фундамент для самых важных моментов
					вашей жизни. Мы воплощаем пространства, где вы сможете созидать моменты счастья
					и создавать историю, которая останется с вами навсегда.
				</p>
			</div>
		</section>
		<section class="boss">
			<h1 class="boss__title">
				«Даже кирпич хочет стать чем-то. Наша философия основана на том, что каждый элемент
				архитектуры, даже самый простой, имеет потенциал стать частью чего-то более
				значимого и красивого»
			</h1>
			<p class="boss__text">
				Дониер Алимов <br />
				Генеральный директор
			</p>
		</section>
		<section id="mission" class="mission">
			<div class="mission__box" v-for="mission in missions" :key="mission.title">
				<h1 class="mission__title">
					{{ mission.title }}
				</h1>
				<p class="mission__subtitle">{{ mission.subtitle }}</p>
				<p class="mission__text">{{ mission.text }}</p>
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
		<section class="links">
			<ul class="links__list">
				<li
					class="links__item"
					v-for="link in links"
					:key="link"
					:class="{ 'links__item--active': link == 'Мы' }"
					@click="navigateTo(link)">
					{{ link }}
				</li>
			</ul>
		</section>
		<Footer />
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
import bigBg from '@/assets/images/big-bg.avif';
import smallBg from '@/assets/images/small-bg.avif';
import lenis from '@/js/lenis';
import { onMounted, ref } from 'vue';
import Particles from '@/components/Particles.vue';

const missions = [
	{
		title: 'Миссия',
		subtitle:
			'Мы верим, что каждое сооружение должно не только эффективно выполнять свои задачи, но и вдохновлять.',
		text: 'Миссией Tenet Group является создание новых стандартов жилого и коммерческого пространства, которые станут вектором для всей отрасли. Мы стремимся воплотить комфортные и современные пространства для жизни и работы людей, которые будут отражать их мечты и желания, а также соответствовать их ожиданиям о современной и продуманной недвижимости.'
	},
	{
		title: 'Видение',
		subtitle: 'Строительство для нас больше, чем создание физической инфраструктуры',
		text: 'Мы нацелены на получении позиции лидера отрасли, создавая не просто здания, но и возможности для людей, поддерживая их ценности и укрепляя уверенность в будущем. Мы сотрудничаем с лучшими архитекторами и инженерами, чтобы гарантировать высокие стандарты строительства и долговечность наших объектов.'
	}
];
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
const partnerImgs = [partnerImg1, partnerImg2, partnerImg1, partnerImg2, partnerImg1, partnerImg2];
const links = ['Мы', 'Миссия', 'Видение', 'Цели', 'Скоро'];
const linkMap = {
	Миссия: 'mission',
	Видение: 'mission',
	Цели: 'goals',
	Скоро: 'soon'
};
const mainRef = ref();

const navigateTo = linkName => {
	lenis.scrollTo(document.getElementById(linkMap[linkName]), {
		duration: 1.2,
		ease: 'power3.inOut'
	});
};

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
});
</script>

<style lang="scss" scoped>
.links {
	&__list {
		list-style: none;
		display: flex;
		justify-content: space-between;
	}
	&__item {
		color: rgba(0, 7, 18, 0.6);
		font-size: 2.6rem;
		font-weight: 500;
		font-family: var(--font-roboto);
		cursor: pointer;
		&--active {
			color: #000;
		}
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
		&:not(:nth-child(2)):not(:first-child) {
			@media only screen and (max-width: 768px) {
				display: none;
			}
		}
		&:nth-child(2) {
			transition-delay: 150ms;
		}
		&:nth-child(3) {
			transition-delay: 300ms;
		}
		&:nth-child(4) {
			transition-delay: 450ms;
		}
		&:nth-child(5) {
			transition-delay: 600ms;
		}
		&:nth-child(6) {
			transition-delay: 750ms;
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
	display: flex;
	flex-direction: column;
	gap: 2rem;
	&.active > * {
		transform: translateY(0);
		opacity: 1;
	}
	& > * {
		transform: translateY(-4rem);
		opacity: 0;
		transition: transform 0.7s, opacity 0.7s;
	}
	&__text {
		line-height: 1.4;
		font-size: 2.4rem;
		font-weight: 500;
		font-style: italic;
		transition-delay: 300ms;
	}
	&__title {
		font-family: var(--font-roboto);
		font-size: 3.2rem;
		font-weight: bold;
		line-height: 1.5;
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
	list-style: none;
	@media only screen and (max-width: 768px) {
		display: none;
	}
	&.active .list__item {
		transform: translateX(0);
		opacity: 0.7;
		&--active {
			opacity: 1;
		}
	}
	&__item {
		padding: 1.5rem 2rem;
		border-radius: 15px;
		cursor: pointer;
		font-family: var(--font-gilroy);
		font-weight: 700;
		font-size: 20px;
		opacity: 0;

		transform: translateX(-500%);
		transition: opacity 1s, transform 1s;
		&:first-child {
			transition-delay: 100ms;
		}
		&:nth-child(2) {
			transition-delay: 200ms;
		}
		&:nth-child(3) {
			transition-delay: 400ms;
		}
		&:nth-child(4) {
			transition-delay: 600ms;
		}
		&:nth-child(5) {
			transition-delay: 800ms;
		}
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
