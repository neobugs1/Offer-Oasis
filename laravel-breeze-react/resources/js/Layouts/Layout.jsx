import React, { Children } from "react";
import DefaultHeader from "../headers/DefaultHeader";
import { Navigate, Outlet } from "react-router-dom";
import DefaultFooter from "../footers/DefaultFooter";
import { Box, Flex } from "@chakra-ui/react";
import { useStateContext } from "../contexts/ContextProvider";

const Layout = ({ children, auth }) => {
    // const { user, token } = useStateContext();

    // if (!token) {
    //   return <Navigate to="/login" />;
    // }

    return (
        <Flex direction={"column"} minH="100vh">
            <DefaultHeader auth={auth} />
            {children}
            <DefaultFooter />
        </Flex>
    );
};

export default Layout;
