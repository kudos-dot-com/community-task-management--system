import React,{useState,useEffect} from "react";
import { Container, Row, Col, FormSelect , Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";

function Tables ({type , title, subtitle , users , filter}) {
  console.log(users);
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')));
  const [role,setrole]=useState(["campus-ambassador","country-ambassador","voulenteer"])
  const [assigned,setassiged]=useState("campus-ambassador");
  const [approve,setapproved]=useState([]);
  const[pagination,setpagination]=useState(0);
  const [task,settask]=useState([]);
  useEffect(()=>{
  if(type==="campus")
  {
    const addedBy=user.addedByOrg?"organisation":user.addedByCountry?"country":"admin";
    fetch(`/tasks/${user.role}-find-task-${addedBy}`,{    
      headers:{
              Authorization:"Bearer "+localStorage.getItem("token")
          }
      })
      .then(response => response.json())
      .then(data =>{
          console.log(data);
          if(data.success)
        {
          settask(data.success);
        }
      })
      .catch(err=>{
          console.log(err);
      })
  }else{
    let getRole=assigned==="campus-ambassador"?'ca':assigned==="country-ambassador"?"country":"voulenteer";
    fetch(`/tasks/get-${getRole}-task-${user.role}`,{    
    headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        if(data.success)
        {
          settask(data.success);
        }
    })
    .catch(err=>{
        console.log(err);
    })
  }
},[assigned])
  const handleSubmit=(buttonId,data)=>{
    // const addedBy=user.role==="organisation"?"organisation":"admin";
    console.log(data);
    setapproved([...approve,buttonId]);
    fetch(`/tasks/${data.role}-update-task-${user.role}`,{
      method:"put",
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
        _id:data._id,  
        points:data.points
      })
  })
  .then(res=>res.json())
  .then(res=>{
      console.log(res);
    // window.location.reload();
  })
  .catch(err=>{
    console.log(err);
  })
  }

  console.log(filter);
  return (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title={title} subtitle={subtitle} className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card style={{overflowX:"scroll"}} small className="mb-4">
          <CardHeader className="border-bottom">
            <Row flush>
              {/* <Col md="2"> */}
              {
                user.role==="admin" || user.role==="organisation" || (user.role==="country-ambassador" && type==="user")?
                <div>
                <label className="ml-3">View Tasks For</label>
                <Col md="4" className="form-group">
                
                  <FormSelect id="feInputState" 
                   onChange={(e)=>setassiged(e.target.value)}
                   >
                    {role.map((data,index)=>{
                 
                    if(user.role!==data){
                      return(
                        <option eventKey="1" key={index} value={data}>{data}</option>
                         );
                    }
               
                 
                     })}
                  </FormSelect>
              </Col></div>
              :
              <h6>View Tasks</h6>
              }
              
            </Row>
           
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table  className="table table-striped table-bordered">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                 {type==='campus'?
                 "":
                  <th scope="col" className="border-0" >
                    Name
                  </th>}
                  {filter.map(items=>{
                            return (
                                <>
                                  <th scope="col" className="border-0">{items}</th>
                                </>
                            )
                        })}
                   <th scope="col" className="border-0">
                    Media
                  </th>
                  <th scope="col" className="border-0">
                    {type==='campus'?"status":"action"}                
                  </th>      
                </tr>
              </thead>
              <tbody>
              {task.length===0?
              <div className="mx-4" >Loading...</div>
               :
                task
                .slice(pagination , pagination + 5)
                .map((data,index)=>{
                        return (
                            <tr>
                              <td>{index+1}</td>
                              {type==='campus'?"":
                                <td scope="col" className="border-0" >
                                 {data.user?data.user.name:data.country?data.country.name:"no name"}
                                </td>
                              }
                                {filter.map(items=>{
                                return (
                                <>
                                {
                                   items==="email"?<td className="text-lowercase">{data.user?data.user.email:data.country?data.country.email:"no name"}</td>
                                    :items==="description"?
                                    <td className="text-center"><a href={`/tasks/description/${user.role}/${data._id}`}>View</a></td>:
                                    <td >{data[items]}</td>
                                }
                                  
                                </>
                            )
                            })}
                                <td>
                                <a href={data.media} target="_blank">
                                  <button className="btn btn-info">
                                  <i class="fas fa-link" style={{transform:"scale(1.5)"}}></i>
                                  </button></a></td>
                                {type==='campus'?                
                                <td>{data.status==='approved'?"Approved":"Pending"}</td>:
                                <td><button id={index} className="btn btn-info" onClick={()=>handleSubmit(index,data)}>
                                    {approve.indexOf(index)!==-1 || data.status==='approved'?"Approved":"Approve"}
                                  </button></td>
                                }
                            </tr>
                              );})
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
