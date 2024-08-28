<template>
	<main class="main" ref="mainRef" @click="handleMainClick">
		<BgPattern />
		<div class="menu section-padding" :class="{ open: isMenuOpen }">
			<img src="@/assets/black-pattern.webp" class="menu__bg" />
			<div
				class="menu__item"
				v-for="(link, i) in links"
				:key="link"
				@click="navigateTo(i, true)">
				<span>{{ link }}</span>
			</div>
		</div>
		<section class="nav section-padding" :class="{ open: isMenuOpen }">
			<button class="nav__button" @click="toggleMenu">
				<IconMenu class="nav__open" />
				<IconClose class="nav__close" />
			</button>
			<Logo class="logo section-padding" />
			<div>
				<button class="nav__langs-button" @click="toggleLang">
					<IconGlobal class="nav__global" />
				</button>
				<div class="nav__langs" :class="{ show: showLangMobile }">
					<p v-for="lang in langs" @click="selectLang(lang.lang)">
						{{ lang.label }}
					</p>
				</div>
			</div>
		</section>
		<ul class="list section-padding">
			<li
				@click="navigateTo(i)"
				class="list__item"
				v-for="(link, i) in links"
				:class="{ 'list__item--active': i == activeLinkIndex }"
				:key="i">
				{{ link }}
			</li>
			<li class="list__item">
				<button class="list__lang" @click="toggleLangs">
					<span>{{
						$i18n.locale == 'ru' ? 'Рус' : $i18n.locale == 'uz' ? "O'zb" : 'Eng'
					}}</span>
					<svg
						width="10"
						height="6"
						viewBox="0 0 10 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M0.528636 0.846538C0.788986 0.586188 1.2111 0.586188 1.47145 0.846538L5.00004 4.37513L8.52864 0.846538C8.78899 0.586188 9.2111 0.586188 9.47145 0.846538C9.7318 1.10689 9.7318 1.529 9.47145 1.78935L5.47145 5.78935C5.2111 6.0497 4.78899 6.0497 4.52864 5.78935L0.528636 1.78935C0.268287 1.529 0.268287 1.10689 0.528636 0.846538Z"
							fill="white" />
					</svg>
				</button>
				<div class="list__langs" :class="{ show: showLangs }">
					<p v-for="lang in langs" @click="selectLangs(lang.lang)">
						{{ lang.label }}
					</p>
				</div>
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
					{{ !isCreateTextShort ? `${$t('collapse')}...` : `${$t('show')}...` }}
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
					{{ mission.fullText ? `${$t('collapse')}...` : `${$t('show')}...` }}
				</button>
			</div>
		</section>
		<Soon />
		<Footer />
	</main>
</template>

<script setup>
import Logo from '@/components/icons/Logo.vue';
import IconGlobal from '@/components/icons/Global.vue';
import IconMenu from '@/components/icons/Menu.vue';
import IconClose from '@/components/icons/Close.vue';
import Footer from '@/components/Footer.vue';
import lenis from '@/js/lenis';
import { computed, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BgPattern from '@/components/BgPattern.vue';
import Soon from '@/components/Soon.vue';
import i18n, { changeLang } from '@/locales';

gsap.registerPlugin(ScrollTrigger);

const langs = [
	{
		lang: 'uz',
		label: "O'zb"
	},
	{
		lang: 'ru',
		label: 'Рус'
	},
	{
		lang: 'en',
		label: 'Eng'
	}
];
const isBig = window.innerWidth >= 500;

const isMenuOpen = ref(false);
const activeLinkIndex = ref(0);
const isCreateTextShort = ref(isBig ? false : true);
const showLangMobile = ref(false);
const mainRef = ref();
const showLangs = ref(false);
const missions = ref([
	{
		title: computed(() => i18n.global.t(`mission-title-1`)),
		subtitle: computed(() => i18n.global.t(`mission-subtitle-1`)),
		text: computed(() => i18n.global.t(`mission-text-1`)),
		fullText: false
	},
	{
		title: computed(() => i18n.global.t(`mission-title-2`)),
		subtitle: computed(() => i18n.global.t(`mission-subtitle-2`)),
		text: computed(() => i18n.global.t(`mission-text-2`)),
		fullText: false
	},
	{
		title: computed(() => i18n.global.t(`mission-title-3`)),
		subtitle: computed(() => i18n.global.t(`mission-subtitle-3`)),
		text: computed(() => i18n.global.t(`mission-text-3`)),
		fullText: false
	}
]);
const links = computed(() =>
	['about', 'mission', 'vision', 'goals', 'projects'].map(link => i18n.global.t(`link-${link}`))
);

const selectLangs = lang => {
	changeLang(lang);
	toggleLangs();
};
const toggleLangs = () => (showLangs.value = !showLangs.value);
const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
	document.body.classList.toggle('overflow-hidden', isMenuOpen.value);
};
const toggleLang = () => (showLangMobile.value = !showLangMobile.value);
const navigateTo = (linkIndex, isMobile) => {
	isMobile && toggleMenu();
	activeLinkIndex.value = linkIndex;
	const elementId = linkIndex === 0 ? 'we' : linkIndex === 4 ? 'soon' : 'mission';
	lenisScrollTo(document.getElementById(elementId));
};
const lenisScrollTo = element => lenis.scrollTo(element, { duration: 1.2, ease: 'power3.inOut' });
const selectLang = lang => {
	changeLang(lang);
	toggleLang();
};
const handleMainClick = () => {
	if (event.target.closest('button')) return;
	showLangMobile.value = false;
	showLangs.value = false;
};

