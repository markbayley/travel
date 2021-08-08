import React, { useRef, useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import "./ChatBox.css";
import CancelIcon from "@material-ui/icons/Cancel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Input, Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";



const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCEUxdZCcAMXWbOS8YNgr45ogT5E5aloDU",
  authDomain: "chat-2e7fe.firebaseapp.com",
  projectId: "chat-2e7fe",
  storageBucket: "chat-2e7fe.appspot.com",
  messagingSenderId: "738056828557",
  appId: "1:738056828557:web:e515a8e3375722a7c0d4c4",
  measurementId: "G-MP2G2G4RQD",
});

export const db = firebaseApp.firestore();

export const auth = firebase.auth();

export const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleChatOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Tooltip title="LOG IN" aria-label="Log In">
        <IconButton
          onClick={handleChatOpen}
          aria-label="show 11 new notifications"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{
            position: "sticky",
            top: 0,
            cursor: "move",
            background: "#119DA4",
            height: "60px",
            width: "400px",
          }}
          id="draggable-dialog-title"
        >
          {" "}
          <CancelIcon
            onClick={handleClose}
            style={{
              cursor: "pointer",
              color: "#fff",
            }}
          />
        </DialogTitle>

        <div className="" style={{ textAlign: "center" }}>
          <form action="">
            <br />
            <h3>Email</h3>
            <input
              ref={emailRef}
              type="email"
              value="test@hotmail.com"
              style={{
                padding: "1em",
                margin: "1em",
                width: "250px",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            />
            <h3>Password</h3>
            <input
              ref={passwordRef}
              type="password"
              value="password"
              style={{ padding: "1em", margin: "1em", width: "250px" }}
            />{" "}
            <br />
            <br />
            <Button
              onClick={signIn}
              variant="outlined"
              style={{ marginRight: "30px" }}
            >
              Sign in{" "}
            </Button>
            <Button onClick={signUp} variant="outlined">
              Sign up
            </Button>
            <Button onClick={signInWithGoogle} variant="outlined">
              Google Sign In
            </Button>
            <br />
            <br />
            <p className="signin__link">Forgot password?</p>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export const Message = () => {
  const [user] = useAuthState(auth);

  function SendMessage({ scroll, messages }) {
    const [msg, setMsg] = useState("");

    async function sendMessage(e) {
      e.preventDefault();
      const { uid, photoURL } = auth.currentUser;

      await db.collection("messages").add({
        text: msg,
        photoURL,
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setMsg("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
    return (
      <div style={{ position: "sticky", bottom: 0 }}>
        <form onSubmit={sendMessage}>
          <div className="sendMsg">
            <Input
              style={{
                width: "78%",
                fontSize: "15px",
                fontWeight: "550",
                marginLeft: "25px",
                marginBottom: "-15px",
                zIndex: "10",
              }}
              placeholder="Message..."
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <Button
              style={{
                width: "20%",
                fontSize: "15px",
                fontWeight: "550",
                margin: "4px 5% -13px 5%",
                maxWidth: "200px",
              }}
              type="submit"
            >
              Send
            </Button>
            {/* <div>{messages.length}</div> */}
            <ChatBox messages={messages} />
          </div>
        </form>
      </div>
    );
  }

  function Chat() {
    const scroll = useRef();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
      db.collection("messages")
        .orderBy("createdAt")
        .limit(50)
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }, []);
    return (
      <div>
        <div className="msgs">
          {messages.map(({ id, text, photoURL, uid }) => (
            <div>
              <div
                key={id}
                className={`msg ${
                  uid === auth.currentUser.uid ? "sent" : "received"
                }`}
              >
                <img className="avatar" src={photoURL} alt="" />
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <SendMessage scroll={scroll} messages={messages}/>
        <div ref={scroll}></div>
      </div>
    );
  }

  return <>{user ? <Chat /> : <SignIn />}</>;
};

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export const ChatBox = ({messages}) => {
  const [open, setOpen] = useState(false);

  const handleChatOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Tooltip title="My Messages" placement="top">
        <IconButton
          onClick={handleChatOpen}
          aria-label="show 11 new notifications"
          color="inherit"
        >
          <Badge badgeContent={7} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        style={{ height: "90vh" }}
      >
        <DialogTitle
          style={{
            position: "sticky",
            top: 0,
            cursor: "move",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            height: "60px",
            width: "600px",
          }}
          id="draggable-dialog-title"
        >
          {" "}
          <CancelIcon
            onClick={handleClose}
            style={{
              cursor: "pointer",
              color: "#fff",
            }}
          />
        </DialogTitle>
        <Message />
      </Dialog>
    </div>
  );
};

export const Profile = ({ photoURL }) => {
  const [open, setOpen] = useState(false);

  const handleChatOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="My Profile" placement="top">
        <IconButton
          edge="end"
          onClick={handleChatOpen}
          aria-label="show 11 new notifications"
          color="inherit"
        >
          <img className="avatar" src={photoURL} alt="" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{
            position: "sticky",
            top: 0,
            cursor: "move",
            background: "#119DA4",
            height: "60px",
            width: "400px",
          }}
          id="draggable-dialog-title"
        >
          {" "}
          <CancelIcon
            onClick={handleClose}
            style={{
              cursor: "pointer",
              color: "#fff",
            }}
          />
        </DialogTitle>

        <div className="" style={{ textAlign: "center" }}>
          <div className="signin">
            <br /> <br />
            <form action="">
              <h3>Settings</h3>
              <br />
              <h3>Profile</h3>
              <br />
              <Button onClick={() => auth.signOut()} variant="outlined">
                Sign out
              </Button>
              <br /> <br />
              <br />
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = useState(0);

  const handleChatOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <IconButton
        onClick={handleChatOpen}
        aria-label="show 11 new notifications"
        color="inherit"
      >
        <Badge badgeContent={count} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        style={{ height: "90vh" }}
      >
        <DialogTitle
          style={{
            position: "sticky",
            top: 0,
            cursor: "move",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            height: "60px",
            width: "600px",
          }}
          id="draggable-dialog-title"
        >
          {" "}
          <CancelIcon
            onClick={handleClose}
            style={{
              cursor: "pointer",
              color: "#fff",
            }}
          />
        </DialogTitle>
        <div className="signin">
          <form action="">
            <h3>Item Detail</h3>

            <br />
            <h3>Buy Now</h3>
            <br />
            <Button variant="primary" onClick={handleCount}>
              Add
            </Button>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
            >
              <Badge badgeContent={count} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </form>
        </div>
      </Dialog>
    </div>
  );
};
