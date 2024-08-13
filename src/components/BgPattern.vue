<template>
	<div class="pattern__container">
		<img class="pattern" src="@/assets/big-pattern.avif" alt="" />
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
	object-fit: contain;

	&__container {
		cursor: none;
		position: absolute;
		inset: 0;
		// top: 10rem;
		width: 100%;
		padding: 0 !important;
		z-index: 0;
		filter: opacity(0.1);
		display: flex;
		flex-direction: column;
		gap: 1px;
		top: 10rem;
		@media only screen and (max-width: 500px) {
			top: -8rem;
		}
	}
}
</style>
