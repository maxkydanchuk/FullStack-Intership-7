import { React, useEffect, useState } from "react";
import { fetchStarshipsData, resetStore, deleteStarshipThunk } from "../../redux/starships/starshipsActions";
import { useDispatch, useSelector } from "react-redux";
import StarshipsDataGrid from "../../components/starships-data-grid";
import PageNavbar from "../../components/page-navbar";
import BottomButtons from "../../components/bottom-buttons";
import { useDisclosure } from "@chakra-ui/react";
import StarshipsModal from "../../components/starships-modal";


const StarshipsPage = ({
  onSortChange,
  sortOrder,
  setOrder,
  sortColumn,
  onSearchChange,
  inputValue,
  dispatchSetCurrentPage,
}) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const starshipsStore = useSelector((state) => ({
    starshipsData: state.starships.data,
    starshipsError: state.starships.error,
    starshipsLoading: state.starships.loading,
    starshipsCurrentPage: state.starships.currentPage,
    starshipsTotalPageCount: state.starships.totalCount,
  }));

  const authStore = useSelector((state) => ({
    token: state.auth
  }));

  let {
    starshipsData = [],
    starshipsCurrentPage,
    starshipsTotalPageCount,
  } = starshipsStore;

  let  {
    token
  } = authStore;

  const dispatchDeleteStaship = (id, token) => {
    dispatch(deleteStarshipThunk(id, token));
  }
  useEffect(() => {
    dispatch(
      fetchStarshipsData(
        {sortOrder,sortColumn, inputValue, currentPage: starshipsCurrentPage,}, starshipsData
      )
    );
  }, [ sortOrder, sortColumn, inputValue, starshipsData.length, starshipsCurrentPage]);

  useEffect(() => {
    return () => {
      dispatch(resetStore());
    }
  }, [])

  const [itemToEdit, setItemToEdit] = useState();

  const handleEditItem = (item) => {
    setItemToEdit(item);
    onOpen();
  }

  return (
      <>
        <PageNavbar
            onSearchChange={onSearchChange}
            inputValue={inputValue}
            onCreateItem={handleEditItem}
        />
        <StarshipsModal
            isOpen={isOpen}
            onClose={onClose}
            starship={itemToEdit}
            token={token}
        />
        <StarshipsDataGrid
            starshipsData={starshipsData}
            onSortChange={onSortChange}
            sortOrder={sortOrder}
            setOrder={() => setOrder}
            sortColumn={sortColumn}
            onSearchChange={onSearchChange}
            dispatchDeleteStarship={dispatchDeleteStaship}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onEditItem={handleEditItem}
            token={token}

        />
        <BottomButtons
            currentPage={starshipsCurrentPage}
            totalPageCount={starshipsTotalPageCount}
            dispatchSetCurrentPage={dispatchSetCurrentPage}
        />
      </>
  );
};

export default StarshipsPage;
