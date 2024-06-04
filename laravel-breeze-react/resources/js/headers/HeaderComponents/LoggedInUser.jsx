import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    HStack,
    Icon,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { GrProjects } from "react-icons/gr";

const LoggedInUser = ({ auth }) => {
    return (
        <Popover trigger="hover">
            <PopoverTrigger>
                {/* <Link href={route("oglasi")} className="h-full"> */}
                <Box
                    as="button"
                    h={"100%"}
                    w={"100%"}
                    pt={"4px"}
                    borderBottom={"4px"}
                    borderColor={"transparent"}
                    _hover={{
                        borderBottom: "4px",
                        borderColor: "#80ac0c",
                    }}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={4}
                    whiteSpace={"nowrap"}
                >
                    <Icon as={VscAccount} w={9} h={"80%"} />
                    {auth.user.name}
                </Box>
                {/* </Link> */}
            </PopoverTrigger>
            <PopoverContent w={200} bg="white">
                <PopoverHeader fontWeight="bold" border="0" color={"black"}>
                    Твој профил:
                </PopoverHeader>
                <PopoverBody>
                    <Menu>
                        <VStack align="start" spacing={2}>
                            <MenuItem
                                as={Link}
                                href={route("oglasi")}
                                color="black"
                                _hover={{ bg: "gray.100" }}
                            >
                                <HStack spacing={2}>
                                    <GrProjects />
                                    <Text fontSize={"lg"}>Сите огласи</Text>
                                </HStack>
                            </MenuItem>
                            <MenuItem
                                as={Link}
                                href={route("profile.edit")}
                                color="black"
                                _hover={{ bg: "gray.100" }}
                            >
                                <HStack spacing={2}>
                                    <FaRegUser />
                                    <Text fontSize={"lg"}>Profile</Text>
                                </HStack>
                            </MenuItem>
                            <MenuItem
                                as={Link}
                                href={route("logout")}
                                method="post"
                                color="black"
                                _hover={{ bg: "gray.100" }}
                            >
                                <HStack spacing={2}>
                                    <MdLogout />
                                    <Text fontSize={"lg"}>Log Out</Text>
                                </HStack>
                            </MenuItem>
                        </VStack>
                    </Menu>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default LoggedInUser;
