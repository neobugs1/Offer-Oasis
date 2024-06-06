import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ChakraProvider } from "@chakra-ui/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Suspense } from "react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Suspense fallback="Loading...">
                <ChakraProvider>
                    <App {...props} />
                </ChakraProvider>
            </Suspense>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
