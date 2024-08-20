<template>
	<div class="pattern__container">
		<CursorCircle />
		<img src="@/assets/pattern.webp" alt="pattern" class="pattern" />
	</div>
</template>

<script setup>
import CursorCircle from './CursorCircle.vue';
</script>

<style lang="scss" scoped>
.pattern {
	opacity: 0.1;
	pointer-events: none;
	height: 100%;
	width: 100%;
	object-fit: cover;
}
.pattern__container {
	position: absolute;
	inset: 0;
	width: 100%;
	padding: 0;
	top: 10rem;

	@media only screen and (max-width: 1000px) {
		top: -8rem;
		width: 300%;
	}
}
</style>
