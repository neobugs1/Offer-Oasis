import React, { useState } from "react";
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
import { usePage } from "@inertiajs/react";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Layout from "@/Layouts/Layout";
import AdsPage from "@/components copy/AdsPage";
import { Inertia } from "@inertiajs/inertia";
const NestedMenu = ({ category, setSelectedCategory }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);
    const handleClick = (name) => {
        setSelectedCategory(name);
        setIsOpen(false);
    };

    return (
        <Popover isOpen={isOpen} placement="right-start" closeOnBlur={false}>
            <PopoverTrigger>
                <Box
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <MenuItem onClick={() => handleClick(category)}>
                        {category.name}
                        {category.children[0] && <ChevronRightIcon ml="auto" />}
                    </MenuItem>
                </Box>
            </PopoverTrigger>
            {category.children[0] && (
                <Portal>
                    <PopoverContent
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        boxShadow="none"
                    >
                        <PopoverBody p={0}>
                            {category.children.map((subcategory) =>
                                subcategory.children ? (
                                    <NestedMenu
                                        key={subcategory.id}
                                        category={subcategory}
                                        setSelectedCategory={handleClick}
                                    />
                                ) : (
                                    <MenuItem
                                        key={subcategory.name}
                                        onClick={() => handleClick(subcategory)}
                                    >
                                        {subcategory.name}
                                    </MenuItem>
                                )
                            )}
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            )}
        </Popover>
    );
};

const SearchBar = ({ onSearch }) => {
    const { categories, locations } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    const [openPopover, setOpenPopover] = useState(null);

    const handleSearch = () => {
        onSearch(searchTerm, selectedCategory.id, selectedLocation.id);
    };

    return (
        <Flex
            as="form"
            align="center"
            p={4}
            bg="gray.100"
            borderRadius="md"
            boxShadow="md"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
        >
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={2}>
                    {selectedCategory.name || "All Categories"}
                </MenuButton>
                <MenuList>
                    {categories.map((category) => (
                        <NestedMenu
                            key={category.name}
                            category={category}
                            setSelectedCategory={setSelectedCategory}
                            openPopover={openPopover}
                            setOpenPopover={setOpenPopover}
                        />
                    ))}
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={2}>
                    {selectedLocation.name || "All Locations"}
                </MenuButton>
                <MenuList>
                    {locations.map((category) => (
                        <NestedMenu
                            key={category.name}
                            category={category}
                            setSelectedCategory={setSelectedLocation}
                            openPopover={openPopover}
                            setOpenPopover={setOpenPopover}
                        />
                    ))}
                </MenuList>
            </Menu>
            <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                flex="1"
                mr={2}
            />
            <Button type="submit" colorScheme="blue">
                Search
            </Button>
        </Flex>
    );
};

const Search = ({ auth, ads, queryParams = null }) => {
    const handleSearch = (searchTerm, category, location) => {
        queryParams = queryParams || {};

        if (searchTerm) queryParams["searchTerm"] = searchTerm;
        if (category) queryParams["category"] = category;
        if (location) queryParams["location"] = location;

        Inertia.get(route("search"), queryParams);
    };
    return (
        <Layout auth={auth}>
            <Box p={6}>
                <SearchBar onSearch={handleSearch} />
                <AdsPage ads={ads} />
            </Box>
        </Layout>
    );
};

export default Search;