onMounted(() => {
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(({ isIntersecting, target }) => {
				target.classList.toggle('active', isIntersecting);
			});
		},
		{ threshold: 0.3 }
	);

	Array.from(mainRef.value.children).forEach(el => observer.observe(el));

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
body.lang {
	.create__big,
	.create__massive {
		transform: translateX(-100%) !important;
		opacity: 0 !important;
	}
	.create__right > * {
		transform: translateX(100%) !important;
		opacity: 0 !important;
	}
}
.create {
	display: flex;
	align-items: flex-start;
	gap: 2rem;
	margin-bottom: 5rem;
	font-family: var(--font-bebas);
	transition: opacity 1s, visibility 1s;

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
			font-size: 9.4rem;
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
			font-size: 12rem;
		}
	}
}
.list {
	display: flex;
	justify-content: space-between;
	margin: 5rem 0;
	list-style: none;
	padding-top: 8px;
	padding-bottom: 8px;
	z-index: 10;
	transition: opacity 1s, visibility 1s, background-color 1s;

	&.pinned {
		background-color: rgba(255, 255, 255, 0.8);
	}
	@media only screen and (max-width: 768px) {
		display: none;
	}
	&__langs {
		position: absolute;
		top: 100%;
		left: 50%;
		translate: -50%;
		background-color: rgba(0, 0, 0, 0.8);
		padding: 1rem 2rem;
		gap: 10px;
		width: 80%;
		display: flex;
		border-radius: 10px;
		flex-direction: column;
		text-align: left;
		opacity: 0;
		visibility: hidden;
		transform: translateY(-2rem);
		transition: opacity 300ms, transform 300ms, visibility 300ms;
		&.show {
			opacity: 1;
			transform: translateY(0);
			visibility: visible;
		}

		p {
			width: 100%;
		}
	}
	&__lang {
		font: inherit;
		background-color: #000;
		border: none;
		color: #fff;
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		gap: 10px;
		border-radius: 99px;
		cursor: pointer;

		&:has(+ .list__langs.show) {
			svg {
				transform: rotate(180deg);
			}
		}

		svg {
			transition: transform 300ms;
		}
	}
	&__item {
		padding: 1rem 2rem;
		border-radius: 99px;
		cursor: pointer;
		font-weight: 400;
		font-size: 2rem;
		opacity: 0.7;
		transition: opacity 300ms, background-image 300ms, color 300ms, background-color 300ms,
			box-shadow 300ms;
		display: flex;
		align-items: center;
		&:not(:last-child):hover {
			background-color: #000;
			color: #fff;
			opacity: 1;
		}
		&:has(.list__lang) {
			font-family: var(--font-roboto);
			opacity: 1;
			font-size: 16px;
			font-weight: 500;
			letter-spacing: 0.2px;
			position: relative;
			color: #fff;
		}
		&--active {
			background-image: var(--gradient);
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
	transition: transform 1s, color 300ms, opacity 1s;
	color: #000;
}
body.lang .nav__button {
	opacity: 0;
}
body.lang .nav__global {
	opacity: 0;
}
.nav {
	transform: scale(1);
	display: flex;
	justify-content: center;
	align-items: center;
	color: #7f7f7f;
	gap: 4rem;
	transition: color 300ms, opacity 1s;
	z-index: 10;
	div:has(.nav__langs) {
		position: relative;
	}
	&__langs {
		position: absolute;
		background-color: #000;
		color: #fff;
		padding: 15px;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		opacity: 0;
		visibility: hidden;
		transform: translateY(-2rem);
		transition: opacity 300ms, transform 300ms, visibility 300ms;
		font-size: 16px;
		right: -65%;
		&.show {
			opacity: 1;
			transform: translateY(0);
			visibility: visible;
		}
		&-button {
			background-color: transparent;
			border: none;
		}
	}

	@media only screen and (max-width: 500px) {
		justify-content: space-between;
	}
	&.active .logo {
		transform: scale(1);
	}
	&__global {
		transition: color 300ms;
		@media only screen and (min-width: 500px) {
			display: none;
		}
	}
	&__button {
		background-color: transparent;
		border: none;
		position: relative;
		display: grid;
		place-items: center;
		@media only screen and (min-width: 500px) {
			display: none;
		}
		& > * {
			transition: opacity 300ms, color 300ms;
		}
	}
	&__close {
		position: absolute;
		top: 50%;
		translate: 0 -50%;
		opacity: 0;
	}
	&.open {
		color: #fff;
		.logo {
			color: #fff;
		}
		.nav__global {
			fill: #fff;
			transition: fill 300ms;
		}
	}
	&.open .nav__open {
		opacity: 0;
	}
	&.open .nav__close {
		opacity: 1;
		color: #fff;
	}
}

body.lang .main > *:not(.nav):not(.pattern__container):not(.create) {
	opacity: 0;
	visibility: hidden;
}

.menu {
	position: fixed;
	inset: 0;
	background-color: #000;
	width: 100%;
	height: 100%;
	display: grid;
	row-gap: 2rem;
	align-content: center;
	z-index: 1;
	transform: translateX(-100%);
	transition-property: transform;
	transition-duration: 300ms;
	&.open {
		transform: translateX(0);
	}
	&__bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	&__item {
		font-size: 32px;
		font-weight: 700;
		color: #fff;
		font-family: var(--font-bebas);
		display: flex;
		align-items: center;
		gap: 16px;
		z-index: 2;
	}
}
.main {
	position: relative;
	padding-top: 3vw;
	display: flex;
	flex-direction: column;
	gap: 5rem;
	line-height: 1.5;
	overflow: hidden;
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
		border-image: var(--gradient);
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
