<template>
	<div class="pattern__container">
		<img class="pattern" src="@/assets/pattern-top.avif" alt="" />
		<img class="pattern" src="@/assets/small-pattern.avif" alt="" />
		<img class="pattern" src="@/assets/small-pattern.avif" alt="" />
		<img class="pattern" src="@/assets/small-pattern.avif" alt="" />
		<img class="pattern" src="@/assets/small-pattern.avif" alt="" />
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.pattern {
	width: 100%;
	object-fit: cover;

	&__container {
		cursor: none;
		position: absolute;
		inset: 0;
		width: 100%;
		padding: 0 !important;
		z-index: 0;
		display: flex;
		flex-direction: column;
		top: 10rem;
		filter: opacity(0.1);

		@media only screen and (max-width: 1000px) {
			top: -8rem;
			width: 300%;
		}
	}
}
</style>
