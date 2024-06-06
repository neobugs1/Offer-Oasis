import { useEffect, useState } from "react";
import {
    Flex,
    Input,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    Box,
} from "@chakra-ui/react";
import { Head, router, usePage } from "@inertiajs/react";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    Search2Icon,
} from "@chakra-ui/icons";
import NestedMenu from "../../components copy/NestedMenu";
import { Inertia } from "@inertiajs/inertia";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaSearchLocation } from "react-icons/fa";
import { LiaSearchLocationSolid } from "react-icons/lia";
import { MdOutlineMyLocation } from "react-icons/md";

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

const SearchBar = ({ queryParams, auth }) => {
    const parseQueryParams = (queryString) => {
        const params = new URLSearchParams(queryString);
        let queryParams = {};
        for (let [key, value] of params.entries()) {
            queryParams[key] = value;
        }
        return queryParams;
    };
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
        let newQueryParams = {};

        if (searchTerm) newQueryParams["searchTerm"] = searchTerm;
        else delete newQueryParams["searchTerm"];

        if (category) newQueryParams["category"] = category;
        else delete newQueryParams["category"];

        if (location) newQueryParams["location"] = location;
        else delete newQueryParams["location"];

        // Reset the page query parameter
        newQueryParams["page"] = 1;

        router.get(route("search"), newQueryParams);
        return;
    };

    const handleSearch = () => {
        onSearch(searchTerm, selectedCategory.id, selectedLocation.id);
    };

    return (
        <Flex
            as="form"
            color={"black"}
            h={"100%"}
            w={"100%"}
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
            align={"center"}
            justify={"center"}
            pt={"4px"}
        >
            <Menu>
                <MenuButton
                    as={Button}
                    leftIcon={<TfiMenuAlt size={30} />}
                    rightIcon={<ChevronDownIcon size={30} />}
                    mr={2}
                    bg={"#00193c"}
                    color={"white"}
                    rounded={"0"}
                    w={"20%"}
                    h={"100%"}
                    borderBottom={"4px"}
                    borderColor={"#00193c"}
                    _hover={{
                        borderBottom: "4px",
                        borderColor: "#80ac0c",
                        bg: "#00193c",
                    }}
                    _active={{
                        bg: "#00193c",
                        borderColor: "#80ac0c",
                    }}
                    gap={4}
                >
                    <Box
                        as="span"
                        display="block"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        maxWidth="calc(100% - 0.1rem)"
                    >
                        {selectedCategory.name || "Категории"}
                    </Box>
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
            <InputGroup width="58%" height="60%">
                <Input
                    pl={"1.5rem"}
                    placeholder="Пребарај..."
                    bg="#e8e4ec"
                    rounded="full"
                    height="100%"
                    width="100%"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    paddingRight="4rem"
                />
                <InputRightElement width="3.5rem" height="100%">
                    <Button
                        type="submit"
                        bg="#0060df"
                        rounded="100"
                        height="100%"
                        p={5}
                        _hover={{
                            bg: "blue.500",
                        }}
                    >
                        <Search2Icon color="white" boxSize={5} />
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Menu h={"100%"}>
                <MenuButton
                    as={Button}
                    leftIcon={<LiaSearchLocationSolid size={30} />}
                    rightIcon={<ChevronDownIcon />}
                    mr={2}
                    bg={"#00193c"}
                    color={"white"}
                    rounded={"0"}
                    w={"22%"}
                    h={"100%"}
                    borderBottom={"4px"}
                    borderColor={"#00193c"}
                    _hover={{
                        borderBottom: "4px",
                        borderColor: "#80ac0c",
                        bg: "#00193c",
                    }}
                    _active={{
                        bg: "#00193c",
                        borderColor: "#80ac0c",
                    }}
                >
                    <Box
                        as="span"
                        display="block"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        fontWeight={"medium"}
                        maxWidth="calc(100% - 0.1rem)"
                    >
                        {selectedLocation.name || "Цела Македонија"}
                    </Box>
                </MenuButton>
                <MenuList>
                    <MenuItem
                        onClick={() => setSelectedLocation("")}
                        key={"all"}
                        _focus={{ bg: "charcoal.50" }}
                        _hover={{ bg: "gray.100" }} // Ensure consistent hover effect
                        cursor="pointer" // Ensure consistent cursor pointer
                    >
                        Цела Македонија
                    </MenuItem>
                    {auth.user && (
                    <MenuItem
                        onClick={() =>
                            setSelectedLocation(
                                findCategoryById(locations, auth.user.location)
                            )
                        }
                        key={"all"}
                        _focus={{ bg: "charcoal.50" }}
                        _hover={{ bg: "gray.100" }} // Ensure consistent hover effect
                        cursor="pointer" // Ensure consistent cursor pointer
                        gap={2}
                        color={"blue"}
                    >
                        <MdOutlineMyLocation /> Моја локација
                    </MenuItem>
                    )}
                    {locations.map((category) => (
                        <NestedMenu
                            key={category.name}
                            category={category}
                            setSelectedCategory={setSelectedLocation}
                        />
                    ))}
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default SearchBar;
