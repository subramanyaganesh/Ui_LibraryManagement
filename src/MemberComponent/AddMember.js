import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Paper, Button } from '@mui/material';
import "../Document.css"
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Member() {

    const paperStyle = { padding: '50px 90px', width: 250, margin: '20px auto' }
    const [address, setaddress] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [emailId, setemailId] = useState('')
    const [password, setpassword] = useState('')
    const [librarian, setLibrarian] = useState({})
    let navi = useNavigate()
    const [libObject, setLibObject] = useState('')
    const [librarianList, setLibrarianList] = useState([]);
    

    useEffect(() => {
        fetch("http://localhost:8089/librarian/getAllLibrarianEmail", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setLibrarianList(result)
            })
    }, []);

    const handelClick = (e) => {
        e.preventDefault() //It will make sure that the default behaviour is not maintained but the behaviour that you want is maintained

        const member = { address, firstName, lastName, emailId, password, librarian }
        console.log(member)

        // fetch is an AJAX library
        fetch("http://localhost:8089/librarian/postMember", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"
            },
            body: JSON.stringify(member)
        }).then(() => {
            console.log(libObject)
            console.log("New Member Added")
            navi("/memberslist")
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
                    <h1 style={{ color: 'blue' }}><u>Add Member</u></h1>

                    <TextField id="outlined-basic" label="Address" variant="outlined" value={address} onChange={e => setaddress(e.target.value)} className="paddings" />
                    <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={e => setfirstName(e.target.value)} className="paddings" />
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={e => setlastName(e.target.value)} className="paddings" />
                    <TextField id="outlined-basic" label="Email Id " variant="outlined" value={emailId} onChange={e => setemailId(e.target.value)} className="paddings" />
                    <TextField id="outlined-basic" label="Password " variant="outlined" value={password} onChange={e => setpassword(e.target.value)} className="paddings" />
                    
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl style={{ minWidth: 200 }}>
                            <InputLabel>Librarian</InputLabel>
                            <Select
                                value={libObject}
                                onChange={(e) => {
                                    setLibrarian({ emailId: e.target.value })
                                    setLibObject(e.target.value)
                                }
                                }
                            >
                                {librarianList.map((email) =>
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

