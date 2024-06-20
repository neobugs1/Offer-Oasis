import React, { useState, useEffect } from "react";
import {
    Box,
    HStack,
    Input,
    Select,
    VStack,
    Text,
    Button,
} from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { router } from "@inertiajs/react";

const CarFilter = ({ currentURL, url }) => {
    const baseURL = "http://127.0.0.1:8000/search/";

    const parseQueryParams = (queryString) => {
        const params = new URLSearchParams(queryString);
        const filters = {};
        for (let [key, value] of params.entries()) {
            filters[key] = value;
        }
        return filters;
    };

    const initialFilters = parseQueryParams(url.url.split("?")[1]);

    const [filters, setFilters] = useState({
        brand: initialFilters.brand || "",
        model: initialFilters.model || "",
        fuel_type: initialFilters.fuel_type || "",
        price_from: initialFilters.price_from || "",
        price_to: initialFilters.price_to || "",
        transmission: initialFilters.transmission || "",
        year_from: initialFilters.year_from || "",
        year_to: initialFilters.year_to || "",
        registration: initialFilters.registration || "",
        km_from: initialFilters.km_from || "",
        km_to: initialFilters.km_to || "",
        kw_from: initialFilters.kw_from || "",
        kw_to: initialFilters.kw_to || "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleFilter = () => {
        const params = new URLSearchParams(url.url.split("?")[1]);

        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                params.set(key, filters[key]);
            } else {
                params.delete(key);
            }
        });

        const newUrl = `${baseURL}?${params.toString()}`;
        router.get(newUrl);
    };

    return (
        <VStack w={"100%"}>
            <HStack p={5} borderRadius="md" w={"100%"}>
                <VStack spacing={4} w={"100%"}>
                    <Select
                        name="brand"
                        placeholder="Марка"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        value={filters.brand}
                        bg={"white"}
                        boxShadow={"md"}
                    >
                        <option value="audi">Audi</option>
                        {/* Add more options */}
                    </Select>
                    <Select
                        name="model"
                        placeholder="Модел"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        value={filters.model}
                        bg={"white"}
                        boxShadow={"md"}
                    >
                        <option value="a3">A3</option>
                        {/* Add more options */}
                    </Select>
                    <Select
                        name="fuel_type"
                        placeholder="Гориво"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        bg={"white"}
                        boxShadow={"md"}
                        value={filters.fuel_type}
                    >
                        <option value="diesel">Дизел</option>
                        <option value="benzin">Бензин</option>
                        <option value="plin">Плин</option>
                    </Select>
                </VStack>
                <VStack spacing={4} w={"100%"}>
                    <Select
                        name="price_from"
                        placeholder="Цена (€) Од"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        value={filters.price_from}
                        bg={"white"}
                        boxShadow={"md"}
                    >
                        <option value="1000">1000€</option>
                        {/* Add more options */}
                    </Select>
                    <Select
                        name="price_to"
                        placeholder="Цена (€) До"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        value={filters.price_to}
                        bg={"white"}
                        boxShadow={"md"}
                    >
                        <option value="5000">5000€</option>
                        {/* Add more options */}
                    </Select>
                    <Select
                        name="transmission"
                        placeholder="Одберете менувач"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        value={filters.transmission}
                        bg={"white"}
                        boxShadow={"md"}
                    >
                        <option value="manual">Рачен</option>
                        <option value="automatic">Автоматски</option>
                        {/* Add more options */}
                    </Select>
                </VStack>
                <VStack spacing={4} w={"100%"}>
                    <Input
                        name="year_from"
                        placeholder="Година Од"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        value={filters.year_from}
                        bg={"white"}
                        boxShadow={"md"}
                    />
                    <Input
                        name="year_to"
                        placeholder="Година До"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        value={filters.year_to}
                        bg={"white"}
                        boxShadow={"md"}
                    />
                    <Select
                        name="registration"
                        placeholder="Одберете регистрација"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        value={filters.registration}
                        bg={"white"}
                        boxShadow={"md"}
                    >
                        <option value="mk">Македонска</option>
                        <option value="other">Друга</option>
                    </Select>
                </VStack>
                <VStack spacing={4} w={"100%"}>
                    <Input
                        name="km_from"
                        placeholder="КМ Од"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        value={filters.km_from}
                        bg={"white"}
                        boxShadow={"md"}
                    />
                    <Input
                        name="km_to"
                        placeholder="КМ До"
                        variant="filled"
                        colorScheme="blue"
                        onChange={handleChange}
                        value={filters.km_to}
                        bg={"white"}
                        boxShadow={"md"}
                    />
                    <HStack w={"100%"}>
                        <Input
                            name="kw_from"
                            colorScheme={"blue"}
                            variant={"filled"}
                            placeholder="kW Од:"
                            onChange={handleChange}
                            value={filters.kw_from}
                            bg={"white"}
                            boxShadow={"md"}
                        />
                        <Input
                            name="kw_to"
                            colorScheme={"blue"}
                            variant={"filled"}
                            placeholder="kW До:"
                            onChange={handleChange}
                            value={filters.kw_to}
                            bg={"white"}
                            boxShadow={"md"}
                        />
                    </HStack>
                </VStack>
            </HStack>
            <Button bg={"#0060df"} onClick={handleFilter} mb={4}>
                Филтрирај
            </Button>
        </VStack>
    );
};

export default CarFilter;
