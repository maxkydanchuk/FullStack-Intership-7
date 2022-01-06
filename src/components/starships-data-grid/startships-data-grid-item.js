import React from "react";
import {Box, Button } from "@chakra-ui/react";

const StarshipsPageItem = ({_id, starshipClass, MGLT, hyperdriveRating, pilots, dispatchDeleteStarship, onEditItem, token, isAuthenticated }) => {

    const starship = {
        _id,
        starshipClass,
        MGLT,
        hyperdriveRating,
        pilots
    };

    return (
        <>
            <Box className="table__row_class" flex="2" pt="8" pb="8" textAlign={"center"}>
                {starshipClass}
            </Box>
            <Box className="table__row_mglt" flex="2" pt="8" pb="8" textAlign={"center"}>
                {MGLT}
            </Box>
            <Box className="table__row_hyperdriver" flex="2" pt="8" pb="8" textAlign={"center"}>
                {hyperdriveRating}
            </Box>
            <Box className="table__row_pilots" flex="2" pt="8" pb="8" textAlign={"center"}>
                {pilots}
            </Box>
            {isAuthenticated && <Button colorScheme='teal' variant='link' flex="1" onClick={ () => onEditItem(starship)}>
                Edit
            </Button>}
            {isAuthenticated && <Button colorScheme='teal' variant='link' flex="1" onClick={() => dispatchDeleteStarship(_id, token)}>
                Delete
            </Button>}

        </>
    );
};

export default StarshipsPageItem;
