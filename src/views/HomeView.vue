<template>
	<CursorCircle />
	<main class="main" ref="mainRef">
		<BgPattern />
		<Logo class="logo section-padding" />
		<ul class="list section-padding">
			<li
				@click="navigateTo(i)"
				class="list__item"
				v-for="(link, i) in links"
				:class="{ 'list__item--active': i == activeLinkIndex }"
				:key="i">
				{{ link }}
			</li>
		</ul>
		<section id="we" class="create section-padding">
			<div class="create__left">
				<p class="create__big">{{ $t('create-big') }}</p>
				<p class="create__massive">{{ $t('create-massive') }}</p>
			</div>
			<div class="create__right">
				<h1 class="create__right-title">
					{{ $t('create-title') }}
				</h1>
				<p class="create__right-text">
					{{
						isCreateTextShort
							? `${$t('create-text-1').slice(0, 100)} ...`
							: $t('create-text-1')
					}}
					<br />
					<br />
					{{ !isCreateTextShort ? $t('create-text-2') : '' }}
				</p>
				<button
					class="more-button"
					@click="isCreateTextShort = !isCreateTextShort"
					type="button">
					{{ !isCreateTextShort ? 'Скрыть...' : 'Показать еще...' }}
				</button>
			</div>
		</section>
		<section id="mission" class="mission section-padding">
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
		<Soon />
		<Footer />
		<nav class="navbar section-padding">
			<button
				class="navbar__button"
				v-for="(link, i) in bottomNavLinks"
				:key="link.name"
				@click="navigateTo(i)"
				:class="{ 'navbar__button--active': i == activeLinkIndex }">
				<component :is="link.icon"></component>
				<span>{{ link.name }}</span>
			</button>
		</nav>
	</main>
</template>

<script setup>
import Logo from '@/components/icons/Logo.vue';
import Footer from '@/components/Footer.vue';
import lenis from '@/js/lenis';
import { computed, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Crown from '@/components/icons/Crown.vue';
import Briefcase from '@/components/icons/Briefcase.vue';
import Eye from '@/components/icons/Eye.vue';
import Radar from '@/components/icons/Radar.vue';
import Timer from '@/components/icons/Timer.vue';
import CursorCircle from '@/components/CursorCircle.vue';
import BgPattern from '@/components/BgPattern.vue';
import Soon from '@/components/Soon.vue';
import i18n from '@/locales';

gsap.registerPlugin(ScrollTrigger);

const isBig = window.innerWidth >= 500;
const links = computed(() => [
	i18n.global.t('link-about'),
	i18n.global.t('link-mission'),
	i18n.global.t('link-vision'),
	i18n.global.t('link-goals'),
	i18n.global.t('link-projects')
]);
const bottomNavLinks = computed(() => [
	{
		name: i18n.global.t('link-about'),
		icon: Crown
	},
	{
		name: i18n.global.t('link-mission'),
		icon: Briefcase
	},
	{
		name: i18n.global.t('link-vision'),
		icon: Eye
	},
	{
		name: i18n.global.t('link-goals'),
		icon: Radar
	},
	{
		name: i18n.global.t('link-projects'),
		icon: Timer
	}
]);

const missions = ref([
	{
		title: computed(() => i18n.global.t('mission-title-1')),
		subtitle: computed(() => i18n.global.t('mission-subtitle-1')),
		text: computed(() => i18n.global.t('mission-text-1')),
		fullText: false
	},

	{
		title: computed(() => i18n.global.t('mission-title-2')),
		subtitle: computed(() => i18n.global.t('mission-subtitle-2')),
		text: computed(() => i18n.global.t('mission-text-2')),
		fullText: false
	},

	{
		title: computed(() => i18n.global.t('mission-title-3')),
		subtitle: computed(() => i18n.global.t('mission-subtitle-3')),
		text: computed(() => i18n.global.t('mission-text-3')),
		fullText: false
	}
]);
const mainRef = ref();
const isCreateTextShort = ref(isBig ? false : true);
const activeLinkIndex = ref(0);

const navigateTo = linkIndex => {
	activeLinkIndex.value = linkIndex;
	const el = linkIndex === 0 ? 'we' : linkIndex === 4 ? 'soon' : 'mission';
	lenisScrollTo(document.getElementById(el));
};
const lenisScrollTo = name =>
	lenis.scrollTo(name, {
		duration: 1.2,
		ease: 'power3.inOut'
	});
const changeLang = () => {};

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
	padding: 1rem 0;
	width: 100%;
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: space-around;
	background-color: #000;
	box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.08);
	z-index: 15;
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
.create {
	display: flex;
	align-items: flex-start;
	gap: 2rem;
	margin-bottom: 5rem;
	// cursor: none;
	font-family: var(--font-bebas);

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
		font-family: var(--font-roboto);
		& > * {
			transform: translateX(100%);
			opacity: 0;
			transition: transform 1s, opacity 1s;
		}
		&-text {
			font-family: var(--font-roboto);
			font-size: max(1.8rem, 14px);
			line-height: 1.5;
			transition-delay: 200ms;
		}
		&-title {
			font-size: 3.2rem;
			font-weight: bold;
			line-height: normal;
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
	transition: background-color 1s;
	padding-top: 8px;
	padding-bottom: 8px;
	z-index: 10;
	&.pinned {
		background-color: rgba(255, 255, 255, 0.8);
	}
	@media only screen and (max-width: 768px) {
		display: none;
	}
	&__item {
		padding: 1rem 2rem;
		border-radius: 99px;
		cursor: pointer;
		font-weight: 400;
		font-size: 2rem;
		opacity: 0.7;
		transition: opacity 300ms, background-image 300ms, color 300ms;
		display: flex;
		align-items: center;
		&--active {
			background-image: linear-gradient(180deg, #000000 -0.69%, #cc4200 99.31%);
			color: #fff;
			opacity: 1;
		}
	}
}
.logo {
	align-self: center;
	width: 80%;
	max-width: 42vmax;
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
	cursor: none;
	font-family: var(--font-roboto);
}
.mission {
	position: relative;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	column-gap: 4rem;
	row-gap: 5rem;
	z-index: 1;
	&.active &__box {
		opacity: 1;
		transform: rotateY(0) translate(0, 0);
	}
	&__box {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding-left: 2rem;
		border-left: 4px solid transparent;
		border-image: linear-gradient(180deg, #000000 -0.69%, #cc4200 99.31%);
		border-image-slice: 1;
		opacity: 0;
		transform: rotateY(-100deg) translate(9rem, 9rem);
		transition: transform 700ms, opacity 700ms;
		@for $i from 2 through 3 {
			&:nth-child(#{$i}) {
				transition-delay: $i * 100ms;
			}
		}
	}
	&__title {
		font-size: 6.4rem;
		font-weight: bold;
		line-height: normal;
		@media only screen and (max-width: 768px) {
			font-size: max(4rem, 32px);
		}
	}
	&__subtitle {
		font-size: max(1.8rem, 16px);
		font-family: var(--font-roboto);
		font-weight: bold;
	}
	&__text {
		font-family: var(--font-roboto);
		font-size: max(1.6rem, 14px);
		font-weight: 500;
	}
}
</style>
