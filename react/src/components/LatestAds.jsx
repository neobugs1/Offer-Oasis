import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import placeholderImage from "../assets/Placeholder.svg";

const AdCard = ({ title, image }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" m={2}>
      <Image src={image} alt={title} />
      <Box p="6">
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {title}
        </Text>
      </Box>
    </Box>
  );
};

const LatestAds = () => {
  // Assuming you have an array of blog objects with 'title' and 'image' properties
  const latestAds = [
    { title: "Оглас 1", image: placeholderImage },
    { title: "Оглас 2", image: placeholderImage },
    { title: "Оглас 3", image: placeholderImage },
    { title: "Оглас 4", image: placeholderImage },
    { title: "Оглас 5", image: placeholderImage },
    { title: "Оглас 6", image: placeholderImage },
  ];

  return (
    <>
      {latestAds.map((ad, index) => (
        <AdCard key={index} title={ad.title} image={ad.image} />
      ))}
    </>
  );
};

export default LatestAds;
