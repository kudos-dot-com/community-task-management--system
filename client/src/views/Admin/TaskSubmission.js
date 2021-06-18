import React,{useEffect,useState} from 'react'
import { Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import SubmissionTables from '../TableForSubmission'
import CountryData from '../../utils/CountryStateList'
import BaseUrl from "../../Api/Api"
function TaskSubmission({data , title}) {
    const [user,setuser]=useState([]);
    const [role,setrole]=useState(["campus-ambassador","voulenteer","country-ambassador","organisation","admin"]);

    const [tableitem,settableitem]=useState(["title","description","points","updatedAt","email"].sort());
    const [filter,flterItems]=useState([...tableitem]);
    
    return (
        <div>           
            <SubmissionTables  type="user" title="Task Submission" subtitle="Campus Ambassador" users={user} filter={filter}/>
        </div>
    )
}
TaskSubmission.defaultProps = {
    data:{
    title:'Task Submission',
    }
  };
export default TaskSubmission
