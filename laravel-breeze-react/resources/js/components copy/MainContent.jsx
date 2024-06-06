import React, { useTransition } from "react";
import {
    Box,
    Container,
    Stack,
    Input,
    Button,
    Text,
    Flex,
    Heading,
    Spacer,
    Divider,
} from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import BackgroundChanger from "./BackgroundChanger";
import LatestAds from "./LatestAds";
import { Search2Icon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

const MainContent = ({ ads }) => {
    const { t } = useTranslation();

    return (
        <BackgroundChanger>
            <Flex justify={"center"} direction={"column"} h="93vh">
                <Box flex="1" p={"4vh"}></Box>
                <Stack
                    align="center"
                    maxW={"100%"}
                    mx={"auto"}
                    maxH={"100%"}
                    h={"78vh"}
                >
                    <Spacer />
                    <Text fontSize="4xl" color="white">
                        {t("prebarajte")}
                    </Text>
                    <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={6}
                        flexDirection={"column"}
                        h={"100%"}
                    >
                        <Flex w="full" maxW="650px" alignItems={"center"}>
                            <Input
                                placeholder={t("searchInput")}
                                size="lg"
                                bg="white"
                                roundedLeft="3xl"
                                roundedRight={0}
                            />
                            <Link href={route("search")}>
                                <Button
                                    bg={"#0060df"}
                                    size="lg"
                                    roundedRight="3xl"
                                    roundedLeft={0}
                                >
                                    <Search2Icon color={"white"} />
                                </Button>
                            </Link>
                        </Flex>
                        <Divider
                            orientation="vertical"
                            maxH={"2vh"}
                            borderColor={"rgba(255, 255, 255, 1)"}
                        />

                        <Heading color={"white"}>{t("ili")}</Heading>
                        <Divider
                            orientation="vertical"
                            maxH={"2vh"}
                            borderColor={"rgba(255, 255, 255, 1)"}
                        />

                        <Box
                            bg="white"
                            p={4}
                            borderRadius="md"
                            boxShadow="lg"
                            textAlign="center"
                            position="relative"
                            overflow={"hidden"}
                            w={["90vw", "80vw", "70vw", "60vw", "60vw"]}
                        >
                            <Box
                                bg="#7faf0d"
                                color="white"
                                position="absolute"
                                w={250}
                                h={300}
                                top={-44}
                                right={-44}
                                transform="rotate(45deg)"
                                px={4}
                                py={2}
                                zIndex={2}
                            >
                                <Text
                                    fontSize="lg"
                                    position="absolute"
                                    bottom="3%"
                                    left={"30%"}
                                >
                                    {t("najnovi")}
                                    {<br />} {t("oglasi")}
                                </Text>
                            </Box>
                            <Stack direction="row" justify="center" spacing={2}>
                                <LatestAds ads={ads} />
                            </Stack>
                        </Box>
                    </Flex>
                    <Spacer />
                </Stack>
                <Flex
                    w={"100%"}
                    bgColor={"black"}
                    opacity={0.5}
                    justify={"center"}
                    h={"15vh"}
                >
                    <Flex
                        w={"75%"}
                        justify="space-between"
                        color="white"
                        align={"center"}
                    >
                        <Box textAlign="center">
                            <Text fontSize="2xl">640,000</Text>
                            <Text>{t("oglasi")}</Text>
                        </Box>
                        <Box textAlign="center">
                            <Text fontSize="2xl">111</Text>
                            <Text>{t("industriskiSektori")}</Text>
                        </Box>
                        <Box textAlign="center">
                            <Text fontSize="2xl">350,000</Text>
                            <Text>{t("produkti")}</Text>
                        </Box>
                        <Box textAlign="center">
                            <Text fontSize="2xl">600,000</Text>
                            <Text>{t("slikiIVidea")}</Text>
                        </Box>
                        <Box textAlign="center">
                            <Text fontSize="2xl">1 милион</Text>
                            <Text>{t("kupuvaciMesecno")}</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </BackgroundChanger>
    );
};

export default MainContent;
