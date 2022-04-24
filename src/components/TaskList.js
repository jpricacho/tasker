import React, { useRef, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const TaskList = ({tasks, onDelete}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [textValue, setTextValue] = useState('');

    const getValue = ((value) => {
        setTextValue(value.target.value);
        // return true
    });

    let newDate = new Date();
    let newTaskName;

    const [dateValue, setDateValue] = useState(newDate);
    const day = dateValue.getDate();
    const month = dateValue.getMonth();
    const year = dateValue.getFullYear();
    const dates = `${month}/${day}/${year}`

    const datePick = (newValue) => {
        setDateValue(newValue);
    };

    const delTask = (event) => {
        const ind = event.target.getAttribute("btns");
        // console.log(ind);
        let newTaskList = [...tasks].filter(delItem);
        function delItem(i) {
            return i.id != ind
        }
        onDelete([...newTaskList]);
    };

    const editTask = (event) => {        
        const ind = event.target.getAttribute("btns");
        const ind2 = event.target.getAttribute("ind");

        let newTaskList = [...tasks].filter(delItem);
        function delItem(i) {
            if (i.id == ind) {
                i.task = newTaskName;
                i.date = dates
            }
            return i
        }
        onDelete([...newTaskList])
        // console.log(newTaskName)
        setOpen(false)

        

    }

    


    // console.log(tasks)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));



    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                    {tasks.map(({id, task, date}, i) => {
                        newDate = date;
                        let inpId = "textInput"
                        // newTaskName = document.querySelector(`#${inpId}`);
                        return (
                            <Grid item xs={4} key={i}>
                                <Item>
                                    <Card variant="outlined" key={i}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Task Number {i+1}
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {task}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                Deadline: {date}
                                            </Typography>
                                            <Button variant="contained" onClick={handleOpen}>Edit</Button>
                                            <Button variant="outlined" onClick={delTask} btns={id} >Delete</Button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                <Typography className="mb-3" id="modal-modal-title" variant="h6" component="h2">
                                                    Edit Task {task}
                                                </Typography>
                                                <TextField className="mb-5" id={inpId} label="New Task Name" variant="standard" onChange={getValue}/>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DesktopDatePicker
                                                    label="New Task Date"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={dateValue}
                                                    onChange={datePick}
                                                    // ref={dateRef}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                <br/>
                                                <Button variant="contained" onClick={editTask} btns={id} ind={i}>Save</Button>
                                                </Box>
                                            </Modal>
                                        </CardContent>
                                    </Card>
                                </Item>
                            </Grid>
                        )
                    })}
            </Grid>
        </Box>
 
        // <Box sx={{ flexGrow: 1 }}>
        //     <Grid container spacing={2}>
        //         <Grid item xs={4}>
        //             <Item>xs=4</Item>
        //         </Grid>
        //         <Grid item xs={4}>
        //             <Item>xs=4</Item>
        //         </Grid>
        //         <Grid item xs={4}>
        //             <Item>xs=4</Item>
        //         </Grid>
        //     </Grid>
        // </Box>

        // <div>
        //     {tasks.map(({id, task, date}) => {
        //         return (
        //             <Card sx={{ minWidth: 275 }} variant="outlined">
        //                 <CardContent>
        //                     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        //                         Task Number {id}
        //                     </Typography>
        //                     <Typography variant="h5" component="div">
        //                         {task}
        //                     </Typography>
        //                     <Typography sx={{ mb: 1.5 }} color="text.secondary">
        //                         Date: {date}
        //                     </Typography>
        //                     {/* <Typography variant="body2">
        //                     well meaning and kindly.
        //                     <br />
        //                     {'"a benevolent smile"'}
        //                     </Typography> */}
        //                 </CardContent>
        //             </Card>
        //         )
        //     })}

        // </div>
        // <table className="table table-striped">
        //     <thead>
        //         <th>Items</th>
        //     </thead>
        //     <tbody>
        //         {tasks.map(({id, task, date}, i) => {
        //             return (
        //                 <tr>
        //                     <td>{task}</td>
        //                 </tr>
        //             )
        //         })}
        //     </tbody>
        // </table>
  

    )
}

export default TaskList