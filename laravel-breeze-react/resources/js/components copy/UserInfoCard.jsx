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
import { FaPhone, FaTruck, FaViber, FaWhatsapp } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { FiThumbsDown } from "react-icons/fi";
import { VscVerified } from "react-icons/vsc";
import userIcon from "../assets/profile.jpg";
import { useTranslation } from "react-i18next";

const UserInfoCard = ({ user }) => {
    const { t } = useTranslation();

    return (
        <Box p={4}>
            <VStack spacing={3} align="start">
                <Image
                    src={userIcon}
                    alt={t("userInfoCard.profileAlt")}
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
                        alt={t("userInfoCard.flagAlt")}
                        boxSize="20px"
                        mr={2}
                    />
                    <Text>{t("userInfoCard.country")}</Text>
                </Flex>
                <Button bgColor={"#0060df"} color={"white"} width="100%">
                    {t("userInfoCard.contactSeller")}
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
                    <Text>{t("userInfoCard.delivery")}</Text>
                </Flex>
                <Divider />
                <Flex align="center">
                    <Icon color={"green"} as={VscVerified} mr={2} />
                    <Text>{t("userInfoCard.verifiedSeller")}</Text>
                </Flex>
                <Divider />
                <Link color="#0060df" href="#">
                    <Flex align="center">
                        <Icon as={FiThumbsDown} mr={2} />
                        <Text>{t("userInfoCard.reportUser")}</Text>
                    </Flex>
                </Link>
            </VStack>
        </Box>
    );
};

export default UserInfoCard;
