import React from "react";
import { Link } from "@inertiajs/react";
import {
    Box,
    Flex,
    Spacer,
    Stack,
    Button,
    Text,
    Heading,
    Icon,
} from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { VscAccount, VscGlobe } from "react-icons/vsc";
import { VscChevronDown } from "react-icons/vsc";
import Najava from "./HeaderComponents/Najava";

const DefaultHeader = ({ auth }) => {
    return (
        <>
            <Flex
                bgColor={"#00193c"}
                flexDir={"row"}
                h="8vh"
                justifyContent={"center"}
                color={"white"}
            >
                <Flex w={"80%"} alignItems={"center"} id="hello">
                    <Link href="/" className="logo">
                        Offer Oasis
                    </Link>
                    <Spacer />
                    <Flex
                        className="header-right"
                        gap={7}
                        alignItems={"center"}
                        h={"100%"}
                    >
                        {auth.user ? (
                            <Link href={route("oglasi")} className="h-full">
                                <Box
                                    as="button"
                                    h={"100%"}
                                    borderBottom={"4px"}
                                    borderColor={"transparent"}
                                    _hover={{
                                        borderBottom: "4px",
                                        borderColor: "#80ac0c",
                                    }}
                                    color={"white"}
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    gap={4}
                                >
                                    <Icon as={VscAccount} w={9} h={"80%"} />
                                    {auth.user.name}
                                </Box>
                            </Link>
                        ) : (
                            <Najava />
                        )}
                        <Box
                            as="button"
                            h={"100%"}
                            borderBottom={"4px"}
                            borderColor={"transparent"}
                            _hover={{
                                borderBottom: "4px",
                                borderColor: "#80ac0c",
                            }}
                            color={"white"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={3}
                        >
                            <Icon as={VscGlobe} w={10} h={"100%"} />
                            Јазик
                            <Icon as={VscChevronDown} w={5} h={5} />
                        </Box>
                        <Link href={route("ad.create")} className="h-full">
                            <Box
                                as="button"
                                h={"100%"}
                                borderBottom={"4px"}
                                borderColor={"transparent"}
                                _hover={{
                                    borderBottom: "4px",
                                    borderColor: "#80ac0c",
                                }}
                                color={"white"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Box
                                    border={"2px"}
                                    px={3}
                                    py={2}
                                    rounded={"3xl"}
                                >
                                    Додади оглас
                                </Box>
                            </Box>
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
            <Outlet />
        </>
    );
};

export default DefaultHeader;
