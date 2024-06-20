import { useForm, usePage } from "@inertiajs/inertia-react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    VStack,
    useToast,
    SimpleGrid,
    GridItem,
    Flex,
} from "@chakra-ui/react";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function AdForm({ auth, categories }) {
    const { data, setData, post } = useForm({
        title: "",
        description: "",
        price: "",
        currency: "MKD",
        brand: "",
        model: "",
        year: "",
        fuel_type: "",
        mileage: "",
        transmission: "",
        body_type: "",
        color: "",
        registration_country: "",
        registration_valid_until: "",
        engine_power_ks: "",
        emission_class: "",
        category: "",
        images: [],
    });
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("ad.store"), data);
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

    const resetData = (newCategory) => {
        const newData = {
            year: "",
            fuel_type: "",
            mileage: "",
            transmission: "",
            body_type: "",
            color: "",
            registration_country: "",
            registration_valid_until: "",
            engine_power_ks: "",
            emission_class: "",
            category: newCategory,
        };
        setData({ ...data, ...newData });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setData("images", files);
    };

    return (
        <Layout auth={auth}>
            <Flex bgColor={"#00193c1a"} p={5} w={"100%"}>
                <Box
                    as="form"
                    onSubmit={handleSubmit}
                    w={"50%"}
                    mx={"auto"}
                    bg={"white"}
                    p={8}
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Category</FormLabel>
                            <Select
                                placeholder="Select category"
                                value={data.category}
                                onChange={(e) => {
                                    resetData(e.target.value);
                                }}
                            >
                                {categories.map((category) =>
                                    renderOption(category)
                                )}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Upload Images</FormLabel>
                            <Input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                            />
                        </FormControl>
                        <Flex w={"100%"}>
                            <SimpleGrid columns={2} spacing={4} w="50%">
                                <GridItem colSpan={1}>
                                    <FormControl isRequired>
                                        <FormLabel>Price</FormLabel>
                                        <Input
                                            type="number"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                        />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={1} w={"50%"}>
                                    <FormControl isRequired>
                                        <FormLabel>Currency</FormLabel>
                                        <Select
                                            value={data.currency}
                                            onChange={(e) =>
                                                setData(
                                                    "currency",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="MKD">MKD</option>
                                            <option value="EUR">EUR</option>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                            </SimpleGrid>
                        </Flex>
                        <FormControl>
                            <FormLabel>Brand</FormLabel>
                            <Input
                                value={data.brand}
                                onChange={(e) =>
                                    setData("brand", e.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Model</FormLabel>
                            <Input
                                value={data.model}
                                onChange={(e) =>
                                    setData("model", e.target.value)
                                }
                            />
                        </FormControl>

                        {data.category === "15" && (
                            <>
                                <FormControl>
                                    <FormLabel>Year</FormLabel>
                                    <Input
                                        type="number"
                                        value={data.year}
                                        onChange={(e) =>
                                            setData("year", e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Fuel Type</FormLabel>
                                    <Input
                                        value={data.fuel_type}
                                        onChange={(e) =>
                                            setData("fuel_type", e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Mileage</FormLabel>
                                    <Input
                                        type="number"
                                        value={data.mileage}
                                        onChange={(e) =>
                                            setData("mileage", e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Transmission</FormLabel>
                                    <Input
                                        value={data.transmission}
                                        onChange={(e) =>
                                            setData(
                                                "transmission",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Body Type</FormLabel>
                                    <Input
                                        value={data.body_type}
                                        onChange={(e) =>
                                            setData("body_type", e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Color</FormLabel>
                                    <Input
                                        value={data.color}
                                        onChange={(e) =>
                                            setData("color", e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Registration Country</FormLabel>
                                    <Input
                                        value={data.registration_country}
                                        onChange={(e) =>
                                            setData(
                                                "registration_country",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>
                                        Registration Valid Until
                                    </FormLabel>
                                    <Input
                                        type="date"
                                        value={data.registration_valid_until}
                                        onChange={(e) =>
                                            setData(
                                                "registration_valid_until",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Engine Power (ks)</FormLabel>
                                    <Input
                                        type="number"
                                        value={data.engine_power_ks}
                                        onChange={(e) =>
                                            setData(
                                                "engine_power_ks",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Emission Class</FormLabel>
                                    <Input
                                        value={data.emission_class}
                                        onChange={(e) =>
                                            setData(
                                                "emission_class",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>
                            </>
                        )}

                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                        </FormControl>
                        <Button type="submit" bg={"#0060df"}>
                            Create Ad
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </Layout>
    );
}
