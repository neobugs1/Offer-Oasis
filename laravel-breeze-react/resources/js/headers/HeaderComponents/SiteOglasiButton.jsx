import { Box } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "react-i18next";

const SiteOglasiButton = () => {
    const { t } = useTranslation();
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
                {t("siteOglasi")}
            </Box>
        </Link>
    );
};

export default SiteOglasiButton;
