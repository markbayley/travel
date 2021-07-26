import React, { useState, useEffect } from "react";
import "./Contact.css";
import firebase from "firebase";
import { db } from '../components/ChatBox'
import { Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";


export const Favorite = () => {
  const [favorite, setFavorite] = useState([]);
  const [loader, setLoader] = useState(false);  

  const [count, setCount] = useState(0);

  const handleFavorite = (e) => {
    setLoader(true);

    db.collection("favorites")
      .add({
        favorite: favorite,
      })
      .then(() => {
        setLoader(false);
        alert("Added to favorites👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

      setFavorite([]);
      console.log(favorite, 'fav')
      setCount(count + 1);
  }

  return (
    <IconButton
      variant="outlined"
      onClick={handleFavorite}
      disableElevation
      value={favorite}
      style={{
        marginTop: 10,
        marginRight: 30,
      }}
    >
      <Badge badgeContent={count} color="secondary">
        <FavoriteIcon />
      </Badge>
    </IconButton>
  );

}

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("contacts")
      .add({
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">CONTACT</div>
        <label>Name</label>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Message</label>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button
          type="submit"
          style={{
            background: loader
              ? "#ccc"
              : "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          }}
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default Contact;
