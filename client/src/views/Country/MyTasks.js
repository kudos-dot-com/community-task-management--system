import React,{useEffect,useState} from 'react'
import DescriptionCards from '../../components/DescriptionCard/DescriptionCard'
import Tables from '../TableForTasks'
import CountryData from '../../utils/CountryStateList'
import BaseUrl from "../../Api/Api"
function AddTask({data}) {
    const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')));
    const [tasks,settasks]=useState([]);
    const [tableitem,settableitem]=useState(["title","description","points","updatedAt"]);
    const [filter,flterItems]=useState([...tableitem]);
    useEffect(()=>{
       
        const addedBy=user.addedByOrg?"organisation":'admin';
        console.log(addedBy);
        if(!user)
        {return;}
        else
        {
        fetch(`/tasks/${user.role}-get-${addedBy}-task`,{
        headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            settasks(data.success);
        })
        .catch(err=>{
            console.log(err);
        })}

},[])
    
    return (
        <div>
            <DescriptionCards data={data}/>
            <Tables type="task" user="campus" title="Tasks" users={tasks} filter={filter}/>
        </div>
    )
}
AddTask.defaultProps = {
    data:{
    title:'Your Submissions',
    url:'/campus-ambassador/task/submissions',
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
    }
  };
export default AddTask
