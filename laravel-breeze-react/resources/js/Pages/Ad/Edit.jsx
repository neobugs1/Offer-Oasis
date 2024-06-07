import { useForm, usePage } from "@inertiajs/inertia-react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    Select,
    Text,
    Textarea,
    VStack,
    useToast,
} from "@chakra-ui/react";
import Layout from "@/Layouts/Layout";
import React from "react";
import { Inertia } from "@inertiajs/inertia";

export default function AdForm({ auth, categories, ad }) {
    const { data, setData, post } = useForm({
        title: ad.title || "",
        description: ad.description || "",
        price: ad.price || "",

        brand: ad.brand || "",
        model: ad.model || "",
        year: ad.year || "",
        fuel_type: ad.fuel_type || "",
        mileage: ad.mileage || "",
        transmission: ad.transmission || "",
        body_type: ad.body_type || "",
        color: ad.color || "",
        registration_country: ad.registration_country || "",
        registration_valid_until: ad.registration_valid_until || "",
        engine_power_ks: ad.engine_power_ks || "",
        emission_class: ad.emission_class || "",

        category: ad.category[ad.category.length - 1].id || "",
        images: ad.images || [],
        _method: "put",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        data.images.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });
        // Append other form data
        Object.keys(data).forEach((key) => {
            if (key !== "images") {
                formData.append(key, data[key]);
            }
        });

        post(route("ad.update", ad.id), formData);
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

    const handleImageDelete = (index) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        console.log(data.images);
        setData("images", newImages);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData("images", [...data.images, ...files]); // Add new files to existing files
    };

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

    return (
        <Layout auth={auth}>
            <VStack
                spacing={4}
                as="form"
                onSubmit={handleSubmit}
                w={"70%"}
                mx={"auto"}
                marginTop={10}
                encType="multipart/form-data" // Important for file uploads
            >
                <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
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
                        {categories.map((category) => renderOption(category))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Upload Images</FormLabel>
                    <Input type="file" multiple onChange={handleImageChange} />
                    {data.images && (
                        <Flex direction="column" mt={2}>
                            {data.images.map((imageUrl, index) => (
                                <Flex key={index} align="center" mt={2}>
                                    <Image
                                        src={imageUrl.url || imageUrl} // Use the URL directly
                                        alt={`Image ${index + 1}`}
                                        style={{ width: "100px" }}
                                    />
                                    <Button
                                        ml={4}
                                        colorScheme="red"
                                        onClick={() => handleImageDelete(index)}
                                    >
                                        Delete
                                    </Button>
                                </Flex>
                            ))}
                        </Flex>
                    )}
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input
                        type="number"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Brand</FormLabel>
                    <Input
                        value={data.brand}
                        onChange={(e) => setData("brand", e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Model</FormLabel>
                    <Input
                        value={data.model}
                        onChange={(e) => setData("model", e.target.value)}
                    />
                </FormControl>

                {data.category == "15" && (
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
                                    setData("transmission", e.target.value)
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
                            <FormLabel>Registration Valid Until</FormLabel>
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
                                    setData("engine_power_ks", e.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Emission Class</FormLabel>
                            <Input
                                value={data.emission_class}
                                onChange={(e) =>
                                    setData("emission_class", e.target.value)
                                }
                            />
                        </FormControl>
                    </>
                )}

                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue">
                    Edit Ad
                </Button>
            </VStack>
        </Layout>
    );
}
