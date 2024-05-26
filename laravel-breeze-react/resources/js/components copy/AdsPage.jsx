import React from "react";
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
                                <Link href={route("ad.show", ad.id)}>
                                    <Text
                                        fontSize="xl"
                                        fontWeight="bold"
                                        _hover={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        {ad.title}
                                    </Text>
                                </Link>
                                <Text>{ad.description}</Text>
                                <Text>
                                    Price: {ad.price} {ad.currency}
                                </Text>
                                <Text>Condition: {ad.condition}</Text>
                                <Text>Brand: {ad.brand}</Text>
                                <Text>Model: {ad.model}</Text>
                                <Text>Seller Rating: {ad.seller.name}</Text>
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
    );
};

export default AdsPage;
