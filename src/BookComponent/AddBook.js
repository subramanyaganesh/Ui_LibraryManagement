import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Paper, Button } from '@mui/material';
import "../Document.css"
//import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Book() {

    const paperStyle = { padding: '50px 90px', width: 250, margin: '20px auto' }
    const [title, settitle] = useState('')
    const [edition, setedition] = useState('')
    const [year, setyear] = useState('')
    const [copyNumber, setcopyNumber] = useState('')
    // const [authorSet, setauthorSet] = useState([])
    
    // const [locationObject, setlocationObject] = useState({})
    // const [locationList, setlocationList] = useState([]);
    // const [locationSelected, setlocationSelected] = useState('')
    
    const [publisherSelected, setpublisherSelected] = useState('')
    const [publisherList, setpublisherList] = useState([]);
    const [publisherObject, setpublisherObject] = useState({})

    //let navi = useNavigate()
    useEffect(() => {
        fetch("http://localhost:8089/getPublishersEmail", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setpublisherList(result)
            })

          fetch("http://localhost:8089/getPublishersEmail", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setpublisherList(result)
            })  
    }, []);

    const handelClick = (e) => {
        e.preventDefault() //It will make sure that the default behaviour is not maintained but the behaviour that you want is maintained

        const book = {  title, edition, year, copyNumber, publisher: publisherObject }
        console.log(book)

        // fetch is an AJAX library
        fetch("http://localhost:8089/librarian/addBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"
            },
            body: JSON.stringify(book)
        }).then(() => {
            console.log(publisherSelected)
            console.log("New Book Added")
           // navi("/booklist")
        })
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)  ': { m: 1 }
            }}
            noValidate
            autoComplete="off"
        >
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1 style={{ color: 'blue' }}><u>Add Book</u></h1>

                    <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={e => settitle(e.target.value)} className="paddings" />
                    <TextField id="outlined-basic" label="Edition" variant="outlined" value={edition} onChange={e => setedition(e.target.value)} className="paddings" />
                    <TextField id="outlined-basic" label="Year" variant="outlined" value={year} onChange={e => setyear(e.target.value)} className="paddings" />
                    <TextField id="outlined-basic" label="Copy Number" variant="outlined" value={copyNumber} onChange={e => setcopyNumber(e.target.value)} className="paddings" />

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl style={{ minWidth: 200 }}>
                            <InputLabel>Publisher</InputLabel>
                            <Select
                                value={publisherSelected}
                                onChange={(e) => {
                                    setpublisherSelected(e.target.value)
                                    setpublisherObject({ emailId: e.target.value } )
                                }
                                }
                            >
                                {publisherList.map((email) =>
                                    <MenuItem key={email} value={email}>
                                        {email}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Box>

                    <Button color="secondary" onClick={handelClick}>Submit</Button>
                </Paper>
            </Container>
        </Box>
    );
}

