import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const CRUD = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[name, setName] = useState("");
    const[age, setAge] = useState("");
    const[isActive, setIsActive] = useState(0);
    
    const[ediId, setEditId] = useState("");
    const[editName, setEditName] = useState("");
    const[editAge, setEditAge] = useState("");
    const[isEditActive, setIsEditActive] = useState(0);
    

    const empdata = [
        {
            id: 1,
            name: "Illia",
            age: 18,
            isActive: 1
        },
        {
            id: 2,
            name: "Petro",
            age: 18,
            isActive: 1
        },
        {
            id: 3,
            name: "Zhopashnik",
            age: 18,
            isActive: 1
        },
        {
            id: 4,
            name: "Tatarbunar",
            age: 18,
            isActive: 1
        },
        {
            id: 5,
            name: "Zhorik",
            age: 18,
            isActive: 1
        },
    ]



    const [data, setData] = useState([])

    useEffect(() => {
        getData();
    }, [])

    const getData = () =>{
        axios.get('https://localhost:7151/api/Employee')
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleEdit = (id) => {
        //alert(id);
        handleShow();
    }

    const handleUpdate = (id) => {

    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure to delete this employee?") == true){
                    alert(id);
        }

    }

    return(
        <Fragment>
            <Container>
                <Row>
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    ></input>
                    </Col>
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter age"
                    value={age}  onChange={(e) => setAge(e.target.value)}></input>
                    </Col>
                    <Col>
                    <input type="checkbox"
                    checked={isActive === 1 ? true : false}
                    onChange={(e) => setIsActive(e)} value={isActive}></input>
                    <label>  isActive</label>
                    </Col>
                    <Col>
                    <button className='btn btn-primary'>Submit</button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>isActive</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                        data.map((item, index) => {
                            return(
                                <tr ket = {index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.isActive}</td>
                                <td colSpan = {50}>
                                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                                </tr>
                            )
                        })
                        :
                        'Loading...'
                    }
 
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modify / Update employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                <Col>
                    <input type="text" className="form-control" placeholder="Enter name"
                    value={editName} onChange={(e) => setEditName(e.target.value)}
                    ></input>
                    </Col>
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter age"
                    value={editAge}  onChange={(e) => setEditAge(e.target.value)}></input>
                    </Col>
                    <Col>
                    <input type="checkbox"
                    checked={isEditActive === 1 ? true : false}
                    onChange={(e) => setIsEditActive(e)} value={isEditActive}></input>
                    <label>  isActive</label>
                    </Col>
                    <Col>
                    <button className='btn btn-primary'>Submit</button>
                    </Col>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>

        
    )
}


export default CRUD;