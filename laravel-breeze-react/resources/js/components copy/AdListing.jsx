import {
    AspectRatio,
    Box,
    Flex,
    HStack,
    IconButton,
    Image,
    Spacer,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const AdListing = ({ ad, index }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const yesterday = new Date(now.setDate(now.getDate() - 1));
        now.setDate(now.getDate() + 1); // Reset to current date

        if (date.toDateString() === now.toDateString()) {
            return `Денес ${date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
            return `Вчера ${date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        } else {
            return date.toLocaleDateString();
        }
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex < ad.images.length - 1) {
                return prevIndex + 1;
            } else {
                return 0; // Go back to the first image
            }
        });
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex > 0) {
                return prevIndex - 1;
            } else {
                return ad.images.length - 1; // Go to the last image
            }
        });
    };
    return (
        <Box
            key={ad.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
            position="relative"
            bg={"white"}
            boxShadow={"md"}
        >
            <Flex gap={5}>
                <Box position="relative">
                    <AspectRatio w={"300px"} ratio={4 / 3}>
                        <Image
                            src={
                                ad.images &&
                                ad.images[currentImageIndex] &&
                                ad.images[currentImageIndex].url
                                    ? ad.images[currentImageIndex].url
                                    : "https://via.placeholder.com/300"
                            }
                            borderRadius="md"
                        />
                    </AspectRatio>
                    <IconButton
                        aria-label="Previous image"
                        icon={<FaArrowLeft />}
                        onClick={handlePreviousImage}
                        position="absolute"
                        top="50%"
                        left="5"
                        bg={"transparent"}
                    />
                    <IconButton
                        aria-label="Next image"
                        icon={<FaArrowRight />}
                        onClick={handleNextImage}
                        position="absolute"
                        top="50%"
                        right="5"
                        bg={"transparent"}
                    />
                    <Text
                        position="absolute"
                        top="90%"
                        right="90%"
                        bg="white"
                        bgColor={"transparent"}
                    >
                        {currentImageIndex + 1}/{ad.images.length}
                    </Text>
                </Box>
                <VStack align="start" spacing={2} w={"100%"}>
                    <Box w="75%">
                        <Link href={route("ad.show", ad.id)}>
                            <Box w="100%">
                                <Text
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    _hover={{
                                        textDecoration: "underline",
                                    }}
                                >
                                    {ad.title}
                                </Text>
                            </Box>
                        </Link>

                        <Text
                            fontSize="sm"
                            sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {ad.description}
                        </Text>
                    </Box>
                    <HStack>
                        <Text
                            fontWeight="bold"
                            fontSize={"2xl"}
                            color={"#0060df"}
                        >
                            {Number(ad.price)} {ad.currency}
                        </Text>
                        {Number(ad.start_price) > Number(ad.price) && (
                            <Text as="s">
                                Првична цена: {ad.start_price} {ad.currency}
                            </Text>
                        )}
                    </HStack>

                    <Spacer />
                    <Flex alignItems={"center"} fontSize={"lg"} gap={1}>
                        <CiLocationOn /> {ad.seller.location.name}
                    </Flex>
                    <HStack spacing={5}>
                        {ad.category.map((category, index) => (
                            <React.Fragment key={category.id}>
                                <Link
                                    href={route("search", {
                                        category: category.id,
                                        page: 1,
                                    })}
                                >
                                    <Text
                                        fontSize="sm"
                                        color={"gray.500"}
                                        fontWeight="bold"
                                        _hover={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        {category.name}
                                    </Text>
                                </Link>
                                {index < ad.category.length - 1 && (
                                    <Text as="span">/</Text>
                                )}
                            </React.Fragment>
                        ))}
                    </HStack>
                </VStack>
            </Flex>
            <Text position="absolute" top="2" right="2" fontSize="sm">
                {formatDate(ad.date_posted)}
            </Text>
        </Box>
    );
};

export default AdListing;
