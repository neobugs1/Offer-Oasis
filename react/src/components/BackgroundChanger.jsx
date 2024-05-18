import React, { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import image1 from "../assets/wood-industry-l.wsQzoRP4.jpg";

const BackgroundChanger = ({ children }) => {
  const images = [
    image1,
    // Add more image URLs
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Box bgImage={currentImage} bgSize="cover" bgPosition="center" bgRepeat="no-repeat">
      {children}
    </Box>
  );
};

export default BackgroundChanger;
