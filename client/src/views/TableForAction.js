import React,{useState} from "react";
import { Container, Fade , Button, Modal,   ModalBody, ModalHeader, Row, Col, Card, CardHeader, CardBody, FormInput } from "shards-react";
import {Link} from "react-router-dom"
import PageTitle from "../components/common/PageTitle";

function Tables ({type , user , title , users , filter, enroll}) {

const [userdata,setuserdata]=useState(JSON.parse(localStorage.getItem('user')));
const [open,setopen]=useState(false);
const [link,setlink]=useState("");
const [submissiondata,setSubmissiondata]=useState({})
const [approve,setapproved]=useState([]);
const ApproveAction=(_id)=>{
  setapproved([...approve,_id]);
  fetch(`/api/blog/ApproveAction`,{
    method:"put",
    headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+localStorage.getItem("token")
    },
    body:JSON.stringify({
      postId:_id
    })
})
.then(res=>res.json())
.then(data=>{
 console.log(data);
})
.catch(err=>{
    console.log(err);
})}

return (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title={title} subtitle="your" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card style={{overflowX:"scroll"}} small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Active Users</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table  className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                    {filter.map((data,index)=>{
                      return (
                        <th scope="col" className="border-0">{data}</th> 
                      )
                    })}
                    <th scope="col" className="border-0">Visit</th>
                    <th scope="col" className="border-0">Action</th>
                </tr>
              </thead>
              <tbody>
              {enroll.length===0?
              <div className="mx-4" >Loading...</div>
               :
                enroll.slice(0, 5).map((data,index)=>{
                        return (
                            <tr>
                              <td>{index+1}</td>
                              <td style={{maxWidth:"100px",textWrap:"wrap"}}>{data.blog?data.blog.title:"no title"}</td>
                              <td >{data.user.name}</td>
                              <td >{data.user.email}</td>
                              <td >{data.updatedAt}</td>
                              <td><Link to={data.blog?`/blog/post/${data.blog._id}`:"/action/take-action"}>Visit Blog</Link></td>
                              <td>
                                <Button onClick={()=>ApproveAction(data._id)}>
                                {approve.indexOf(data._id)!==-1 || data.status==='approved'?"Approved":"Approve"}

                                  </Button>
                              </td>
                              </tr>
                              );}
                              
                  )
                }
                </tbody>
            </table>
            
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);
}
export default Tables;
