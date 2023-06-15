import React, { useState } from 'react';
import styles from '../css/textEdditor.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const TextEdit = ({ id, toggler, text, title }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);

  const editText = () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('text', newText);
    formData.append('title', newTitle);

    fetch('https://friesische-feinkost.de/api/edit_text.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          console.log(data.message);
        } else {
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  return (
    <div className={styles.bkg}>
      <div className={styles.cont}>
        <div className={styles.header}>
          <h6>Edit Text</h6>
          <img
            src={require('../img/close.png')}
            width={15}
            height={15}
            alt="Close Edit"
            onClick={() => toggler(false)}
          />
        </div>

        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              maxLength={100}
              type="text"
              defaultValue={title}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={newText}
              onChange={handleTextChange}
            />
          </Form.Group>

          <Button onClick={editText} className="mt-3">
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default TextEdit;
