import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Box, Heading } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Heading fontSize={"2xl"}>Dashboard</Heading>}
        >
            <Head title="Dashboard" />

            <Box className="py-12">
                <Box className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Box className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Box className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
