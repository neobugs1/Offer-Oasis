import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Box,
    Flex,
    Input,
    Button,
    Text,
    FormLabel,
    FormControl,
    SimpleGrid,
} from "@chakra-ui/react";
import Layout from "@/Layouts/Layout";
import { useTranslation } from "react-i18next";

export default function Login({ status, canResetPassword, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    const { t } = useTranslation();

    return (
        <Layout auth={auth}>
            <Head title={t("login.loginTitle")} />
            <Flex
                justifyContent={"center"}
                bgColor={"#00193c1a"}
                alignItems={"center"}
                flexDirection={"column"}
                p={10}
            >
                <Box
                    w="400px"
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
                        <FormControl as={"form"} onSubmit={submit}>
                            <Flex flexDirection={"column"}>
                                <Box>
                                    <FormLabel htmlFor="email">
                                        {t("login.emailLabel")}
                                    </FormLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isRequired
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </Box>
                                <Box>
                                    <FormLabel htmlFor="password">
                                        {t("login.passwordLabel")}
                                    </FormLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </Box>
                                <div className="block mt-4">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                            {t("login.rememberMe")}
                                        </span>
                                    </label>
                                </div>
                                <Button
                                    isDisabled={processing}
                                    bgColor="#0060df"
                                    color={"white"}
                                    mt={4}
                                    size="lg"
                                    type="submit"
                                >
                                    {t("login.loginButton")}
                                </Button>
                            </Flex>
                        </FormControl>
                        <div className="flex items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    fontSize="sm"
                                    color="#0060df"
                                >
                                    {t("login.forgotPassword")}
                                </Link>
                            )}
                        </div>
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
                    <Link
                        href={route("register")}
                        fontSize="sm"
                        color="#0060df"
                        mb={4}
                    >
                        {t("login.createAccount")}
                    </Link>
                </Box>
            </Flex>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
        </Layout>
    );
}
