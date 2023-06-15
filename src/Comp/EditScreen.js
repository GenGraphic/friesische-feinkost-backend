import React, {useState, useEffect} from 'react';

import styles from '../css/editScreen.module.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
 
const EditScreen = ({toggler, id}) => {
    const [itemToEdit, setItemToEdit] = useState({});
    const [isFavorite, setIsFavorite] = useState();
    const [newTitle, setNewTitle] = useState('');
    const [newText, setNewText] = useState('');
    const [newPrice, setNewPrice] = useState();
    const [newMenge, setNewMenge] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newImage, setNewImage] = useState();


    //fetch the item with the id
    const fetchID = () => {
        const formData = new FormData();
        formData.append('id', id);

        fetch('https://friesische-feinkost.de/api/produkte/fetch_id.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setItemToEdit(data);
                setIsFavorite(data.favorite === 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    //edit the item with id
    const editItem = () => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', newTitle);
        formData.append('text', newText);
        formData.append('price', newPrice);
        formData.append('menge', newMenge);
        formData.append('category', newCategory);
        formData.append('image', newImage);
        formData.append('favorite', isFavorite);

        fetch('https://friesische-feinkost.de/api/produkte/edit_id.php', {
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

    //handle the value of isFavorite
    const handleFavoriteChange = (event) => {
        setIsFavorite(event.target.checked);
    };

    useEffect(() => {
        fetchID();
    }, [])

    useEffect(() => {
        asignValuesFields();
    }, [itemToEdit])

     //take the itemToEdit obj and asign its value to each field value
    //when inputs are changed and submited, the values changed to be sent to db
    const asignValuesFields = () => {
        setNewTitle(itemToEdit.title);
        setNewText(itemToEdit.description);
        setNewPrice(itemToEdit.price);
        setNewMenge(itemToEdit.menge);
        setNewCategory(itemToEdit.category);
        setNewImage(itemToEdit.image);
    }


  return (
    <div className={styles.bkg}>
      <div className={styles.cont}>
        <div className={styles.header}>
            <h6>Edit</h6>
            <img src={require('../img/close.png')} width={15} height={15} onClick={() => toggler(false)} alt='Icon Close'/>
        </div>

        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" defaultValue={itemToEdit.title} onChange={(e) => setNewTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Beschreibung:</Form.Label>
                <Form.Control as="textarea" rows={3} defaultValue={itemToEdit.description} onChange={(e) => setNewText(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Price:</Form.Label>
                <Form.Control type="text" defaultValue={itemToEdit.price} onChange={(e) => setNewPrice(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Menge:</Form.Label>
                <Form.Control type="text" defaultValue={itemToEdit.menge} onChange={(e) => setNewMenge(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Categorien:</Form.Label>
                <Form.Control type="text" defaultValue={itemToEdit.category} onChange={(e) => setNewCategory(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3 d-flex gap-3">
                <Form.Label>Favorite:</Form.Label>
                <input type="checkbox" checked={isFavorite} onChange={handleFavoriteChange} />
            </Form.Group>
            <Form.Group className="mb-3 d-flex gap-3">
                <Form.Label>Bild:</Form.Label>
                <Form.Control type="file" defaultValue={newImage} name='Image' onChange={(e) => setNewImage(e.target.files[0])}/>
            </Form.Group>

            <Button onClick={editItem}>Senden</Button>

        </Form>
      </div>
    </div>
  )
}

export default EditScreen
