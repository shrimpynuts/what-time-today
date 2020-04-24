import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from "react-redux";
import { toggleCalendar } from '../../redux/actions';

export default function SingleCalendar (props) {

    const dispatch = useDispatch();

    const style={
        borderRadius: '5px',
        textAlign: 'left',
        cursor: 'pointer',
    }
    
    return (
        <div key={props.i}
            style={style} 
              value={props.calendar}
              onClick={(e) => dispatch(toggleCalendar(props.calendar))}>

            <Checkbox key={props.i} checked={props.calendar.visible} style={{color: props.calendar.color}}/>
            {props.calendar.summary}
        </div>      
    )
}