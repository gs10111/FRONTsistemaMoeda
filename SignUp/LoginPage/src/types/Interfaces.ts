export interface ProfessorRegisterProps {
    name: string;
    email: string;
    cpf: string;
    password: string;
    institutionId: number;
    department: string;
}
export interface StudentRegisterProps {
    name: string;
    email: string;
    cpf: string;
    password: string;
    confirmPassword: string;
    rg: string;
    address: string;
    institutionId: number;
    course: string;
}
export interface CompanyRegisterProps {
    name: string;
    email: string;
    password: string;
}
