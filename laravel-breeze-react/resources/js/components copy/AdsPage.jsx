import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import {
    Box,
    Text,
    VStack,
    HStack,
    Flex,
    Button,
    Select,
    Spacer,
    Input,
    Divider,
} from "@chakra-ui/react";
import AdListing from "./AdListing";
import CarFilter from "./CarFilter";

const AdsPage = ({ ads }) => {
    const { url } = usePage();
    const baseURL = "http://127.0.0.1:8000/search";

    const handlePageChange = (pageUrl) => {
        if (pageUrl) {
            const currentUrl = new URL(window.location.href);
            const newUrl = new URL(pageUrl, currentUrl.origin);

            // Preserve existing query parameters
            currentUrl.searchParams.forEach((value, key) => {
                if (!newUrl.searchParams.has(key)) {
                    newUrl.searchParams.set(key, value);
                }
            });

            Inertia.get(newUrl.toString());
        }
    };

    const getInitialSortOption = () => {
        let myURL = new URL(window.location.href);

        let sortOption = myURL.searchParams.get("sort");

        if (sortOption === "date") {
            return "date_posted";
        } else if (sortOption === "price") {
            return "price";
        } else {
            return "date_posted"; // default value
        }
    };

    const [selectedOption, setSelectedOption] = useState(
        getInitialSortOption()
    );
    const [currentURL, setCurrentURL] = useState(url);

    useEffect(() => {
        setSelectedOption(getInitialSortOption());
    }, [window.location.href]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        if (newValue !== selectedOption) {
            setSelectedOption(newValue);

            let myURL = new URL(currentURL, baseURL);

            let searchParams = myURL.searchParams;

            if (newValue === "date_posted") {
                searchParams.set("sort", "date_posted");
            } else if (newValue === "price") {
                searchParams.set("sort", "price");
            }
            searchParams.set("page", 1);

            myURL.search = searchParams.toString();

            setCurrentURL(myURL.toString());

            router.get(myURL.toString());
        }
    };

    if (!ads || !ads.data) {
        return <Text>Нема пронајдени резултати.</Text>;
    }

    const category = new URL(window.location.href).searchParams.get("category");

    return (
        <Flex w={"100%"} justifyContent={"center"}>
            <Box p={5} w={"85%"}>
                {category === "15" && (
                    <>
                        <Divider borderColor={'gray'} mb={4} />
                        <Flex>
                            <Box borderBottomColor="#0060df" borderBottomWidth="4px">
                                <Text fontSize="2xl">Автомобили филтер</Text>
                            </Box>
                        </Flex>
                        <CarFilter currentURL={url} url={usePage()} />
                        <Divider borderColor={'gray'} mb={4} />
                    </>
                )}
                <Flex>
                    <Box borderBottomColor="#0060df" borderBottomWidth="4px" mb={5}>
                        <Text fontSize="2xl">
                            Сите огласи
                        </Text>
                    </Box>
                    <Spacer w={"100%"} />
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        w={200}
                        bg={'white'}
                        variant={'outline'}
                        boxShadow={'sm'}
                    >
                        <option value="date_posted">Најнови прво</option>
                        <option value="price">Најевтини прво</option>
                    </Select>
                </Flex>
                <VStack spacing={5} align="stretch">
                    {ads.data.map((ad, index) => (
                        <AdListing ad={ad} key={index} index={index} />
                    ))}
                </VStack>

                <HStack spacing={2} justify="center" mt={5} gap={5}>
                    {ads.meta.links.map((link, index) => (
                        <Button
                            key={index}
                            onClick={() => handlePageChange(link.url)}
                            className={
                                "py-2 px-3 rounded-lg text-gray-700 text-xs " +
                                (!link.url
                                    ? "!text-gray-300 cursor-not-allowed "
                                    : "hover:bg-gray-700 text-white bg-gray-900") +
                                (link.active ? " cursor-not-allowed " : " ")
                            }
                            disabled={!link.url}
                        >
                            {link.label.replace(/&laquo;|&raquo;/g, "").trim()}
                        </Button>
                    ))}
                </HStack>
            </Box>
        </Flex>
    );
};

export default AdsPage;
