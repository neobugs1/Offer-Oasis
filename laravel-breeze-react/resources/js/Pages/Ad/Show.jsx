import Layout from "@/Layouts/Layout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import {
    Box,
    Image,
    Text,
    Button,
    Flex,
    Spacer,
    VStack,
    HStack,
    IconButton,
    AspectRatio,
    Center,
} from "@chakra-ui/react";
import {
    FaArrowLeft,
    FaArrowRight,
    FaEnvelope,
    FaExpand,
} from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

const Show = ({ ad, auth }) => {
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
    const deleteAd = (ad) => {
        if (!window.confirm("Are you sure you want to delete the ad?")) {
            return;
        }
        if (!ad.id) {
            console.error("Error: ad.id is undefined");
            return;
        }
        Inertia.post(route("ad.destroy", ad.id), { _method: "delete" });
    };

    return (
        <Layout auth={auth}>
            <Head title={ad.title}></Head>
            {/* <pre>{JSON.stringify(ad, 8, 2)}</pre> */}
            <Box w={"100%"} h={"100%"} bg={"gray.200"}>
                <Flex
                    p={5}
                    w="60%"
                    mx={"auto"}
                    my={10}
                    boxShadow="xl"
                    borderRadius="lg"
                    bg={"white"}
                >
                    {/* Navigation Tabs */}
                    <VStack align="start" spacing={4} w="100%">
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
                        <Flex position="relative" minW={"100%"}>
                            <Box minW={"100%"}>
                                <Image
                                    src={
                                        ad.images &&
                                        ad.images[currentImageIndex] &&
                                        ad.images[currentImageIndex].url
                                            ? ad.images[currentImageIndex].url
                                            : "https://via.placeholder.com/300"
                                    }
                                    borderRadius="md"
                                    h="70vh"
                                    mx={"auto"}
                                />
                            </Box>
                            <IconButton
                                aria-label="Previous image"
                                icon={<FaArrowLeft />}
                                onClick={handlePreviousImage}
                                position="absolute"
                                top="50%"
                                left="5"
                                bg={"transparent"}
                                rounded={0}
                                h={20}
                                w={14}
                                _hover={{
                                    bgGradient: "linear(to-l, white, gray.200)",
                                }}
                            />

                            <IconButton
                                aria-label="Next image"
                                icon={<FaArrowRight />}
                                onClick={handleNextImage}
                                position="absolute"
                                top="50%"
                                right="5"
                                bg={"transparent"}
                                rounded={0}
                                h={20}
                                w={14}
                                _hover={{
                                    bgGradient: "linear(to-r, white, gray.200)",
                                }}
                            />
                            <Text
                                position="absolute"
                                top="90%"
                                right="90%"
                                p="2"
                                fontWeight={"bold"}
                                bgColor={"transparent"}
                            >
                                {currentImageIndex + 1}/{ad.images.length}
                            </Text>
                        </Flex>
                        <HStack spacing={5} p={10}>
                            {ad.images.map((image, index) => (
                                <Box
                                    key={index}
                                    outline={
                                        currentImageIndex === index
                                            ? "4px solid gray"
                                            : "none"
                                    }
                                    outlineOffset={"-4px"}
                                    borderRadius={"lg"}
                                >
                                    <Image
                                        borderRadius={"lg"}
                                        src={image.url}
                                        boxSize="100px"
                                        onClick={() =>
                                            setCurrentImageIndex(index)
                                        }
                                        cursor="pointer"
                                    />
                                </Box>
                            ))}
                        </HStack>

                        <Box p={5} w="100%" bg="gray.100" borderRadius="md">
                            <Text fontSize="2xl" fontWeight="bold">
                                {ad.title}
                            </Text>
                            <Text fontSize="lg">
                                {ad.price} {ad.currency}
                            </Text>
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
            </Box>
            <Button onClick={() => deleteAd(ad)}>Избриши оглас</Button>
            <Link className="w-full" href={route("ad.edit", ad.id)}>
                <Button w={"100%"}>Измени оглас</Button>
            </Link>
        </Layout>
    );
};

export default Show;
