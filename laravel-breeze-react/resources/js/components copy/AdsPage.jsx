import React from "react";
import { createInertiaApp } from "@inertiajs/react";
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
} from "@chakra-ui/react";

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
        <Box p={5}>
            <Text fontSize="2xl" mb={5}>
                Ads
            </Text>
            <VStack spacing={5} align="stretch">
                {ads.data.map((ad) => (
                    <Box
                        key={ad.id}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        p={5}
                    >
                        <Flex>
                            <Image
                                src={ad.images}
                                alt={ad.title}
                                boxSize="150px"
                                objectFit="cover"
                                mr={5}
                            />
                            <VStack align="start" spacing={2}>
                                <Text fontSize="xl" fontWeight="bold">
                                    {ad.title}
                                </Text>
                                <Text>{ad.description}</Text>
                                <Text>
                                    Price: {ad.price} {ad.currency}
                                </Text>
                                <Text>Category: {ad.category}</Text>
                                <Text>Condition: {ad.condition}</Text>
                                <Text>Brand: {ad.brand}</Text>
                                <Text>Model: {ad.model}</Text>
                                <Text>Seller Rating: {ad.seller_rating}</Text>
                                <Text>
                                    Date Posted:{" "}
                                    {new Date(
                                        ad.date_posted
                                    ).toLocaleDateString()}
                                </Text>
                            </VStack>
                        </Flex>
                    </Box>
                ))}
            </VStack>

            <HStack spacing={2} justify="center" mt={5}>
                {ads.meta.links.map((link, index) => (
                    <Button
                        key={index}
                        onClick={() => handlePageChange(link.url)}
                        disabled={!link.url}
                        colorScheme={link.active ? "blue" : "gray"}
                    >
                        {link.label.replace(/&laquo;|&raquo;/g, "").trim()}
                    </Button>
                ))}
            </HStack>
        </Box>
    );
};

export default AdsPage;
