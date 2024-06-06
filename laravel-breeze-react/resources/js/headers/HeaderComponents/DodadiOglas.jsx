import { Box } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "react-i18next";

const DodadiOglas = () => {
    const { t } = useTranslation();
    return (
        <Link href={route("ad.create")} className="h-full">
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
                    {t("dodadioglas")}
                </Box>
            </Box>
        </Link>
    );
};

export default DodadiOglas;
