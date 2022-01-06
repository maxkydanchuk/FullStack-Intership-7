import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";
import HomeButton from "./home-button";

const HeaderButtons = ({ onCreateItem, label, isAuthenticated }) => {

    return (
        <Flex
        mt="10px"
        justify='space-around'
        align='center'
        >
        <NavLink to='/' exact='true'>
       <HomeButton/>
       </NavLink>
            {isAuthenticated && <Button onClick={ () => onCreateItem({})}>Create {label}</Button>}
       </Flex>
  
        
    )
}

export default HeaderButtons;