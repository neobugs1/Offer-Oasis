import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import {
    FormControl,
    Heading,
    Box,
    Text,
    Flex,
    FormLabel,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };
    const { t } = useTranslation();

    return (
        <Box color={"black"} className={className}>
            <Box>
                <Heading fontSize={"2xl"}>{t("profile.heading")}</Heading>
                <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t("profile.description")}
                </Text>
            </Box>

            <FormControl
                as={"form"}
                onSubmit={submit}
                className="mt-6 space-y-6"
            >
                <Box>
                    <FormLabel htmlFor="name" value="Name" fontSize={"sm"}>
                        {t("profile.name")}
                    </FormLabel>
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </Box>

                <Box>
                    <FormLabel htmlFor="email" value="Email" fontSize={"sm"}>
                        {t("profile.email")}
                    </FormLabel>
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </Box>

                <Box>
                    <FormLabel
                        htmlFor="phoneNumber"
                        value="phoneNumber"
                        fontSize={"sm"}
                    >
                        {t("profile.phoneNumber")}
                    </FormLabel>
                    <TextInput
                        id="phoneNumber"
                        className="mt-1 block w-full"
                        value={data.phoneNumber}
                        onChange={(e) => setData("phoneNumber", e.target.value)}
                        required
                        autoComplete="phoneNumber"
                    />
                    <InputError className="mt-2" message={errors.phoneNumber} />
                </Box>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <Box>
                        <Text className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            {t("profile.unverifiedEmail")}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                {t("profile.resendVerification")}
                            </Link>
                        </Text>
                        {status === "verification-link-sent" && (
                            <Box className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                {t("profile.verificationLinkSent")}
                            </Box>
                        )}
                    </Box>
                )}

                <Box className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {t("profile.save")}
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <Text className="text-sm text-gray-600 dark:text-gray-400">
                            {t("profile.saved")}
                        </Text>
                    </Transition>
                </Box>
            </FormControl>
        </Box>
    );
}
