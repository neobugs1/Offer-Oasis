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
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdPending, MdCheckCircle, MdError } from "react-icons/md";

const MyAdListing = ({ ad, index }) => {
    const { data, setData, post } = useForm({
        _method: "put",
    });
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

    const handleRenew = (e) => {
        e.preventDefault();
        post(route("ad.renew", ad.id));
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
                <VStack align="start" spacing={2} maxW={"700"}>
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
                    <HStack >
                        <Text color={"#0060df"} fontWeight="bold" fontSize={"xl"}>
                            {Number(ad.price)} {ad.currency}
                        </Text>
                        {Number(ad.start_price) > Number(ad.price) && (
                            <Text as="s">
                                Почетна цена: {ad.start_price} {ad.currency}
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
                                color={"#0060df"}
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
            <Flex position="absolute" top="14" right="10">
                <Flex alignItems={"center"} fontSize={"30px"} gap={2}>
                    {ad.status === "approved" && (
                        <MdCheckCircle size={40} color="green" />
                    )}
                    {ad.status === "rejected" && <MdError color="red" />}
                    {ad.status === "pending" && <MdPending color="orange" />}
                </Flex>
            </Flex>

            <HStack position="absolute" bottom="5" right="5">
                {ad.status === "approved" && (
                    <Button bg={"#0060df"} color={"white"} onClick={handleRenew}>
                        Renew
                    </Button>
                )}
                <Link href={route("ad.edit", ad.id)}>
                    <Button bg={"#0060df"} color={"white"}>Edit</Button>
                </Link>
                <Button bg={"#0060df"} color={"white"} onClick={() => deleteAd(ad)}>
                    Delete
                </Button>
            </HStack>
        </Box>
    );
};

export default MyAdListing;
