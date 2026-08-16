import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import useUserStore from "@/store/userStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Pencil, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { FaCloudArrowUp, FaUser } from "react-icons/fa6";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomTextarea from "@/components/custom-textarea";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useSkills from "@/hooks/skills";
import useUser from "@/hooks/user";
import { IconPicker } from "@/components/IconPicker/IconPicker";
import * as SimpleIcons from "@icons-pack/react-simple-icons";

/** Extrait le nom d'export Simple Icons (ex: SiFacebook) depuis l'id IconPicker */
const iconIdToExportName = (iconId) => {
    if (!iconId) return "";
    if (iconId.includes("--")) return iconId.split("--").pop();
    return iconId;
};

const stripSocialIds = (networks = []) =>
    networks.map(({ social_name, social_icon, social_url }) => ({
        social_name,
        social_icon,
        social_url,
    }));

// ─── Composant : Changement de mot de passe en 2 étapes ───────────────────────
const ChangePasswordSteps = function ({ open, setOpen, onPasswordPending }) {
    const [step, setStep] = useState(0);
    const { verifyPassword } = useUser();

    const [oldPassword, setOldPassword] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [verifyError, setVerifyError] = useState("");

    const passwordSchema = yup.object({
        new_password: yup
            .string()
            .required("New password is required")
            .min(4, "Password must be at least 4 characters"),
        confirm_password: yup
            .string()
            .required("Please confirm your password")
            .oneOf([yup.ref("new_password")], "Passwords do not match"),
    });

    const {
        register: registerPwd,
        handleSubmit: handlePwdSubmit,
        formState: { errors: pwdErrors, isValid: isPwdValid },
        reset: resetPwd,
    } = useForm({ mode: "onChange", resolver: yupResolver(passwordSchema) });

    useEffect(() => {
        if (!open) {
            setStep(0);
            setOldPassword("");
            setVerifyError("");
            resetPwd();
        }
    }, [open, resetPwd]);

    const verifyOldPassword = async () => {
        setIsVerifying(true);
        setVerifyError("");
        try {
            const data = await verifyPassword(oldPassword);
            if (data?.result) {
                setStep(1);
            } else {
                setVerifyError("Incorrect password. Please try again.");
            }
        } catch (error) {
            setVerifyError(
                error.response?.data?.message ?? "Incorrect password. Please try again."
            );
        } finally {
            setIsVerifying(false);
        }
    };

    const confirmNewPassword = (data) => {
        onPasswordPending?.(data.new_password);
        setOpen(false);
        toast("Password change pending — click Save to apply");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className={"text-(--text-primary)"}>
                <DialogHeader>
                    <DialogTitle> Change your password </DialogTitle>
                    <DialogDescription>
                        Follow these steps to change your account password
                    </DialogDescription>
                </DialogHeader>

                {step === 0 && (
                    <Field>
                        <FieldLabel htmlFor={"old_password"}> Old Password </FieldLabel>
                        <FieldDescription> Enter your current password to continue </FieldDescription>
                        <Input
                            type="password"
                            id={"old_password"}
                            value={oldPassword}
                            onChange={(e) => {
                                setOldPassword(e.target.value);
                                setVerifyError("");
                            }}
                            className={"border-(--border-input)"}
                        />
                        {verifyError && <FieldError>{verifyError}</FieldError>}
                    </Field>
                )}

                {step === 1 && (
                    <form
                        id="new-password-form"
                        onSubmit={handlePwdSubmit(confirmNewPassword)}
                        className="flex flex-col gap-4"
                    >
                        <Field>
                            <FieldLabel htmlFor={"new_password"}> New Password </FieldLabel>
                            <FieldDescription> Must be at least 4 characters </FieldDescription>
                            <Input
                                {...registerPwd("new_password")}
                                type="password"
                                id={"new_password"}
                                className={"border-(--border-input)"}
                            />
                            {pwdErrors.new_password && (
                                <FieldError>{pwdErrors.new_password.message}</FieldError>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={"confirm_password"}> Confirm Password </FieldLabel>
                            <FieldDescription> Re-enter your new password </FieldDescription>
                            <Input
                                {...registerPwd("confirm_password")}
                                type="password"
                                id={"confirm_password"}
                                className={"border-(--border-input)"}
                            />
                            {pwdErrors.confirm_password && (
                                <FieldError>{pwdErrors.confirm_password.message}</FieldError>
                            )}
                        </Field>
                    </form>
                )}

                <Field orientation="horizontal" className={"justify-end gap-2"}>
                    {step === 0 && (
                        <>
                            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="accent"
                                type="button"
                                disabled={!oldPassword || isVerifying}
                                onClick={verifyOldPassword}
                            >
                                {isVerifying ? <Spinner className="size-4" /> : "Next"}
                            </Button>
                        </>
                    )}
                    {step === 1 && (
                        <>
                            <Button variant="outline" type="button" onClick={() => setStep(0)}>
                                Back
                            </Button>
                            <Button
                                variant="accent"
                                type="submit"
                                form="new-password-form"
                                disabled={!isPwdValid}
                            >
                                Confirm
                            </Button>
                        </>
                    )}
                </Field>
            </DialogContent>
        </Dialog>
    );
};

// ─── Page principale Settings ─────────────────────────────────────────────────
export default function AdminSettingsPage() {
    const user = useUserStore((state) => state.user);
    const { getSkills, createSkill, updateSkill, deleteSkill } = useSkills();
    const { getInfos, updateUser } = useUser();

    const personnalInfoValidation = yup.object().shape({
        user_name: yup
            .string()
            .required("The name of user required ")
            .max(16, "Max 16 characters"),
        user_secondName: yup
            .string()
            .required("The second name of user is required ")
            .max(16, "Max 16 characters"),
        user_jobName: yup
            .string()
            .required("The title your job is required ")
            .max(32, "The max length of the title of your job should be less than 32 character"),
        user_desc: yup
            .string()
            .required("Your description is required")
            .max(256, "Your description should not exceed 256 characters "),
        user_account_name: yup
            .string()
            .required("The name of your account is required ")
            .max(16, "Max 16 characters"),
        user_email: yup
            .string()
            .email("This email is not valid")
            .required("The email of user is required "),
        user_contact_phone: yup.string().required("please fill your phone number"),
        user_whatsapp_phone: yup.string().required("please fill your whatsapp number"),
        user_socialNetworks: yup
            .array()
            .of(
                yup.object({
                    social_name: yup.string().required(),
                    social_icon: yup.string().required(),
                    social_url: yup.string().url("Invalid social URL").required(),
                })
            )
            .min(1, "Please add at least one social network")
            .required("The social network is required"),
        user_picture: yup
            .mixed()
            .nullable()
            .optional()
            .test("fileSize", "The size of your image should be less than 5MB", (value) => {
                if (!value || (value instanceof FileList && value.length === 0)) return true;
                const file = value instanceof FileList ? value[0] : value;
                if (!file) return true;
                return file.size <= 5 * 1024 * 1024;
            })
            .test("type", "Only PNG or JPEG images are accepted", (value) => {
                if (!value || (value instanceof FileList && value.length === 0)) return true;
                const file = value instanceof FileList ? value[0] : value;
                if (!file) return true;
                return ["image/jpeg", "image/jpg", "image/png"].includes(file.type);
            }),
    });

    const {
        handleSubmit,
        formState,
        reset,
        register,
        setValue,
        getValues,
        watch,
        trigger,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(personnalInfoValidation),
        defaultValues: {
            user_socialNetworks: [],
        },
    });

    const socialNetworks = watch("user_socialNetworks") || [];

    // ── Skills ────────────────────────────────────────────────────────────────
    const [skills, setSkills] = useState([]);
    const [originalSkills, setOriginalSkills] = useState([]);
    const [isSkillsDirty, setIsSkillsDirty] = useState(false);
    const [skillValue, setSkillValue] = useState("");
    const [openEditSkillDialog, setOpenEditSkillDialog] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [editSkillName, setEditSkillName] = useState("");

    // ── Password / save ───────────────────────────────────────────────────────
    const [pendingPassword, setPendingPassword] = useState(null);
    const [openPasswordStep, setOpenPasswordStep] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    const canSave = formState.isDirty || isSkillsDirty || Boolean(pendingPassword);

    /**
     * Synchronise les skills (create / update / delete) puis retourne les ObjectIds
     * à enregistrer dans user_skills.
     */
    const syncSkills = async () => {
        const skillIds = [];

        for (const skill of skills) {
            if (skill.isNew || !skill._id) {
                const created = await createSkill({ skill_name: skill.skill_name });
                if (created?._id) skillIds.push(created._id);
            } else {
                const original = originalSkills.find((o) => o._id === skill._id);
                const nameChanged =
                    original &&
                    (original.skill_name || original.name) !== skill.skill_name;
                if (nameChanged) {
                    await updateSkill(skill._id, { skill_name: skill.skill_name });
                }
                skillIds.push(skill._id);
            }
        }

        const keptIds = new Set(skillIds.map(String));
        for (const original of originalSkills) {
            if (original._id && !keptIds.has(String(original._id))) {
                await deleteSkill(original._id);
            }
        }

        return skillIds;
    };

    /**
     * Construit un FormData aligné sur le modèle User + route multipart update.
     */
    const buildUserFormData = (formData, skillIds) => {
        const body = new FormData();

        body.append("user_name", formData.user_name ?? "");
        body.append("user_secondName", formData.user_secondName ?? "");
        body.append("user_email", formData.user_email ?? "");
        body.append("user_contact_phone", formData.user_contact_phone ?? "");
        body.append("user_whatsapp_phone", formData.user_whatsapp_phone ?? "");
        body.append("user_jobName", formData.user_jobName ?? "");
        body.append("user_desc", formData.user_desc ?? "");
        body.append("user_account_name", formData.user_account_name ?? "");
        body.append(
            "user_socialNetworks",
            JSON.stringify(stripSocialIds(formData.user_socialNetworks || []))
        );
        body.append("user_skills", JSON.stringify(skillIds));

        if (pendingPassword) {
            body.append("user_account_password", pendingPassword);
        }

        const pictureValue = formData.user_picture;
        const pictureFile =
            pictureValue instanceof FileList && pictureValue.length > 0
                ? pictureValue[0]
                : pictureValue instanceof File
                    ? pictureValue
                    : null;

        if (pictureFile) {
            body.append("user_picture", pictureFile);
        }

        return body;
    };

    const sendSettingsUpdate = async (formData) => {
        setIsSaving(true);
        try {
            const skillIds = await syncSkills();
            const body = buildUserFormData(formData, skillIds);
            const result = await updateUser(body);

            toast.success(result?.message || "Profile updated successfully");
            setPendingPassword(null);
            setPreviewUrl(null);
            setIsSkillsDirty(false);

            await loadSkills();
            reset({
                user_name: result.user?.user_name ?? formData.user_name,
                user_email: result.user?.user_email ?? formData.user_email,
                user_secondName: result.user?.user_secondName ?? formData.user_secondName,
                user_desc: result.user?.user_desc ?? formData.user_desc,
                user_jobName: result.user?.user_jobName ?? formData.user_jobName,
                user_account_name: result.user?.user_account_name ?? formData.user_account_name,
                user_contact_phone: result.user?.user_contact_phone ?? formData.user_contact_phone,
                user_whatsapp_phone: result.user?.user_whatsapp_phone ?? formData.user_whatsapp_phone,
                user_socialNetworks: Array.isArray(result.user?.user_socialNetworks)
                    ? stripSocialIds(result.user.user_socialNetworks)
                    : stripSocialIds(formData.user_socialNetworks),
                user_picture: null,
            });
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data?.details?.[0]?.message ||
                "Failed to update profile";
            toast.error(message);
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    // ── Upload d'image ────────────────────────────────────────────────────────
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setValue("user_picture", e.target.files, { shouldDirty: true, shouldValidate: true });
    };

    const handleRemovePicture = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setValue("user_picture", null, { shouldDirty: true, shouldValidate: true });
    };

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // ── Social networks ───────────────────────────────────────────────────────
    const [socialIconId, setSocialIconId] = useState(null);
    const [socialUrl, setSocialUrl] = useState("");
    const [socialDraftError, setSocialDraftError] = useState("");

    const addSocialNetwork = () => {
        setSocialDraftError("");
        if (!socialIconId) {
            setSocialDraftError("Please select an icon");
            return;
        }
        if (!socialUrl.trim()) {
            setSocialDraftError("Please enter a social URL");
            return;
        }
        try {
            // eslint-disable-next-line no-new
            new URL(socialUrl.trim());
        } catch {
            setSocialDraftError("Please enter a valid URL (https://...)");
            return;
        }

        const social_icon = iconIdToExportName(socialIconId);
        const social_name = social_icon.replace(/^Si/, "");
        const entry = {
            social_name,
            social_icon,
            social_url: socialUrl.trim(),
        };

        const current = getValues("user_socialNetworks") || [];
        if (
            current.some(
                (s) => s.social_icon === entry.social_icon || s.social_url === entry.social_url
            )
        ) {
            setSocialDraftError("This social network is already in the list");
            return;
        }

        setValue("user_socialNetworks", [...current, entry], {
            shouldDirty: true,
            shouldValidate: true,
        });
        setSocialIconId(null);
        setSocialUrl("");
    };

    const removeSocialNetwork = (indexToRemove) => {
        const current = getValues("user_socialNetworks") || [];
        setValue(
            "user_socialNetworks",
            current.filter((_, i) => i !== indexToRemove),
            { shouldDirty: true, shouldValidate: true }
        );
    };

    const loadSkills = async () => {
        try {
            const data = await getSkills();
            setSkills(data || []);
            setOriginalSkills(data || []);
            setIsSkillsDirty(false);
        } catch (error) {
            console.error("Error loading skills:", error);
            toast.error("Failed to load skills");
        }
    };

    const addNewSkill = () => {
        const newSkillName = skillValue.trim();
        if (!newSkillName) return;
        if (
            skills.some(
                (s) => (s.skill_name || s.name)?.toLowerCase() === newSkillName.toLowerCase()
            )
        ) {
            toast.error("This skill already exists");
            return;
        }
        setSkills((prev) => [...prev, { skill_name: newSkillName, isNew: true }]);
        setSkillValue("");
        setIsSkillsDirty(true);
    };

    const handleDeleteSkill = (indexToDelete) => {
        setSkills((prev) => prev.filter((_, idx) => idx !== indexToDelete));
        setIsSkillsDirty(true);
    };

    const handleOpenEditSkill = (skill, index) => {
        setEditingSkill({ ...skill, index });
        setEditSkillName(skill.skill_name || skill.name || "");
        setOpenEditSkillDialog(true);
    };

    const handleSaveEditSkill = () => {
        if (!editingSkill || !editSkillName.trim()) return;
        setSkills((prev) => {
            const updated = [...prev];
            updated[editingSkill.index] = {
                ...updated[editingSkill.index],
                skill_name: editSkillName.trim(),
            };
            return updated;
        });
        setIsSkillsDirty(true);
        setOpenEditSkillDialog(false);
        setEditingSkill(null);
    };

    const handleMainSave = async () => {
        if (isSaving) return;

        if (formState.isDirty) {
            const isValid = await trigger();
            if (!isValid) {
                toast.error("Please fix the form errors before saving");
                return;
            }
            handleSubmit(sendSettingsUpdate)();
            return;
        }

        await sendSettingsUpdate(getValues());
    };

    const applyUserToForm = (profile) => {
        if (!profile) return;
        reset({
            user_name: profile.user_name ?? "",
            user_email: profile.user_email ?? "",
            user_secondName: profile.user_secondName ?? "",
            user_desc: profile.user_desc ?? "",
            user_jobName: profile.user_jobName ?? "",
            user_account_name: profile.user_account_name ?? "",
            user_contact_phone: profile.user_contact_phone ?? "",
            user_whatsapp_phone: profile.user_whatsapp_phone ?? "",
            user_socialNetworks: Array.isArray(profile.user_socialNetworks)
                ? stripSocialIds(profile.user_socialNetworks)
                : [],
            user_picture: null,
        });
    };

    useEffect(() => {
        let cancelled = false;

        const bootstrap = async () => {
            setIsLoadingProfile(true);
            try {
                const profile = await getInfos();
                if (!cancelled) {
                    applyUserToForm(profile);
                    await loadSkills();
                }
            } catch (error) {
                console.error(error);
                if (!cancelled && user) {
                    applyUserToForm(user);
                    await loadSkills();
                } else if (!cancelled) {
                    toast.error("Failed to load profile");
                }
            } finally {
                if (!cancelled) setIsLoadingProfile(false);
            }
        };

        bootstrap();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigate = useNavigate();

    if (isLoadingProfile) {
        return (
            <div className="flex flex-1 items-center justify-center text-(--text-primary) min-h-60">
                <Spinner className="size-8" />
            </div>
        );
    }

    return (
        <div className={"text-(--text-primary) flex flex-col"}>
            <Dialog open={openEditSkillDialog} onOpenChange={setOpenEditSkillDialog}>
                <DialogContent className={"text-(--text-primary)"}>
                    <DialogHeader>
                        <DialogTitle>Edit Skill</DialogTitle>
                        <DialogDescription>Modify the name of this skill</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveEditSkill();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <Field>
                            <FieldLabel htmlFor="edit_skill_name">Skill Name</FieldLabel>
                            <Input
                                id="edit_skill_name"
                                value={editSkillName}
                                onChange={(e) => setEditSkillName(e.target.value)}
                                className="border-(--border-input)"
                                autoFocus
                            />
                        </Field>
                        <Field orientation="horizontal" className="justify-end gap-2">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => setOpenEditSkillDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="accent"
                                type="button"
                                onClick={handleSaveEditSkill}
                                disabled={!editSkillName.trim()}
                            >
                                Update Skill
                            </Button>
                        </Field>
                    </form>
                </DialogContent>
            </Dialog>

            <header className={"setting-header *:my-2"}>
                <Button
                    className={"bg-(--bg-button) text-(--text-primary)"}
                    onClick={() => navigate("/admin/dashboard/home")}
                >
                    <ArrowLeft /> <span className="font-semibold">Back to dashboard</span>
                </Button>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl capitalize font-bold"> Settings </h1>
                    {canSave && (
                        <Button
                            variant="accent"
                            className="min-w-20 font-semibold"
                            onClick={handleMainSave}
                            disabled={isSaving}
                        >
                            {isSaving ? <Spinner className="size-4" /> : "Save"}
                        </Button>
                    )}
                </div>
            </header>

            <Tabs className={"flex flex-col flex-1 py-2 overflow-y-auto"} defaultValue={"personnal"}>
                <TabsList className={"shrink-0 bg-(--bg-button) w-full top-0"}>
                    <TabsTrigger value={"personnal"}>Personnal Informations</TabsTrigger>
                    <TabsTrigger value={"jobs"}> Jobs Informations</TabsTrigger>
                    <TabsTrigger value={"security"}> Security</TabsTrigger>
                </TabsList>

                <TabsContent value={"personnal"}>
                    <section className="flex-1 body-settings overflow-y-auto py-5">
                        <form
                            className="max-w-full lg:max-w-1/2 *:mb-10"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleMainSave();
                            }}
                        >
                            <Field className={"user_picture"} orientation="horizontal">
                                <Avatar className={"w-30 h-30"}>
                                    <AvatarImage
                                        src={
                                            previewUrl ??
                                            (user?.user_picture
                                                ? `${import.meta.env.VITE_URL_BACKEND}/${user.user_picture}`
                                                : undefined)
                                        }
                                        className={"object-top object-contain border-(--text-secondary) border-2"}
                                    />
                                    <AvatarFallback>
                                        <FaUser />
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold"> Profile Picture </span>
                                    <div className="grid grid-rows-2 gap-2 md:grid-cols-2">
                                        <Button
                                            type={"button"}
                                            className={
                                                "bg-(--text-accent) hover:bg-(--text-accent-glow) text-white"
                                            }
                                            onClick={handleUploadClick}
                                        >
                                            <FaCloudArrowUp /> Upload Image
                                        </Button>
                                        <Button
                                            type={"button"}
                                            variant="outline"
                                            onClick={handleRemovePicture}
                                            disabled={!previewUrl && !formState.dirtyFields.user_picture}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    <p className="text-(--text-secondary)">
                                        We support PNGs and JPEGs under 5MB
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        id="user_picture"
                                        name="user_picture"
                                        accept="image/png,image/jpeg,image/jpg"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    {formState.errors.user_picture && (
                                        <FieldError>{formState.errors.user_picture.message}</FieldError>
                                    )}
                                </div>
                            </Field>

                            <FieldGroup className={"flex flex-col md:flex-row"}>
                                <Field>
                                    <FieldLabel htmlFor={"user_name"}>
                                        First Name <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    {formState.errors.user_name && (
                                        <FieldError>{formState.errors.user_name.message}</FieldError>
                                    )}
                                    <Input
                                        {...register("user_name")}
                                        type={"text"}
                                        id={"user_name"}
                                        placeholder={"enter your first name"}
                                        className={"border-(--border-input)"}
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor={"user_secondName"}>
                                        Second Name <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    {formState.errors.user_secondName && (
                                        <FieldError>
                                            {formState.errors.user_secondName.message}
                                        </FieldError>
                                    )}
                                    <Input
                                        {...register("user_secondName")}
                                        type={"text"}
                                        id={"user_secondName"}
                                        placeholder={"enter your second name"}
                                        className={"border-(--border-input)"}
                                    />
                                </Field>
                            </FieldGroup>

                            <Field>
                                <FieldLabel htmlFor={"user_email"}>
                                    Email <span className="text-red-500">*</span>
                                </FieldLabel>
                                {formState.errors.user_email && (
                                    <FieldError>{formState.errors.user_email.message}</FieldError>
                                )}
                                <Input
                                    {...register("user_email")}
                                    type={"email"}
                                    id={"user_email"}
                                    placeholder={"@gmail.com"}
                                    className={"border-(--border-input)"}
                                />
                            </Field>

                            <FieldGroup className={"flex flex-col md:flex-row items-center"}>
                                <Field>
                                    <FieldLabel>
                                        Contact Phone <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    {formState.errors.user_contact_phone && (
                                        <FieldError>
                                            {formState.errors.user_contact_phone.message}
                                        </FieldError>
                                    )}
                                    <Input
                                        {...register("user_contact_phone")}
                                        type={"tel"}
                                        id={"user_contact_phone"}
                                        placeholder={"+237XXXXXXXXX"}
                                        className={"border-(--border-input)"}
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel>
                                        Whatsapp Phone <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    {formState.errors.user_whatsapp_phone && (
                                        <FieldError>
                                            {formState.errors.user_whatsapp_phone.message}
                                        </FieldError>
                                    )}
                                    <Input
                                        {...register("user_whatsapp_phone")}
                                        type={"tel"}
                                        id={"user_whatsapp_phone"}
                                        placeholder={"+237XXXXXXXXX"}
                                        className={"border-(--border-input)"}
                                    />
                                </Field>
                            </FieldGroup>

                            <Field>
                                <FieldLabel>
                                    My Social Network <span className="text-red-500">*</span>
                                </FieldLabel>
                                {formState.errors.user_socialNetworks && (
                                    <FieldError>
                                        {formState.errors.user_socialNetworks.message ||
                                            formState.errors.user_socialNetworks.root?.message}
                                    </FieldError>
                                )}
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <IconPicker
                                        useOriginalColor
                                        className="w-auto shrink-0"
                                        value={socialIconId}
                                        onChange={(id) => {
                                            setSocialIconId(id);
                                            setSocialDraftError("");
                                        }}
                                    />
                                    <Input
                                        type={"url"}
                                        value={socialUrl}
                                        onChange={(e) => {
                                            setSocialUrl(e.target.value);
                                            setSocialDraftError("");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addSocialNetwork();
                                            }
                                        }}
                                        className={"flex-1 border-(--border-input)"}
                                        placeholder={"https://..."}
                                    />
                                    <Button type="button" variant={"accent"} onClick={addSocialNetwork}>
                                        Add
                                    </Button>
                                </div>
                                {socialDraftError && <FieldError>{socialDraftError}</FieldError>}

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2 border rounded-[5px] border-(--border-card) min-h-50 content-start">
                                    {socialNetworks.length === 0 ? (
                                        <span className="text-(--text-secondary) text-sm col-span-full p-2">
                                            No social network added yet
                                        </span>
                                    ) : (
                                        socialNetworks.map((network, index) => {
                                            const IconComp = SimpleIcons[network.social_icon];
                                            return (
                                                <Badge
                                                    key={`${network.social_icon}-${index}`}
                                                    className="text-(--text-primary) border-(--border-input) bg-transparent font-semibold p-2.5 justify-between items-center flex gap-1"
                                                >
                                                    <span className="flex items-center gap-1.5 truncate min-w-0">
                                                        {IconComp ? (
                                                            <IconComp
                                                                size={16}
                                                                color={
                                                                    SimpleIcons[
                                                                        `${network.social_icon}Hex`
                                                                    ] || "currentColor"
                                                                }
                                                                className="shrink-0"
                                                            />
                                                        ) : null}
                                                        <span className="truncate">
                                                            {network.social_name}
                                                        </span>
                                                    </span>
                                                    <Button
                                                        size="icon-xs"
                                                        variant="ghost"
                                                        type="button"
                                                        onClick={() => removeSocialNetwork(index)}
                                                    >
                                                        <X size={14} />
                                                    </Button>
                                                </Badge>
                                            );
                                        })
                                    )}
                                </div>
                            </Field>
                        </form>
                    </section>
                </TabsContent>

                <TabsContent value={"jobs"} className={"flex-1"}>
                    <form
                        className="py-5 max-w-full overflow-y-auto flex-1 min-h-0 lg:max-w-1/2 flex flex-col gap-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleMainSave();
                        }}
                    >
                        <Field>
                            <FieldLabel htmlFor={"user_jobName"}>
                                Job Title <span className="text-red-500">*</span>
                            </FieldLabel>
                            <FieldDescription>Fill your job title here</FieldDescription>
                            {formState.errors.user_jobName && (
                                <FieldError>{formState.errors.user_jobName.message}</FieldError>
                            )}
                            <Input
                                {...register("user_jobName")}
                                type={"text"}
                                id={"user_jobName"}
                                className={"border-(--border-input)"}
                            />
                        </Field>
                        <Field>
                            <CustomTextarea
                                fieldDesc={"Please describe yourself here"}
                                label={"Describe yourselves here"}
                                maxLength={256}
                                {...register("user_desc")}
                                required
                            />
                            {formState.errors.user_desc && (
                                <FieldError>{formState.errors.user_desc.message}</FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel> My Skills </FieldLabel>
                            <FieldDescription>
                                Skills are stored as Skill documents — Save syncs them then sends
                                their ObjectIds in <code>user_skills</code>
                            </FieldDescription>
                            <div className="flex gap-2 flex-row-reverse">
                                <Button
                                    type={"button"}
                                    variant="accent"
                                    onClick={addNewSkill}
                                    style={{ maxWidth: "fit-content" }}
                                >
                                    <Plus /> Add New Skill
                                </Button>
                                <Input
                                    value={skillValue}
                                    onChange={(event) => setSkillValue(event.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addNewSkill();
                                        }
                                    }}
                                    className={"border-(--border-input)"}
                                    type={"text"}
                                    placeholder={"enter your skill name here"}
                                />
                            </div>
                            <div
                                className={
                                    "overflow-y-auto h-40 w-full *:uppercase grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 rounded-[5px] p-3 border border-(--border-card)"
                                }
                            >
                                {skills.map((skill, index) => (
                                    <Badge
                                        key={skill._id || `new-${index}`}
                                        className={
                                            "text-(--text-primary) border-(--border-input) bg-transparent font-semibold p-2.5 justify-between items-center flex gap-1"
                                        }
                                    >
                                        <span className="truncate">
                                            {skill.skill_name || skill.name}
                                        </span>
                                        <div className="flex items-center gap-0.5 shrink-0">
                                            <Button
                                                size={"icon-xs"}
                                                variant={"ghost"}
                                                type={"button"}
                                                onClick={() => handleOpenEditSkill(skill, index)}
                                            >
                                                <Pencil size={14} />
                                            </Button>
                                            <Button
                                                size="icon-xs"
                                                variant="ghost"
                                                type={"button"}
                                                onClick={() => handleDeleteSkill(index)}
                                            >
                                                <X size={14} />
                                            </Button>
                                        </div>
                                    </Badge>
                                ))}
                            </div>
                        </Field>
                    </form>
                </TabsContent>

                <TabsContent value={"security"}>
                    <form
                        className="py-5 max-w-full overflow-y-auto flex-1 min-h-0 lg:max-w-1/2 flex flex-col gap-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleMainSave();
                        }}
                    >
                        <Field>
                            <FieldLabel htmlFor={"user_account_name"}> Account name * </FieldLabel>
                            {formState.errors.user_account_name && (
                                <FieldError>
                                    {formState.errors.user_account_name.message}
                                </FieldError>
                            )}
                            <Input
                                {...register("user_account_name")}
                                type={"text"}
                                className={"border-(--border-input)"}
                                id={"user_account_name"}
                            />
                        </Field>

                        <Separator className={"bg-(--border-card)"} />

                        <ChangePasswordSteps
                            open={openPasswordStep}
                            setOpen={setOpenPasswordStep}
                            onPasswordPending={setPendingPassword}
                        />

                        <Field orientation="horizontal" className={"*:mx-3"}>
                            <div>
                                <FieldTitle className={"text-lg"}> Account Password </FieldTitle>
                                <FieldDescription>
                                    {pendingPassword
                                        ? "New password pending — click Save to apply it"
                                        : "Log in with your password instead of using temporary login codes"}
                                </FieldDescription>
                            </div>
                            <div className="flex gap-2 items-center">
                                {pendingPassword && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setPendingPassword(null)}
                                    >
                                        Cancel change
                                    </Button>
                                )}
                                <Button
                                    type={"button"}
                                    variant="outline"
                                    className={"capitalize"}
                                    onClick={() => setOpenPasswordStep(true)}
                                >
                                    Change password
                                </Button>
                            </div>
                        </Field>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    );
}
