export default function() {
  let adminRoute= [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: "",
      user:"all"
    },
    {
      title: "Add Campus Ambassador",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/admin/add-campus-ambassador",
      user:"admin"
    },
    {
      title: "Add organisation",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/add-organisation",
      user:"admin"
    },
    {
      title: "Add Country Ambassador",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/add-country-ambassador",
      user:"admin"
    },
    {
      title: "Add Voulenteer",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/add-voulenteer",
      user:"admin"
    },
    {
      title: "Add Task",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/task/add-task",
      user:"admin"
    },
    {
      title: "Task Submissions",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/task/submissions",
      user:"admin"
    },
    {
      title: "Take Action",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/action/take-action",
      user:"admin"
    },
    //organisation
    {
      title: "Add Country Ambassador",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/organisation/add-country-ambassador",
      user:"organisation"
    },
    {
      title: "Add Campus Ambassador",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/organisation/add-campus-ambassador",
      user:"organisation"
    },
    {
      title: "Add Voulenteer",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/organisation/add-voulenteer",
      user:"organisation"
    },
    {
      title: "Add Task",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/organsiation/task/add-task",
      user:"organisation"
    },
    {
      title: "Task Submissions",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/organisation/task/submissions",
      user:"organisation"
    },
    //country
  
    {
      title: "Add Campus Ambassador",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/country-ambassador/add-campus-ambassador",
      user:"country-ambassador"
    },
    {
      title: "Add voulenteer",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/country-ambassador/add-voulenteer",
      user:"country-ambassador"
    },
    {
      title: "Add Task",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/country-ambassador/task/add-task",
      user:"country-ambassador"
    },
    {
      title: "Task Submissions",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/country-ambassador/task/submissions",
      user:"country-ambassador"
    },
    {
      title: "My Task",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/country-ambassador/task/my-task",
      user:"country-ambassador"
    },
    {
      title: "My Submissions",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/country-ambassador/mytask/submissions",
      user:"country-ambassador"
    },
    // campus
    {
      title: "My Task",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/campus-ambassador/task/my-task",
      user:"campus-ambassador"
    },
    {
      title: "My Submissions",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/campus-ambassador/task/submissions",
      user:"campus-ambassador"
    },
    {
      title: "My Action",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/my-actions/blogs",
      user:"campus-ambassador"
    },

    // voulenteer

    {
      title: "My Task",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/voulenteer/task/my-task",
      user:"voulenteer"
    },
    {
      title: "My Submissions",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/voulenteer/task/submissions",
      user:"voulenteer"
    },
    {
      title: "My Action",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/my-actions/blogs",
      user:"voulenteer"
    },
    // {
    //   title: "Take Actions",
    //   htmlBefore: '<i class="material-icons">vertical_split</i>',
    //   to: "/blog-posts",
    //   user:"all"
    // },
    // {
    //   title: "Blog Posts",
    //   htmlBefore: '<i class="material-icons">vertical_split</i>',
    //   to: "/blog-posts",
    //   user:"all"
    // }
  ]

      return adminRoute;
}

