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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const yesterday = new Date(now.setDate(now.getDate() - 1));
        now.setDate(now.getDate() + 1); // Reset to current date

        if (date.toDateString() === now.toDateString()) {
            return `Today ${date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday ${date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <Flex w={"100%"} justifyContent={"center"}>
            <Box p={5} w={"85%"}>
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
                            position="relative" // Added for absolute positioning of date
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
                                    <Text fontSize="sm">{ad.description}</Text>
                                    <HStack>
                                        <Text fontWeight="bold">
                                            Price: {Number(ad.price)}{" "}
                                            {ad.currency}
                                        </Text>
                                        {Number(ad.start_price) >
                                            Number(ad.price) && (
                                            <Text as="s">
                                                Start Price: {ad.start_price}{" "}
                                                {ad.currency}
                                            </Text>
                                        )}
                                    </HStack>
                                    <Text>Location: {ad.seller.location}</Text>
                                    <HStack spacing={5}>
                                        {ad.category.map((category, index) => (
                                            <>
                                                <Link>
                                                    <Text
                                                        fontSize="sm"
                                                        color={"gray.500"}
                                                        fontWeight="bold"
                                                        _hover={{
                                                            textDecoration:
                                                                "underline",
                                                        }}
                                                    >
                                                        {category.name}
                                                    </Text>
                                                </Link>
                                                {index <
                                                    ad.category.length - 1 && (
                                                    <Text as="span">/</Text>
                                                )}
                                            </>
                                        ))}
                                    </HStack>
                                </VStack>
                            </Flex>
                            <Text
                                position="absolute"
                                top="2"
                                right="2"
                                fontSize="sm"
                            >
                                {formatDate(ad.date_posted)}
                            </Text>
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
        </Flex>
    );
};

export default AdsPage;
