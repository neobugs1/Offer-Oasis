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
const parseQueryParams = (queryString) => {
    const params = new URLSearchParams(queryString);
    let queryParams = {};
    for (let [key, value] of params.entries()) {
        queryParams[key] = value;
    }
    return queryParams;
};
// Helper function to find a category by its ID
const findCategoryById = (categories, id) => {
    for (let category of categories) {
        if (category.id == id) {
            return category;
        }
        if (category.children.length > 0) {
            let found = findCategoryById(category.children, id);
            if (found) return found;
        }
    }
    return null;
};

const SearchBar = ({ queryParams }) => {
    const { categories, locations } = usePage().props;

    const initialQueryParams = parseQueryParams(window.location.search);

    const [searchTerm, setSearchTerm] = useState(
        initialQueryParams["searchTerm"] || ""
    );
    const [selectedCategory, setSelectedCategory] = useState(() => {
        return initialQueryParams["category"]
            ? findCategoryById(categories, initialQueryParams["category"])
            : "";
    });
    const [selectedLocation, setSelectedLocation] = useState(() => {
        return initialQueryParams["location"]
            ? findCategoryById(locations, initialQueryParams["location"])
            : "";
    });

    const [openPopover, setOpenPopover] = useState(null);

    const onSearch = (searchTerm, category, location) => {
        // Create a new queryParams object
        let newQueryParams = {};

        if (searchTerm) newQueryParams["searchTerm"] = searchTerm;
        else delete newQueryParams["searchTerm"];

        if (category) newQueryParams["category"] = category;
        else delete newQueryParams["category"];

        if (location) newQueryParams["location"] = location;
        else delete newQueryParams["location"];

        // Reset the page query parameter
        newQueryParams["page"] = 1;

        Inertia.get(route("search"), newQueryParams);
    };

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
                    {selectedCategory.name || "Сите категории"}
                </MenuButton>
                <MenuList zIndex={2}>
                    <MenuItem
                        key={"all"}
                        onClick={() => setSelectedCategory("")}
                    >
                        Сите категории
                    </MenuItem>

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
                    {selectedLocation.name || "Цела Македонија"}
                </MenuButton>
                <MenuList>
                    <MenuItem
                        onClick={() => setSelectedLocation("")}
                        key={"all"}
                    >
                        Цела Македонија
                    </MenuItem>
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
    return (
        <Layout auth={auth}>
            <Head
                title={
                    queryParams
                        ? queryParams["searchTerm"]
                            ? queryParams["searchTerm"]
                            : "Огласи"
                        : "Огласи"
                }
            ></Head>
            <Box p={6}>
                <SearchBar queryParams={queryParams} />
                <AdsPage ads={ads} />
            </Box>
        </Layout>
    );
};

export default Search;
