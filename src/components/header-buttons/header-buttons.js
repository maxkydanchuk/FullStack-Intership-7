import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";
import HomeButton from "./home-button";

const HeaderButtons = ({ onCreateItem }) => {

    return (
        <Flex
        mt="10px"
        justify='space-around'
        align='center'
        >
        <NavLink to='/' exact='true'>
       <HomeButton/>
       </NavLink>
       </Flex>
  
        
    )
}

export default HeaderButtons;