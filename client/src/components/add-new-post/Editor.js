import React,{useState,useEffect} from "react";
import ReactQuill from "./EditorConfig";
import { Card, CardBody, Form, FormInput,FormTextarea } from "shards-react";
import {Store , Dispatcher , Constants} from '../../flux'
import "../../assets/quill.css";

function Editor(){
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')))
  const [content, setContent] = useState("")
  const [files, setFiles] = useState([])
  const [title,settile]=useState("")
  const [description,setdescription]=useState("")
  useEffect(()=>{
    Store.on("change",()=>{
    // console.log(Store.getContents());
    onSubmit(Store.getContents());
  })
  },[])
  useEffect(()=>{
    Dispatcher.dispatch({
      actionType: Constants.SAVE_CONTENTS_TITLE,
      title:title
    });
  },[title])
  useEffect(()=>{
    Dispatcher.dispatch({
      actionType: Constants.SAVE_CONTENTS_DES,
      des:description
    });
  },[description])
  const onEditorChange = (value) => {
      Dispatcher.dispatch({
        actionType: Constants.SAVE_CONTENTS,
        contents:value
      });
  }

  const onFilesChange = (files) => {
      setFiles(files)
  }

  function onSubmit(content){
     
      console.log(content);

      fetch(`/api/blog/createPost`,{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify({
          title:content.blogTitle,
          description:content.blogDescription,
          content:content.blogContents,
          userID: user._id
        })
    })
    .then(res=>res.json())
    .then(data=>{
     console.log(data);
     if(data.success){
       alert("your blog has been posted");
     }
     else{
       alert("An unexpected error has occured")
     }
    })
    .catch(err=>{
        console.log(err);  
    })
     
  }
  return (
  <Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <FormInput size="lg" className="mb-3" onChange={(e)=>settile(e.target.value)} placeholder="Your Post Title" />
  
        <FormTextarea id="feDescription" rows="5" cols="6" 
         size="lg" className="mb-3" onChange={(e)=>setdescription(e.target.value)} placeholder="Your Post Description"
          />
        <ReactQuill 
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
        className="add-new-post__editor mb-1"
         />
      </Form>
    </CardBody>
  </Card>
);
}
export default Editor;
