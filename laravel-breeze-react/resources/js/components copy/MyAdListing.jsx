import {
    AspectRatio,
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Image,
    Spacer,
    Tag,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MyAdListing = ({ ad, index }) => {
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

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex < ad.images.length - 1) {
                return prevIndex + 1;
            } else {
                return 0;
            }
        });
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex > 0) {
                return prevIndex - 1;
            } else {
                return ad.images.length - 1;
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
                    <HStack color={"blue.500"}>
                        <Text fontWeight="bold" fontSize={"xl"}>
                            Price: {Number(ad.price)} {ad.currency}
                        </Text>
                        {Number(ad.start_price) > Number(ad.price) && (
                            <Text as="s">
                                Start Price: {ad.start_price} {ad.currency}
                            </Text>
                        )}
                    </HStack>
                    <Spacer />
                    <HStack spacing={2} mt={3}>
                        {ad.category.map((category, index) => (
                            <Tag
                                key={category.id}
                                size="sm"
                                variant="outline"
                                colorScheme="blue"
                            >
                                {category.name}
                            </Tag>
                        ))}
                    </HStack>
                </VStack>
            </Flex>
            <Text position="absolute" top="2" right="2" fontSize="sm">
                {formatDate(ad.date_posted)}
            </Text>
            <HStack position="absolute" bottom="5" right="5">
                <Button
                    colorScheme="green"
                    onClick={() => {
                        /* Handle renew */
                    }}
                >
                    Renew
                </Button>
                <Button
                    colorScheme="blue"
                    onClick={() => {
                        /* Handle edit */
                    }}
                >
                    Edit
                </Button>
                <Button
                    colorScheme="red"
                    onClick={() => {
                        /* Handle delete */
                    }}
                >
                    Delete
                </Button>
            </HStack>
        </Box>
    );
};

export default MyAdListing;
