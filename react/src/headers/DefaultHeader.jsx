import React from "react";
import { Box, Link, Flex, Spacer, Stack, Button, Text, Heading, Icon } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { VscAccount, VscGlobe } from "react-icons/vsc";
import { VscChevronDown } from "react-icons/vsc";

const DefaultHeader = () => {
  return (
    <>
      <Flex bgColor={"#00193c"} flexDir={"row"} h="7vh" justifyContent={"center"} color={"white"}>
        <Flex w={"80%"} alignItems={"center"} id="hello">
          <Link href="#default" className="logo">
            Offer Oasis
          </Link>
          <Spacer />
          <Flex className="header-right" gap={10} alignItems={"center"} h={"100%"}>
            <Box
              as="button"
              h={"100%"}
              borderBottom={"4px"}
              borderColor={"transparent"}
              _hover={{ borderBottom: "4px", borderColor: "teal.700" }}
              color={"white"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={4}
            >
              Најава
              <Icon as={VscAccount} w={9} h={"80%"} />
            </Box>
            <Box
              as="button"
              h={"100%"}
              borderBottom={"4px"}
              borderColor={"transparent"}
              _hover={{ borderBottom: "4px", borderColor: "teal.700" }}
              color={"white"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={4}
            >
              <Icon as={VscGlobe} w={10} h={"100%"} />
              Јазик
              <Icon as={VscChevronDown} w={5} h={5} />
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
};

export default DefaultHeader;
