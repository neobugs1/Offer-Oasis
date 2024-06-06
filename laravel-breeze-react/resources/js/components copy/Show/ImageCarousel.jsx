import { AspectRatio, IconButton, Image, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'


const ImageCarousel = ({ad,imageHeight,currentImageIndex, setCurrentImageIndex}) => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 4;

    const handleScrollUp = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - visibleCount, 0));
    };
    
    const handleScrollDown = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + visibleCount, ad.images.length - visibleCount));
    };
    return (
        <VStack
            spacing={5}
            p={5}
            boxShadow="md"
            rounded={"xl"}
            bg={"white"}
            h={"inherit"}
            maxH={imageHeight ? `${imageHeight}px` : 'none'}
            overflow="hidden"
            position="relative"
        >
            {startIndex > 0 && (
                <IconButton
                    aria-label="Scroll up"
                    icon={<FaArrowUp />}
                    onClick={handleScrollUp}
                    position="absolute"
                    top="0"
                    left="50%"
                    transform="translateX(-50%)"
                    bg={"transparent"}
                    rounded={0}
                    h={10}
                    w={10}
                    _hover={{
                        bgGradient: "linear(to-t, white, gray.200)"
                    }}
                />
            )}
            {ad.images.slice(startIndex, startIndex + visibleCount).map((image, index) => (
                <AspectRatio
                    boxSize="100px"
                    ratio={4 / 3}
                    key={index}
                    outline={
                        currentImageIndex === index + startIndex
                            ? "4px solid blue"
                            : "none"
                    }
                    outlineOffset={"-2px"}
                    borderRadius={"lg"}>
                    <Image
                        borderRadius={"lg"}
                        src={image.url}
                        onClick={() =>
                            setCurrentImageIndex(index + startIndex)
                        }
                        cursor="pointer"
                    />
                </AspectRatio>
            ))}
            {startIndex + visibleCount < ad.images.length && (
                <IconButton
                    aria-label="Scroll down"
                    icon={<FaArrowDown />}
                    onClick={handleScrollDown}
                    position="absolute"
                    bottom="0"
                    left="50%"
                    transform="translateX(-50%)"
                    bg={"transparent"}
                    rounded={0}
                    h={10}
                    w={10}
                    _hover={{
                        bgGradient: "linear(to-b, white, gray.200)"
                    }}
                />
            )}
        </VStack>

    )
}

export default ImageCarousel