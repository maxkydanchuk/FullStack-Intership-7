import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Input, useToast} from "@chakra-ui/react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addLoginSuccessThunk, loginFail} from "../../redux/auth/authActions";
import {clearMessage} from "../../redux/auth/messages/messagesAction";


const LoginPage = () => {

    const authStore = useSelector((state) => ({
        error: state.auth.error,
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    }));

    let { isAuthenticated } = authStore;

    console.log(isAuthenticated)
    const messagesStore = useSelector( (state) => ({
        message: state.messages.message
    }));

    const [ email, setEmail ] = useState("");
    const [ password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(messagesStore.message)
    const toast = useToast()
    const history = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        setErrorMessage(messagesStore.message)
    }, [messagesStore.message, authStore.error])



    useEffect(() => {
        if(authStore.error) {
            dispatch(loginFail(!authStore.error));
            return errorToast(messagesStore.message);
        } else {
           dispatch( loginFail(false))
            dispatch(clearMessage())
        }

    }, [errorMessage, password, email])

    const getUser = (item) => dispatch(addLoginSuccessThunk(item, history))

    const handleSubmit = (e) => {
        e.preventDefault();
        getUser({email, password});
    }

    const errorToast = (title) => {
        const id = 'error-toast';
        if(!toast.isActive(id)) {
            toast({
                title: `${title}`,
                id: id,
                position: 'top-right',
                status: 'error',
                isClosable: true,
            })
        }
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