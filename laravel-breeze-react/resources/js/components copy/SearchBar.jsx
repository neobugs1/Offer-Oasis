import { useEffect, useState } from "react";
import {
    Flex,
    Input,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { Head, router, usePage } from "@inertiajs/react";
import { ChevronRightIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import NestedMenu from "./NestedMenu";
import { Inertia } from "@inertiajs/inertia";

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

        console.log(searchTerm, " ", category, " ", location)
        router.get(route("search"), newQueryParams);
        return;
    };

    const handleSearch = () => {
        onSearch(searchTerm, selectedCategory.id, selectedLocation.id);
    };

    return (
        <Flex
            as="form"
            align="center"
            p={4}
            borderRadius="md"
            color={'black'}
            boxShadow="md"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
        >

            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={2} bg={'white'} rounded={'3xl'}>
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
                placeholder="Пребарај..."
                bg="white"
                rounded={'3xl'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" bg={'#0060df'} rounded={'3xl'}>
                <Search2Icon color={"white"} />
            </Button>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={2} bg={'white'} rounded={'3xl'}>
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
        </Flex>
    );
};

export default SearchBar