import { createI18n } from 'vue-i18n';
import en from './en.json';
import ru from './ru.json';
import uz from './uz.json';

const lang = navigator.language.toLowerCase();
const langLocalStorage = localStorage.getItem('lang');
const locale = langLocalStorage || (lang.includes('ru') ? 'ru' : lang.includes('uz') ? 'uz' : 'en');

const i18n = createI18n({
	locale,
	messages: {
		en,
		ru,
		uz
	}
});

export const changeLang = lang => {
	i18n.global.locale = lang;
	localStorage.setItem('lang', lang);
};

export default i18n;
