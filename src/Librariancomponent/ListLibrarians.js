import  React,{useEffect, useState} from 'react';
import { Container } from '@mui/system';
import { Paper,Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';


export default function Librarianslist() {
    
   
    const paperStyle={padding:'50px 90px', width:600 , margin:'20px auto'}
    const[lib,setLibrarian]=useState([])
    let navi=useNavigate()
    
// useEffect ensures that the dom is rendered before data is filled into it 
//and a normal function is used when we ensure that the dom is mounterd 
    useEffect(()=>{
            fetch("http://localhost:8089/librarian/getLibrarian1",{
                headers:{"Content-Type":"application/json",
                          "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"}
      })
      .then((res)=>res.json())
      .then((result)=>setLibrarian(result))
      },[])
       
     
     const RemoveData=(ids)=>{
      console.log(ids)
        
            fetch(`http://localhost:8089/librarian/deleteLibrarian/${ids}`,{
               method:"DELETE",
               headers:{"Content-Type":"application/json",
                         "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"}
     })
     .then(()=>{
      navi("/librarianslist")
      window.location.reload(false);
     })
       
     }


     const modifyData=()=>{
        console.log("modifying")
     }
  return ( 
        <Container> 
        <h1 style={{color:'green'}}>Librarians</h1>
        
        <Button alignitems="flex-end" variant="outlined" color="secondary" onClick={()=>{navi("/librarianadd")}}>ADD Librarian</Button>
        
        <Paper elevation={3} style={paperStyle}>  
        {lib.map(librarian=>(
          <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={librarian.librarianId}>
           <Box display="flex"justifyContent="flex-end" alignitems="flex-end">
            
           <Button variant="outlined" color="success" onClick={modifyData}>Update Librarian</Button>
           
           <Button  variant="outlined" color="error" onClick={()=> {RemoveData(librarian.librarianId)}}>Delete Librarian</Button>
           </Box> 
            ID :{librarian.librarianId}<br/>
            FirstName: {librarian.firstName}<br/>
            LastName: {librarian.lastName}<br/>
            Email Id: {librarian.emailId}<br/>
            Address: {librarian.address}
            </Paper>
        ))
        }
      </Paper>
      </Container>
  );
} 
