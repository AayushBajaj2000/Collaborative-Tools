import { Button, Popover, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useStateValue } from "../../../StateProvider";

function Popover_video() {
  const [{ handleVideo }, dispatch] = useStateValue();

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
  const handleSubmit = () => {
    // Adding the video
    handleVideo();
    handleClose();
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
        Connect Video
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Connect to video chat
          </Button>
        </div>
      </Popover>
    </div>
  );
}

export default Popover_video;
