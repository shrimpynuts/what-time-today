import { addAvailability, removeAvailability } from "../../redux/actions";

// When you select an availability event delete it
export function onSelectEvent(event, dispatch) {
  if (event.availability) {
    dispatch(removeAvailability(event));
  } else {
    console.log("Selected event that is not availability, cannot delete");
  }
}

// When you select an available slot, create the availability, add it to availabilities
// Also add the availability to the output for the parent component
export function onSelectAvailableSlot(dispatch, slotInfo) {
  const newAvailability = {
    title: "Availability 👌 (click to delete)",
    start: slotInfo.start,
    end: slotInfo.end,
    hexColor: "#464646",
    visible: true,
    availability: true,
  };
  dispatch(addAvailability(newAvailability));
}

// Gets the style for each event rendered
export function eventStyleGetter(event, start, end, isSelected) {
  const cursor = event.availability ? "pointer" : "auto";
  const backgroundColor = event.hexColor;
  const style = {
    backgroundColor: backgroundColor,
    borderRadius: "5px",
    opacity: 1,
    color: "white",
    display: "block",
    cursor: cursor,
    visible: false,
  };
  return {
    style: style,
  };
}
