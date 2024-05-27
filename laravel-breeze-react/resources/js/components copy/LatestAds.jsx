import React, { useState } from "react";
import {
    Box,
    Flex,
    IconButton,
    Image,
    Text,
    textDecoration,
} from "@chakra-ui/react";
import placeholderImage from "../assets/Placeholder.svg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AdCard = ({ title, images, price, currency }) => {
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
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={2}>
            <Box position="relative">
                <Image
                    src={images[currentImageIndex].url}
                    rounded="md"
                    roundedBottom={0}
                />
                <IconButton
                    aria-label="Previous image"
                    icon={<FaArrowLeft />}
                    onClick={handlePreviousImage}
                    position="absolute"
                    top="50%"
                    left="1"
                    bg={"transparent"}
                />
                <IconButton
                    aria-label="Next image"
                    icon={<FaArrowRight />}
                    onClick={handleNextImage}
                    position="absolute"
                    top="50%"
                    right="1"
                    bg={"transparent"}
                />
                <Text
                    position="absolute"
                    top="80%"
                    right="80%"
                    bg="white"
                    bgColor={"transparent"}
                    color={"white"}
                >
                    {currentImageIndex + 1}/{images.length}
                </Text>
            </Box>
            <Box>
                <Text
                    fontSize="md"
                    fontWeight="bold"
                    textAlign={"left"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                >
                    {title}
                </Text>
                <Text textAlign={"left"} color={"#00193c"}>
                    {price + " " + currency}
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
                    title={ad.title}
                    images={ad.images}
                    price={ad.price}
                    currency={ad.currency}
                />
            ))}
        </>
    );
};

export default LatestAds;
