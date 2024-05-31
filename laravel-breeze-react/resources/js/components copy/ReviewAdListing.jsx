import {
    Box,
    Flex,
    HStack,
    IconButton,
    Image,
    Spacer,
    Text,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
} from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReviewShow from "./ReviewShow";

const ReviewAdListing = ({ ad, index }) => {
    return (
        <AccordionItem>
            <AccordionButton h={20}>
                <Flex w={"full"} alignContent={"center"}>
                    <Image
                        rounded={"md"}
                        src={ad.images[0].url}
                        h={14}
                        mr={2}
                    />
                    <Box flex="1" textAlign="left" alignContent={"center"}>
                        {ad.title}
                    </Box>
                    <Spacer />
                    <Box alignContent={"center"} mr={10}>
                        <Text color={"orange.200"}>Status: {ad.status}</Text>
                    </Box>
                    <AccordionIcon />
                </Flex>
            </AccordionButton>
            <AccordionPanel pb={4}>
                <Box
                    key={ad.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={5}
                    position="relative"
                >
                    {/* ... existing component code */}
                    <ReviewShow ad={ad} />
                    <Flex gap={2}>
                        <Spacer />
                        <Button bg={"green.500"} color={"white"}>
                            Одобри
                        </Button>
                        <Button bg={"red.500"} color={"white"}>
                            Одбиј
                        </Button>
                    </Flex>
                </Box>
            </AccordionPanel>
        </AccordionItem>
    );
};

export default ReviewAdListing;
