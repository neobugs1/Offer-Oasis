import React, { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import image1 from "../assets/metalindustry.jpg";
import image2 from "../assets/logistics.jpg";

const BackgroundChanger = ({ children }) => {
  const images = [
    image1,
    image2,
    // Add more image URLs
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <Box
      bgImage={images[currentImageIndex]}
      bgSize="cover"
      bgPosition="center"
      position="absolute"
      transition="background-image 1s ease-in"
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundChanger;
