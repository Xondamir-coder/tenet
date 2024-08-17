<template>
	<div class="pattern__container">
		<CursorCircle />
		<Pattern class="pattern" />
	</div>
</template>

<script setup>
import Pattern from '@/components/Pattern.vue';
import CursorCircle from './CursorCircle.vue';
</script>

<style lang="scss" scoped>
.pattern {
	filter: opacity(0.1);
	pointer-events: none;
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
