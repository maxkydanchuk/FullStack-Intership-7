import React from "react";
import {Box} from "@chakra-ui/react";
import SearchPanel from "../search-panel";
import HeaderButtons from "../header-buttons";

const PageNavbar = ({onSearchChange, inputValue, onCreateItem, label, isAuthenticated }) => {

    return (
        <Box>
            <HeaderButtons
                onCreateItem={onCreateItem}
                label={label}
                isAuthenticated={isAuthenticated}
            />
            <SearchPanel onSearchChange={onSearchChange} inputValue={inputValue}/>
        </Box>
    )
}
export default PageNavbar;
