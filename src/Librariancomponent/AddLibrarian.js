import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Paper,Button } from '@mui/material';
import "../Document.css"
import { useNavigate } from 'react-router-dom';

export default function Librarian() {
    const paperStyle={padding:'50px 90px', width:250 , margin:'20px auto'}
    const[address,setaddress]=useState('')
    const[firstName,setfirstName]=useState('')
    const[lastName,setlastName]=useState('')
    const[emailId,setemailId]=useState('')
    const[password,setpassword ]=useState('')
    let navi=useNavigate()

    const handelClick=(e)=>{
        e.preventDefault()
        const librarian={address,firstName,lastName,emailId,password}
        console.log(librarian)
        // fetch is an AJAX library
        fetch("http://localhost:8089/librarian/postLibrarian",{
          method:"POST",
          headers:{"Content-Type":"application/json",
                    "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"},
          body:JSON.stringify(librarian)
    }).then(()=>{
        console.log("New Librarian Added")
        navi("/librarianslist")
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
            <h1 style={{color:'blue'}}><u>Add Librarian</u></h1>
            
      <TextField id="outlined-basic" label="Address" variant="outlined" value={address} onChange={e=>setaddress(e.target.value)} className="paddings"/>
      <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={e=>setfirstName(e.target.value)} className="paddings"/>
      <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={e=>setlastName(e.target.value)} className="paddings"/>
      <TextField id="outlined-basic" label="Email Id " variant="outlined" value={emailId} onChange={e=>setemailId(e.target.value)} className="paddings"/>
      <TextField id="outlined-basic" label="Password " variant="outlined" value={password} onChange={e=>setpassword(e.target.value)} className="paddings"/>
      <Button color="secondary" onClick={handelClick }>Submit</Button>
      </Paper>
      </Container>  
       </Box>
  ); 
} 

