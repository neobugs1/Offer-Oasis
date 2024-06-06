import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Box, FormControl, Heading, Input, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    const { t } = useTranslation();

    return (
        <Box className={`space-y-6 ${className}`}>
            <Box>
                <Heading fontSize={"2xl"}>
                    {t("profile.deleteProfile.heading")}
                </Heading>

                <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t("profile.deleteProfile.description")}
                </Text>
            </Box>

            <DangerButton onClick={confirmUserDeletion}>
                {t("profile.deleteProfile.deleteButton")}
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <FormControl as={"form"} onSubmit={deleteUser} className="p-6">
                    <Heading>
                        {t("profile.deleteProfile.confirmDeleteHeading")}
                    </Heading>

                    <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {t("profile.deleteProfile.confirmDeleteDescription")}
                    </Text>

                    <Box className="mt-6">
                        <FormControl>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="mt-1 block w-3/4"
                                isFocused
                                placeholder={t(
                                    "profile.deleteProfile.passwordPlaceholder"
                                )}
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </FormControl>
                    </Box>

                    <Box className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            {t("profile.deleteProfile.cancelButton")}
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            {t("profile.deleteProfile.deleteButton")}
                        </DangerButton>
                    </Box>
                </FormControl>
            </Modal>
        </Box>
    );
}
