import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import Menu from '../Comp/Menu';

const Locations = () => {
  const navigator = useNavigate();
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    day: "",
    timeStart: "",
    timeEnd: "",
    info: ""
  })
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLocation({ ...newLocation, [name]: value });
  };

  //if is not loged in go back to login page
  useEffect(() => {
    isLogedIn()
    fetchData();
  }, [])

  //check if user is loged in
  const isLogedIn = () => {
    fetch("http://friesische-feinkost.de/api/checkStatus.php")
      .then(response => response.json())
      .then(data => {
        if(data.success === false) {
          navigator('/');
        } else {
          console.log('Is logged in')
        }
      })
      .catch( error => {
        console.log(error)
      })
  }

  //get locations from db
  const fetchData = () => {
    fetch('http://friesische-feinkost.de/api/get_data.php')
      .then(response => response.json())
      .then(data => {
        setLocations(data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  //send new line to the db table
  const sendData = (event) => {
    event.preventDefault();

    fetch('http://friesische-feinkost.de/api/insert_loc.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLocation)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data Inserted:', data)
        window.location.reload(false);
      })
      .catch(error =>{
        console.log('Error inserting data:', error);
      }); 
  } 

  //delete line from db Table
  const deleteLocation = (id) => {
    fetch(`http://friesische-feinkost.de/api/remove_loc.php?id=${id}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Location deleted successfully, fetch the updated data
        fetchData();
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

    <Container className='text-center'>
      <h1>Locations</h1>
    </Container>

    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Location</th>
            <th>Day</th>
            <th>Time Start</th>
            <th>Time End</th>
            <th>Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((item) => {
            return(
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.day}</td>
                <td>{item.timeStart}</td>
                <td>{item.timeEnd}</td>
                <td>{item.info}</td>
                <td className='d-flex justify-content-around'>
                  <img src={require('../img/delete.png')} alt='Delete Icon' width={20} onClick={() => deleteLocation(item.id)}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>

    <Container className='mt-5'>
          <Row className='text-center'>
            <h3>Add new Locations</h3>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Location</th>
                  <th>Day</th>
                  <th>Time Start</th>
                  <th>Time End</th>
                  <th>Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                  </td>
                  <td>
                    <input name='name' value={newLocation.name} onChange={handleInputChange}/>
                  </td>
                  <td>
                    <input name='day' value={newLocation.day} onChange={handleInputChange}/>
                  </td>
                  <td>
                    <input name='timeStart' value={newLocation.timeStart} onChange={handleInputChange}/>
                  </td>
                  <td>
                    <input name='timeEnd' value={newLocation.timeEnd} onChange={handleInputChange}/>
                  </td>
                  <td>
                    <input name='info' value={newLocation.info} onChange={handleInputChange}/>
                  </td>
                  <td>
                    <Button onClick={sendData}>Save</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
          
    </Container>

  </>
  )
}

export default Locations
