import React from "react";
import { Flex } from "@chakra-ui/react";
import ErrorIndicator from "../error-indicator";
import DataGridHeader from "../data-grid-header";
import StarshipsPageItem from "./startships-data-grid-item";


const StarshipsDataGrid = ({
  starshipsData,
  error,
  onSortChange,
  sortOrder,
  sortColumn,
  dispatchDeleteStarship,
  isOpen, 
  onOpen, 
  onClose, onEditItem, token, isAuthenticated
}) => {
  const buttons = [
    { name: "starship_class", label: "Starship class" },
    { name: "MGLT", label: "MGLT" },
    { name: "hyperdrive_rating", label: "Hyperdrive rating" },
    { name: "pilots", label: "Pilots" },
  ];

  if (error) {
    return <ErrorIndicator />;
  }
  const elements = starshipsData.map((item) => {
    const { _id } = item;
    return (
      <Flex
        key={_id}
        className="table__row"
        align="center"
        justify="center"
        textAlign={"center"}
        borderBottom="1px solid rgba(224, 224, 224, 1)"
        color="rgb(49, 47, 47)"
      >
        <StarshipsPageItem 
        {...item} 
        dispatchDeleteStarship={dispatchDeleteStarship}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onEditItem={onEditItem}
        token={token}
        isAuthenticated={isAuthenticated}
        />
      </Flex>
    );
  });
  return (
    <>
      <DataGridHeader
        onSortChange={onSortChange}
        sortOrder={sortOrder}
        sortColumn={sortColumn}
        buttons={buttons}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <Flex className="table__row_wrapper" direction="column">
        {" "}
        {elements}{" "}
      </Flex>
    </>
  );
};

export default StarshipsDataGrid;
