import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AdListing from "@/components copy/AdListing";
import MyAdListing from "@/components copy/MyAdListing";
import StatisticsPanel from "@/components copy/StatisticsPanel";
import {
    Box,
    Button,
    Center,
    Flex,
    HStack,
    Heading,
    Spacer,
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton,
} from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/react";

export default function Ads({ auth, ads }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Check if there's a success message in local storage
        const storedSuccessMessage = localStorage.getItem("successMessage");
        if (storedSuccessMessage) {
            setSuccessMessage(storedSuccessMessage);
            setShowSuccess(true);
            // Clear the success message from local storage
            localStorage.removeItem("successMessage");
        }
    }, []);

    const handleShowSuccess = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        // Store the success message in local storage
        localStorage.setItem("successMessage", message);
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Flex>
                    <Heading fontSize={"2xl"}>Твои огласи</Heading>
                    <Spacer />
                    <Link href={route("ad.create")}>
                        <Button>Додади нов оглас</Button>
                    </Link>
                </Flex>
            }
        >
            <Head title="Твои огласи" />
            {showSuccess && (
                <Alert status="success" mb={4}>
                    <AlertIcon />
                    <AlertTitle mr={2}>{successMessage}</AlertTitle>
                    <CloseButton
                        onClick={() => setShowSuccess(false)}
                        position="absolute"
                        right="8px"
                        top="8px"
                    />
                </Alert>
            )}
            <Center className="py-12">
                <Flex gap={10} w={"75%"}>
                    <Box w={"100%"}>
                        <Flex direction={"column"} gap={2}>
                            {ads.data.map((ad, index) => (
                                <MyAdListing
                                    ad={ad}
                                    key={index}
                                    index={index}
                                />
                            ))}
                        </Flex>
                        <HStack spacing={2} justify="center" mt={5} gap={5}>
                            {ads.meta.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || ""}
                                    className={
                                        "py-2 px-3 rounded-lg text-gray-700 text-xs " +
                                        (!link.url
                                            ? "!text-gray-300 cursor-not-allowed "
                                            : "hover:bg-gray-700 text-white bg-gray-900") +
                                        (link.active
                                            ? " cursor-not-allowed "
                                            : " ")
                                    }
                                >
                                    {link.label
                                        .replace(/&laquo;|&raquo;/g, "")
                                        .trim()}
                                </Link>
                            ))}
                        </HStack>
                    </Box>
                    <Box w={"25%"}>
                        <StatisticsPanel stats={ads.meta.total} />
                    </Box>
                </Flex>
            </Center>
        </AuthenticatedLayout>
    );
}
