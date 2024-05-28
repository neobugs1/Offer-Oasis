import React, { useState } from "react";
import { Link, createInertiaApp } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import {
    Box,
    Button,
    Image,
    Text,
    VStack,
    HStack,
    Stack,
    Flex,
    textDecoration,
    IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AdListing from "./AdListing";

const AdsPage = ({ ads }) => {
    if (!ads || !ads.data) {
        return <Text>No ads available</Text>;
    }

    const handlePageChange = (url) => {
        if (url) {
            Inertia.get(url);
        }
    };

    return (
        <Flex w={"100%"} justifyContent={"center"}>
            <Box p={5} w={"85%"}>
                <Text fontSize="2xl" mb={5}>
                    Ads
                </Text>
                <VStack spacing={5} align="stretch">
                    {ads.data.map((ad, index) => (
                        <AdListing ad={ad} key={index} index={index} />
                    ))}
                </VStack>

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
                                (link.active ? " cursor-not-allowed " : " ")
                            }
                        >
                            {link.label.replace(/&laquo;|&raquo;/g, "").trim()}
                        </Link>
                    ))}
                </HStack>
            </Box>
        </Flex>
    );
};

export default AdsPage;
