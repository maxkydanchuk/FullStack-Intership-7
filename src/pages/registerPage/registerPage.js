import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Input} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRegisterSuccessThunk } from "../../redux/auth/authActions";

const RegisterPage = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword] = useState("");
    const dispatch = useDispatch()
    const history = useNavigate();

    const registerUser = (item) => dispatch(addRegisterSuccessThunk(item))


    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser({email, password});

            history("/");
    }

    return (
        <Flex align="center" justify={"center"} mt="10" maxWidth="30%">
            <FormControl>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input
                    id='password'
                    type='password'
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                />
                <FormHelperText>We'll never share your password.</FormHelperText>
                <ButtonGroup variant='outline' spacing='6'>
                    <Button onClick={handleSubmit}>Register</Button>
                    <NavLink to='/' exact="true">
                        <Button colorScheme='blue'>Back</Button>
                    </NavLink>
                </ButtonGroup>
            </FormControl>
        </Flex>
    )
}

export default RegisterPage;