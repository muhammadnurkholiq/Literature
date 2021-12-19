import { useContext, useEffect } from "react";
import { NotificationContainer } from "react-notifications";
// routes 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import pages 
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddLiterature from "./pages/AddLiterature";
import MyCollection from "./pages/MyCollection";
import DetailLiterature from "./pages/DetailLiterature";

import { AuthContext } from "./context/authContext";
import { API, setAuthToken } from "./config/api";
import "react-notifications/lib/notifications.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  const { dispatch } = useContext(AuthContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/checkAuth");

      if (response.status !== 200) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (  
    <>
      <Router>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/AddLiterature" component={AddLiterature} />
            <Route path="/MyCollection" component={MyCollection} />
            <Route path="/DetailLiterature/:id" component={DetailLiterature} />
         </Switch>
      </Router>
      <NotificationContainer />
    </>
  )
}
export default App;
