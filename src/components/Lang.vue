<template>
	<Transition name="fade">
		<div class="container" v-if="!isChosen">
			<div class="content" ref="contentRef">
				<p
					class="text"
					v-for="{ lang, label } in langs"
					:key="lang"
					@click="changeLang(lang)">
					{{ label }}
				</p>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import lenis from '@/js/lenis';
import i18n from '@/locales';
import { onMounted, ref } from 'vue';

const isChosen = ref(false);
const contentRef = ref(null);

const changeLang = lang => {
	setTimeout(() => {
		document.body.classList.remove('lang');
		lenis.start();
	}, 1000);
	isChosen.value = true;
	i18n.global.locale = lang;
};

const langs = [
	{
		lang: 'uz',
		label: "O'zbek"
	},
	{
		lang: 'ru',
		label: 'Русский'
	},
	{
		lang: 'en',
		label: 'English'
	}
];

onMounted(() => {
	document.body.classList.add('lang');
	lenis.stop();
	setTimeout(() => {
		contentRef.value.classList.add('active');
	}, 1000);
});
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	position: absolute;
	font-family: var(--font-roboto);
	display: grid;
	place-items: center;
}
.content {
	padding: 2rem;
	border: 3px solid #e2e2e2;
	z-index: 4;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	text-align: center;
	width: 100%;
	max-width: 150px;
}
.content.active .text {
	opacity: 1;
	transform: translateY(0);
}
.text {
	padding: 1rem;
	border: 2px solid #e2e2e2;
	cursor: pointer;
	opacity: 0;
	transform: translateY(-3rem);
	transition: transform 0.5s ease, opacity 0.5s ease;
	&:nth-child(2) {
		transition-delay: 400ms;
	}
	&:last-child {
		transition-delay: 700ms;
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
