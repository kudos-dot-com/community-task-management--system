import React from 'react'
import { Container, Row, Col } from "shards-react";
import UserLogin from '../../components/user-profile-lite/UserLogin'
function Login() {
    return (
        <div style={{transform:'translate(0%,50%)'}}>
            <Container>
                <Row>
                    <Col sm="0"  lg="3"></Col>
                    <Col sm="12" lg="6">
                        <UserLogin />
                    </Col>
                    <Col sm="0" lg="3"></Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default Login
