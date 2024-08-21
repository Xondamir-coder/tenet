<template>
	<Lang />
	<RouterView />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import Lang from './components/Lang.vue';
import lenis from './js/lenis';

const func = () => {
	lenis.scrollTo(0, { immediate: true });
};
onMounted(() => {
	window.addEventListener('unload', func);
});
onUnmounted(() => {
	window.removeEventListener('unload', func);
});
</script>

<style lang="scss" scoped></style>
