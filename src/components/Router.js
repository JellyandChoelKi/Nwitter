import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";


const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    return (
      <Router  basename={process.env.PUBLIC_URL} >
         {isLoggedIn && <Navigation userObj={userObj} />}
         <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}>
        <Routes >
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj}/>} />
              <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>
            </>
          ) : (<>
            <Route path="/" element={<Auth />} /></>
          )}
        </Routes >
        </div>
      </Router>
    );
  };
  export default AppRouter;