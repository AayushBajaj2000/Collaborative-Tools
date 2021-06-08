import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Video from "twilio-video";
import { useStateValue } from "../../StateProvider";
import Room from "./Room";
import { v4 as uuidv4 } from "uuid";

const VideoChat = () => {
  let { roomID } = useParams();
  const [{ user }, dispatch] = useStateValue();
  const [roomName, setRoomName] = useState(roomID);
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const handleSubmit = useCallback(async () => {
    setConnecting(true);
    const userName = uuidv4();
    const data = await fetch(
      "https://videochat-twilio-backend.herokuapp.com/video/token",
      {
        method: "POST",
        body: JSON.stringify({
          identity: userName,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
    Video.connect(data.token, {
      name: roomName,
    })
      .then((room) => {
        setConnecting(false);
        setRoom(room);
      })
      .catch((err) => {
        console.error(err);
        setConnecting(false);
      });
  }, [roomName]);

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "Add_videoChat",
      item: handleSubmit,
    });
    // Prompting the user to enter their name when they enter the room
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;

  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleLogout={handleLogout} />
    );
  } else {
    render = <div></div>;
  }
  return render;
};

export default VideoChat;
