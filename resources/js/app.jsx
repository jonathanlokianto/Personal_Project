import "./bootstrap";
import '@tailwindplus/elements'
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import MainLayout from "./Layouts/MainLayout.jsx";  

import '../css/app.css';
createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const page = pages[`./Pages/${name}.jsx`];
        page.default.layout =
            page.default.layout || ((page) => <MainLayout children={page} />);
        return page;
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});