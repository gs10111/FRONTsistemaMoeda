import { Button, Container, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { UserService } from "../../api/Service";
import  './SignIn.css'

export interface UserProps {
    name: string;
    password: string;
}

const SignIn: React.FC = () => {
    const [user, setUser] = useState<UserProps>({name: "", password:""})
    const {postLogin} = UserService()

    const OnSubmitHandler = () => {
        console.log(user)
        postLogin(user)
    }
 
    return (
        <Container className="form-signin">
        <FormControl style={{backgroundColor:"white",padding:"4rem"}}>
              <Typography variant="h4" gutterBottom> Entrar</Typography>
            <TextField
                required
                id="outlined-required"
                label="Nome"
                value={user.name}
                onChange={event => setUser((prev) =>({
                    ...prev,
                    name:event.target.value
                }))}
               
            />
            <br />
            <TextField
                required
                id="outlined-required"
                label="Senha"
                value={user.password}
                onChange={event => setUser((prev) =>({
                    ...prev,
                    password:event.target.value
                }))}
                
            />
            <br />
            <Button color="secondary"
                type="button"
                onClick={() => OnSubmitHandler()}
            >Entrar
            </Button>
        </FormControl>
        </Container>
    );
};

export default SignIn;