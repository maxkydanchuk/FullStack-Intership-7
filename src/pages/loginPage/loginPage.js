import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Input} from "@chakra-ui/react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addLoginSuccessThunk, loginSuccess} from "../../redux/auth/authActions";

const LoginPage = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword] = useState("");
    const history = useNavigate();

    const dispatch = useDispatch()

    const getUser = (item) => dispatch(addLoginSuccessThunk(item))


    const handleSubmit = (e) => {
        e.preventDefault();
        getUser({email, password});

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
                    <Button onClick={handleSubmit}>Login</Button>
                    <NavLink to='/' exact="true">
                        <Button colorScheme='blue'>Back</Button>
                    </NavLink>
                </ButtonGroup>
            </FormControl>
        </Flex>
    )
}

export default LoginPage;