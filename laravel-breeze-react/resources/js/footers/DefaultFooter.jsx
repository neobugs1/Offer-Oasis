import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    Divider,
    IconButton,
    Flex,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const DefaultFooter = () => {
    const { t } = useTranslation();
    return (
        <Flex bg="white" color="black" py={10} justifyContent={"center"}>
            <Stack spacing={4} p={5} w="80%">
                <Flex
                    justify="space-between"
                    align="center"
                    direction={{ base: "column", md: "row" }}
                    textAlign={{ base: "center", md: "left" }}
                >
                    <Text fontSize="lg" fontWeight="bold">
                        Offer Oasis
                    </Text>
                    <Stack direction="row" spacing={6} mt={{ base: 4, md: 0 }}>
                        <Link href="https://facebook.com" isExternal>
                            <IconButton
                                aria-label="Facebook"
                                icon={<FaFacebook />}
                                size="lg"
                                colorScheme="facebook"
                                variant="ghost"
                            />
                        </Link>
                        <Link href="https://twitter.com" isExternal>
                            <IconButton
                                aria-label="Twitter"
                                icon={<FaTwitter />}
                                size="lg"
                                colorScheme="twitter"
                                variant="ghost"
                            />
                        </Link>
                        <Link href="https://instagram.com" isExternal>
                            <IconButton
                                aria-label="Instagram"
                                icon={<FaInstagram />}
                                size="lg"
                                colorScheme="pink"
                                variant="ghost"
                            />
                        </Link>
                        <Link href="https://linkedin.com" isExternal>
                            <IconButton
                                aria-label="LinkedIn"
                                icon={<FaLinkedin />}
                                size="lg"
                                colorScheme="linkedin"
                                variant="ghost"
                            />
                        </Link>
                    </Stack>
                </Flex>
                <Divider />
                <Flex direction="column" align="left" justify="center">
                    <Flex
                        flexDirection={{ base: "column", md: "row" }}
                        gap={40}
                    >
                        <Flex direction="column">
                            <Text fontWeight="bold">{t("footer.uslugi")}</Text>
                            <Link href="#">{t("footer.registrirajse")}</Link>
                            <Link href="#">{t("footer.verifikacija")}</Link>
                            <Link href="#">
                                {t("footer.kakoDaStavamOglas")}
                            </Link>
                            <Link href="#">{t("footer.promovirajOglas")}</Link>
                            <Link href="#">{t("footer.premiumClen")}</Link>
                            <Link href="#">{t("footer.stranica")}</Link>
                        </Flex>
                        <Flex direction="column">
                            <Text fontWeight="bold">{t("siteOglasi")}</Text>
                            <Link href="#">{t("footer.novOglas")}</Link>
                            <Link href="#">{t("footer.kategorii")}</Link>
                            <Link href="#">{t("footer.pomoc")}</Link>
                            <Link href="#">{t("footer.premiumClenovi")}</Link>
                            <Link href="#">{t("footer.pomoc")}</Link>
                        </Flex>
                        <Flex direction="column">
                            <Text fontWeight="bold">{t("footer.pomoc")}</Text>
                            <Link href="#">
                                {t("footer.prebaruvanjeNaOglasi")}
                            </Link>
                            <Link href="#">
                                {t("footer.izbegnuvanjeNaIzmami")}
                            </Link>
                            <Link href="#">
                                {t("footer.jaZaboravivteLozinka")}
                            </Link>
                            <Link href="#">{t("footer.sorabotka")}</Link>
                            <Link href="#">
                                {t("footer.prasanjaIOdgovori")}
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
                <Divider />
                <Flex
                    justify="space-between"
                    direction={{ base: "column", md: "row" }}
                    textAlign={{ base: "center", md: "left" }}
                >
                    <Stack
                        direction="row"
                        spacing={4}
                        justify={{ base: "center", md: "flex-start" }}
                        mt={{ base: 4, md: 0 }}
                    >
                        <Link href="/about">{t("footer.aboutUs")}</Link>
                        <Link href="/services">{t("footer.services")}</Link>
                        <Link href="/contact">{t("footer.contact")}</Link>
                        <Link href="/privacy">{t("footer.privacyPolicy")}</Link>
                    </Stack>
                    <Text mt={{ base: 4, md: 0 }}>
                        &copy; {new Date().getFullYear()} Offer Oasis.{" "}
                        {t("footer.copyright")}
                    </Text>
                </Flex>
            </Stack>
        </Flex>
    );
};

export default DefaultFooter;
