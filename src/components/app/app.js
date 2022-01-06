import {React, useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import MainPage from "../main-page";
import {useDispatch, useSelector} from "react-redux";
import { setCurrentPage } from "../../redux/people/peopleActions";
import StarshipsPage from "../../pages/starships-page";
import PeoplePage from "../../pages/people-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import {loginSuccess, setIsAuthenticated} from "../../redux/auth/authActions";

function App() {
  const [inputValue, setSearchValue] = useState("");
  const [sortOrder, setOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const dispatch = useDispatch();
  // const history = useNavigate();

  const authStore = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated
  }));

  let  {
    isAuthenticated
  } = authStore;

  useEffect(() => {
    const data = localStorage.getItem('token');
    if(data) {
      dispatch(loginSuccess(data));
      dispatch(setIsAuthenticated(true));
    }
  }, [])

  const onSortChange = (newSortColumn, newSortOrder) => {
    if (sortColumn === newSortColumn) {
      setOrder(newSortOrder);
    } else {
      setOrder("asc");
    }

    setSortColumn(newSortColumn);
  };

  const onSearchChange = (e) => {
    setSearchValue(e.target.value); //rename value
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    dispatch(setIsAuthenticated(false));
    dispatch(loginSuccess())

    // history("/");
  };

  const dispatchSetCurrentPage = (page) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <ChakraProvider>
      <Router>
        <Box
          className="table__wrapper"
          border="1px solid rgba(224, 224, 224, 1)"
          borderBottom="none"
          borderRadius="4"
        >
          <Routes>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path="/" element={<MainPage onLogout={onLogout} isAuthenticated={isAuthenticated} />} />
            <Route
              path="/people"
              element={
                <PeoplePage
                  onSortChange={onSortChange}
                  sortOrder={sortOrder}
                  setOrder={() => setOrder}
                  sortColumn={sortColumn}
                  onSearchChange={onSearchChange}
                  inputValue={inputValue}
                  dispatchSetCurrentPage={dispatchSetCurrentPage}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/starships"
              element={
                <StarshipsPage
                  onSortChange={onSortChange}
                  sortOrder={sortOrder}
                  setOrder={() => setOrder}
                  sortColumn={sortColumn}
                  onSearchChange={onSearchChange}
                  inputValue={inputValue}
                  dispatchSetCurrentPage={dispatchSetCurrentPage}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
