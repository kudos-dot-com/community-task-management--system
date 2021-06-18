import React,{useState,useEffect,useRef} from "react";
import { Container, Fade , Button, Modal,   ModalBody, ModalHeader, Row, Col, Card, CardHeader, CardBody, FormInput } from "shards-react";
import lottie from 'lottie-web'
import PageTitle from "../components/common/PageTitle";
import Img from '../images/icons8-tick-box-min.gif'
function Tables ({type , user , title , users , filter}) {
const [userdata,setuserdata]=useState(JSON.parse(localStorage.getItem('user')));
const [open,setopen]=useState(false);
const [link,setlink]=useState("");
const [anim,setanim]=useState(false);
const [nextAnim,setAnimNext]=useState(false);
const [submissiondata,setSubmissiondata]=useState({})
const[pagination,setpagination]=useState(0);
const container=useRef(null);

useEffect(()=>{
  lottie.loadAnimation({

    container:container.current,
    renderer:'svg',
    loop:true,
    autoplay:true,
    animationData:require('../utils/47978-gv-thumbsup.json')
  }) 
},[])
const animate=()=>{
  // the next animation will play for 3 seconds
  setAnimNext(!nextAnim);
  lottie.play(container.current);
    
  const timer = setTimeout(() => {
    lottie.pause(container.current);
    setAnimNext(false);
    setanim(false);  
  }, 3600);

  
} 
const onDeleteLink=(data)=>{
//   fetch(`/user/delete}`,{
//     method:"delete",
//     headers:{
//       id:id
//    }
// })
// .then(res=>res.json())
// .then(data=>{
//  console.log(data);
//  animate();
// })
// .catch(err=>{
//     console.log(err);
// })
console.log(data);
} 
const onSubmitLink=(data)=>{
//  console.log(addedBy);
      setanim(!anim)
      const addedBy=userdata.addedByOrg?"organisation":userdata.addedByCountry?"country":"admin";
      const country="country"
       setopen(!open)
        
        fetch(`/tasks/${userdata.role}-add-task-${addedBy}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+localStorage.getItem("token")

            },
            body:JSON.stringify({
                title:data.title,
                description:data.description,
                points:data.points,
                media:link,
            })
        })
        .then(res=>res.json())
        .then(data=>{
         console.log(data);
         animate();
        })
        .catch(err=>{
            console.log(err);
        })
}
const setParams=(data)=>{
  // console.log(data);
  setopen(!open);
  setSubmissiondata(data);
}


return (
  <div>
    {/* animation code */}
    <div className="shadow rounded" style={{borderRadius:"20%",border:"1px solid transparent",display:anim?'block':'none',position:"absolute",top:"50%",left:'50%',transform:"translate(-50%,-50%)",height:"250px",width:"250px",zIndex:"100",background:"#fff"}}>
  
    <div style={{display:nextAnim?"none":"block"}}>
      <div style={{position:'absolute',top:"50%",left:'50%',transform:"translate(-50%,-50%)"}}>
      <i class="fas fa-spinner fa-pulse " style={{fontSize:"50px"}}></i>
      </div>
      <div style={{position:'absolute',top:"80%",left:'0%',transform:"translate(0%,-50%)",textAlign:'center',margin:'auto'}}>
      <h6 className="pl-5 pt-1">Submitting Your Task</h6>
      </div>
     </div>
    <div style={{display:nextAnim?"block":"none"}}>
    <h5 className="text-center capitalize p-1">Your Task Has Been Submitted</h5>
      <div style={{zIndex:"100",position:'absolute',bottom:"0%"}} className="container" ref={container}></div>
    </div>
      </div>
      {/* main body code  */}
  <Container fluid className="main-content-container px-4" style={{zIndex:"1"}}>

    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title={title} subtitle="your" className="text-sm-left" />
    </Row>
   
    {/* Default Light Table */}
    <Row>
      <Col>
        <Card style={{overflowX:"scroll"}} small className="mb-4 ">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Tasks</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table  className="table table-striped table-bordered uppercase">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  {user==='campus'?<th scope="col" className="border-0">"Posted By"</th>:""}
                  {filter.map(items=>{
                            return (
                                <>
                                  <th scope="col" className="border-0">{items}</th>
                                </>
                            )
                        })}
                  {type==="task"?
                  <th scope="col" className="border-0">Media Link</th>:""
                }
                  <th scope="col" className="border-0">
                    {type==="task"?"Action":"Visit"}
                  </th>      
                </tr>
              </thead>
              <tbody>
              {users.length===0?
              <div className="mx-4" >Loading...</div>
               :
                users.slice(pagination , pagination + 5).map((data,index)=>{
                        return (
                            <tr>
                              <td>{index+pagination +1}</td>
                              {user==='campus'?<td>{data.role}</td>:""}
                                {filter.map(items=>{
                                return (
                                <>
                                {
                                  items==="website" || items==="email"?<td><a href="https://sajal1943@gmail.com" target="_blank">
                                    <button className="btn btn-info text-capitalize">{items}</button></a></td>
                                    :items==="description"?
                                    <td className="text-center"><a href={`/tasks/description/${userdata.role}/${data._id}`}>View</a></td>:
                                    <td >{data[items]}</td>
                                }
                                  
                                </>
                            )
                            })}
                             {type==="task"?
                             data.taskmedia==="NA"?                             
                             <td scope="col" className="border-0">{data.taskmedia}</td>:
                               <td scope="col" className="border-0">
                                 <a href={data.taskmedia} target="_blank" className="btn btn-info"><Button>Visit</Button></a></td>:""
                               }
                            {user==="campus"?
                                <td>
                                <Button  
                                onClick={()=>setParams(data)} 
                                className="btn btn-info">Submit</Button>
                               <Fade in={open}> 
                               <Modal  open={open} style={{zIndex:"50"}}>
                                  <ModalHeader>Submit Media Link</ModalHeader>
                                    <ModalBody>
                                    <FormInput 
                                    onChange={(e)=>setlink(e.target.value)}
                                     placeholder="Enter Media Link"
                                     className="mb-3"
                                     />
                                   
                                    <span>
                                    <Button  onClick={()=>setopen(!open)} className="btn btn-info mr-1 ">Close</Button>
                                    <Button  onClick={()=>onSubmitLink(submissiondata)} className="btn btn-info">Submit</Button>
                                    </span>
                                     
                                     </ModalBody>
                                    
                                </Modal></Fade>
                              </td>:
                               <td>
                                <span className="d-flex">
                               <button className="btn btn-danger mr-1 d-block" >
                                <i className="fas fa-trash text-center"></i>
                                </button>
                                <button className="btn btn-info d-block" >
                                <i class="fas fa-edit"></i>
                                </button>
                                 </span></td>
                            }
                              </tr>
                              );}
                              
                  )
                }
                </tbody>
            </table>
            
          </CardBody>
          {users.length===0?"":
         <Container><Col>
        <div className="d-flex justify-content-between mt-2">
         
         <div className="d-block">showing {pagination/5} of {Math.ceil(users.length/5)} results</div>
         <div className="d-block"> 
          <nav aria-label="Page navigation example">
                  <ul className="pagination">
                  <li className="page-item"  style={{cursor:"pointer"}}
                   onClick={()=>setpagination((pagination-5)<0?pagination:((pagination/5)-1)*5)}>
                     <a className="page-link">
                      Previous
                     </a>
                  </li>
                  <li className="px-1" >
                  <a className="page-link">
                  {pagination/5}
                     </a>
                 
                  </li>
                 
                <li className="page-item "
                 style={{cursor:"pointer"}}
                 onClick={()=>setpagination((pagination+5)<users.length?((pagination/5)+1)*5:pagination)}>
                  <a className="page-link" >
                     Next
                  </a>
                </li>

              </ul>

              </nav></div>
             </div></Col>  </Container>}
        </Card>
      </Col>
    </Row>
  </Container>
  </div>
);
}
export default Tables;
