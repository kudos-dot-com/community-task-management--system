import React,{useEffect,useState} from 'react'
import DescriptionCards from '../../components/DescriptionCard/DescriptionCard'
import Tables from '../TableForTasks'
import CountryData from '../../utils/CountryStateList'
import BaseUrl from "../../Api/Api"
function AddTask({data}) {
    const [user,setuser]=useState([]);
  
    const [tableitem,settableitem]=useState(["title","assigned","description","points","updatedAt"]);
    const [filter,flterItems]=useState([...tableitem]);
    useEffect(()=>{
        // setuserfromtoken(JSON.parse(localStorage.getItem('user')));
        console.log(BaseUrl.userApi);
        fetch(`/tasks/get-admin-task`,{    
        headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setuser(data.success);
        })
        .catch(err=>{
            console.log(err);
        })

},[])
    
    return (
        <div>
            <DescriptionCards data={data}/>
            <Tables type="task" title="Posted Task" users={user} filter={filter}/>
        </div>
    )
}
AddTask.defaultProps = {
    data:{
    title:'Add New Task',
    url:'/form/add-task',
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
    }
  };
export default AddTask
