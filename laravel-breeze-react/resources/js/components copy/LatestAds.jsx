import React, { useState } from "react";
import {
    AspectRatio,
    Box,
    Flex,
    IconButton,
    Image,
    Text,
    textDecoration,
} from "@chakra-ui/react";
import placeholderImage from "../assets/Placeholder.svg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import { FaLocationDot } from "react-icons/fa6";

const AdCard = ({ title, id, images, price, currency, location, date }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex < images.length - 1) {
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
                return images.length - 1; // Go to the last image
            }
        });
    };
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

    return (
        <Box
            borderWidth="3px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow={"md"}
            m={2}
            w={'20%'}
        >
            <Box position="relative">
                <Box>
                <AspectRatio ratio={6 / 4}>
                    <Image
                        src={images[currentImageIndex].url}
                        rounded="md"
                        roundedBottom={0}
                    />
                </AspectRatio>
                </Box>
                <IconButton
                    aria-label="Previous image"
                    icon={<FaArrowLeft />}
                    onClick={handlePreviousImage}
                    position="absolute"
                    top="40%"
                    left="1"
                    bg={"transparent"}
                    color="white"
                    _hover={{ bg: "transparent", color: "gray" }}
                />
                <IconButton
                    aria-label="Next image"
                    icon={<FaArrowRight />}
                    onClick={handleNextImage}
                    position="absolute"
                    top="40%"
                    right="1"
                    bg={"transparent"}
                    color="white"
                    _hover={{ bg: "transparent", color: "gray" }}
                />
                <Flex
                    position="absolute"
                    bottom="5%"
                    left="5%"
                    bg="white"
                    bgColor={"transparent"}
                    color={"white"}
                    gap={1}
                    alignItems={"center"}
                >
                    <FaLocationDot />

                    {location}
                </Flex>
                <Text
                    position="absolute"
                    bottom="5%"
                    right="5%"
                    bg="white"
                    bgColor={"transparent"}
                    color={"white"}
                >
                    {formatDate(date)}
                </Text>
            </Box>
            <Box p={2}>
                <Link href={route("ad.show", id)}>
                    <Text
                        fontWeight="bold"
                        textAlign={"left"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        _hover={{
                            textDecoration: "underline",
                        }}
                    >
                        {title}
                    </Text>
                </Link>
                <Text textAlign={"left"} color={"#0060df"}>
                    <b>{price + " " + currency}</b>
                </Text>
            </Box>
        </Box>
    );
};

const LatestAds = ({ ads }) => {
    return (
        <>
            {ads.data.map((ad, index) => (
                <AdCard
                    key={index}
                    id={ad.id}
                    title={ad.title}
                    images={ad.images}
                    price={ad.price}
                    currency={ad.currency}
                    date={ad.date_posted}
                    location={ad.seller.location.name}
                />
            ))}
        </>
    );
};

export default LatestAds;
