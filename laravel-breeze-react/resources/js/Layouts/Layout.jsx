import React, { Children } from "react";
import DefaultHeader from "../headers/DefaultHeader";
import { Navigate, Outlet } from "react-router-dom";
import DefaultFooter from "../footers/DefaultFooter";
import { Box, Flex } from "@chakra-ui/react";
import { useStateContext } from "../contexts/ContextProvider";
import { useTranslation } from "react-i18next";

const Layout = ({ children, auth }) => {
    // const { user, token } = useStateContext();

    // if (!token) {
    //   return <Navigate to="/login" />;
    // }
    const { t } = useTranslation();

    return (
        <Flex direction={"column"} minH="100vh">
            <DefaultHeader auth={auth} />
            {children}
            <DefaultFooter />
        </Flex>
    );
};

export default Layout;
