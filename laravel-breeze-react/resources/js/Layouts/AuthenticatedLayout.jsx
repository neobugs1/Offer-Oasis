import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import {
    Box,
    Flex,
    Button,
    IconButton,
    useDisclosure,
    HStack,
    VStack,
    Heading,
    Text,
    Stack,
    Divider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function Authenticated({ user, header, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg="gray.100">
            <Box
                bg="white"
                borderBottomWidth="1px"
                borderBottomColor="gray.200"
            >
                <Flex
                    maxW="75%"
                    mx="auto"
                    px={4}
                    h={16}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <HStack spacing={8} alignItems="center">
                        <Box>
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </Box>
                        <HStack
                            as="nav"
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        >
                            <NavLink
                                href={route("oglasi")}
                                active={route().current("oglasi")}
                            >
                                Огласи
                            </NavLink>
                            <NavLink
                                href={route("reviews")}
                                active={route().current("reviews")}
                            >
                                Админ панел
                            </NavLink>
                        </HStack>
                    </HStack>
                    <Flex alignItems="center">
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded="full"
                                variant="link"
                                cursor="pointer"
                                minW={0}
                            >
                                <HStack>
                                    <Text>{user.name}</Text>
                                    <ChevronDownIcon />
                                </HStack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    as={Link}
                                    href={route("profile.edit")}
                                >
                                    Profile
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem
                                    as={Link}
                                    href={route("logout")}
                                    method="post"
                                >
                                    Log Out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        <IconButton
                            size="md"
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            aria-label="Open Menu"
                            display={{ md: "none" }}
                            onClick={isOpen ? onClose : onOpen}
                        />
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as="nav" spacing={4}>
                            <ResponsiveNavLink
                                href={route("oglasi")}
                                active={route().current("oglasi")}
                            >
                                Огласи
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("reviews")}
                                active={route().current("reviews")}
                            >
                                Админ панел
                            </ResponsiveNavLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            {header && (
                <Box bg="white" shadow="sm">
                    <Box maxW="75%" mx="auto" py={6} px={4}>
                        {header}
                    </Box>
                </Box>
            )}

            <Box>{children}</Box>
        </Box>
    );
}
