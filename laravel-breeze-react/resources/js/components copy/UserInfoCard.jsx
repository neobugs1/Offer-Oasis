import React from "react";
import {
    Box,
    Image,
    Text,
    Button,
    Flex,
    Icon,
    Divider,
    VStack,
    HStack,
    Link,
    StackDivider,
} from "@chakra-ui/react";
import {
    FaPhone,
    FaTruck,
    FaInfoCircle,
    FaExclamationCircle,
    FaViber,
    FaWhatsapp,
} from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import userIcon from "../assets/profile.jpg";
import { CiLocationArrow1 } from "react-icons/ci";
import { FiThumbsDown } from "react-icons/fi";
import { VscVerified } from "react-icons/vsc";


const UserInfoCard = ({ user }) => {
    return (
        <Box p={4}>
            <VStack spacing={3} align="start">
                <Image
                    src={userIcon}
                    alt="Shipment Tracking Logo"
                    boxSize="70px"
                    objectFit="cover"
                    rounded={"lg"}
                    outlineOffset={"2px"}
                    outline={"1px solid gray"}
                    _hover={{ outline: "1px solid blue", cursor: "pointer" }}
                />
                <Text fontWeight="bold">{user.name}</Text>
                <Flex alignItems={"center"} gap={2}>
                    <CiLocationArrow1 color="#0060df" size={20} />
                    {user.location.name}
                </Flex>
                <Flex align="center">
                    <Image
                        src="https://flagsapi.com/MK/flat/64.png"
                        alt="Macedonia Flag"
                        boxSize="20px"
                        mr={2}
                    />
                    <Text>Македонија</Text>
                </Flex>
                <Button bgColor={"#0060df"} color={"white"} width="100%">
                    Контактирај го продавачот
                </Button>
                <Divider />
                <HStack
                    spacing={4}
                    divider={<StackDivider borderColor="gray.200" />}
                >
                    <Flex align="center" gap={2}>
                        <FaViber size={25} color="purple" />
                        <FaWhatsapp size={25} color="green" />
                    </Flex>
                    <Flex align="center" color="#0060df">
                        <Icon as={FaPhone} mr={2} />
                        <Text>{user.phoneNumber}</Text>
                    </Flex>
                </HStack>
                <Divider />
                <Flex align="center">
                    <Icon as={FaTruck} mr={2} />
                    <Text>Достава: Цела Македонија</Text>
                </Flex>
                <Divider />
                <Flex align="center">
                    <Icon color={"green"} as={VscVerified} mr={2} />
                    <Text>Верифициран продавач</Text>
                </Flex>
                <Divider />

                <Link color="#0060df" href="#">
                    <Flex align="center">
                        <Icon as={FiThumbsDown} mr={2} />
                        <Text>Пријави корисник</Text>
                    </Flex>
                </Link>
            </VStack>
        </Box>
    );
};

export default UserInfoCard;
