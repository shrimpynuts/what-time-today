import React from "react";
import Checkbox from '@material-ui/core/Checkbox';

export default function SingleCalendar (props) {
    // console.log(props.calendar.summary, props.calendar.visible)
    const style={
        borderRadius: '5px',
        textAlign: 'left',
        cursor: 'pointer',
    }
    
    return (
        <div key={props.i}
            style={style} 
              value={props.calendar}
              onClick={(e) => props.toggleCalendar(props.i)}>

            <Checkbox checked={props.calendar.visible} style={{color: props.calendar.color}}/>
            {props.calendar.summary}
        </div>      
    )
}