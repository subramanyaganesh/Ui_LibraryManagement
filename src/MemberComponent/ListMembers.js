import  React,{useEffect, useState} from 'react';
import { Container } from '@mui/system';
import { Paper,Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';


export default function MemberList() {
    
   
    const paperStyle={padding:'50px 90px', width:600 , margin:'20px auto'}
    const[mem,setMembers]=useState([])
    let navi=useNavigate()
    
// useEffect ensures that the dom is rendered before data is filled into it 
//and a normal function is used when we ensure that the dom is mounterd 
    useEffect(()=>{
            fetch("http://localhost:8089/librarian/getMembers1",{
                headers:{"Content-Type":"application/json",
                          "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"}
      })
      .then((res)=>res.json())
      .then((result)=>setMembers(result))
      },[])
       
     
     const RemoveData=(ids)=>{
      console.log(ids)
        
            fetch(`http://localhost:8089/librarian/deleteMembers/${ids}`,{
               method:"DELETE",
               headers:{"Content-Type":"application/json",
                         "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"}
     })
     .then(()=>{
      navi("/memberslist")
      window.location.reload(false);
     })
       
     }


     const modifyData=()=>{
        console.log("modifying")
     }
  return ( 
        <Container> 
        <h1 style={{color:'green'}}>Members</h1>
        
        <Button alignitems="flex-end" variant="outlined" color="secondary" onClick={()=>{navi("/memberadd")}}>ADD Member</Button>
        
        <Paper elevation={3} style={paperStyle}>  
        {mem.map(member=>(
          <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={member.memberId}>
           <Box display="flex"justifyContent="flex-end" alignitems="flex-end">
            
           <Button variant="outlined" color="success" onClick={modifyData}>Update Member</Button>
           {/* The only gracious way of passing parameters to a function from html is by using the arrow function */}
           <Button  variant="outlined" color="error" onClick={()=> {RemoveData(member.memberId)}}> Delete Member</Button>
           </Box> 
            ID :{member.memberId}<br/>
            FirstName: {member.firstName}<br/>
            LastName: {member.lastName}<br/>
            Email Id: {member.emailId}<br/>
            Address: {member.address}
            </Paper>
        ))
        }
      </Paper>
      </Container>
  );
} 
