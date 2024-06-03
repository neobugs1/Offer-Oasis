import React from "react";
import {
    Box,
    Container,
    Stack,
    Input,
    Button,
    Text,
    Flex,
    Heading,
} from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import BackgroundChanger from "./BackgroundChanger";
import LatestAds from "./LatestAds";
import { Search2Icon } from "@chakra-ui/icons";

const MainContent = ({ ads }) => {
    return (
        <BackgroundChanger>
            <Flex justify={"center"} direction={"column"} h="93vh">
                <Box flex="1" p={4}></Box>
                <Stack spacing={8} align="center">
                    <Text fontSize="4xl" color="white">
                        Пребарајте огласи
                    </Text>
                    <Flex w="full" maxW="650px" alignItems={"center"}>
                        <Input
                            placeholder="Пребарај, пр. BMW, Samsung, Iphone, Услуга ..."
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
                    <Box flex="1" p={4}>
                        <Heading color={"white"}>или</Heading>
                    </Box>
                    <Box
                        bg="white"
                        p={6}
                        borderRadius="md"
                        boxShadow="lg"
                        textAlign="center"
                        maxW={"70%"}
                        position="relative"
                        overflow={"hidden"}
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
                                Најнови {<br />} огласи
                            </Text>
                        </Box>
                        <Stack direction="row" justify="center" spacing={4}>
                            <LatestAds ads={ads} />
                        </Stack>
                    </Box>
                </Stack>
                <Box flex="1" p={4}></Box>
                <Flex
                    w={"100%"}
                    bgColor={"black"}
                    opacity={0.5}
                    justify={"center"}
                >
                    <Flex
                        w={"75%"}
                        justify="space-between"
                        color="white"
                        h="15vh"
                        align={"center"}
                    >
                        <Box textAlign="center">
                            <Text fontSize="2xl">640,000</Text>
                            <Text>Огласи</Text>
                        </Box>
                        <Box textAlign="center">
                            <Text fontSize="2xl">111</Text>
                            <Text>Индустриски сектори</Text>
                        </Box>
                        <Box textAlign="center">
                            <Text fontSize="2xl">350,000</Text>
                            <Text>Продукти</Text>
                        </Box>
                        <Box textAlign="center">
                            <Text fontSize="2xl">600,000</Text>
                            <Text>Слики и видеа</Text>
                        </Box>
                        <Box textAlign="center">
                            <Text fontSize="2xl">1 милион</Text>
                            <Text>купувачи месечно</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </BackgroundChanger>
    );
};

export default MainContent;
