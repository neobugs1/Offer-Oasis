import {
    Box,
    Flex,
    HStack,
    IconButton,
    Image,
    Text,
    VStack,
    Spacer,
} from "@chakra-ui/react";
import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEnvelope } from "react-icons/fa";

const ReviewShow = ({ ad }) => {
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
        <Flex>
            {/* Navigation Tabs */}
            <VStack align="start" spacing={4}>
                <HStack spacing={5}>
                    {ad.category.map((category, index) => (
                        <>
                            <Link>
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
                        </>
                    ))}
                </HStack>

                {/* Car Image with Navigation Arrows */}
                <Box position="relative">
                    <Image
                        src={
                            ad.images &&
                            ad.images[currentImageIndex] &&
                            ad.images[currentImageIndex].url
                                ? ad.images[currentImageIndex].url
                                : "https://via.placeholder.com/300"
                        }
                        borderRadius="md"
                        w={"750px"}
                    />
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
                        p="2"
                        bgColor={"transparent"}
                    >
                        {currentImageIndex + 1}/{ad.images.length}
                    </Text>
                </Box>
                <HStack spacing={5} overflowX="auto" py={5}>
                    {ad.images.map((image, index) => (
                        <Box
                            key={index}
                            border={
                                currentImageIndex === index
                                    ? "2px solid blue"
                                    : "none"
                            }
                            borderRadius={"lg"}
                        >
                            <Image
                                borderRadius={"lg"}
                                src={image.url}
                                boxSize="100px"
                                onClick={() => setCurrentImageIndex(index)}
                                cursor="pointer"
                            />
                        </Box>
                    ))}
                </HStack>

                {/* Car Details */}
                <Box p={5} w="100%" bg="gray.100" borderRadius="md">
                    <Text fontSize="2xl" fontWeight="bold">
                        {ad.title}
                    </Text>
                    <Text fontSize="lg">
                        {ad.price} {ad.currency}
                    </Text>
                    {/* ... other details */}
                </Box>
                <Flex direction={"row"} w={"100%"}>
                    <Box>
                        <Text>
                            <b>Condition:</b> {ad.condition}
                        </Text>
                        <Text>
                            <b>Brand:</b> {ad.brand}
                        </Text>
                        <Text>
                            <b>Model:</b> {ad.model}
                        </Text>
                        <Text>
                            <b>Features:</b> {ad.features}
                        </Text>
                    </Box>
                    {/* Contact Information */}
                    <Spacer />
                    <Box bgColor={"gray.100"} rounded={"md"} p={5}>
                        <Text fontSize="xl" fontWeight="bold">
                            {ad.seller.name}
                        </Text>
                        <HStack>
                            <FaEnvelope />
                            <Text>{ad.seller.phoneNumber}</Text>
                        </HStack>
                        {/* ... other contact details */}
                    </Box>
                </Flex>
                <Flex>
                    <Box>
                        <Text>
                            <b>Опис на огласот:</b>
                        </Text>
                        <Text>{ad.description}</Text>
                    </Box>
                </Flex>
            </VStack>
        </Flex>
    );
};

export default ReviewShow;
