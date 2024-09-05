// frontend/src/i18n.js
//File necessary for translation

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend) //Load translations using http
    .use(LanguageDetector) //Detect using http
    .use(initReactI18next) //Pass the i18n instance to React
    .init({
        fallbackLng: 'de', //Default language
        debug: true,
        interpolation: {
            escapeValue: false //React already does escaping
        },
        backend: {
            loadPath: '/locales/{{lng}}.json', //Path to the language files
        }
    });

export default i18n;