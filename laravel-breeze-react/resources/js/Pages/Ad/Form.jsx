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
} from "@chakra-ui/react";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function AdForm({ auth, categories }) {
    const { data, setData, post } = useForm({
        title: "",
        description: "",
        price: "",
        condition: "",
        brand: "",
        model: "",
        features: "",
        category: "",
        images: [],
    });
    const toast = useToast();

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("ad.store"));
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

    return (
        <Layout auth={auth}>
            <VStack
                spacing={4}
                as="form"
                onSubmit={handleSubmit}
                w={"70%"}
                mx={"auto"}
                marginTop={10}
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
                        onChange={(e) => setData("category", e.target.value)}
                    >
                        {categories.map((category) => renderOption(category))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Upload Images</FormLabel>
                    <Input
                        type="file"
                        multiple
                        onChange={(e) => setData("images", [...e.target.files])}
                    />
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
                    <FormLabel>Condition</FormLabel>
                    <Input
                        value={data.condition}
                        onChange={(e) => setData("condition", e.target.value)}
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
                <FormControl>
                    <FormLabel>Features</FormLabel>
                    <Input
                        value={data.features}
                        onChange={(e) => setData("features", e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue">
                    Create Ad
                </Button>
            </VStack>
        </Layout>
    );
}
