import React from "react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { Box, Text, VStack, HStack, Flex, Button } from "@chakra-ui/react";
import AdListing from "./AdListing";

const AdsPage = ({ ads }) => {
    const { url } = usePage();

    const handlePageChange = (pageUrl) => {
        if (pageUrl) {
            const currentUrl = new URL(window.location.href);
            const newUrl = new URL(pageUrl, currentUrl.origin);

            // Preserve existing query parameters
            currentUrl.searchParams.forEach((value, key) => {
                if (!newUrl.searchParams.has(key)) {
                    newUrl.searchParams.set(key, value);
                }
            });

            Inertia.get(newUrl.toString());
        }
    };

    if (!ads || !ads.data) {
        return <Text>No ads available</Text>;
    }

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
                        <Button
                            key={index}
                            onClick={() => handlePageChange(link.url)}
                            className={
                                "py-2 px-3 rounded-lg text-gray-700 text-xs " +
                                (!link.url
                                    ? "!text-gray-300 cursor-not-allowed "
                                    : "hover:bg-gray-700 text-white bg-gray-900") +
                                (link.active ? " cursor-not-allowed " : " ")
                            }
                            disabled={!link.url}
                        >
                            {link.label.replace(/&laquo;|&raquo;/g, "").trim()}
                        </Button>
                    ))}
                </HStack>
            </Box>
        </Flex>
    );
};

export default AdsPage;
