import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    MenuItem,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal,
} from "@chakra-ui/react";
import React, { useState } from "react";

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

export default NestedMenu;
