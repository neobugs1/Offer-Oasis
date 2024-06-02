import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";

const categories = [
    "Electronics",
    "Computers",
    "Smart Home",
    "Gaming",
    "Office Solutions",
    // Add more categories as needed
];

const handleSearch = (searchTerm, category) => {
    console.log("Search Term:", searchTerm);
    console.log("Selected Category:", category);
    // Implement the search functionality here
};

const SearchPage = () => {
    return (
        <Box p={6}>
            <SearchBar onSearch={handleSearch} />
            {/* Additional content */}
        </Box>
    );
};

export default SearchPage;
