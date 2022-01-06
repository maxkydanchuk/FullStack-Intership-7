import React, {useEffect, useState} from "react";
import ErrorMessage from "../../components/error-message/error-message";
import {
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addRegisterSuccessThunk} from "../../redux/auth/authActions";

const RegisterPage = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailCheck, setEmailCheck] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [emailError, setEmailError] = useState('Email should not be empty')
    const [passwordError, setPasswordError] = useState('Password should not be empty');
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState("Passwords didn't match");
    const [formValid, setFormValid] = useState(false);

    const dispatch = useDispatch()
    const history = useNavigate();

    useEffect(() => {
        if(emailError || passwordError || confirmPasswordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, confirmPasswordError]);


    const registerUser = (item) => dispatch(addRegisterSuccessThunk(item))

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser({email, password, confirmPassword});

        history("/");
    }

    const blurHandler = (e) => {
        // eslint-disable-next-line default-case
        switch (e.target.name) {
            case 'email':
                setEmailCheck(true);
                break;
            case 'password':
                setPasswordCheck(true);
                break;
            case 'confirm-password': {
                setConfirmPasswordCheck(true)
            }
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regExp.test(String(e.target.value).toLowerCase())) {
            setEmailError('Email should be valid email e.g. user@example.com')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if(!regExp.test(e.target.value)) {
            setPasswordError('Password should be at least 8 characters with 1 Upper Case, 1 Lower Case and at least 1 number');
        } else {
            setPasswordError('');
        }
    }

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);

        if(e.target.value !== password) {
            setConfirmPasswordError("Passwords didn't match");
        } else {
            setConfirmPasswordError('');
        }
    }


    return (
        <Flex direction="column" justify="center" mt="10" maxWidth="30%">
            <FormControl>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input
                    id='email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => emailHandler(e)}
                    onBlur={(e) => blurHandler(e)}
                />
                {(emailCheck && emailError) && <ErrorMessage title={emailError}/>}
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input
                    id='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => passwordHandler(e)}
                    onBlur={(e) => blurHandler(e)}
                />
                {(passwordCheck && passwordError) && <ErrorMessage title={passwordError}/>}
                <FormHelperText>We'll never share your password.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
                <Input
                    id='confirm-password'
                    type='password'
                    name='confirm-password'
                    value={confirmPassword}
                    onChange={(e) => confirmPasswordHandler(e)}
                    onBlur={(e) => blurHandler(e)}
                />
                {(confirmPasswordCheck && confirmPasswordError) && <ErrorMessage title={confirmPasswordError}/>}
                <FormHelperText>We'll never share your password.</FormHelperText>
            </FormControl>
            <ButtonGroup variant='outline' spacing='6'>
                <Button isDisabled={!formValid} onClick={handleSubmit}>Register</Button>
                <NavLink to='/' exact="true">
                    <Button colorScheme='blue'>Back</Button>
                </NavLink>
            </ButtonGroup>
        </Flex>
    )
}

export default RegisterPage;