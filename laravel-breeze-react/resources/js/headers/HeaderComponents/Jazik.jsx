import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Radio,
    RadioGroup,
    Stack,
} from "@chakra-ui/react";
import React from "react";
import { VscChevronDown, VscGlobe } from "react-icons/vsc";

const Jazik = () => {
    const [selectedLanguage, setSelectedLanguage] = React.useState("MK");
    return (
        <Popover trigger="hover">
            <PopoverTrigger>
                <Box
                    as="button"
                    h={"100%"}
                    w={"90px"}
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
                    gap={3}
                >
                    <Icon as={VscGlobe} w={10} h={"100%"} />
                    {selectedLanguage === "MK" ? "МК" : "EN"}
                    <Icon as={VscChevronDown} w={5} h={5} />
                </Box>
            </PopoverTrigger>
            <PopoverContent color="black" w={"250px"} gap={2}>
                <PopoverBody p={5}>
                    <Flex
                        justifyContent={"center"}
                        flexDir="column"
                        alignItems="center"
                        gap={5}
                    >
                        <Heading fontSize={"3xl"} textAlign="center">
                            Јазик
                        </Heading>
                        <RadioGroup
                            onChange={setSelectedLanguage}
                            value={selectedLanguage}
                        >
                            <Stack direction="column" gap={5} mb={2}>
                                <Box
                                    _hover={{
                                        ".chakra-radio__control": {
                                            bg: "gray.300",
                                        },
                                    }}
                                >
                                    <Radio value="MK" size="lg">
                                        Македонски (MK)
                                    </Radio>
                                </Box>
                                <Box
                                    _hover={{
                                        ".chakra-radio__control": {
                                            bg: "gray.300",
                                        },
                                    }}
                                >
                                    <Radio value="EN" size="lg">
                                        English (EN)
                                    </Radio>
                                </Box>
                            </Stack>
                        </RadioGroup>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default Jazik;
