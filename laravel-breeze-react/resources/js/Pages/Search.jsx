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

const SearchBar = ({ queryParams }) => {
    const { categories, locations } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    const [openPopover, setOpenPopover] = useState(null);

    const onSearch = (searchTerm, category, location) => {
        // Create a new queryParams object
        let newQueryParams = { ...queryParams };

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

    useEffect(() => {
        if (queryParams) {
            if (queryParams["searchTerm"])
                setSearchTerm(queryParams["searchTerm"]);
            if (queryParams["category"]) {
                const category = findCategoryById(
                    categories,
                    queryParams["category"]
                );
                setSelectedCategory(category);
            }
            if (queryParams["location"]) {
                const location = findCategoryById(
                    locations,
                    queryParams["location"]
                );
                setSelectedLocation(location);
            }
        }
    }, [queryParams, categories, locations]);

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
    return (
        <Layout auth={auth}>
            <Head
                title={queryParams ? queryParams["searchTerm"] : "Огласи"}
            ></Head>
            <Box p={6}>
                {/* <pre>{JSON.stringify(ads, 8, 2)}</pre> */}
                <SearchBar queryParams={queryParams} />
                <AdsPage ads={ads} />
            </Box>
        </Layout>
    );
};

export default Search;
