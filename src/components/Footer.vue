<template>
	<footer class="footer section-padding">
		<Logo class="footer__logo" fill="#000" />
		<div class="footer__contacts">
			<div class="footer__phone">
				<PhoneIcon />
			</div>
			<a class="footer__tel" href="tel:+998 99 000 90 00">99 000 9 000</a>
			<ul class="footer__links">
				<li class="footer__link" v-for="link in links" :key="link">
					<a target="_blank" :href="link.href"><component :is="link.icon"></component></a>
				</li>
			</ul>
		</div>
		<p class="footer__tenet">&copy; Tenet Group, {{ new Date().getFullYear() }}</p>
		<p class="footer__text">
			{{ $t('footer-text') }}
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

const links = [
	{
		icon: YoutubeIcon,
		href: 'https://www.youtube.com/'
	},
	{
		icon: TelegramIcon,
		href: 'https://t.me/tenetgroupuz'
	},
	{
		icon: FacebookIcon,
		href: 'https://www.facebook.com/profile.php?id=61565098136013'
	},
	{
		icon: InstagramIcon,
		href: 'https://www.instagram.com/tenet.uz?igsh=OXZ1cjEwOXpzeXJk'
	},
	{
		icon: LinkedinIcon,
		href: 'https://www.linkedin.com/company/104617818/admin/dashboard/'
	}
];
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
		@media only screen and (max-width: 768px) {
			transition: opacity 0.5s, transform 0.5s;
		}
	}
	&__dev {
		font-size: 1rem;
	}
	&__text {
		max-width: 150ch;
		text-align: center;
		line-height: 1.5;
		opacity: 0;
		transform: translateY(-6rem);
		transition-delay: 300ms;
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
		transition-delay: 200ms;
		font-size: 1.8rem;
		font-weight: 700;
		line-height: 23.2px;
		text-align: center;
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
		gap: 16px;
	}
	&__contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0;
		gap: 5px;
		transform: translateY(-6rem);
		transition-delay: 100ms;
	}
	&__phone {
		width: 3.8rem;
		height: 3.8rem;
		background-image: var(--gradient);
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
