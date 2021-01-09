import React, { useEffect, useState } from "react";

//Importing different components from the materialUI library
import { Avatar, Button, Tooltip } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

//Importing other custom components that we made incuding the stateprovider
import ChatWidget from "./ChatWidget";
import { useStateValue } from "../../StateProvider";

// The right part of the page which has the chat and the avatars which show who is in the room

function RightApp() {
    // Used to handle the show and hide for the right side
    const [show, setShow] = useState(false);
    // Getting the values of the document and the user from the stateprovider
    const [{ doc, user }] = useStateValue();
    // Used to keep track of the users in the room
    const [users, setUsers] = useState();

    useEffect(() => {
        if (Object.keys(doc).length !== 0) {
          const peopleArray = doc.getArray("people");
          peopleArray.push([`${user}`]);
          console.log(peopleArray);
          setUsers(peopleArray.toArray());
          peopleArray.observe((event) => {
            setUsers(peopleArray.toArray());
            console.log(peopleArray.toArray());
          });
        }
      }, [doc,user]);

    return (
        <div className={`rightApp ${show ? "" : "rightApp-none"}`}>
        <div className="rightApp__topRow">
          <Tooltip title="Open Chat">
            <Button
              onClick={() => {
                if (show === true) {
                  setShow(false);
                } else {
                  setShow(true);
                }
              }}
            >
              {show ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
            </Button>
          </Tooltip>
          <div className={`${show ? "" : "rightApp-none"}`}>
            {/* Used for showing the people in the room using MaterialUI components*/}
            <AvatarGroup style={{ display: `${show ? "" : "none"}` }} max={4}>
              {users
                ? users.map((user) =>
                    user !== "null" ? (
                      <Tooltip title={`${user}`}>
                        <Avatar alt={user}>{user[0].toUpperCase()}</Avatar>
                      </Tooltip>
                    ) : null
                  )
                : null}
            </AvatarGroup>
          </div>
        </div>
        <div className={show ? "rightApp__text-show" : "rightApp__none"}>
          {/* Chat component */}
          <ChatWidget />
        </div>
      </div>
    )
}

export default RightApp
