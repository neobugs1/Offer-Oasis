import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
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
} from "@chakra-ui/react";
export default function Register({ auth }) {
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

    return (
        <Layout auth={auth}>
            <Flex
                justifyContent={"center"}
                bgColor={"#f3f4f5"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <Box
                    w="400px"
                    p={5}
                    bgColor={"white"}
                    roundedTop={"xl"}
                    boxShadow={"lg"}
                    mt={5}
                >
                    <Flex direction="column" align="center" gap={5}>
                        <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            align={"left"}
                            w={"100%"}
                        >
                            Register
                        </Text>
                        <FormControl as="form" onSubmit={submit}>
                            <Flex flexDirection={"column"}>
                                <FormControl mb={4}>
                                    <FormLabel htmlFor="name" value="Name">
                                        Име
                                    </FormLabel>
                                    <Input
                                        placeholder="Име"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.name} />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel htmlFor="email" value="Email">
                                        E-Mail
                                    </FormLabel>
                                    <Input
                                        placeholder="E-mail адреса"
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.email} />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel
                                        htmlFor="password"
                                        value="Password"
                                    >
                                        Лозинка
                                    </FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.password} />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    >
                                        Повтори лозинка
                                    </FormLabel>
                                    <Input
                                        placeholder="Password"
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Телефон</FormLabel>
                                    <Input
                                        type="tel"
                                        placeholder="Телефонски број"
                                        id="phoneNumber"
                                        value={data.phoneNumber}
                                        autoComplete="phoneNumber"
                                        onChange={(e) =>
                                            setData(
                                                "phoneNumber",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError message={errors.phoneNumber} />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Одбери локација</FormLabel>
                                    <Select
                                        placeholder="Град"
                                        id="location"
                                        type="select"
                                        name="location"
                                        value={data.location}
                                        onChange={(e) =>
                                            setData("location", e.target.value)
                                        }
                                    >
                                        <option value="Skopje">Скопје</option>
                                        <option value="Bitola">Битола</option>
                                        <option value="Ohrid">Охрид</option>
                                        <option value="Prilep">Прилеп</option>
                                        <option value="Tetovo">Тетово</option>
                                    </Select>
                                    <InputError message={errors.location} />
                                </FormControl>
                                <Button
                                    type="submit"
                                    bgColor="#0060df"
                                    color={"white"}
                                    size="lg"
                                    mt={4}
                                    isDisabled={processing}
                                >
                                    Register now
                                </Button>
                            </Flex>
                        </FormControl>
                    </Flex>
                </Box>
                <Box
                    fontSize="sm"
                    textAlign="left"
                    bgColor={"gray.200"}
                    w="400px"
                    h="60px"
                    roundedBottom={"xl"}
                    p={5}
                    mb={5}
                >
                    <Link
                        href={route("login")}
                        fontSize="sm"
                        color="#0060df"
                        mb={4}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md"
                    >
                        Already have an account? Sign in.
                    </Link>
                </Box>
            </Flex>
        </Layout>
    );
}
