import React, {useState, useEffect} from 'react';

import styles from '../css/addScreen.module.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
 
const AddScreen = ({toggler}) => {
    const [isFavorite, setIsFavorite] = useState();
    const [newTitle, setNewTitle] = useState('');
    const [newText, setNewText] = useState('');
    const [newPrice, setNewPrice] = useState();
    const [newMenge, setNewMenge] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newImage, setNewImage] = useState();


    //edit the item with id
    const addItem = () => {
        const formData = new FormData();
        formData.append('title', newTitle);
        formData.append('text', newText);
        formData.append('price', newPrice);
        formData.append('menge', newMenge);
        formData.append('category', newCategory);
        formData.append('image', newImage);
        formData.append('favorite', isFavorite);

        fetch('https://friesische-feinkost.de/api/produkte/add_item.php', {
            method: 'POST',
            body: formData
        })
            .then(resposne => resposne.json())
            .then(data => {
                if(data.success) {
                    toggler(false);
                    window.location.reload(false);
                } else {
                    console.log('Failed')
                }
            })
            .catch(error => {
                console.log(error);
            })
        
    }

    console.log(isFavorite)

  return (
    <div className={styles.bkg}>
      <div className={styles.cont}>
        <div className={styles.header}>
            <h6>Add new Item</h6>
            <img src={require('../img/close.png')} width={15} height={15} onClick={() => toggler(false)} alt='Icon Close'/>
        </div>

        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text"  onChange={(e) => setNewTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Beschreibung:</Form.Label>
                <Form.Control as="textarea" rows={3}  onChange={(e) => setNewText(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Price:</Form.Label>
                <Form.Control type="text"  onChange={(e) => setNewPrice(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Menge:</Form.Label>
                <Form.Control type="text"  onChange={(e) => setNewMenge(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Categorien:</Form.Label>
                <Form.Control type="text" onChange={(e) => setNewCategory(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3 d-flex gap-3">
                <Form.Label>Favorite:</Form.Label>
                <input type="checkbox" onChange={(e) => setIsFavorite(e.target.checked)}/>
            </Form.Group>
            <Form.Group className="mb-3 d-flex gap-3">
                <Form.Label>Bild:</Form.Label>
                <Form.Control type="file" name='Image' onChange={(e) => setNewImage(e.target.files[0])}/>
            </Form.Group>

            <Button onClick={addItem}>Senden</Button>

        </Form>
      </div>
    </div>
  )
}

export default AddScreen
