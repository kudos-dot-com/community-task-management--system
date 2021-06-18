import React,{useState,useEffect} from "react";
import { Container, Button,Fade, Row, Col, Card, CardHeader, CardBody,Modal,ModalBody, ModalHeader,ModalFooter } from "shards-react";
import {useHistory,useLocation} from 'react-router-dom'
import Filter from './Filter/CampusFilter'
import PageTitle from "../components/common/PageTitle";
import { Store } from "../flux";
import '../assets/blog.css'
function Tables ({type , title , users , filter}) {
const [selectCountry,setcountryFilter]=useState("");
const [selectState,setstateFilter]=useState("");
const[pagination,setpagination]=useState(0);
const [open,setopen]=useState(false);
const [deleteitem,additem]=useState([]);
const history=useHistory(); 
const location=useLocation();
const [useindex,setindex]=useState();
useEffect(()=>{
  
  Store.on("change",()=>{
   
    setcountryFilter( Store.filterItems().country!==""?(Store.filterItems()).country:"");
    if(((Store.filterItems()).state!==""))
      {
        setstateFilter(Store.filterItems().state);
      }
      else{
        return
      }
    // console.log(selectCountry.country);
    setpagination(0);
  })
},[])
const setVars=(index)=>{
  setopen(!open);
  setindex(index);
}
const onDeleteLink=(data)=>{
    fetch(`/user/delete`,{
      method:"delete",
      headers:{
        id:data._id
     }
  })
  .then(res=>res.json())
  .then(data=>{
    setopen(!open);
    additem([...deleteitem,data._id]);
    history.push(location.pathname); 
   console.log(data);
  //  animate();
  })
  .catch(err=>{
      console.log(err);
  })
  users.splice(useindex,1);
  setopen(!open);
  } 
 return (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title={title} subtitle="your" className="text-sm-left" />
    </Row>
    {type!=='org'?
       <Filter />:""
    }
   
    {/* Default Light Table */}
    <Row>
      <Col>
        <Card  small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Active Users</h6>
          </CardHeader>
          <CardBody style={{overflowX:"auto"}} className="p-0 pb-3" id="style-2">
            <table  className="table table-striped table-bordered">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" style={{display:type==='task'?'none':'block'}} className="border-0" >
                    Name
                  </th>
                  {filter.map(items=>{
                            return (
                                <>
                                  <th scope="col" className="border-0">{items}</th>
                                </>
                            )
                        })}
                  <th scope="col" className="border-0">
                    {type==="task"?"Action":"Profile"}
                  </th>      
                  <th scope="col" className="border-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {users.length===0?
              <div className="mx-4" >Loading...</div>
               :
                users
                .filter(val =>{ 
                  if(selectCountry==="" && selectState==="")
                  { return val}
                  else
                  if(deleteitem.indexOf(val._id)===-1||
                    (val.state.substring(0,selectState.length)===selectState)
                    && (val.country.substring(0,selectCountry.length)===selectCountry)                            
                     )
                  {return val}
                  })
                .slice(pagination , pagination + 5)
                .map((data,index)=>{
                      // if(deleteitem.indexOf(data._id)===-1)
                      {
                      return (
                            <tr>
                              <td>{index+pagination +1}</td>
                              <td>{data.name}</td>
                              {/* <td>{selectCountry}</td> */}
                                {filter.map(items=>{
                                return (
                                <>
                                {
                                  items==="website"?<td><a href="https://sajal1943@gmail.com" target="_blank">
                                    <button className="btn btn-info text-capitalize">
                                    <i class="fas fa-link" style={{transform:"scale(1.5)"}}></i>
                                      </button></a></td>
                                    :<td >{data[items]}</td>
                                }
                                  
                                </>
                            )
                            })}
                                <td>
                                  <a href={type==="task"?"Edit":`/user/profile/${data.role}/${data._id}`}>
                                  <button className="btn btn-info">
                                  <i class="fas fa-eye" style={{transform:"scale(1.5)"}}></i>  
                                  </button>
                                  </a>
                              </td> 
                              <td>
                               <span className="d-flex">
                               <button onClick={()=>setVars(index)} className="btn btn-danger mr-1 d-block" >
                                <i className="fas fa-trash text-center"></i>
                                </button>
                                <button className="btn btn-info d-block" >
                                <i class="fas fa-edit"></i>
                                </button>
                                </span>
                              </td>
                              <Fade in={open}> 
                               <Modal  open={open} style={{zIndex:"50"}}>
                                  <ModalHeader>Delete Data?</ModalHeader>
                                    <ModalBody className="border-bottom">
                                    <h5>
                                      Are You Sure To Delete This Data ?
                                    </h5>  
                                    </ModalBody>
                                    <ModalFooter>
                                    <span>
                                      <Button  onClick={()=>setopen(!open)} className="btn btn-info mr-1 ">Close</Button>
                                      <Button  onClick={()=>onDeleteLink(data)} className="btn btn-info">Yes</Button>
                                    </span>
                                    </ModalFooter> 
                                    
                                    
                                </Modal></Fade>
                              </tr>
                              );}
                              
                          })
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
);
}
export default Tables;
