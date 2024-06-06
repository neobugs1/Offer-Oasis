import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import {
    Box,
    Heading,
    Container,
    Stack,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const bg = useColorModeValue("white", "gray.800");
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Heading as="h2" size="xl">
                    {t("profile.heading")}
                </Heading>
            }
        >
            <Head title="Profile" />

            <Box py={12}>
                <Container maxW="7xl">
                    <Stack spacing={6}>
                        <Box p={8} bg={bg} shadow="lg" rounded="lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </Box>

                        <Box p={8} bg={bg} shadow="lg" rounded="lg">
                            <UpdatePasswordForm />
                        </Box>

                        <Box p={8} bg={bg} shadow="lg" rounded="lg">
                            <DeleteUserForm />
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </AuthenticatedLayout>
    );
}
