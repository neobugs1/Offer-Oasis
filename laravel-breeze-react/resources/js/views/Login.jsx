import {
    Box,
    Flex,
    Input,
    Button,
    Link,
    Text,
    FormLabel,
    FormControl,
    SimpleGrid,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const Login = () => {
    const { t } = useTranslation();

    return (
        <Flex
            justifyContent={"center"}
            bgColor={"#f3f4f5"}
            h="53vh"
            alignItems={"center"}
            flexDirection={"column"}
        >
            <Head>{t("login.loginTitle")}</Head>
            <Box
                w="400px"
                h="380px"
                p={5}
                bgColor={"white"}
                roundedTop={"xl"}
                boxShadow={"lg"}
            >
                <Flex direction="column" align="center" gap={5}>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        align={"left"}
                        w={"100%"}
                    >
                        {t("login.loginTitle")}
                    </Text>
                    <FormControl>
                        <Flex flexDirection={"column"}>
                            <Box>
                                <FormLabel>{t("login.emailLabel")}</FormLabel>
                                <Input
                                    placeholder={t("login.emailPlaceholder")}
                                    mb={4}
                                    id="email"
                                />
                            </Box>
                            <Box>
                                <FormLabel>
                                    {t("login.passwordLabel")}
                                </FormLabel>
                                <Input
                                    type="password"
                                    placeholder={t("login.passwordPlaceholder")}
                                    mb={4}
                                    id="password"
                                />
                            </Box>
                            <Button
                                bgColor="#0060df"
                                color={"white"}
                                mt={4}
                                size="lg"
                            >
                                {t("login.loginButton")}
                            </Button>
                        </Flex>
                    </FormControl>
                    <Link fontSize="sm" color="#0060df">
                        {t("login.forgotPassword")}
                    </Link>
                </Flex>
            </Box>
            <Box
                fontSize="sm"
                textAlign="left"
                bgColor={"gray.200"}
                w="400px"
                h="80px"
                roundedBottom={"xl"}
                p={5}
            >
                <Link href="/signup" fontSize="sm" color="#0060df" mb={4}>
                    {t("login.createAccount")}
                </Link>
            </Box>
        </Flex>
    );
};

export default Login;
