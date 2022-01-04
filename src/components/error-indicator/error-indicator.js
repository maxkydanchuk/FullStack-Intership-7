import React from "react";
import { Flex, Box } from '@chakra-ui/react';

 const ErrorIndicator = () => {

    return (

        <Flex
        className="error__indicator"
        align="center"
        direction="column"
        color="#c78f22"
        width="100%"
        >
            <Box
            className="error__ops"
            fontSize="26"
            >
                Oooops
                </Box>
                <Box>
                something has gone terribly wrong
                </Box>

        </Flex>
    )
}

export default ErrorIndicator;