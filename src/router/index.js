import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import lenis from '@/js/lenis';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		}
	]
});

router.beforeEach(() => {});

export default router;
