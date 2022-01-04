import { React } from "react";
import { Flex, Box } from "@chakra-ui/react";
import DataGridHeaderRow from "./data-grid-header-row";

const DataGridHeader = (props) => {
  
  return (
    <Flex
      className="table__header"
      align="center"
      justify='center'
      borderBottom="1px solid rgba(224, 224, 224, 1)"
      fontWeight="bold"
      textAlign="center"
      h="20"
    >
      <DataGridHeaderRow props={props}/>
      <Box flex='1'></Box>
      <Box flex='1'></Box>
    </Flex>
  );
};

export default DataGridHeader;
