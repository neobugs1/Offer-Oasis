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
import SearchBar from "@/headers/HeaderComponents/SearchBar";
import Najava from "./HeaderComponents/Najava";
import LoggedInUser from "./HeaderComponents/LoggedInUser";
import LogoLink from "./HeaderComponents/LogoLink";
import Jazik from "./HeaderComponents/Jazik";
import DodadiOglas from "./HeaderComponents/DodadiOglas";

const SearchHeader = ({ auth }) => {
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
                    <LogoLink />
                    <SearchBar auth={auth} />
                    <Flex
                        className="header-right"
                        gap={7}
                        alignItems={"center"}
                        h={"100%"}
                    >
                        {auth.user ? <LoggedInUser auth={auth} /> : <Najava />}
                        <Jazik />
                        <DodadiOglas />
                    </Flex>
                </Flex>
            </Flex>
            <Outlet />
        </>
    );
};

export default SearchHeader;
