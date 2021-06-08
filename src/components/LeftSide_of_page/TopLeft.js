import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";

//importing all the css files used for styling
import "../../css/App.css";
import "../../css/Editor.css";
import "../../css/Select.css";

//importing components from matrial ui for general components
import Select from "@material-ui/core/Select";
import { MenuItem, Popover, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

//Importing main components from libraries
import * as Y from "yjs";
import { CodemirrorBinding } from "y-codemirror";
import { WebsocketProvider } from "y-websocket";

import { useStateValue } from "../../StateProvider";
import Popover_InviteLink from "./individual_components/Popover_InviteLink";
import Popover_video from "./individual_components/Popover_video";

//Codemirror component
var CodeMiror = require("react-codemirror");

// The modes that we need for codemirror or the code editor
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/xml/xml");
require("codemirror/mode/css/css");
require("codemirror/mode/go/go");
require("codemirror/mode/jsx/jsx");
require("codemirror/mode/php/php");
require("codemirror/mode/python/python");
require("codemirror/mode/ruby/ruby");

//The themes for the code editor
require("codemirror/theme/blackboard.css");
require("codemirror/theme/night.css");
require("codemirror/theme/dracula.css");
require("codemirror/theme/cobalt.css");
require("codemirror/theme/lucario.css");
require("codemirror/theme/night.css");
require("codemirror/theme/oceanic-next.css");
require("codemirror/theme/rubyblue.css");
require("codemirror/theme/monokai.css");
require("codemirror/theme/midnight.css");

function TopLeft() {
  //Used for storing the value of the code in the editor
  const [code, setCode] = useState("");
  //Used for storing the mode of the editor by default it is javascript
  const [mode, setMode] = useState("javascript");
  //Used for storing the theme of the editor by default it is blackboard
  const [theme, setTheme] = useState("blackboard");
  //Used for storing the fontSize of the editor by default it is 14px
  const [fontSize, setFontSize] = useState("CodeMirror-font-14");
  //This is used for the invide link popover for opening and closing it
  const [anchorEl, setAnchorEl] = useState(null);
  //Getting the roomID from stateprovider
  const [{ RoomID, doc, user }, dispatch] = useStateValue();

  let history = useHistory();
  let { roomID } = useParams();

  // Options for the code editor (codemirror)
  var options = {
    lineNumbers: true,
    mode: mode,
    theme: theme,
  };

  useEffect(() => {
    if (Object.keys(doc).length == 0) {
      console.log("YES");
      // New Yjs document which is used to do all the collaborative editing stuff
      const ydoc = new Y.Doc();

      // Provider for the websocketprovider which is used to set the rooms
      const provider = new WebsocketProvider(
        "wss://demos.yjs.dev",
        `${roomID}`,
        ydoc
      );

      // Adding the document to the stateprovider
      dispatch({
        type: "Add_Doc",
        item: ydoc,
      });

      // Getting the text or code in the code editor component
      const yText = ydoc.getText("codemirror");

      //Binding the codemirror editor with the Yjs websocketprovider, used to do the collaborative editing
      const binding = new CodemirrorBinding(
        yText,
        document.querySelector(".CodeMirror").CodeMirror,
        provider.awareness
      );

      user
        ? binding.awareness.setLocalStateField("user", { name: `${user}` })
        : binding.awareness.setLocalStateField("user", { name: "Aayush" });

      // Button which is used to disconnect or connect back to the room
      const connectBtn = /** @type {HTMLElement} */ (
        document.getElementById("y-connect-btn")
      );

      // Handling the click event for the connect or disconnect button
      connectBtn.addEventListener("click", () => {
        if (provider.shouldConnect) {
          provider.disconnect();
          connectBtn.textContent = "Connect";
        } else {
          provider.connect();
          connectBtn.textContent = "Disconnect";
        }
      });

      // @ts-ignore
      window.example = { provider, ydoc, yText, binding, Y };
    }
  }, []);

  return (
    <div className="app__TopLeft">
      <div className="app__bar">
        {/* Dropdown used to select the language mode for the code editor*/}
        <Select
          placeholder="Language"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <MenuItem value={"javascript"}>Javascript</MenuItem>
          <MenuItem value={"python"}>Python</MenuItem>
          <MenuItem value={"php"}>Php</MenuItem>
          <MenuItem value={"ruby"}>Ruby</MenuItem>
          <MenuItem value={"go"}>Go</MenuItem>
          <MenuItem value={"jsx"}>Jsx</MenuItem>
        </Select>
        {/* Dropdown used to select the theme for the code editor*/}
        <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <MenuItem value={"blackboard"}>Blackboard</MenuItem>
          <MenuItem value={"night"}>Night</MenuItem>
          <MenuItem value={"monokai"}>Monokai</MenuItem>
          <MenuItem value={"oceanic-next"}>Oceanic Next</MenuItem>
          <MenuItem value={"midnight"}>Midnight</MenuItem>
          <MenuItem value={"lucario"}>Lucario</MenuItem>
          <MenuItem value={"cobalt"}>Cobalt</MenuItem>
          <MenuItem value={"rubyblue"}>Ruby Blue</MenuItem>
        </Select>
        {/* Dropdown used to select the font size for the code editor*/}
        <Select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <MenuItem value={"CodeMirror-font-12"}>12px</MenuItem>
          <MenuItem value={"CodeMirror-font-13"}>13px</MenuItem>
          <MenuItem value={"CodeMirror-font-14"}>14px</MenuItem>
          <MenuItem value={"CodeMirror-font-15"}>15px</MenuItem>
          <MenuItem value={"CodeMirror-font-16"}>16px</MenuItem>
          <MenuItem value={"CodeMirror-font-17"}>17px</MenuItem>
          <MenuItem value={"CodeMirror-font-18"}>18px</MenuItem>
        </Select>
        {/* Button used to connect and disconnect to the room*/}
        <Button
          className=""
          id="y-connect-btn"
          variant="contained"
          color="primary"
        >
          Disconnect
        </Button>
        <Popover_InviteLink />
        <Popover_video />
      </div>
      {/*The main code editor component*/}
      <CodeMiror
        id="editor"
        className={fontSize}
        value={code}
        onChange={(e) => setCode(e)}
        options={options}
      />
    </div>
  );
}

export default TopLeft;
