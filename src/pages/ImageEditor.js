import React, {useState, useEffect} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Menu from '../Comp/Menu';

import styles from '../css/ImageEdit.module.css';



const ImageEditor = () => {
    const [images, setImages] = useState([]);
    const [imagesGalery, setImagesGalery] = useState([]);
    const baseUrl = "https://friesische-feinkost.de/api/FrontEnd_Images/";
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchHomeImages();
        fetchAboutImages();
    }, [])

    const fetchHomeImages = () => {
        fetch('https://friesische-feinkost.de/api/fetch_images_home.php')
            .then(response => response.json())
            .then(data => {
                setImages(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const fetchAboutImages = () => {
        fetch('https://friesische-feinkost.de/api/fetch_images.php')
            .then(response => response.json())
            .then(data => {
                setImagesGalery(data);
            })
            .catch(error => {
                console.log(error);
            })
    }
 
    const sendImageToServer = (id) => {
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('id', id);

        fetch('https://friesische-feinkost.de/api/replace_image_home.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if(data.success === true) {
                    window.location.reload(false);
                }else {
                    console.log(data);
                }
            })
            .catch(error => {
                console.log(error);
            }) 
    }
  return (
    <>
        <Menu />

        <Container>
            <h1>Home</h1>
            {images.map((item) => {
                return (
                    <Row className='mb-4 border border-secondary' key={item.id}>
                        <Col className='col-auto'>
                            <img src={baseUrl + item.imageName} alt='Home' className={styles.homeImg} />
                        </Col>
                        <Col className='d-flex justify-content-start align-items-center'>
                            <p>{item.imageName}</p>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <p>{item.page + " " + item.location}</p>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])}/>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <Button onClick={() => sendImageToServer(item.id)}>Save</Button>
                        </Col>
                    </Row>
                )
            })
            }
        </Container>

        <Container>
            <h1>Über uns</h1>
            {imagesGalery.map((item) => {
                return (
                    <Row className='mb-4 border border-secondary' key={item.id}>
                        <Col className='col-auto'>
                            <img src={baseUrl + item.imageName} alt='Home' className={styles.homeImg} />
                        </Col>
                        <Col className='d-flex justify-content-start align-items-center'>
                            <p>{item.imageName}</p>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <p>{item.page + " " + item.location}</p>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])}/>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <Button onClick={() => sendImageToServer(item.id)}>Save</Button>
                        </Col>
                    </Row>
                )
            })
            }
        </Container>
    </>
  )
}

export default ImageEditor
