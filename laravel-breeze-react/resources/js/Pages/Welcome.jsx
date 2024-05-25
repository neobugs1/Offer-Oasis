import Layout from "@/Layouts/Layout";
import MainContent from "@/components copy/MainContent";
import DefaultFooter from "@/footers/DefaultFooter";
import DefaultHeader from "@/headers/DefaultHeader";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Layout auth={auth}>
                <MainContent />
            </Layout>
        </>
    );
}
