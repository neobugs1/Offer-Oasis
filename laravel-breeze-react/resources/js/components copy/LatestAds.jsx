import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import placeholderImage from "../assets/Placeholder.svg";

const AdCard = ({ title, image, price }) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={2}>
            <Image src={image} alt={title} />
            <Box>
                <Text fontSize="md" fontWeight="bold" textAlign={"left"}>
                    {title}
                </Text>
                <Text textAlign={"left"} color={"#00193c"}>
                    {price}
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
                    image={ad.images}
                    price={ad.price}
                />
            ))}
        </>
    );
};

export default LatestAds;
