import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import useUserStore from "@/store/userStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { FaCloudArrowUp, FaUser } from "react-icons/fa6";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomTextarea from "@/components/custom-textarea";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


// ─── Composant : Changement de mot de passe en 2 étapes ───────────────────────
const ChangePasswordSteps = function ({ open, setOpen }) {
    const [step, setStep] = useState(0);
    const token = useUserStore((state) => state.token);

    // ── Step 0 — Vérification de l'ancien mot de passe ──
    const [oldPassword, setOldPassword] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [verifyError, setVerifyError] = useState("");

    // ── Step 1 — Schéma et form du nouveau mot de passe ──
    const passwordSchema = yup.object({
        new_password: yup.string()
            .required("New password is required")
            .min(8, "Password must be at least 8 characters"),
        confirm_password: yup.string()
            .required("Please confirm your password")
            .oneOf([yup.ref("new_password")], "Passwords do not match"),
    });

    const {
        register: registerPwd,
        handleSubmit: handlePwdSubmit,
        formState: { errors: pwdErrors, isValid: isPwdValid },
        reset: resetPwd,
    } = useForm({ mode: "onChange", resolver: yupResolver(passwordSchema) });

    // Réinitialiser l'état complet à la fermeture du dialog
    useEffect(() => {
        if (!open) {
            setStep(0);
            setOldPassword("");
            setVerifyError("");
            resetPwd();
        }
    }, [open]);

    // Appel API pour vérifier l'ancien mot de passe
    const verifyOldPassword = async () => {
        setIsVerifying(true);
        setVerifyError("");
        try {
            await axios.post(
                `${import.meta.env.VITE_URL_ADMIN_BACKEND}/admin/myself/verify-password`,
                { password: oldPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Vérification réussie → passer au step 1
            setStep(1);
        } catch (error) {
            setVerifyError(
                error.response?.data?.message ?? "Incorrect password. Please try again."
            );
        } finally {
            setIsVerifying(false);
        }
    };

    // Sauvegarde du nouveau mot de passe (branchez votre appel API ici)
    const saveNewPassword = (data) => {
        // TODO: axios.patch(`${import.meta.env.VITE_URL_ADMIN_BACKEND}/admin/myself/password`, { password: data.new_password }, ...)
        console.log("Nouveau mot de passe à envoyer :", data.new_password);
        setOpen(false);
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

                {/* ── Step 0 : Saisie de l'ancien mot de passe ── */}
                {step === 0 && (
                    <Field>
                        <FieldLabel htmlFor={"old_password"}> Old Password </FieldLabel>
                        <FieldDescription> Enter your current password to continue </FieldDescription>
                        <Input
                            type="password"
                            id={"old_password"}
                            value={oldPassword}
                            onChange={(e) => { setOldPassword(e.target.value); setVerifyError(""); }}
                            className={"border-(--border-input)"}
                        />
                        {verifyError && <FieldError>{verifyError}</FieldError>}
                    </Field>
                )}

                {/* ── Step 1 : Saisie du nouveau mot de passe ── */}
                {step === 1 && (
                    <form id="new-password-form" onSubmit={handlePwdSubmit(saveNewPassword)} className="flex flex-col gap-4">
                        <Field>
                            <FieldLabel htmlFor={"new_password"}> New Password </FieldLabel>
                            <FieldDescription> Must be at least 8 characters </FieldDescription>
                            <Input
                                {...registerPwd("new_password")}
                                type="password"
                                id={"new_password"}
                                className={"border-(--border-input)"}
                            />
                            {pwdErrors.new_password && <FieldError>{pwdErrors.new_password.message}</FieldError>}
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
                            {pwdErrors.confirm_password && <FieldError>{pwdErrors.confirm_password.message}</FieldError>}
                        </Field>
                    </form>
                )}

                {/* ── Actions ── */}
                <Field orientation="horizontal" className={"justify-end gap-2"}>
                    {step === 0 && (
                        <>
                            <Button variant="outline" type="button" onClick={() => setOpen(false)}> Cancel </Button>
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
                            <Button variant="outline" type="button" onClick={() => setStep(0)}> Back </Button>
                            <Button
                                variant="accent"
                                type="submit"
                                form="new-password-form"
                                disabled={!isPwdValid}
                            >
                                Save Password
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
    const { user, token, updateUser} = useUserStore();

    // ── Schéma de validation (user_picture optionnel : validé seulement si un fichier est choisi) ──
    const personnalInfoValidation = yup.object().shape({
        user_name: yup.string().required("The name of user required "),
        user_secondName: yup.string().required("The second name of user is required "),
        user_jobName: yup.string().required("The title your job is required ").max(32, "The max length of the title of your job should be less than 32 character"),
        user_desc: yup.string().required("Your description is required").max(256, "Your description should not exceed 256 characters "),
        user_account_name: yup.string().required("The name of your account is required "),
        user_email: yup.string().email("This email is not valid").required("The email of user is required "),
        user_picture: yup.mixed().nullable().optional()
            .test("fileSize", "The size of your image should be less than 5MB", (value) => {
                if (!value || (value instanceof FileList && value.length === 0)) return true;
                const file = value instanceof FileList ? value[0] : value;
                if (!file) return true;
                return file.size <= 5 * 1024 * 1024;
            })
            .test("type", "Only images are accepted (PNG, JPEG, GIF)", (value) => {
                if (!value || (value instanceof FileList && value.length === 0)) return true;
                const file = value instanceof FileList ? value[0] : value;
                if (!file) return true;
                return file.type.startsWith("image/");
            }),
    });

    const {
        handleSubmit,
        formState,
        reset,
        register,
        setValue,
    } = useForm({ mode: "onChange", resolver: yupResolver(personnalInfoValidation) });

    // ── Bouton Save : visible uniquement si formulaire valide ET au moins un champ modifié ──
    const canSave = formState.isValid && formState.isDirty;

    // ── Collecte des champs modifiés → FormData (prêt pour votre appel API) ──
    const updateUserData = async function (data) {
        const formData = new FormData();

        Object.keys(formState.dirtyFields).forEach((key) => {
            const value = data[key];
            if (value instanceof FileList && value.length > 0) {
                formData.append(key, value[0]); // Fichier image
            } else if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        // Log d'inspection (remplacez par votre appel API)
        console.log("Champs modifiés à envoyer au backend :");
        for (const [key, value] of formData.entries()) {
            console.log(`  ${key}:`, value);
        }

        // TODO: branchez votre appel API ici, ex :
        // const token = useUserStore.getState().token;
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/admin/myself/update`, formData, {
                headers: { "Content-Type": "multipart/form-data", token: token }
            });
            const data = await response.data;

            updateUser(data.user);
            toast("Les informations de l'utilisateur ont bien ete modifiees ");
        } catch(error) {
            console.log("une erreur est survenue : ", error);
        }

            
    };

    // ── Upload d'image avec prévisualisation en temps réel ──
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // Créer une URL locale pour la prévisualisation immédiate
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        // Informer react-hook-form du nouveau fichier (déclenche isDirty + validation)
        setValue("user_picture", e.target.files, { shouldDirty: true, shouldValidate: true });
    };

    const handleRemovePicture = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setValue("user_picture", null, { shouldDirty: false, shouldValidate: true });
    };

    // Libérer l'URL objet au démontage pour éviter les fuites mémoire
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // ── Skills ──
    const [skills, setSkills] = useState([
        { id: 0, name: "php" }, { id: 1, name: "python" }, { id: 2, name: "javascript" },
        { id: 3, name: "html" }, { id: 4, name: "css" }, { id: 5, name: "typescript" },
        { id: 6, name: "node js" },
    ]);
    const [skillValue, setSkillValue] = useState("");

    const addNewSkill = function () {
        if (skillValue.trim() !== "") {
            setSkills(prev => [...prev, { id: prev.length, name: skillValue.trim() }]);
            setSkillValue("");
        }
    };
    const deleteSkill = (idSkill) => {
        setSkills(prev => prev.filter(skill => skill.id !== idSkill));
    };

    // ── Initialisation du formulaire avec les données utilisateur ──
    useEffect(() => {
        reset({
            user_name: user.user_name,
            user_email: user.user_email ?? "takeuhduplex2006@gmail.com",
            user_secondName: user.user_secondName,
            user_desc: user.user_desc,
            user_jobName: user.user_jobName,
            user_account_name: user.user_account_name,
        });
    }, []);

    const [openPasswordStep, setOpenPasswordStep] = useState(false);
    const navigate = useNavigate();
    return (
        <div className={"text-(--text-primary) flex flex-col"}>
            <header className={"setting-header *:my-2"}>
                <Button className={"bg-(--bg-button) text-(--text-primary)"} onClick={()=> navigate("/admin/dashboard/home")}> <ArrowLeft /> <span className="font-semibold">Back to dashboard</span> </Button>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl capitalize font-bold"> Settings </h1>
                    {/* Bouton Save : rendu uniquement si formulaire valide ET au moins un champ dirty */}
                    {canSave && (
                        <Button
                            variant="accent"
                            className={`w-20 font-semibold`}
                            onClick={handleSubmit(updateUserData)}
                        >
                            Save
                        </Button>
                    )}
                </div>
            </header>

            <Tabs className={"flex flex-col flex-1 py-2"} defaultValue={"personnal"}>
                <TabsList className={"shrink-0 bg-(--bg-button) w-full top-0"}>
                    <TabsTrigger value={"personnal"}>Personnal Informations</TabsTrigger>
                    <TabsTrigger value={"jobs"}> Jobs Informations</TabsTrigger>
                    <TabsTrigger value={"security"}> Security</TabsTrigger>
                </TabsList>

                {/* ── Tab : Informations personnelles ── */}
                <TabsContent className={""} value={"personnal"}>
                    <section className="flex-1 body-settings overflow-y-auto py-5">
                        <form className="max-w-full lg:max-w-1/2 *:mb-10" onSubmit={handleSubmit(updateUserData)}>

                            {/* Image de profil */}
                            <Field className={"user_picture"} orientation="horizontal">
                                <Avatar className={"w-30 h-30"}>
                                    {/* Affiche la prévisualisation si disponible, sinon l'image du serveur */}
                                    <AvatarImage
                                        src={previewUrl ?? `${import.meta.env.VITE_URL_BACKEND}/${user.user_picture}`}
                                        className={"object-top object-contain border-(--text-secondary) border-2"}
                                    />
                                    <AvatarFallback> <FaUser /> </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold"> Profile Picture </span>
                                    <div className="grid grid-rows-2 gap-2 md:grid-cols-2">
                                        <Button
                                            type={"button"}
                                            className={"bg-(--text-accent) hover:bg-(--text-accent-glow) text-white"}
                                            onClick={handleUploadClick}
                                        >
                                            <FaCloudArrowUp /> Upload Image
                                        </Button>
                                        <Button
                                            type={"button"}
                                            variant="outline"
                                            onClick={handleRemovePicture}
                                            disabled={!previewUrl}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    <p className="text-(--text-secondary)"> We support PNGs, JPEGs and GIFs under 5MB</p>
                                    {/* Input file masqué, déclenché via la ref */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        id="user_picture"
                                        name="user_picture"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    {formState.errors.user_picture && (
                                        <FieldError>{formState.errors.user_picture.message}</FieldError>
                                    )}
                                </div>
                            </Field>

                            {/* Prénom / Nom */}
                            <FieldGroup className={"flex flex-col md:flex-row"}>
                                <Field>
                                    <FieldLabel htmlFor={"user_name"}>First Name <span className="text-red-500">*</span></FieldLabel>
                                    {formState.errors.user_name && <FieldError>{formState.errors.user_name.message}</FieldError>}
                                    <Input {...register("user_name")} type={"text"} id={"user_name"} placeholder={"enter your first name"} className={"border-(--border-input)"} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor={"user_secondName"}>Second Name <span className="text-red-500">*</span></FieldLabel>
                                    {formState.errors.user_secondName && <FieldError>{formState.errors.user_secondName.message}</FieldError>}
                                    <Input {...register("user_secondName")} type={"text"} id={"user_secondName"} placeholder={"enter your second name"} className={"border-(--border-input)"} />
                                </Field>
                            </FieldGroup>

                            {/* Email */}
                            <Field>
                                <FieldLabel htmlFor={"user_email"}>Email <span className="text-red-500">*</span></FieldLabel>
                                {formState.errors.user_email && <FieldError>{formState.errors.user_email.message}</FieldError>}
                                <div className="flex gap-2">
                                    <Input {...register("user_email")} type={"email"} id={"user_email"} placeholder={"@gmail.com"} className={"border-(--border-input)"} />
                                </div>
                            </Field>

                        </form>
                    </section>
                </TabsContent>

                {/* ── Tab : Jobs Informations ── */}
                <TabsContent value={"jobs"} className={"flex-1"}>
                    <form className="py-5 max-w-full overflow-y-auto flex-1 min-h-0 lg:max-w-1/2 flex flex-col gap-5">
                        <Field>
                            <FieldLabel htmlFor={"user_jobName"}>Job Title <span className="text-red-500">*</span></FieldLabel>
                            <FieldDescription>Fill your job title here</FieldDescription>
                            {formState.errors.user_jobName && <FieldError>{formState.errors.user_jobName.message}</FieldError>}
                            <Input {...register("user_jobName")} type={"text"} id={"user_jobName"} className={"border-(--border-input)"} />
                        </Field>
                        <Field>
                            <CustomTextarea
                                fieldDesc={"Please describe yourself here"}
                                label={"Describe yourselves here"}
                                maxLength={256}
                                {...register("user_desc")}
                                required
                            />
                        </Field>

                        <Field>
                            <FieldLabel> My Skills </FieldLabel>
                            <FieldDescription> Click on this below button to add new skill inside the list </FieldDescription>
                            <div className="flex gap-2 flex-row-reverse">
                                <Button type={"button"} variant="accent" onClick={addNewSkill} style={{ maxWidth: "fit-content" }}><Plus /> Add New Skill</Button>
                                <Input
                                    value={skillValue}
                                    onChange={(event) => setSkillValue(event.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addNewSkill())}
                                    className={"border-(--border-input)"}
                                    type={"text"}
                                    placeholder={"enter your skill name here"}
                                />
                            </div>
                            <div className={"overflow-y-auto h-40 w-full *:uppercase grid grid-cols-3 md:grid-cols-4 gap-2 rounded-[5px] p-3"}>
                                {skills.map((skill, index) => (
                                    <Badge key={index} className={"text-(--text-primary) border-(--border-input) bg-transparent font-semibold p-3"}>
                                        {skill.name}
                                        <Button size="icon-xs" variant="ghost" type={"button"} onClick={() => deleteSkill(skill.id)}><X /></Button>
                                    </Badge>
                                ))}
                            </div>
                        </Field>
                    </form>
                </TabsContent>

                {/* ── Tab : Security ── */}
                <TabsContent value={"security"}>
                    <form className="py-5 max-w-full overflow-y-auto flex-1 min-h-0 lg:max-w-1/2 flex flex-col gap-5">
                        <Field>
                            <FieldLabel htmlFor={"user_account_name"}> Account name * </FieldLabel>
                            {formState.errors.user_account_name && <FieldError>{formState.errors.user_account_name.message}</FieldError>}
                            <Input {...register("user_account_name")} type={"text"} className={"border-(--border-input)"} id={"user_account_name"} />
                        </Field>

                        <Separator className={"bg-(--border-card)"} />

                        <ChangePasswordSteps open={openPasswordStep} setOpen={setOpenPasswordStep} />

                        <Field orientation="horizontal" className={"*:mx-3"}>
                            <div>
                                <FieldTitle className={"text-lg"}> Account Password </FieldTitle>
                                <FieldDescription>
                                    Log in with your password instead of using temporary login codes
                                </FieldDescription>
                            </div>
                            <Button type={"button"} variant="outline" className={"capitalize"} onClick={() => setOpenPasswordStep(true)}>
                                Change password
                            </Button>
                        </Field>
                    </form>
                </TabsContent>

            </Tabs>
        </div>
    )
};