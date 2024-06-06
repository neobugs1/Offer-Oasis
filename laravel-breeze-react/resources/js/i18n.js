// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    prebarajte: 'Search ads',
                    dodadioglas: "New ad",
                    ili: "or",
                    siteOglasi: "All ads" 
                },
            },
            mk: {
                translation: {
                    prebarajte: 'Пребарајте огласи',
                    dodadioglas: "Додади оглас",
                    ili: "или",
                    siteOglasi: "Сите огласи" 
                },
            },
        },
        lng: 'mk',
        fallbackLng: 'mk',

        interpolation: {
            escapeValue: false, 
        },
    });

export default i18n;