import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Input,
    Select,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuItemOption,
    MenuOptionGroup,
    MenuDivider,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Portal,
    VStack,
    HStack,
    Text,
    Image,
} from "@chakra-ui/react";
import { Head, usePage } from "@inertiajs/react";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Layout from "@/Layouts/Layout";
import AdsPage from "@/components copy/AdsPage";
import SearchLayout from "@/Layouts/SearchLayout";
import SearchBar from "@/headers/HeaderComponents/SearchBar";

const Search = ({ auth, ads, queryParams = null }) => {
    return (
        <SearchLayout auth={auth}>
            <Head
                title={
                    queryParams
                        ? queryParams["searchTerm"]
                            ? queryParams["searchTerm"]
                            : "Огласи"
                        : "Огласи"
                }
            ></Head>
            <Box p={6} bg={"#00193c1a"}>
                {/* <SearchBar queryParams={queryParams} /> */}
                <AdsPage ads={ads} />
            </Box>
        </SearchLayout>
    );
};

export default Search;
