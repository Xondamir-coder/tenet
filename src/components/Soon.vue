<template>
	<section class="section-padding soon" id="soon">
		<h1 class="soon__title">Жизнь среди звёзд</h1>
		<button class="soon__button">Скоро</button>
	</section>
</template>

<script setup></script>

<style lang="scss" scoped>
.soon {
	min-height: 200px;
	width: 100%;
	background-image: url('@/assets/images/soon-bg.jpg');
	background-size: cover;
	background-position: center;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	gap: 32px;
	z-index: 2;
	padding-top: 3rem;
	padding-bottom: 3rem;
	&__title {
		font-size: 12rem;
		font-weight: 400;
		line-height: 7.8rem;
		font-family: var(--font-bebas);
	}
	&__button {
		cursor: pointer;
		padding: 1rem 2rem;
		border-radius: 99px;
		font-family: var(--font-roboto);
		font-size: 3rem;
		font-weight: 700;
		line-height: 2.6rem;
		border: none;
		color: inherit;
		background-color: transparent;
		background: linear-gradient(180deg, #000000 -0.69%, #cc4200 99.31%);
	}
}
</style>
