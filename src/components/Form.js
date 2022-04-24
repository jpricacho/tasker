import React, { useRef, useState, useEffect } from 'react'
import TaskList from './TaskList';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
// import '../css/Form.css'

const myTasks = (localStorage.getItem('myTasks')) ? JSON.parse(localStorage.getItem('myTasks')) : [];

const Form = () => {


    const [myTasksList, setTaskList] = useState(myTasks);

    const [dateValue, setDateValue] = useState(new Date());

    const [textValue, setTextValue] = useState('');

    const datePick = (newValue) => {
        setDateValue(newValue);
    };

    const getValue = ((value) => {
        setTextValue(value.target.value);
    });


    const taskRef = useRef();
    const dateRef = useRef();

    const day = dateValue.getDate();
    const month = dateValue.getMonth();
    const year = dateValue.getFullYear();
    const dates = `${month}/${day}/${year}`


    const onFormSubmit = (e) => {
        e.preventDefault();

        let inputId = document.querySelector('#taskInput');

        const taskObj = {
            id: Date.now(),
            task: textValue,
            date: dates
            
        }

        // console.log(dateValue);
    
        setTaskList([...myTasksList, taskObj]);
        // localStorage.setItem('myTasks', JSON.stringify(myTasksList));

        inputId.value = '';
        
        
    
    }
    useEffect(() => {
        localStorage.setItem('myTasks', JSON.stringify(myTasksList));
    }, [myTasksList]);



    return (
        <div className='myForm'>
            <Stack spacing={2}>
                <form>
                    <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    >
                        <TextField id="taskInput" label="Task Name" variant="standard" ref={taskRef} onChange={getValue}/>

                        {/* <input type="text" ref={dateRef}/> */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                            label="Task Date"
                            inputFormat="MM/dd/yyyy"
                            value={dates}
                            onChange={datePick}
                            ref={dateRef}
                            renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <Button onClick={onFormSubmit} variant="contained">Add Task</Button>
                    </Stack>
                </form>
                <br/>
                <TaskList tasks={myTasksList} onDelete={setTaskList}/>
            </Stack>    
        </div>
        
    )
}

export default Form