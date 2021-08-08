import React, { useState, useEffect } from 'react'
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import firestore from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/ChatBox";
import { db } from "../components/ChatBox";

 
export function createFav(url,uid) {
  return firestore
    .collection("favs")
    .add({
      user: uid,
      website: url
    })
    .then(function(docRef) {
        console.log("Tutorial created with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding Tutorial: ", error);
    });;
}


export function deleteFav(website, user) {
  var dt = firestore
    .collection("favs")
    .where("website", "==", website)
    .where("user", "==", user);
  return dt.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
      console.log("deleted!");
    });
  });
}


export function readFavs(website, user) {
  var postData = [];
  firestore
    .collection("favs")
    .where("user", "==", user)
    .where("website", "==", website)
    .onSnapshot((snapshot) => {
      snapshot.map((doc) => postData.push({ ...doc.data(), id: doc.id }));
    });
  return postData;
}


export const Favorites = () => {

   const [user] = useAuthState(auth);
   const [fav, setFav] = React.useState(false);


   function handleFav() {
     setFav(!fav);
     if (fav == true) {
       //save it to firestore
       createFav("nordvpn.com", auth.user.id);
       //save ID to localstorage? but this will fail if they come back
     } else {
       console.log("delete me?");
       console.log(auth.user.id);
       deleteFav("nordvpn.com", auth.user.id);
       //or delete it from firestore
       //delete it where
     }
   }

  return (
    <div>
      {fav && (
        <IconButton
          onClick={() => {
            handleFav(!fav);
          }}
          aria-label="delete"
          color="secondary"
        >
          <Favorite />
        </IconButton>
      )}
      {!fav && (
        <IconButton
          onClick={() => {
            handleFav(!fav);
          }}
          aria-label="delete"
          color="secondary"
        >
          {" "}
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </div>
  );
}
