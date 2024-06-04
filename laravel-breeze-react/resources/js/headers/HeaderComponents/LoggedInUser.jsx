import { Box, Icon } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React from "react";
import { VscAccount } from "react-icons/vsc";

const LoggedInUser = ({ auth }) => {
    return (
        <Link href={route("oglasi")} className="h-full">
            <Box
                as="button"
                h={"100%"}
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
                gap={4}
                whiteSpace={"nowrap"}
            >
                <Icon as={VscAccount} w={9} h={"80%"} />
                {auth.user.name}
            </Box>
        </Link>
    );
};

export default LoggedInUser;
