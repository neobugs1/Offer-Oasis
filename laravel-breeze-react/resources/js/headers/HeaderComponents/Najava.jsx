import { Box, Icon } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React from "react";
import { VscAccount } from "react-icons/vsc";

const Najava = () => {
    return (
        <Link href={route("login")} className="h-full">
            <Box
                as="button"
                h={"100%"}
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
            >
                <Icon as={VscAccount} w={9} h={"80%"} />
                Најава
            </Box>
        </Link>
    );
};

export default Najava;
