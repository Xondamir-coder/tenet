<template>
	<div id="circle" class="circle"></div>
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

// Add and remove event listeners
onMounted(() => {
	// Initialize the position on mount
	updateMousePosition({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

	// Add mousemove event listener
	window.addEventListener('mousemove', updateMousePosition);
});

onUnmounted(() => {
	window.removeEventListener('mousemove', updateMousePosition);
});
</script>

<style scoped>
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
	backdrop-filter: invert(90%);
}
</style>
