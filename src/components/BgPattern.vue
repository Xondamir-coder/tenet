<template>
	<div class="pattern__container">
		<Pattern />
	</div>
</template>

<script setup>
import Pattern from '@/components/Pattern.vue';
</script>

<style lang="scss" scoped>
.pattern {
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
