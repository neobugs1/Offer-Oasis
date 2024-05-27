import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
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
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaEnvelope } from "react-icons/fa";

const Show = ({ ad, auth }) => {
    return (
        <Layout auth={auth}>
            <Head title={ad.title}></Head>
            <pre>{JSON.stringify(ad, 8, 2)}</pre>
            <Flex
                p={5}
                maxW="770px"
                mx="auto"
                my={10}
                boxShadow="xl"
                borderRadius="lg"
            >
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
                    <HStack maxW="1000px" align="center">
                        <IconButton
                            aria-label="Previous image"
                            icon={<FaArrowLeft />}
                        />
                        <Image src={ad.images} borderRadius="md" />
                        <IconButton
                            aria-label="Next image"
                            icon={<FaArrowRight />}
                        />
                    </HStack>
                    <Text>1/11</Text>

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
        </Layout>
    );
};

export default Show;
