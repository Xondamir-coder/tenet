<template>
	<footer class="footer section-padding">
		<Logo class="footer__logo" fill="#000" />
		<div class="footer__contacts">
			<div class="footer__phone">
				<PhoneIcon />
			</div>
			<a class="footer__tel" href="tel:+99 000 90 00">99 000 9 000</a>
			<ul class="footer__links">
				<li class="footer__link" v-for="link in links" :key="link">
					<a href="#"><component :is="link"></component></a>
				</li>
			</ul>
		</div>
		<p class="footer__tenet">&copy; Tenet Group, {{ new Date().getFullYear() }}</p>
		<p class="footer__text">
			{{ $t('footer-text') }}
		</p>
		<p class="footer__text">
			{{ $t('footer-dev') }}
			<a href="http://spacelabs.uz" target="_blank" rel="noopener noreferrer">Space Labs</a>
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
import LinkedinIcon from '@/components/icons/Linkedin.vue';

const links = [YoutubeIcon, TelegramIcon, FacebookIcon, InstagramIcon, LinkedinIcon];
</script>

<style lang="scss" scoped>
.footer {
	display: flex;
	gap: 2rem;
	flex-direction: column;
	align-items: center;
	color: #000;
	position: relative;
	padding-top: 2rem;
	padding-bottom: 2rem;
	font-family: var(--font-bebas);
	z-index: 2;
	@media only screen and (max-width: 768px) {
		padding-bottom: 10rem;
	}
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
		text-transform: uppercase;
		&:not(:has(a)) {
			font-size: 12px;
			line-height: 18px;
			text-align: center;
			text-transform: initial;

			font-family: var(--font-roboto);
			margin-top: -1.5rem;
		}
		a {
			color: inherit;
		}
	}
	&__tenet {
		font-family: var(--font-bebas);
		opacity: 0;
		transform: translateY(-6rem);
		transition-delay: 400ms;
		font-size: 1.8rem;
		font-weight: 700;
		line-height: 23.2px;
		text-align: center;
	}
	&__link svg {
		width: 2.5rem;
		height: 2.5rem;
	}
	&__links {
		list-style: none;
		display: flex;
		width: 100%;
		gap: 16px;
	}
	&__contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0;
		gap: 5px;
		transform: translateY(-6rem);
		transition-delay: 200ms;
	}
	&__phone {
		width: 3.8rem;
		height: 3.8rem;
		background-image: linear-gradient(180deg, #000000 -0.69%, #cc4200 99.31%);
		color: #fff;
		border-radius: 50%;
		display: grid;
		place-items: center;
		svg {
			width: 60%;
			height: 60%;
		}
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
}
</style>
