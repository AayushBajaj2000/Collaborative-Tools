import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";

// importing the StateProvider which contains all the states in our app and the roomID generator library
import { v4 as uuidv4 } from 'uuid'
import { useStateValue } from "./StateProvider";

function Redirect() {
    
    const [dispatch] = useStateValue();
    let history = useHistory();

    useEffect(() => {
        // Generating a random roomID
        let roomId = uuidv4();
        
        // Adding the roomID to the state so that we can use it in any component
        dispatch({
            type: "Add_RoomID",
            item: roomId
          });
        
        // Changing the url which includes the roomID so that they can join the room
        history.push(`./${roomId}`);
    }, [history,dispatch])

    return (
        <div>        
        </div>
    )
}

export default Redirect
