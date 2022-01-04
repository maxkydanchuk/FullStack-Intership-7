import React from "react";
import { Input, Flex } from "@chakra-ui/react";

const SearchPanel = ({ onSearchChange, inputValue }) => {
  return (
<>
    <Flex
      className="table__header_search"
      align="center"
      justify="center"
      p={(2, 3)}
    >
      <Input
        type="search"
        placeholder="Search"
        size="md"
        variant="filled"
        maxW="50%"
        value={inputValue}
        onChange={onSearchChange}
      />
    </Flex>
</>
  );
};

export default SearchPanel;
