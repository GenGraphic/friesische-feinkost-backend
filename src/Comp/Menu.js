import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import styles from '../css/menu.module.css';

const Menu = () => {
  return (
    <>
        <Container className={styles.body}>
        <Row>
            <Col className='text-center'>
              <h4><a className={styles.links} href='#/Locations'>Locations</a></h4>
            </Col>
            <Col className='text-center'>
              <h4><a className={styles.links} href='#/Posts'>Posts</a></h4>
            </Col>
            <Col>
              <h4><a className={styles.links} href='#/speisekarte'>Speisekarte</a></h4>
            </Col>
            <Col>
              <h4><a className={styles.links} href='#/TextEditor'>Text Editor</a></h4>
            </Col>
            <Col>
              <h4><a className={styles.links} href='#/ImageEditor'>Images Editor</a></h4>
            </Col>
            <Col>
              <h4><a className={styles.links} href='/admin'>Abmelden</a></h4>
            </Col>
        </Row>
        </Container>
    </>
  )
}

export default Menu
