// InitialState which is the initialState for all the components
export const initialState = {
  doc: {},
  RoomID: {},
  user: null,
  handleVideo: "",
};

// with this we can change the state in the whole document and this information can be accessed by any component
const reducer = (state, action) => {
  switch (action.type) {
    case "Add_Doc":
      return {
        ...state,
        doc: action.item,
      };
    case "Add_RoomID":
      return {
        ...state,
        RoomID: action.item,
      };
    case "Add_User":
      return {
        ...state,
        user: action.item,
      };
    case "Add_videoChat":
      return {
        ...state,
        handleVideo: action.item,
      };
    default:
      return state;
  }
};

export default reducer;
