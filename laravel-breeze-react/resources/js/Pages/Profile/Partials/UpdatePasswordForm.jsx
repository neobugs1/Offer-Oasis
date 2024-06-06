import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import {
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };
    const { t } = useTranslation();

    return (
        <Box color={"black"}>
            <Box>
                <Heading fontSize={"2xl"}>
                    {t("profile.updatePassword.heading")}
                </Heading>
                <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t("profile.updatePassword.description")}
                </Text>
            </Box>

            <FormControl
                as="form"
                onSubmit={updatePassword}
                className="mt-6 space-y-6"
            >
                <Box>
                    <FormLabel htmlFor="current_password" fontSize={"sm"}>
                        {t("profile.updatePassword.currentPassword")}
                    </FormLabel>
                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        autoComplete="current-password"
                    />
                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </Box>

                <Box>
                    <FormLabel htmlFor="password" fontSize={"sm"}>
                        {t("profile.updatePassword.newPassword")}
                    </FormLabel>
                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </Box>

                <Box>
                    <FormLabel htmlFor="password_confirmation" fontSize={"sm"}>
                        {t("profile.updatePassword.confirmPassword")}
                    </FormLabel>
                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        autoComplete="new-password"
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </Box>

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
