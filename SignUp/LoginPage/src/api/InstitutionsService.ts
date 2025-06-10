import axios from "axios";

export const InstituitionGet = () =>{
    const getInstitutions = async () =>{
        try{
            const response = await axios.get('http://localhost:8080/api/institutions');
            const data = Array.isArray(response.data) ? response.data : [];
            return{
                institutions:data
            }
        }catch (error){
            console.error("erro ao carrefar dados",error)
            throw new Error("Erro ao carregar dados");
        }
    }
    return{getInstitutions}
}
