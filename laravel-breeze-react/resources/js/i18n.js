// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                prebarajte: "Search ads",
                searchInput: "Search",
                dodadioglas: "New ad",
                najava: "Login",
                najaviSe: "Login",
                registrirajSe: "Register",
                jazik: "Language",
                ili: "or",
                siteOglasi: "All ads",
                oglasi: "Ads",
                industriskiSektori: "Industrial sectors",
                produkti: "Products",
                slikiIVidea: "Images and videos",
                kupuvaciMesecno: "buyers monthly",
                najnovi: "Newest",
                oglasi: "Ads",
                search: {
                    searchInput: "Search...",
                    allLocations: "All locations",
                    myLocation: "My location",
                    categories: "Categories",
                    foundAds: "Results:",
                    mostViewed: "Most Viewed",
                    newestFirst: "Newest First",
                    cheapestFirst: "Cheapest First",
                },

                footer: {
                    uslugi: "Services",
                    registrirajse: "Register",
                    verifikacija: "Verification",
                    kakoDaStavamOglas: "How to post an ad",
                    promovirajOglas: "Promote ad",
                    premiumClen: "Premium member",
                    stranica: "Page",
                    novOglas: "New ad",
                    kategorii: "Categories",
                    pomoc: "Help",
                    premiumClenovi: "Premium members",
                    prebaruvanjeNaOglasi: "Search ads",
                    izbegnuvanjeNaIzmami: "Avoid scams",
                    jaZaboravivteLozinka: "Forgot your password?",
                    sorabotka: "Collaboration",
                    prasanjaIOdgovori: "Questions and answers",
                    aboutUs: "About Us",
                    services: "Services",
                    contact: "Contact",
                    privacyPolicy: "Privacy Policy",
                    copyright: "All rights reserved.",
                },
                login: {
                    loginTitle: "Login",
                    emailLabel: "E-Mail",
                    emailPlaceholder: "E-mail address",
                    passwordLabel: "Password",
                    passwordPlaceholder: "Password",
                    rememberMe: "Remember me",
                    loginButton: "Login now",
                    forgotPassword: "Forgot Password?",
                    createAccount:
                        "Create account details for your company profile or register as an individual.",
                },
                register: {
                    increaseVisibility: "Increase your online visibility!",
                    joinLeadingPlatform:
                        "Join the leading ad platform in Macedonia",
                    createProfileFree: "Create your profile for free!",
                    firstName: "First name *",
                    lastName: "Last name *",
                    email: "Email *",
                    password: "Password *",
                    repeatPassword: "Repeat Password *",
                    phoneNumber: "Phone number *",
                    location: "Location *",
                    terms: "By submitting the form, I accept the",
                    termsOfUse: "Terms of Use",
                    generalTerms: "General Terms and Conditions",
                    dataPrivacy: "Data Privacy",
                    registerButton: "Register now",
                    reachAudience: "Reach a larger audience with your ads",
                    reachAudienceText:
                        "Join our platform where over 1 million users search for products and services from our large base of 600,000+ registered sellers each month.",
                    googleVisibility: "Improve your visibility on Google",
                    googleVisibilityText:
                        "Ads on our platform consistently rank higher on Google, with an average of 1 million search keywords appearing in the top 3 results.",
                    showcaseAds: "Showcase your ads to potential buyers",
                    showcaseAdsText:
                        "Post your products and services on our platform and attract inquiries from interested buyers.",
                    questions: "Still have questions?",
                    getInfoHere: "Get all the information here",
                },
                layout: {
                    ads: "Ads",
                    adminPanel: "Admin Panel",
                    profile: "Profile",
                    logout: "Log Out",
                },
                profile: {
                    heading: "Profile Information",
                    description:
                        "Update your account's profile information and email address.",
                    name: "Name",
                    email: "Email",
                    phoneNumber: "Phone Number",
                    unverifiedEmail: "Your email address is unverified.",
                    resendVerification:
                        "Click here to re-send the verification email.",
                    verificationLinkSent:
                        "A new verification link has been sent to your email address.",
                    save: "Save",
                    saved: "Saved.",
                    updatePassword: {
                        heading: "Update Password",
                        description:
                            "Ensure your account is using a long, random password to stay secure.",
                        currentPassword: "Current Password",
                        newPassword: "New Password",
                        confirmPassword: "Confirm Password",
                    },
                    deleteProfile: {
                        heading: "Delete Account",
                        description:
                            "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.",
                        confirmDeleteHeading:
                            "Are you sure you want to delete your account?",
                        confirmDeleteDescription:
                            "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.",
                        passwordPlaceholder: "Password",
                        cancelButton: "Cancel",
                        deleteButton: "Delete Account",
                    },
                },
            },
        },
        mk: {
            translation: {
                prebarajte: "Пребарајте огласи",
                searchInput: "Пребарај, пр. BMW, Samsung, Iphone, Услуга ...",
                dodadioglas: "Додади оглас",
                najava: "Најава",
                najaviSe: "Најави се",
                registrirajSe: "Регистрирај се",
                jazik: "Јазик",
                ili: "или",
                siteOglasi: "Сите огласи",
                oglasi: "Огласи",
                industriskiSektori: "Индустриски сектори",
                produkti: "Продукти",
                slikiIVidea: "Слики и видеа",
                kupuvaciMesecno: "купувачи месечно",
                najnovi: "Најнови",
                oglasi: "Огласи",
                search: {
                    searchInput: "Пребарај...",
                    allLocations: "Цела Македонија",
                    myLocation: "Моја локација",
                    categories: "Категории",
                    foundAds: "Пронајдени огласи:",
                    mostViewed: "Најпрегледани",
                    newestFirst: "Најнови прво",
                    cheapestFirst: "Најефтини прво",
                },
                footer: {
                    uslugi: "Услуги",
                    registrirajse: "Регистрирај се",
                    verifikacija: "Верификација",
                    kakoDaStavamOglas: "Како да ставам оглас",
                    promovirajOglas: "Промовирај оглас",
                    premiumClen: "Премиум член",
                    stranica: "Страница",
                    novOglas: "Нов оглас",
                    kategorii: "Категории",
                    pomoc: "Помош",
                    premiumClenovi: "Премиум членови",
                    prebaruvanjeNaOglasi: "Пребарување на огласи",
                    izbegnuvanjeNaIzmami: "Избегнување на измами",
                    jaZaboravivteLozinka: "Ја заборавивте лозинка?",
                    sorabotka: "Соработка",
                    prasanjaIOdgovori: "Прашања и одговори",
                    aboutUs: "About Us",
                    services: "Services",
                    contact: "Contact",
                    privacyPolicy: "Privacy Policy",
                    copyright: "All rights reserved.",
                },
                login: {
                    loginTitle: "Најава",
                    emailLabel: "Е-Пошта",
                    emailPlaceholder: "Е-пошта адреса",
                    passwordLabel: "Лозинка",
                    passwordPlaceholder: "Лозинка",
                    rememberMe: "Запомни ме",
                    loginButton: "Најави се",
                    forgotPassword: "Ја заборавивте лозинката?",
                    createAccount:
                        "Креирајте детали за сметка за вашиот профил на компанијата или регистрирајте се како индивидуалец.",
                },
                register: {
                    increaseVisibility: "Зголемете ја вашата видливост онлајн!",
                    joinLeadingPlatform:
                        "Придружете се на водечката огласна платформа во Македонија",
                    createProfileFree: "Креирај го својот профил бесплатно!",
                    firstName: "Име *",
                    lastName: "Презиме *",
                    email: "Е-Пошта *",
                    password: "Лозинка *",
                    repeatPassword: "Повтори Лозинка *",
                    phoneNumber: "Телефонски број *",
                    location: "Локација *",
                    terms: "Со поднесување на формуларот, ги прифаќам",
                    termsOfUse: "Условите за користење",
                    generalTerms: "Општите услови",
                    dataPrivacy: "Заштита на податоци",
                    registerButton: "Регистрирај се сега",
                    reachAudience:
                        "Достигнете до поголема публика со вашите огласи",
                    reachAudienceText:
                        "Придружете се на нашата платформа каде што преку 1 милион корисници месечно бараат производи и услуги од нашата голема база од 600,000+ регистрирани продавачи.",
                    googleVisibility: "Подобрете ја видливоста на Google",
                    googleVisibilityText:
                        "Огласите на нашата платформа постојано се позиционираат погоре на Google, со просечно 1 милион клучни зборови за пребарување кои се наоѓаат во првите 3 резултати.",
                    showcaseAds:
                        "Претставете ги вашите огласи на потенцијалните купувачи",
                    showcaseAdsText:
                        "Објавете ги вашите производи и услуги на нашата платформа и привлечете барања од заинтересирани купувачи.",
                    questions: "Сè уште имате прашања?",
                    getInfoHere: "Добијте ги сите информации тука",
                },
                layout: {
                    ads: "Огласи",
                    adminPanel: "Админ панел",
                    profile: "Профил",
                    logout: "Одјави се",
                },
                profile: {
                    heading: "Информации за профилот",
                    description:
                        "Ажурирајте ги информациите за профилот и адресата за е-пошта на вашата сметка.",
                    name: "Име",
                    email: "Е-Пошта",
                    phoneNumber: "Телефонски број",
                    unverifiedEmail: "Вашата е-пошта не е потврдена.",
                    resendVerification:
                        "Кликнете тука за повторно испраќање на е-пошта за верификација.",
                    verificationLinkSent:
                        "Новата врска за верификација е испратена на вашата е-пошта.",
                    save: "Зачувај",
                    saved: "Зачувано.",
                    updatePassword: {
                        heading: "Ажурирајте ја лозинката",
                        description:
                            "Осигурете се дека вашата сметка користи долга, случајна лозинка за да остане безбедна.",
                        currentPassword: "Сегашна лозинка",
                        newPassword: "Нова лозинка",
                        confirmPassword: "Потврди лозинка",
                    },
                    deleteProfile: {
                        heading: "Избриши профил",
                        description:
                            "Откако ќе го избришете вашиот профил, сите негови ресурси и податоци ќе бидат трајно избришани. Пред да го избришете вашиот профил, ве молиме преземете ги сите податоци или информации кои сакате да ги задржите.",
                        confirmDeleteHeading:
                            "Дали сте сигурни дека сакате да го избришете вашиот профил?",
                        confirmDeleteDescription:
                            "Откако ќе го избришете вашиот профил, сите негови ресурси и податоци ќе бидат трајно избришани. Ве молиме внесете го вашиот пасворд за да потврдите дека сакате трајно да го избришете вашиот профил.",
                        passwordPlaceholder: "Пасворд",
                        cancelButton: "Откажи",
                        deleteButton: "Избриши профил",
                    },
                },
            },
        },
    },
    lng: "mk",
    fallbackLng: "mk",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
