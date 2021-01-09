import React, { useEffect, useState } from "react";

// Importing the components and icons from materialUI
import { Button, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import { useStateValue } from "../../StateProvider";

// The main chatwidget
function ChatWidget() {
    // Getting the values from the stateprovider
    const [{ doc, user }] = useStateValue();
    // Used to keep track of the input that the user inputs in the chat window
    const [input, setInput] = useState("");
    // Array used to store all the messages
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
        if (Object.keys(doc).length !== 0) {
          // Getting the array for the messages which is the same for all users as it is connected to the document
          const yarray = doc.getArray("messages");
    
          // Observe changes of the messages in each document
          yarray.observe((event) => {
            // Print updates when the data changes
            setMessages(yarray.toArray());
            // Whenever a new message is added scroll to the bottom of the messages
            let index = yarray.length;
            document
              .getElementsByClassName("show__message")
              [index - 1].scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          });
    
          // Adding a click event listener on the send button
          const btn = document.getElementById("send");
          btn.addEventListener("click", () => {
            const message = document.getElementById("messageToSend").value;
            //Push to each documents which has the yarray
            yarray.push([
              {
                name: user,
                message: `${message}`,
                time: new Date().toLocaleTimeString(),
              },
            ]);
            //Reset the message after they hit send
            setInput("");
          });
        }
      }, [doc,user]);
    return (
        <div className="chatWidget">
        <div className="chat__show">
          <div class="fix"></div>
          {/* Iterating over all the messages and displaying them */}
          {messages.map((message) => (
            <div
              className={`${
                message.name === user ? "chat__show-end" : "chat__show-start"
              }`}
            >
              <p className="show__name">
                {message.name === user ? "You" : message.name} : {message.time}
              </p>
              <p className="show__message">{message.message}</p>
            </div>
          ))}
        </div>
        <form noValidate autoComplete="off">
          <div className="chat__input">
            {/* Used to get the input from the users */}
            <TextField
              id="messageToSend"
              multiline
              placeholder="Write here..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Button id="send" disabled={input === "" ? true : false}>
              <SendIcon />
            </Button>
          </div>
        </form>
      </div>
    )
}

export default ChatWidget
