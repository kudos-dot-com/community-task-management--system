import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileVisit from './views/UserProfileVisit'
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import CampusFrom from './views/Forms/CampusForm'
import CountryFrom from './views/Forms/CountryForm'
import OrganisationFrom from './views/Forms/OrganisationForm'
import VoulenteerFrom from './views/Forms/VoulenteerFrom'
import TaskFrom from './views/Forms/Addtask'

import UserLogin from './views/auth/Login'
//admin
import AddCampusAmbassador from './views/Admin/AddCampusAmbassador'
import AddCountryAmbassador from './views/Admin/AddCountry'
import TaskSubmission from './views/Admin/TaskSubmission'
import AddOrganisation from './views/Admin/AddOrganisation'
import AddVoulenteer from './views/Admin/AddVoulteneer'
import AddTask from './views/Admin/AddTask'
import AddTaskForOrganisation from './views/organisation/AddTask'
import TaskSubmissionForOrganisation from './views/organisation/TaskSubmission'

//campus
import MyTasks from './views/Campus/MyTasks'
import MySubmission from './views/Campus/MySubmissions'
//voulenteer
import MyTasksForVoulenteer from './views/Voulenteer/MyTask'
import MySubmissionForVoulenteer from './views/Voulenteer/MySubmission'


//country
import AddCampusAmbassadorForCountry from './views/Country/AddCampusAmbassador'
import AddVoulenteerForCountry from './views/Country/AddVoulenteer'
import AddTasksForCountry from './views/Country/AddTask'
import MyTasksForCountry from './views/Country/MyTasks'
import MySubmissionForCountry from './views/Country/MySubmission'
import TaskSubmissionForCountry from './views/Country/TaskSubmission'
//organisation routes
import AddCampusAmbassadorForOrganisation from './views/organisation/AddCampusAmbassador'
import AddCountryAmbassadorForOrganisation from './views/organisation/AddCountry'
import AddVoulenteerForOrganisation from './views/organisation/AddVoulenteer'
import TakaAction from './views/TakeAction/Admin/TakeAction'
import BlogPage from './views/TakeAction/Admin/BlogPage'

import DescriptionCard from './views/DescriptionCard'
import MyAction from './views/TakeAction/Campus/MyActions'

export default [
  // {
  //   path: "/",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: () => <Redirect to="/blog-overview" />
  // },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/user/profile/:role/:id",
    layout: DefaultLayout,
    component: UserProfileVisit
  },
  {
    path: "/tasks/description/:role/:id",
    layout: DefaultLayout,
    component: DescriptionCard
  },
  {
    path: "/admin/add-campus-ambassador",
    layout: DefaultLayout,
    component: AddCampusAmbassador
  },
  {
    path: "/organisation/add-campus-ambassador",
    layout: DefaultLayout,
    component: AddCampusAmbassadorForOrganisation
  },
  {
    path: "/country-ambassador/add-campus-ambassador",
    layout: DefaultLayout,
    component: AddCampusAmbassadorForCountry
  },
  {
    path: "/form/add-campus-ambassador",
    layout: DefaultLayout,
    component: CampusFrom
  },
  {
    path: "/add-country-ambassador",
    layout: DefaultLayout,
    component: AddCountryAmbassador
  },
  {
    path: "/organisation/add-country-ambassador",
    layout: DefaultLayout,
    component: AddCountryAmbassadorForOrganisation
  },
  {
    path: "/form/add-country-ambassador",
    layout: DefaultLayout,
    component: CountryFrom
  },
  {
    path: "/add-organisation",
    layout: DefaultLayout,
    component: AddOrganisation
  },
  {
    path: "/form/add-organisation",
    layout: DefaultLayout,
    component: OrganisationFrom
  },
  {
    path: "/add-voulenteer",
    layout: DefaultLayout,
    component: AddVoulenteer
  },
  {
    path: "/organisation/add-voulenteer",
    layout: DefaultLayout,
    component: AddVoulenteerForOrganisation
  },
  {
    path: "/country-ambassador/add-voulenteer",
    layout: DefaultLayout,
    component: AddVoulenteerForCountry
  },
  {
    path: "/form/add-voulenteer",
    layout: DefaultLayout,
    component: VoulenteerFrom
  },
  {
    path: "/task/add-task",
    layout: DefaultLayout,
    component: AddTask
  },
  {
    path: "/form/add-task",
    layout: DefaultLayout,
    component: TaskFrom
  },
  {
    path: "/task/submissions",
    layout: DefaultLayout,
    component: TaskSubmission
  },
  {
    path: "/action/take-action",
    layout: DefaultLayout,
    component: TakaAction
  },
  {
    path: "/blog/post/:postId",
    layout: DefaultLayout,
    component: BlogPage
  },
  //organisation
  {
    path: "/organsiation/task/add-task",
    layout: DefaultLayout,
    component: AddTaskForOrganisation
  },
  {
    path: "/organisation/task/submissions",
    layout: DefaultLayout,
    component: TaskSubmissionForOrganisation
  },
  //country
  {
    path: "/country-ambassador/task/add-task",
    layout: DefaultLayout,
    component: AddTasksForCountry
  },
  {
    path: "/country-ambassador/task/my-task",
    layout: DefaultLayout,
    component: MyTasksForCountry
  },
  {
    path: "/country-ambassador/task/submissions",
    layout: DefaultLayout,
    component: TaskSubmissionForCountry
  },
  {
    path: "/country-ambassador/mytask/submissions",
    layout: DefaultLayout,
    component: MySubmissionForCountry
  },
   //campus
   {
    path: "/campus-ambassador/task/my-task",
    layout: DefaultLayout,
    component: MyTasks
  },
  {
    path: "/campus-ambassador/task/submissions",
    layout: DefaultLayout,
    component: MySubmission
  },
  //voulenteers
  {
    path: "/voulenteer/task/my-task",
    layout: DefaultLayout,
    component: MyTasksForVoulenteer
  },
  {
    path: "/voulenteer/task/submissions",
    layout: DefaultLayout,
    component: MySubmissionForVoulenteer
  },
  {
    path: "/my-actions/blogs",
    layout: DefaultLayout,
    component: MyAction
  },
  // deadline
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  }
];


