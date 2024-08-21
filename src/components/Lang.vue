<template>
	<Transition name="fade">
		<div class="container" v-if="!isChosen">
			<div class="content">
				<p
					class="text"
					v-for="{ lang, label } in langs"
					:key="lang"
					@click="selectLang(lang)">
					{{ label }}
				</p>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import lenis from '@/js/lenis';
import { changeLang } from '@/locales';
import { onMounted, ref } from 'vue';

const isChosen = ref(false);

const selectLang = lang => {
	changeLang(lang);
	setTimeout(() => {
		document.body.classList.remove('lang');
		lenis.start();
	}, 1000);
	isChosen.value = true;
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
	max-width: 200px;
}
.text {
	padding: 1rem;
	border: 2px solid #e2e2e2;
	cursor: pointer;
	animation: fade-in forwards 700ms;
	opacity: 0;
	font-size: 1.8rem;
	transition: background-color 300ms, color 300ms, border-color 300ms;

	&:nth-child(2) {
		animation-delay: 400ms;
	}
	&:last-child {
		animation-delay: 700ms;
	}
	&:hover {
		background-color: #000;
		border-color: #000;
		color: #fff;
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
@keyframes fade-in {
	from {
		opacity: 0;
		transform: translateY(-3rem);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
