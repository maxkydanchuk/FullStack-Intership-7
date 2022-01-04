import React from "react";
import { Box, Button } from "@chakra-ui/react";

const PeopleDataGridItem = ({_id, name, birthYear, eyeColor, gender, height, dispatchDeletePerson, onEditItem, token }) => {

    const person = {
        _id,
        name,
        birthYear,
        eyeColor,
        gender,
        height
    }

  return (
    <>
      <Box className="table__row_year" flex="2" pt="8" pb="8">
        {name}
      </Box>
      <Box className="table__row_category" flex="2" pt="8" pb="8">
        {birthYear}
      </Box>
      <Box className="table__row_firstname" flex="2" pt="8" pb="8">
        {gender}
      </Box>
      <Box className="table__row_lastname" flex="2" pt="8" pb="8">
      {eyeColor}
      </Box>
      <Box className="table__row_fullname" flex="2" pt="8" pb="8">
        {height}
      </Box>
      <Button  colorScheme='teal' variant='link' flex="1" onClick={ () => onEditItem(person)}>
    Edit
  </Button>
      <Button  colorScheme='teal' variant='link' flex="1" onClick={ () => dispatchDeletePerson(_id, token)}>
    Delete
  </Button>
    </>
  );
};

export default PeopleDataGridItem;
