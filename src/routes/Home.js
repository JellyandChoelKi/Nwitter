import React, { useState, useEffect} from "react";
import { collection, query,onSnapshot,orderBy } from "firebase/firestore";
import { onAuthStateChanged} from "firebase/auth";
import { authService } from "fbase";
import { dbService} from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";


const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);


  useEffect(() => {
    const q = query(
    collection(dbService, "nweets"),
    orderBy("createdAt", "desc")
    );
/*     onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      }));
      setNweets(nweetArr);
      });
      }, []);
 */  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
      return {
      id: doc.id,
      ...doc.data(),
      };
      });
      setNweets(newArray);
      });
      
      onAuthStateChanged(authService, (user) => {
      if (user == null) {
      unsubscribe();
      }
      });
      }, []);



    
    return (
      <div className="container">
        <NweetFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.creatorId === userObj.uid}
        />
        ))}
      </div>
      </div>
    );
  };

  export default Home;