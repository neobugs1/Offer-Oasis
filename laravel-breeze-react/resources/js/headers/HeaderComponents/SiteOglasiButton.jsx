import { Box } from "@chakra-ui/react";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

const SiteOglasiButton = () => {
    return (
        <Link href={route("search")} className="h-full">
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
                Сите огласи
            </Box>
        </Link>
    );
};

export default SiteOglasiButton;
