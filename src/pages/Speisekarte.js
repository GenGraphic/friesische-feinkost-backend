import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Menu from '../Comp/Menu';
import EditScreen from '../Comp/EditScreen';
import AddScreen from '../Comp/AddScreen';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { json } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Speisekarte = () => {
  const [produkte, setProdukte] = useState([]);
  const [isEdditing, setIsEdditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [IDToEdit, setIDtoEdit] = useState();
  const navigator = useNavigate();

  useEffect(() => {
    fetchProdukte();
  }, [])

  //get all the items from the db
  const fetchProdukte = () => {
    fetch('https://friesische-feinkost.de/api/produkte/fetch_items.php')
      .then(response => response.json())
      .then(data => {
        setProdukte(data);
      })
      .catch(error => {
        console.log(json(error))
      }) 
  }

  const removeItem = (id) => {
    const formData = new FormData();
    formData.append('id', id)

    fetch('https://friesische-feinkost.de/api/produkte/remove_id.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data  => {
        if(data.success) {
          console.log('Succes Remove')
          window.location.reload(false);
        } else {
          console.log('Failed to remove')
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
  <>
    <Menu />
    {isEdditing &&
      <EditScreen toggler={setIsEdditing} id={IDToEdit}/>
    }
    {isAdding &&
      <AddScreen toggler={setIsAdding}/>
    }
    
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Text</th>
            <th>Price</th>
            <th>Menge</th>
            <th>Category</th>
            <th>Image</th>
            <th>Favorite</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {produkte.map((item) => {
            return(
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.menge}</td>
                <td>{item.category}</td>
                <td>{item.image}</td>
                <td className='text-center'>
                  <input disabled type='checkbox' defaultChecked={item.favorite === "1"}/>
                </td>
                <td>
                  <img 
                    alt='Icon Edit'
                    src={require('../img/edit.png')} 
                    width={25} className='mx-1' 
                    onClick={() => {
                      setIsEdditing(true) 
                      setIDtoEdit(item.id)
                    }}
                  />
                  <img 
                    alt='Icon Delete' 
                    src={require('../img/delete.png')} 
                    width={25} className='mx-1' 
                    onClick={() => removeItem(item.id)}/>
                </td>
              </tr>
            )
          })

          }
        </tbody>
      </Table>
      <Button onClick={() => setIsAdding(true)}>Add mew</Button>
    </Container>
    
  </>
  )
}

export default Speisekarte
