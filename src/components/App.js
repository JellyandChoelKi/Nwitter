import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
// import AppRouter from "components/Router";
// import { useState, useEffect } from "react";
// import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "@firebase/auth";





function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);






useEffect(() => {
  onAuthStateChanged(authService, (user) => {
  if (user) {
    setInit(true);
/*     setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
      }); */
      setUserObj(user);
  if (user.displayName === null) {
  const name = user.email.split("@")[0];
  user.displayName = name;
  }
  } else {
    setInit(false);
    setUserObj(null);
  }
  setInit(true);
  });
  }, []);


  
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };


  return(
    <>
        {init ? (
        <AppRouter 
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)} 
          userObj={userObj} 
        />
      ) : (
        "Initializing..."
      )}
      
    </>
  )
}

export default App;