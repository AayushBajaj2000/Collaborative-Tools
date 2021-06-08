import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

const Participant = ({ participant, logout, user }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [mute, setMute] = useState(false);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className="participant" style={{ height: "170px" }}>
      <div className="video__container">
        <video ref={videoRef} autoPlay={true} />
        <audio ref={audioRef} autoPlay={true} muted={mute} />
        <div className="video__bar">
          {user !== "local" ? (
            <Button
              className="video__button"
              onClick={() => {
                mute ? setMute(false) : setMute(true);
              }}
            >
              {mute ? <MicOffIcon></MicOffIcon> : <MicIcon></MicIcon>}
            </Button>
          ) : (
            <div></div>
          )}

          {user === "local" ? (
            <Button color="secondary" onClick={logout}>
              Leave Chat
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Participant;
