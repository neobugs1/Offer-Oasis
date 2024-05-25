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

    return (
        <Box color={"black"}>
            <Box>
                <Heading fontSize={"2xl"}>Update Password</Heading>

                <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay
                    secure.
                </Text>
            </Box>

            <FormControl
                as="form"
                onSubmit={updatePassword}
                className="mt-6 space-y-6"
            >
                <Box>
                    <FormLabel
                        htmlFor="current_password"
                        value="Current Password"
                        fontSize={"sm"}
                    >
                        Current Password
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
                    <FormLabel
                        htmlFor="password"
                        value="New Password"
                        fontSize={"sm"}
                    >
                        New Password
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
                    <FormLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        fontSize={"sm"}
                    >
                        Confirm Password
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
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <Text className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </Text>
                    </Transition>
                </Box>
            </FormControl>
        </Box>
    );
}
