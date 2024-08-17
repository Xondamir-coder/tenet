<template>
	<div ref="circleRef" class="circle" v-if="isOnPc">
		<Pattern />
	</div>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted, onUnmounted, ref } from 'vue';
import Pattern from './Pattern.vue';

const circleRef = ref(null);

// Update mouse position on mousemove
const detectDevice = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	const isMobile = /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(
		userAgent
	);
	const isTablet = /ipad|android(?!.*mobile)|tablet|playbook/i.test(userAgent);

	if (isMobile) {
		return 'Mobile';
	} else if (isTablet) {
		return 'Tablet';
	} else {
		return 'PC/Laptop';
	}
};
const isOnPc = detectDevice() == 'PC/Laptop';
const handleMouseMove = e => {
	gsap.to(circleRef.value, {
		duration: 0.3,
		clipPath: `circle(50px at ${e.pageX + 2}px ${e.pageY - 100}px)`
	});
};

onMounted(() => {
	window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
	window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped lang="scss">
.circle {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	clip-path: circle(50px at 50% 50%);
	pointer-events: none;

	@media only screen and (max-width: 1000px) {
		display: none;
	}
}
</style>
