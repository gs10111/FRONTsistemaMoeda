import axios from "axios";
import { UserLoginProps } from "../components/signIn/SignIn";
import { UserRegisterProps } from "../components/signUp/SignUp";
import { CompanyRegisterProps, ProfessorRegisterProps, StudentRegisterProps } from "../types/Interfaces";


export const UserLoginService = () => {
    //aysnc  declaracao
    //await  
    const postLogin = async(user:UserLoginProps) => {
        const data = await axios.post<UserLoginProps,string>('http://localhost:8080/api/auth/login',{user})
        .then( (response) => {
            // manipula o sucesso da requisição
            console.log(response)
             return response
        })
        .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
        })
        
        return data
    }
    return ({postLogin})
}

const mapUserToProfessor = (user: UserRegisterProps): ProfessorRegisterProps => ({
  cpf: user.cpf,
  department: user.department,
  email: user.email,
  institutionId: user.institutionId,
  name: user.name,
  password: user.password
});

const mapUserToStudent = (user: UserRegisterProps): StudentRegisterProps => ({
  cpf: user.cpf,
  rg: user.rg,
  address: user.address,
  email: user.email,
  institutionId: user.institutionId,
  name: user.name,
  password: user.password,
  confirmPassword: user.confirmPassword,
  course: user.course
});

const mapUserToCompany = (user: UserRegisterProps): CompanyRegisterProps => ({
  name: user.name,
  email: user.email,
  password: user.password
});


export const UserRegisterService = () => {
  const postRegister = async (user: UserRegisterProps) => {
    try {
      let data;

      switch (user.type) {
        case "professor":
          const professor = mapUserToProfessor(user);
          data = await axios.post<string>(
            "http://localhost:8080/api/register/professor",
            professor
          );
          break;

        case "student":
          const student = mapUserToStudent(user);
          data = await axios.post<string>(
            "http://localhost:8080/api/register/student",
            student
          );
          break;

        case "company":
          const company = mapUserToCompany(user);
          data = await axios.post<string>(
            "http://localhost:8080/api/register/company",
            company
          );
          break;

        default:
          // fallback (opcional)
          data = await axios.post<string>(
            "http://localhost:8080/api/register",
            user
          );
      }

      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { postRegister };
};

