import React from "react";
import DefaultHeader from "../headers/DefaultHeader";
import { Navigate, Outlet } from "react-router-dom";
import DefaultFooter from "../footers/DefaultFooter";
import { Box, Flex } from "@chakra-ui/react";
import { useStateContext } from "../contexts/ContextProvider";

const Layout = () => {
  // const { user, token } = useStateContext();

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <Flex direction={"column"} minH="100vh">
      <DefaultHeader />
      <DefaultFooter />
    </Flex>
  );
};

export default Layout;
