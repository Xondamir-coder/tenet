<template>
	<footer class="footer">
		<div class="footer__video-container">
			<video class="footer__video" autoplay muted loop>
				<source src="@/assets/video.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
		<Logo class="footer__logo" fill="#fff" />
		<div class="footer__contacts">
			<PhoneIcon class="footer__phone" />
			<a class="footer__tel" href="tel:+99 000 90 00">99 000 9 000</a>
			<ul class="footer__links">
				<li class="footer__link" v-for="link in links" :key="link">
					<a href="#"><component :is="link"></component></a>
				</li>
			</ul>
		</div>
		<p class="footer__tenet">Tenet group {{ new Date().getFullYear() }}</p>
		<p class="footer__text">
			Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
			has been the industry's standard dummy text ever since
		</p>
	</footer>
</template>

<script setup>
import Logo from '@/components/icons/Logo.vue';
import PhoneIcon from '@/components/icons/Phone.vue';
import YoutubeIcon from '@/components/icons/Youtube.vue';
import TelegramIcon from '@/components/icons/Telegram.vue';
import FacebookIcon from '@/components/icons/Facebook.vue';
import InstagramIcon from '@/components/icons/Instagram.vue';

const links = [YoutubeIcon, TelegramIcon, FacebookIcon, InstagramIcon];
</script>

<style lang="scss" scoped>
.footer {
	margin-top: -5rem;
	display: flex;
	gap: 2rem;
	flex-direction: column;
	align-items: center;
	color: #fff;
	position: relative;
	padding-top: 4rem !important;
	padding-bottom: 4rem !important;
	&.active {
		.footer__text,
		.footer__tenet,
		.footer__contacts,
		.footer__logo {
			transform: translateY(0);
			opacity: 1;
		}
	}
	& > * {
		transition: opacity 1s, transform 1s;
	}
	&__text {
		max-width: 150ch;
		text-align: center;
		line-height: 1.5;
		opacity: 0;
		transform: translateY(-6rem);
		transition-delay: 600ms;
	}
	&__tenet {
		font-family: var(--font-roboto);
		font-size: 1.4rem;
		opacity: 0;
		transform: translateY(-6rem);
		transition-delay: 400ms;
		text-transform: uppercase;
	}
	&__link svg {
		width: 2.5rem;
		height: 2.5rem;
	}
	&__links {
		list-style: none;
		display: flex;
		width: 100%;
		justify-content: space-around;
	}
	&__contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		opacity: 0;
		transform: translateY(-6rem);
		transition-delay: 200ms;
	}
	&__phone {
		width: 4.1rem;
		height: 4.1rem;
	}
	&__tel {
		text-decoration: none;
		color: inherit;
		font-size: 4rem;
		font-weight: bold;
	}
	&__logo {
		width: 19rem;
		height: 6.5rem;
		margin-bottom: 3rem;
		opacity: 0;
		transform: translateY(-6rem);
	}
	&__video {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: translate(-50%, -50%);
		&-container {
			z-index: -1;
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	}
}
</style>
