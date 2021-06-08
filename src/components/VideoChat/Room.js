import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import Participant from "./Paticipant";

const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant
      key={participant.sid}
      participant={participant}
      user={"remote"}
    />
  ));

  return (
    <>
      <Draggable bounds="body" grid={[25, 25]}>
        <div className="local-participant">
          {room ? (
            <>
              <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
                logout={handleLogout}
                user={"local"}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </Draggable>
      <Draggable bounds="body" grid={[25, 25]}>
        <div className="remote-participants">{remoteParticipants}</div>
      </Draggable>
    </>
  );
};

export default Room;
