import { Box } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React from "react";

const DodadiOglas = () => {
    return (
        <Link href={route("search")} className="h-full">
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
            >
                <Box
                    border={"2px"}
                    px={3}
                    py={2}
                    rounded={"3xl"}
                    whiteSpace={"nowrap"}
                >
                    Додади оглас
                </Box>
            </Box>
        </Link>
    );
};

export default DodadiOglas;
