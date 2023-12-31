import React, { useState } from "react";
import { authService } from "fbase";
import { useNavigate  } from "react-router-dom";
// import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";

export default ({ refreshUser, userObj }) => {
      const navigate = useNavigate();
      const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
      const onLogOutClick = () => {
      authService.signOut();
      navigate("/");
      };
/*       const getMyNweets = async () => {
        const q = query(
        collection(dbService, "nweets"),
        where("creatorId", "==", userObj.uid),
        orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
        }; */
      const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNewDisplayName(value);
      };
      const onSubmit = async (event) => {
        event.preventDefault();
/*         if (userObj.displayName !== newDisplayName) {
          await userObj.updateProfile({
            displayName: newDisplayName,
          });
        } */
        if(userObj.displayName !== newDisplayName){
          await updateProfile(authService.currentUser, { displayName: newDisplayName });
          refreshUser();
          }
      };
    return (
      <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};