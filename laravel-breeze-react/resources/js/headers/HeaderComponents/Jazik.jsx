import { Box, Icon } from "@chakra-ui/react";
import React from "react";
import { VscChevronDown, VscGlobe } from "react-icons/vsc";

const Jazik = () => {
    return (
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
            gap={3}
        >
            <Icon as={VscGlobe} w={10} h={"100%"} />
            Јазик
            <Icon as={VscChevronDown} w={5} h={5} />
        </Box>
    );
};

export default Jazik;
