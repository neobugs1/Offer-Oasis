import { Link } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Box,
    Icon,
    Button,
    Divider,
    Flex,
    FormLabel,
    Text,
} from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";
import { useTranslation } from "react-i18next";

const Najava = () => {
    const { t } = useTranslation();
    return (
        <Popover trigger="hover">
            <PopoverTrigger>
                <Link href={route("oglasi")} className="h-full">
                    <Box
                        as="button"
                        h={"100%"}
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
                    >
                        <Icon as={VscAccount} w={9} h={"80%"} />
                        {t("najava")}
                    </Box>
                </Link>
            </PopoverTrigger>
            <PopoverContent color="black" w={"250px"} gap={2}>
                <PopoverBody p={5}>
                    <Flex direction={"column"} gap={1}>
                        <Link href={route("login")}>
                            <Button w={"100%"} bg={"#0060df"} color={"white"}>
                                {t("najaviSe")}
                            </Button>
                        </Link>
                        <Flex align="center">
                            <Divider />
                            <Text padding="2">{t("ili")}</Text>
                            <Divider />
                        </Flex>
                        <Link href={route("register")}>
                            <Button w={"100%"}>{t("registrirajSe")}</Button>
                        </Link>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default Najava;
