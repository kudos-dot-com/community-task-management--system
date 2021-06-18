import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Card,CardHeader , CardBody,Container,Col} from 'shards-react'
function DescriptionCard() {
   const {id}=useParams();
   const [des,setdes]=useState();
    useEffect(()=>{
     console.log(id);   
    fetch(`/task/description`,{    
        headers:{
               id:id
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
           setdes(data.success); 
        })
        .catch(err=>{
            console.log(err);
        })
   },[])
    return (
        <div>
            <Container>
                <Col md="12">
            <Card className="mt-5" style={{minHeight:"150px",height:"50vh"}}>
                <CardHeader className="text-center border-bottom">Task Description</CardHeader>
                <CardBody>{des &&des.description?des.description:"Loading..."}</CardBody>
            </Card></Col>
            </Container>
        </div>
    )
}

export default DescriptionCard
