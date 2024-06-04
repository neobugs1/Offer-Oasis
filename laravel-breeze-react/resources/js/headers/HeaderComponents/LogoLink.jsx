import { Text } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React from "react";

const LogoLink = () => {
    return (
        <Link href="/" className="logo" style={{ display: "inline-block" }}>
            <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                Offer Oasis
            </Text>
        </Link>
    );
};

export default LogoLink;
