import { Button, Popover, TextField } from "@material-ui/core";
import React, { useState } from "react";

function Popover_InviteLink() {
  //This is used for the invide link popover for opening and closing it
  const [anchorEl, setAnchorEl] = useState(null);

  // Used for handling the click event on the invite link
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //Used for closing the invite link popover when done
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Used for copying the invite link on the click of the copy button
  const handleCopy = () => {
    var text = document.getElementById("inputText");

    text.select();
    text.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {/* Button for the invite link*/}
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ marginLeft: "10px" }}
      >
        Invite Link
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="app__roomLink">
          <TextField
            id="inputText"
            variant="outlined"
            value={window.location.href}
            readOnly={true}
          />
          <Button variant="contained" color="primary" onClick={handleCopy}>
            Copy
          </Button>
        </div>
      </Popover>
    </div>
  );
}

export default Popover_InviteLink;
