import React from 'react'
import {Container ,Col ,Row,Card,CardHeader,
    Button,
    ListGroup,
    ListGroupItem, } from 'shards-react'
import {Link} from 'react-router-dom'
function DescriptionCard({data,userDetails}) {
    return (
    <div>
    <Container>
    <Card small className="my-4 pt-3">
    <CardHeader className="border-bottom">
      <h5 className="mb-0 text-capitalize">{data.title}</h5>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          {userDetails.metaTitle}
        </strong>
        <span>{userDetails.metaValue}</span>
      </ListGroupItem>
       <ListGroupItem className="px-4 pb-4 pt-1">
       <Link to={data.url}>
        <Button theme="accent" className="text-capitalize">{data.title}</Button>
      </Link>
      </ListGroupItem>
    </ListGroup>
    </Card>
  </Container>
</div>
    )
}
DescriptionCard.defaultProps = {
    userDetails: {
      name: "Sierra Brooks",
      avatar: require("./../../images/avatars/0.jpg"),
      jobTitle: "Project Manager",
      performanceReportTitle: "Workload",
      performanceReportValue: 74,
      metaTitle: "Description",
      metaValue:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
    }
  };

export default DescriptionCard
