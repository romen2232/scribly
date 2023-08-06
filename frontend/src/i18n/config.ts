import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es/translations.json';

i18n.use(initReactI18next).init({
    fallbackLng: 'es',
    lng: 'es',
    resources: {
        es: {
            translation: es,
        },
    },
    ns: ['translation'],
    defaultNS: 'translation',
});

i18n.languages = ['es'];

export default i18n;
