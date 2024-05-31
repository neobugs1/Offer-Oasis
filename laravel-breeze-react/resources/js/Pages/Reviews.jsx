import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReviewAdListing from "@/components copy/ReviewAdListing";
import { Accordion, Box, HStack, Heading } from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/react";

export default function Reviews({ auth, ads }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Heading fontSize={"2xl"}>Твои огласи</Heading>}
        >
            <Head title="Твои огласи" />
            <Box className="py-12">
                <Box className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Box className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Accordion
                            allowMultiple
                            allowToggle
                            alignItems={"center"}
                        >
                            {ads.data.map((ad, index) => (
                                <ReviewAdListing
                                    ad={ad}
                                    key={index}
                                    index={index}
                                />
                            ))}
                        </Accordion>
                        <HStack
                            spacing={2}
                            justify="center"
                            mt={5}
                            mb={5}
                            gap={5}
                        >
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
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
