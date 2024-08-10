<template>
	<div id="circle" class="circle" v-if="isOnPc"></div>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted, onUnmounted } from 'vue';

// Update mouse position on mousemove
const updateMousePosition = event => {
	const mouseX = event.clientX;
	const mouseY = event.clientY;

	gsap.to('#circle', {
		top: mouseY,
		left: mouseX,
		duration: 0.2
	});
};
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

// Add and remove event listeners
onMounted(() => {
	if (!isOnPc) return;
	updateMousePosition({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

	// Add mousemove event listener
	window.addEventListener('mousemove', updateMousePosition);
});

onUnmounted(() => {
	if (!isOnPc) return;
	window.removeEventListener('mousemove', updateMousePosition);
});
</script>

<style scoped lang="scss">
.circle {
	position: fixed;
	z-index: 100;
	width: 71px;
	height: 71px;
	border-radius: 50%;
	pointer-events: none;
	top: 0; /* Centering the circle */
	left: 0; /* Centering the circle */
	transform: translate(-50%, -50%);
	backdrop-filter: invert(80%);
	@media only screen and (max-width: 1000px) {
		display: none;
	}
}
</style>
