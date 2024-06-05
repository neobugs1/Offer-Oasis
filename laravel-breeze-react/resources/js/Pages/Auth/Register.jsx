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
export default function Register({ auth, locations }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        password_confirmation: "",
        location: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

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

    // const { locations } = usePage().props;

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
                        Зголемете ја вашата видливост онлајн!
                    </Text>
                    <Text fontSize="xl" textAlign="center" mb={6}>
                        Придружете се на водечката огласна платформа во Македонија
                    </Text>
                    <Flex justify="space-between" direction={{ base: 'column', lg: 'row' }}>
                        <Box w={{ base: '100%', lg: '60%' }} bg="white" boxShadow="md" p={6} borderRadius="md">
                            <Text fontSize="lg" fontWeight="bold" mb={4}>
                                Креирај го својот профил бесплатно!
                            </Text>
                            <FormControl as="form" onSubmit={submit}>
                                <Flex mb={4}>
                                    <FormControl mr={4}>
                                        <FormLabel htmlFor="firstName">First name *</FormLabel>
                                        <Input
                                            placeholder="First name"
                                            id="firstName"
                                            name="firstName"
                                            value={data.firstName}
                                            onChange={(e) => setData({ ...data, firstName: e.target.value })}
                                        />
                                        {errors.firstName && <Text color="red.500">{errors.firstName}</Text>}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="lastName">Last name *</FormLabel>
                                        <Input
                                            placeholder="Last name"
                                            id="lastName"
                                            name="lastName"
                                            value={data.lastName}
                                            onChange={(e) => setData({ ...data, lastName: e.target.value })}
                                        />
                                        {errors.lastName && <Text color="red.500">{errors.lastName}</Text>}
                                    </FormControl>
                                </Flex>
                                <FormControl mb={4}>
                                    <FormLabel htmlFor="email">Email *</FormLabel>
                                    <Input
                                        placeholder="e.g. myname@company.com"
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                    />
                                    {errors.email && <Text color="red.500">{errors.email}</Text>}
                                </FormControl>
                                <Flex mb={4}>
                                    <FormControl mr={4}>
                                        <FormLabel htmlFor="password">Password *</FormLabel>
                                        <Input
                                            type="password"
                                            placeholder="Minimum of 8 characters"
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData({ ...data, password: e.target.value })}
                                        />
                                        {errors.password && <Text color="red.500">{errors.password}</Text>}
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="password">Repeat Password *</FormLabel>
                                        <Input
                                            type="password"
                                            placeholder="Minimum of 8 characters"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                                        />
                                        {errors.password_confirmation && <Text color="red.500">{errors.password_confirmation}</Text>}
                                    </FormControl>
                                </Flex>
                                <FormControl mr={4}>
                                    <FormLabel htmlFor="phoneNumber">Телефонски број *</FormLabel>
                                    <Input
                                        placeholder="First name"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={data.phoneNumber}
                                        onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                    />
                                    {errors.phoneNumber && <Text color="red.500">{errors.phoneNumber}</Text>}
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel htmlFor="companyName">Location *</FormLabel>
                                    <Select
                                        placeholder="Локација"
                                        id="companyName"
                                        name="companyName"
                                        value={data.companyName}
                                        onChange={(e) => setData({ ...data, companyName: e.target.value })}
                                    >
                                        {locations.map((location) => renderOption(location))}
                                    </Select>
                                    {errors.companyName && <Text color="red.500">{errors.companyName}</Text>}
                                </FormControl>
                                <FormControl mb={4}>
                                </FormControl>
                                <Text fontSize="sm" mt={4}>
                                    By submitting the form, I accept the <a href="#" style={{ color: "#0060df" }}>Terms of Use</a> and the <a href="#" style={{ color: "#0060df" }}>General Terms and Conditions</a>. I have acknowledged the <a href="#" style={{ color: "#0060df" }}>Data Privacy</a>.
                                </Text>
                                <Button type="submit" bgColor="#0060df" color={"white"} size="lg" mt={4} isDisabled={processing} > Register now </Button>
                            </FormControl>
                        </Box>
                        <Box w={{ base: '100%', lg: '35%' }} mt={{ base: 8, lg: 0 }}>
                            <Box mb={6}>
                                <Text fontWeight="bold" mb={2}>Достигнете до поголема публика со вашите огласи</Text>
                                <Text>Придружете се на нашата платформа каде што преку 1 милион корисници месечно бараат производи и услуги од нашата голема база од 600,000+ регистрирани продавачи.

                                </Text>
                            </Box>
                            <Box mb={6}>
                                <Text fontWeight="bold" mb={2}>Подобрете ја видливоста на Google</Text>
                                <Text>Огласите на нашата платформа постојано се позиционираат погоре на Google, со просечно 1 милион клучни зборови за пребарување кои се наоѓаат во првите 3 резултати.</Text>
                            </Box>
                            <Box mb={6}>
                                <Text fontWeight="bold" mb={2}>Претставете ги вашите огласи на потенцијалните купувачи</Text>
                                <Text>Објавете ги вашите производи и услуги на нашата платформа и привлечете барања од заинтересирани купувачи.</Text>
                            </Box>
                            <Text fontSize="sm" color="blue.500">
                                Still have questions? <a href="#" style={{ textDecoration: 'underline' }}>Get all the information here</a>
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Layout>
    );
}
