import React from 'react'
import { UserCard } from '../UserCard/UserCard';
import { Col, Row } from 'react-bootstrap';

export default function UsersPreview({users}) {
    console.log(users);
return (
    <Row className="g-3">
      {users.map((user) => (
        <Col key={user.id} xs={12} sm={6} md={4} lg={3}>
          <UserCard user={user} />
        </Col>
      ))}
    </Row>
  );
}
