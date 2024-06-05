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
    Divider,
} from "@chakra-ui/react";
import {
    FaArrowLeft,
    FaArrowRight,
    FaChevronRight,
    FaEnvelope,
    FaExpand,
} from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import UserInfoCard from "@/components copy/UserInfoCard";
import { AiOutlineHome } from "react-icons/ai";

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
            <Flex
                w={"100%"}
                h={"100%"}
                bg={"gray.200"}
                flexDirection={"column"}
            >
                <Flex
                    w="70%"
                    mx={"auto"}
                    p={4}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={3}
                >
                    <AiOutlineHome color="#0060df" size={25} />
                    <FaChevronRight color="gray" />

                    <HStack spacing={5}>
                        {ad.category.map((category, index) => (
                            <>
                                <Link>
                                    <Text
                                        fontSize="sm"
                                        color={"#0060df"}
                                        fontWeight="bold"
                                        _hover={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        {category.name}
                                    </Text>
                                </Link>
                                {index < ad.category.length - 1 && (
                                    <FaChevronRight color="gray" />
                                )}
                            </>
                        ))}
                        <FaChevronRight color="gray" />
                        <Text fontSize="lg" color={"black"} fontWeight="bold">
                            {ad.title}
                        </Text>
                    </HStack>
                </Flex>
                <Flex pb={5} w="70%" mx={"auto"} gap={5}>
                    <Box
                        bg={"white"}
                        h={"max-content"}
                        w={"23%"}
                        rounded={"xl"}
                        boxShadow="md"
                    >
                        <UserInfoCard user={ad.seller} />
                    </Box>
                    <HStack></HStack>
                    <VStack align="start" spacing={4} w="77%">
                        <Flex w={"100%"} gap={5}>
                            <Flex
                                position="relative"
                                w={"80%"}
                                bg={"white"}
                                boxShadow="md"
                                rounded={"xl"}
                            >
                                <Box minW={"100%"}>
                                    <Image
                                        src={
                                            ad.images &&
                                            ad.images[currentImageIndex] &&
                                            ad.images[currentImageIndex].url
                                                ? ad.images[currentImageIndex]
                                                      .url
                                                : "https://via.placeholder.com/300"
                                        }
                                        borderRadius="md"
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
                                        bgGradient:
                                            "linear(to-l, white, gray.200)",
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
                                        bgGradient:
                                            "linear(to-r, white, gray.200)",
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
                            <VStack
                                spacing={5}
                                p={5}
                                boxShadow="md"
                                rounded={"xl"}
                                bg={"white"}
                                h={"max-content"}
                            >
                                {ad.images.map((image, index) => (
                                    <Box
                                        key={index}
                                        outline={
                                            currentImageIndex === index
                                                ? "2px solid blue"
                                                : "none"
                                        }
                                        outlineOffset={"-2px"}
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
                            </VStack>
                        </Flex>
                        <Box
                            p={5}
                            w="100%"
                            bg="white"
                            boxShadow={"md"}
                            rounded={"xl"}
                        >
                            <Text fontSize="2xl" fontWeight="bold">
                                {ad.title}
                            </Text>
                            <Text fontSize="lg">
                                {ad.price} {ad.currency}
                            </Text>
                        </Box>
                        <Flex
                            direction={"column"}
                            w={"100%"}
                            bg={"white"}
                            p={5}
                            rounded={"xl"}
                            boxShadow={"md"}
                        >
                            <Box>
                                <Text>
                                    <b>Опис на огласот:</b>
                                </Text>
                            </Box>
                            <Divider />
                            <Text>{ad.description}</Text>
                            <Divider />
                            <Box>
                                {ad.brand && (
                                    <Text>
                                        <b>Бренд:</b> {ad.brand}
                                    </Text>
                                )}
                                {ad.model && (
                                    <Text>
                                        <b>Модел:</b> {ad.model}
                                    </Text>
                                )}
                                {ad.year && (
                                    <Text>
                                        <b>Година:</b> {ad.year}
                                    </Text>
                                )}
                                {ad.fuel_type && (
                                    <Text>
                                        <b>Гориво:</b> {ad.fuel_type}
                                    </Text>
                                )}
                                {ad.mileage && (
                                    <Text>
                                        <b>Километри:</b> {ad.mileage}
                                    </Text>
                                )}
                                {ad.transmission && (
                                    <Text>
                                        <b>Менувач:</b> {ad.transmission}
                                    </Text>
                                )}
                                {ad.body_type && (
                                    <Text>
                                        <b>Каросерија:</b> {ad.body_type}
                                    </Text>
                                )}
                                {ad.color && (
                                    <Text>
                                        <b>Боја:</b> {ad.color}
                                    </Text>
                                )}
                                {ad.registration_country && (
                                    <Text>
                                        <b>Регистрација:</b>{" "}
                                        {ad.registration_country}
                                    </Text>
                                )}
                                {ad.registration_valid_until && (
                                    <Text>
                                        <b>Регистрирана до::</b>{" "}
                                        {ad.registration_valid_until}
                                    </Text>
                                )}
                                {ad.engine_power_ks && (
                                    <Text>
                                        <b>Сила на моторот (ks):</b>{" "}
                                        {ad.engine_power_ks}
                                    </Text>
                                )}
                                {ad.emission_class && (
                                    <Text>
                                        <b>Класа на емисија:</b>{" "}
                                        {ad.emission_class}
                                    </Text>
                                )}
                            </Box>
                        </Flex>
                    </VStack>
                </Flex>
            </Flex>
            <Button onClick={() => deleteAd(ad)}>Избриши оглас</Button>
            <Link className="w-full" href={route("ad.edit", ad.id)}>
                <Button w={"100%"}>Измени оглас</Button>
            </Link>
        </Layout>
    );
};

export default Show;
