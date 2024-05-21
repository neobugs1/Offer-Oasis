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
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";

const categories = [
  {
    name: "Electronics",
    subcategories: [
      {
        name: "Computers",
        subcategories: [{ name: "Laptops" }, { name: "Desktops" }, { name: "Tablets" }],
      },
      {
        name: "Mobile Phones",
        subcategories: [{ name: "Smartphones" }, { name: "Feature Phones" }],
      },
    ],
  },
  {
    name: "Home Appliances",
    subcategories: [{ name: "Refrigerators" }, { name: "Washing Machines" }, { name: "Microwaves" }],
  },
];

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
        <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <MenuItem onClick={() => handleClick(category.name)}>
            {category.name}
            {category.subcategories && <ChevronRightIcon ml="auto" />}
          </MenuItem>
        </Box>
      </PopoverTrigger>
      {category.subcategories && (
        <Portal>
          <PopoverContent onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} boxShadow="none">
            <PopoverBody p={0}>
              {category.subcategories.map((subcategory) =>
                subcategory.subcategories ? (
                  <NestedMenu key={subcategory.name} category={subcategory} setSelectedCategory={handleClick} />
                ) : (
                  <MenuItem key={subcategory.name} onClick={() => handleClick(subcategory.name)}>
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
      <Input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} flex="1" mr={2} />
      <Button type="submit" colorScheme="blue">
        Search
      </Button>
    </Flex>
  );
};

export default SearchBar;
