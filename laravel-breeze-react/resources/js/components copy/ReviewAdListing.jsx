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
    AspectRatio,
} from "@chakra-ui/react";
import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import {
    FaArrowLeft,
    FaArrowRight,
    FaCheck,
    FaTimes,
    FaTrashAlt,
    FaWindowClose,
} from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { Inertia } from "@inertiajs/inertia";
import ReviewShow from "./ReviewShow";
import { useForm } from "@inertiajs/inertia-react";

const ReviewAdListing = ({ ad, index }) => {
    const { auth } = usePage().props;

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

    const { data, setData, post } = useForm({
        _method: "put",
    });

    const handleApprove = (e) => {
        e.preventDefault();
        post(route("ad.approve", ad.id));
    };

    const handleDisapprove = (e) => {
        e.preventDefault();
        post(route("ad.reject", ad.id));
    };

    return (
        <AccordionItem>
            <AccordionButton h={20}>
                <Flex w={"full"} alignContent={"center"}>
                    <AspectRatio minW={20} mr={2} ratio={4 / 3}>
                        <Image
                            rounded={"md"}
                            src={
                                ad.images[0]
                                    ? ad.images[0].url
                                    : "https://via.placeholder.com/150"
                            }
                        />
                    </AspectRatio>
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
                        <Button
                            bg={"green.500"}
                            color={"white"}
                            onClick={handleApprove}
                        >
                            <FaCheck />
                        </Button>
                        <Button
                            bg={"red.500"}
                            color={"white"}
                            onClick={handleDisapprove}
                        >
                            <FaTimes />
                        </Button>
                        {auth.user.role == "admin" && (
                            <Button
                                onClick={() => deleteAd(ad)}
                                ml={10}
                                bg={"red.500"}
                                color={"white"}
                            >
                                <FaTrashAlt />
                            </Button>
                        )}
                    </Flex>
                </Box>
            </AccordionPanel>
        </AccordionItem>
    );
};

export default ReviewAdListing;
