import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from "@chakra-ui/icons";

function getArrows(order) {
  if (order === "asc") {
    return <ArrowUpIcon/>;
  }
  if (order === "desc") {
    return <ArrowDownIcon/>;
  }
}

const DataGridHeaderRow = ({ props }) => {
  const { buttons, sortOrder, onSortChange, sortColumn } = props;

  const newOrder = sortOrder === "asc" ? "desc" : "asc";

  return buttons.map(({ name, label }) => {
    function sortedArrows() {
      if (sortColumn === name) {
        return getArrows(newOrder);
      } else {
        return <ArrowUpDownIcon/>;
      }
    }

    return (
      <>
        <Flex
          className="table__header_row"
          key={name}
          onClick={() => onSortChange(name, newOrder)}
          flex='2'
          textAlign="center"
          cursor="pointer"
          _hover={{
            background: "white",
            color: "teal.500",
          }}
        >
         <Box flex='2'>{label} {sortedArrows()}</Box>
        </Flex>
        </>
    );
  });
};

export default DataGridHeaderRow;
