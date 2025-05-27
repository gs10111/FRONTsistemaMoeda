import axios from "axios";
import { UserProps } from "../components/signIn/SignIn";

export const UserService = () => {
    const postLogin = async(user:UserProps) => {
        const data = await axios.post<UserProps,string>('/localhost:8080/api/pessoas/login',{user})
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