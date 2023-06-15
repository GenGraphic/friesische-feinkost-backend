import React, {useEffect, useState} from 'react';

import Menu from '../Comp/Menu';
import TextEdit from '../Comp/TextEdit';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';


const TexteEditor = () => {
  const [textListe, setTextListe] = useState([]);
  const [isTextEdditing, setIsTextEditing] = useState(false);
  const [idToEdit, setIdToEdit] = useState();
  const [titleToEdit, setTitleToEdit] = useState('');
  const [textToEdit, setTextToEdit] = useState('');

  useEffect(() => {
    fetchTexte();
  }, [])

  //fetch the text from db
  const fetchTexte = () => {
    fetch('https://friesische-feinkost.de/api/fetch_texte.php')
      .then(response => response.json())
      .then(data => {
        setTextListe(data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handdleTextEditScreen = (id, title, text) => {
    setIsTextEditing(true);
    setIdToEdit(id);
    setTextToEdit(text);
    setTitleToEdit(title);
  }
  console.log(textListe);

  return (
    <>
      <Menu />
      {isTextEdditing &&
          <TextEdit id={idToEdit} text={textToEdit} title={titleToEdit} toggler={setIsTextEditing}/>
      }

      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Text</th>
              <th>Page</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { textListe.map((item) => {
              return (
                  <tr key={item.id}>
                  <td>{item.title}</td>
                  <td style={{whiteSpace: 'pre-wrap'}}>{item.text}</td>
                  <td>{item.page}</td>
                  <td>{item.position}</td>
                  <td className='text-center'>
                    <img src={require('../img/edit.png')} width={25} onClick={() => handdleTextEditScreen(item.id, item.title, item.text)} alt='Edit Icon'/>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default TexteEditor