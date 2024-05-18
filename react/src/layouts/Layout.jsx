import React from "react";
import DefaultHeader from "../headers/DefaultHeader";
import { Outlet } from "react-router-dom";
import DefaultFooter from "../footers/DefaultFooter";
import { Box, Flex } from "@chakra-ui/react";

const Layout = () => {
  return (
    <Flex direction={"column"} minH="100vh">
      <DefaultHeader />
      <DefaultFooter />
    </Flex>
  );
};

export default Layout;
