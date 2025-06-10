import { Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState, useEffect } from "react";
import { UserRegisterService } from "../../api/UserService";
import { InstituitionGet } from "../../api/InstitutionsService";
import { useSnackbar } from 'notistack';


type UserKeys = "type" | "institutionId"
type UserSelectProps = | ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string | number }>
    | (Event & { target: { value: string | number; name: string } })

export interface UserRegisterProps {
    name: string;
    email: string;
    cpf: string;
    password: string;
    confirmPassword: string;
    rg: string;
    address: string;
    institutionId: number;
    course: string;
    type: string;
    department: string;
}
const SignUp: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [userRegister, setUserRegister] = useState<UserRegisterProps>({
        name: "", email: "", cpf: "", password: "", confirmPassword: "", rg: "", address: "",
        institutionId: 0, course: "", type: "professor", department: ""
    })

    interface Institution {
        id: number;
        name: string;
    }

    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [loading, setLoading] = useState(false);
    const [erro, setError] = useState(null);


    const { postRegister } = UserRegisterService();

    useEffect(() => {
        const loadInstitutions = async () => {
            setLoading(true);
            setError(null);
            try {
                const institutionget = InstituitionGet();
                const result = await institutionget.getInstitutions();
                setInstitutions(result.institutions);
            } catch (error) {
                console.error('Erro ao carregar instituições:', error);
            }
            finally {
                setLoading(false)
            }
        };
        loadInstitutions();
    }, []);

    const OnSubmitHandler = async () => {
        setLoading(true); // Desabilita o botão e mostra feedback
        try {
            await postRegister(userRegister);
            enqueueSnackbar("Registro realizado com sucesso!", { variant: 'success' });
            // Aqui você pode limpar o formulário ou redirecionar o usuário
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message ||  "Ocorreu um erro ao registrar.";
            console.error("Erro no registro:", error.response); // Logue o erro completo para debug
            enqueueSnackbar(errorMessage, { variant: 'error' });
        } finally {
            setLoading(false); // Reabilita o botão, independente de sucesso ou falha
        }
    };



    const handleChange = (
        key: UserKeys,
        event:
            UserSelectProps
    ) => {
        const { name, value } = event.target as { name: string; value: any };
        console.log(name);
        setUserRegister((prev) => ({
            ...prev,
            [key]: key === "institutionId" ? Number(value) : value
        }));
    };


    console.log(userRegister)
    return (
        <Container className="form-signin">
            <FormControl style={{ backgroundColor: "white", padding: "4rem", borderRadius: "40px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Typography variant="h4" gutterBottom align="center"> Registrar-se</Typography>
                <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="Nome"
                    value={userRegister.name}
                    onChange={event => setUserRegister((prev) => ({
                        ...prev,
                        name: event.target.value
                    }))}
                />
                {userRegister.type === "student" && <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="Curso"
                    value={userRegister.course}
                    onChange={event => setUserRegister((prev) => ({
                        ...prev,
                        course: event.target.value
                    }))}
                />}
                <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="email"
                    value={userRegister.email}
                    onChange={event => setUserRegister((prev) => ({
                        ...prev,
                        email: event.target.value
                    }))}
                />
                {userRegister.type !== "company" && <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="cpf"
                    value={userRegister.cpf}
                    onChange={event => setUserRegister((prev) => ({
                        ...prev,
                        cpf: event.target.value
                    }))}
                />}
                {userRegister.type === "professor" && <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="departamento"
                    value={userRegister.department}
                    onChange={event => setUserRegister((prev) => ({
                        ...prev,
                        department: event.target.value
                    }))}
                />}
                {userRegister.type === "student" && <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="Endereço"
                    value={userRegister.address}
                    onChange={event => setUserRegister((prev) => ({
                        ...prev,
                        address: event.target.value
                    }))}
                />}
                {userRegister.type === "student" && <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="rg"
                    value={userRegister.rg}
                    onChange={event => setUserRegister((prev) => ({
                        ...prev,
                        rg: event.target.value
                    }))}
                />}
                <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="Senha"
                    value={userRegister.password}
                    onChange={event => setUserRegister((prev) => ({
                        ...prev,
                        password: event.target.value
                    }))}
                />
                {userRegister.type === "student" && <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="confirme a senha"
                    value={userRegister.confirmPassword}
                    onChange={event => setUserRegister((prev) => ({
                        ...prev,
                        confirmPassword: event.target.value
                    }))}
                />}
                <Select
                    labelId="type"
                    id="type"
                    value={userRegister.type}
                    label="type"
                    onChange={(event) => handleChange("type", event)}
                >
                    <MenuItem value={"professor"}>Professor</MenuItem>
                    <MenuItem value={"student"}>Aluno</MenuItem>
                    <MenuItem value={"company"}>Compania</MenuItem>
                </Select>
                {userRegister.type !== "company" && <Select
                    labelId="institution"
                    id="institution"
                    name="institutionId"
                    value={userRegister.institutionId}
                    label="Instituição"
                    onChange={(event) => handleChange("institutionId", event)}
                    disabled={loading}
                >
                    {loading ? (
                        <MenuItem disabled>
                            <CircularProgress size={20} /> Carregando...
                        </MenuItem>
                    ) : institutions.length === 0 ? (
                        <MenuItem disabled>Nenhuma instituição encontrada</MenuItem>
                    ) : (
                        institutions.map((institution) => (
                            <MenuItem key={institution.id} value={institution.id}>
                                {institution.name}
                            </MenuItem>
                        ))
                    )}
                </Select>}


                <Button color="secondary"
                    type="button"
                    onClick={() => OnSubmitHandler()}
                    disabled={ !userRegister.name || !userRegister.email || !userRegister.password}
                >Registrar
                </Button>
            </FormControl>
        </Container>
    )
}
export default SignUp
