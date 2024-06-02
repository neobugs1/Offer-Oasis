import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AdListing from "@/components copy/AdListing";
import MyAdListing from "@/components copy/MyAdListing";
import StatisticsPanel from "@/components copy/StatisticsPanel";
import {
    Box,
    Button,
    Center,
    Flex,
    HStack,
    Heading,
    Spacer,
} from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/react";

export default function Ads({ auth, ads }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Flex>
                    <Heading fontSize={"2xl"}>Твои огласи</Heading>
                    <Spacer />
                    <Link href={route("ad.create")}>
                        <Button>Додади нов оглас</Button>
                    </Link>
                </Flex>
            }
        >
            <Head title="Твои огласи" />
            <Center className="py-12">
                <Flex gap={10} w={"75%"}>
                    <Box w={"100%"}>
                        <Flex direction={"column"} gap={2}>
                            {ads.data.map((ad, index) => (
                                <MyAdListing
                                    ad={ad}
                                    key={index}
                                    index={index}
                                />
                            ))}
                        </Flex>
                        <HStack spacing={2} justify="center" mt={5} gap={5}>
                            {ads.meta.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || ""}
                                    className={
                                        "py-2 px-3 rounded-lg text-gray-700 text-xs " +
                                        (!link.url
                                            ? "!text-gray-300 cursor-not-allowed "
                                            : "hover:bg-gray-700 text-white bg-gray-900") +
                                        (link.active
                                            ? " cursor-not-allowed "
                                            : " ")
                                    }
                                >
                                    {link.label
                                        .replace(/&laquo;|&raquo;/g, "")
                                        .trim()}
                                </Link>
                            ))}
                        </HStack>
                    </Box>
                    <Box w={"20%"}>
                        <StatisticsPanel stats={ads.meta.total} />
                    </Box>
                </Flex>
            </Center>
        </AuthenticatedLayout>
    );
}
