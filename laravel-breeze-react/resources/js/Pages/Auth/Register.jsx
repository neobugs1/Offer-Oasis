import React, { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import {
    Box,
    Flex,
    Input,
    Button,
    Text,
    FormLabel,
    FormControl,
    Select,
    Heading,
    RadioGroup,
    Radio,
    SelectField,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Register({ auth, locations }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        password_confirmation: "",
        location: "",
    });

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    useEffect(() => {
        setData("name", `${firstName} ${lastName}`);
    }, [firstName, lastName]);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    const renderOption = (category, level = 0) => (
        <React.Fragment key={category.id}>
            <option value={category.id}>
                {`${"-".repeat(level * 2)} ${category.name}`}
            </option>
            {category.children &&
                category.children.map((child) =>
                    renderOption(child, level + 1)
                )}
        </React.Fragment>
    );

    const { t } = useTranslation();

    return (
        <Layout auth={auth}>
            <Flex
                justifyContent={"center"}
                bgColor={"#00193c1a"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <Box maxW="1200px" mx="auto" p={5}>
                    <Text fontSize="3xl" fontWeight="bold" textAlign="center">
                        {t("register.increaseVisibility")}
                    </Text>
                    <Text fontSize="xl" textAlign="center" mb={6}>
                        {t("register.joinLeadingPlatform")}
                    </Text>
                    <Flex
                        justify="space-between"
                        direction={{ base: "column", lg: "row" }}
                    >
                        <Box
                            w={{ base: "100%", lg: "60%" }}
                            bg="white"
                            boxShadow="md"
                            p={6}
                            borderRadius="md"
                        >
                            <Text fontSize="lg" fontWeight="bold" mb={4}>
                                {t("register.createProfileFree")}
                            </Text>
                            <form onSubmit={submit}>
                                <Flex mb={4}>
                                    <FormControl mr={4}>
                                        <FormLabel htmlFor="firstName">
                                            {t("register.firstName")}
                                        </FormLabel>
                                        <Input
                                            placeholder={t(
                                                "register.firstName"
                                            )}
                                            id="firstName"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => {
                                                setFirstName(e.target.value);
                                            }}
                                        />
                                        {errors.firstName && (
                                            <Text color="red.500">
                                                {errors.firstName}
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="lastName">
                                            {t("register.lastName")}
                                        </FormLabel>
                                        <Input
                                            placeholder={t("register.lastName")}
                                            id="lastName"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => {
                                                setLastName(e.target.value);
                                            }}
                                        />
                                        {errors.lastName && (
                                            <Text color="red.500">
                                                {errors.lastName}
                                            </Text>
                                        )}
                                    </FormControl>
                                </Flex>
                                <FormControl mb={4}>
                                    <FormLabel htmlFor="email">
                                        {t("register.email")}
                                    </FormLabel>
                                    <Input
                                        placeholder="e.g. myname@company.com"
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <Text color="red.500">
                                            {errors.email}
                                        </Text>
                                    )}
                                </FormControl>
                                <Flex mb={4}>
                                    <FormControl mr={4}>
                                        <FormLabel htmlFor="password">
                                            {t("register.password")}
                                        </FormLabel>
                                        <Input
                                            type="password"
                                            placeholder={t("register.password")}
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.password && (
                                            <Text color="red.500">
                                                {errors.password}
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="password_confirmation">
                                            {t("register.repeatPassword")}
                                        </FormLabel>
                                        <Input
                                            type="password"
                                            placeholder={t(
                                                "register.repeatPassword"
                                            )}
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.password_confirmation && (
                                            <Text color="red.500">
                                                {errors.password_confirmation}
                                            </Text>
                                        )}
                                    </FormControl>
                                </Flex>
                                <FormControl mb={4}>
                                    <FormLabel htmlFor="phoneNumber">
                                        {t("register.phoneNumber")}
                                    </FormLabel>
                                    <Input
                                        placeholder={t("register.phoneNumber")}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={data.phoneNumber}
                                        onChange={(e) =>
                                            setData(
                                                "phoneNumber",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.phoneNumber && (
                                        <Text color="red.500">
                                            {errors.phoneNumber}
                                        </Text>
                                    )}
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel htmlFor="location">
                                        {t("register.location")}
                                    </FormLabel>
                                    <Select
                                        placeholder={t("register.location")}
                                        id="location"
                                        name="location"
                                        value={data.location}
                                        onChange={(e) =>
                                            setData("location", e.target.value)
                                        }
                                    >
                                        {locations.map((location) =>
                                            renderOption(location)
                                        )}
                                    </Select>
                                    {errors.location && (
                                        <Text color="red.500">
                                            {errors.location}
                                        </Text>
                                    )}
                                </FormControl>
                                <Text fontSize="sm" mt={4}>
                                    {t("register.terms")}{" "}
                                    <Link href="#" color="#0060df">
                                        {t("register.termsOfUse")}
                                    </Link>{" "}
                                    {t("register.and")}{" "}
                                    <Link href="#" color="#0060df">
                                        {t("register.generalTerms")}
                                    </Link>
                                    . {t("register.acknowledged")}{" "}
                                    <Link href="#" color="#0060df">
                                        {t("register.dataPrivacy")}
                                    </Link>
                                    .
                                </Text>
                                <Button
                                    type="submit"
                                    bgColor="#0060df"
                                    color={"white"}
                                    size="lg"
                                    mt={4}
                                    isDisabled={processing}
                                >
                                    {t("register.registerButton")}
                                </Button>
                            </form>
                        </Box>
                        <Box
                            w={{ base: "100%", lg: "35%" }}
                            mt={{ base: 8, lg: 0 }}
                        >
                            <Box mb={6}>
                                <Text fontWeight="bold" mb={2}>
                                    {t("register.reachAudience")}
                                </Text>
                                <Text>{t("register.reachAudienceText")}</Text>
                            </Box>
                            <Box mb={6}>
                                <Text fontWeight="bold" mb={2}>
                                    {t("register.googleVisibility")}
                                </Text>
                                <Text>
                                    {t("register.googleVisibilityText")}
                                </Text>
                            </Box>
                            <Box mb={6}>
                                <Text fontWeight="bold" mb={2}>
                                    {t("register.showcaseAds")}
                                </Text>
                                <Text>{t("register.showcaseAdsText")}</Text>
                            </Box>
                            <Text fontSize="sm" color="blue.500">
                                {t("register.questions")}{" "}
                                <Link
                                    href="#"
                                    style={{ textDecoration: "underline" }}
                                >
                                    {t("register.getInfoHere")}
                                </Link>
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Layout>
    );
}
