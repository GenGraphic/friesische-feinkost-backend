import React, {useEffect, useState} from 'react';
import { json, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Menu from '../Comp/Menu';
import ImageUpload from '../Comp/ImageUpload';

import styles from '../css/posts.module.css';

const Posts = () => {
  const navigator = useNavigate();
  const [posts, setPosts] = useState([])
  const baseImgUrl = "http://friesische-feinkost.de/api/posts/uploads/";

  //if is not loged in go back to login page
  useEffect(() => {
    isLogedIn();
    fetchPosts();
  }, [])

  //check if user is loged in
  const isLogedIn = () => {
    fetch('http://friesische-feinkost.de/api/checkStatus.php')
      .then(response => response.json())
      .then(data => {
        if(data.success === false) {
          navigator('/');
        } else {
          console.log('Is logged in.');
        }
      })
      .catch( error => {
        console.log(json(error))
      })
  }

  //fetch all data from posts table
  const fetchPosts = () => {
    fetch('http://friesische-feinkost.de/api/posts/get_posts.php')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        console.log('Error: ', error)
      })
  }

  //delete post from db Table
  const deletePost = (id) => {
    fetch(`http://friesische-feinkost.de/api/posts/remove_post.php?id=${id}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Location deleted successfully, fetch the updated data
        fetchPosts();
      } else {
        console.log('Failed to delete location');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
  <>
    <Menu />

    <Container fluid>
      <Row>
        <h3>Actuelle Posts:</h3>
      </Row>
      <Row className='gap-3 flex-row flex-nowrap overflow-scroll'>
        {posts.map((item) => {
          return(
            <Card key={item.id} style={{ width: '18rem'}}>
              <Card.Img variant="top" src={baseImgUrl + item.image}  width={180} height={150} style={{objectFit: 'cover'}}/>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className={styles.textBox}>
                    {item.text}
                </Card.Text>
                <div className='d-flex justify-content-between align-items-end'>
                  <Button variant="danger" onClick={() => deletePost(item.id)} >Delete</Button>
                  <Card.Text>{item.date}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          )
        })
        }
      </Row>
    </Container>

    <Container className='mt-5'>
      <Row>
        <h2>Add new post</h2>
      </Row>
      <Row>
        <Col className='col-12 col-lg-6'>
            <ImageUpload  />
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  </>
  )
}

export default Posts
