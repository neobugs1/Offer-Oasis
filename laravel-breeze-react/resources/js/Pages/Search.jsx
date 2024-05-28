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
                    <MenuItem onClick={() => handleClick(category.name)}>
                        {category.name}
                        {category.children && <ChevronRightIcon ml="auto" />}
                    </MenuItem>
                </Box>
            </PopoverTrigger>
            {category.children && (
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
                                        key={subcategory.name}
                                        category={subcategory}
                                        setSelectedCategory={handleClick}
                                    />
                                ) : (
                                    <MenuItem
                                        key={subcategory.name}
                                        onClick={() =>
                                            handleClick(subcategory.name)
                                        }
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
    const { categories } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [openPopover, setOpenPopover] = useState(null);

    const handleSearch = () => {
        onSearch(searchTerm, selectedCategory);
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
                    {selectedCategory || "All Categories"}
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

const Search = ({ auth, ads }) => {
    const handleSearch = (searchTerm, category) => {
        console.log("Search Term:", searchTerm);
        console.log("Selected Category:", category);
        // Implement the search functionality here
    };
    return (
        <Layout auth={auth}>
            <Box p={6}>
                <SearchBar onSearch={handleSearch} />
                {/* Additional content */}
                <AdsPage ads={ads} />
            </Box>
        </Layout>
    );
};

export default Search;
