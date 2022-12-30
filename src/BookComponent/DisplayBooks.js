import  React,{useEffect, useState} from 'react';
import { Container } from '@mui/system';
import { Paper,Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';


export default function DisplayBooks() {
    
   const[mbookList,setmbooList]=useState([])
    const paperStyle={padding:'50px 90px', width:600 , margin:'20px auto'}
    let navi=useNavigate()

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    }));
// useEffect ensures that the dom is rendered before data is filled into it 
//and a normal function is used when we ensure that the dom is mounterd 
    useEffect(()=>{
            fetch("http://localhost:8089/getBooks1",{
                headers:{"Content-Type":"application/json",
                          "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"}
      })
      .then((res)=>res.json())
      .then((result)=>{setmbooList(result)
      console.log(result)}
      )
      },[])
       
     
     const RemoveData=(ids)=>{
      console.log(ids)
        
            fetch(`http://localhost:8089/librarian/deleteBookBy/${ids}`,{
               method:"DELETE",
               headers:{"Content-Type":"application/json",
                         "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu"}
     })
     .then(()=>{
      navi("/booklist")
      window.location.reload(false);
     })
       
     }


     const modifyData=()=>{
        console.log("modifying")
     }
  return ( 
        <Container> 
        <h1 style={{color:'green'}}>Books</h1>
        
        <Button alignitems="flex-end" variant="outlined" color="secondary" onClick={()=>{navi("/addBook")}}>ADD Book</Button>
        
        <Paper elevation={3} style={paperStyle}>  
     
        {mbookList.map(book=>(
          <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={book.document_id}>
           <Box display="flex"justifyContent="flex-end" alignitems="flex-end">
            
           <Button variant="outlined" color="success" onClick={modifyData}>Update Book</Button>
           
           <Button  variant="outlined" color="error" onClick={()=> {RemoveData(book.document_id)}}>Delete Book</Button>
           </Box> 
            Document ID :{book.document_id}<br/>
            Title: {book.title}<br/>
            Edition: {book.edition}<br/>
            Year: {book.year}<br/>
            Copy Number: {book.copyNumber}<br/>
            
            Location: <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Item>Level={book.location.level}</Item>
                        </Grid>
                        <Grid item xs={4}>
                          <Item>Room Number={book.location.roomNumber}</Item>
                        </Grid>
                        <Grid item xs={4}>
                          <Item>Shelf Number={book.location.shelfNumber}</Item>
                        </Grid>
                      </Grid>
            
            </Paper>
        ))
        }
      </Paper>
      </Container>
  );
} 
