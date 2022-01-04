import { useDispatch, useSelector } from "react-redux";
import {React, useEffect, useState} from "react";
import { deletePersonThunk, fetchPeopleData, resetStore} from "../../redux/people/peopleActions";
import PeopleDataGrid from "../../components/people-data-grid";
import PageNavbar from "../../components/page-navbar";
import BottomButtons from "../../components/bottom-buttons";
import PeopleModal from "../../components/people-modal";
import {useDisclosure} from "@chakra-ui/react";


const PeoplePage = ({
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

  const peopleStore = useSelector((state) => ({
    peopleData: state.people.data,
    peopleError: state.people.error,
    peopleLoading: state.people.loading,
    peopleCurrentPage: state.people.currentPage,
    peopleTotalPageCount: state.people.totalCount,
  }));

  const authStore = useSelector((state) => ({
    token: state.auth
  }));

  let {
    peopleData = [],
    peopleError,
    peopleLoading,
    peopleCurrentPage,
    peopleTotalPageCount,
  } = peopleStore;

  let  {
    token
  } = authStore;

  const dispatchDeletePerson = (id, token) => {
    dispatch(deletePersonThunk(id, token));
  }

  useEffect(() => {
    dispatch(
      fetchPeopleData(
        { sortOrder, sortColumn, inputValue, currentPage: peopleCurrentPage },
        peopleData
      )
    );
  }, [sortOrder, sortColumn, inputValue, peopleData.length, peopleCurrentPage]);

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
        />
        <PeopleModal
            isOpen={isOpen}
            onClose={onClose}
            person={itemToEdit}
            token={token}
        />
        <PeopleDataGrid
            peopleData={peopleData}
            error={peopleError}
            onSortChange={onSortChange}
            sortOrder={sortOrder}
            setOrder={() => setOrder}
            sortColumn={sortColumn}
            dispatchDeletePerson={dispatchDeletePerson}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onEditItem={handleEditItem}
            token={token}
        />
        <BottomButtons
            currentPage={peopleCurrentPage}
            totalPageCount={peopleTotalPageCount}
            dispatchSetCurrentPage={dispatchSetCurrentPage}
        />
      </>
  );
};

export default PeoplePage;
