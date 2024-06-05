import { Image, Text } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import React from "react";
import logo from "../../assets/vecteezy_green-infinity-symbol-sustainable-icon_31615194.png";

const LogoLink = () => {
    return (
        <Link href="/" className="logo" style={{ display: "inline-block" }}>
            <Image src={logo} alt="logo" minW={14} maxW={14} />
        </Link>
    );
};

export default LogoLink;
