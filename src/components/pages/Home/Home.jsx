import { useEffect, useState } from 'react'
import ProCard from '../../lib/ProCard'
import axios from 'axios'
import { Alert, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label } from 'reactstrap'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2/dist/sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { toast } from 'react-toastify'
import { apiUrl, toast_config } from '../../../Config'

function Home() {
  const [data, setData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  const [newUser, setNewUser] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3000/users').then(res => {
      if (res.status === 200) {
        setData(res.data)
      }
    })
  }, [])

  function deleteItem(id) {
    Swal.fire({
      title: 'Silmək istədiyinizə əminsinizmi ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7066E0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Bəli, sil!',
      cancelButtonText: 'Xeyr, silmə!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/users/${id}`)
          .then(res => {
            if (res.status === 200) {
              setData(prevState => prevState.filter(item => item.id !== id))
              Swal.fire('Məlumat silindi!', '', 'success')
            }
          })
      }
    })
  }

  function handleEdit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = {}

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
      data[key] = value
    }

    if (!data.fullname) {
      toast.error("Ad daxil edin!", toast_config)
      return
    }

    axios.put(`${apiUrl}/users/${selectedRow.id}`, {
      fullname: data.fullname
    }).then(resp => {
      if (resp.status === 200) {
        toast.success('Uğurla redakdə edildi.', toast_config);
        setIsOpenEditModal(false)
        setData(prevState => {
          const selectedItem = prevState.find(x => x.id === selectedRow.id)
          // console.log("selectedItem old", selectedItem);
          selectedItem.fullname = data.fullname
          // console.log("selectedItem new", selectedItem);
          return prevState
        })
      }
    })

  }

  function addUser(e) {
    e.preventDefault()

      // axios.post(`${apiUrl}/users`, { fullname: newUser, id: Date.now() })
      //   .then(res => {
      //     if (res.status === 201) {
      //       toast.success("Uğurla əlavə edildi!", toast_config)
      //       // console.log("ugurlu");
      //       console.log(res.data);
      //       // setData(...data, {fullname: newUser, id:Date.now()})
      //       // setData(prevState => [...prevState, { fullname: newUser, id: Date.now() }])
      //       setNewUser("")
      //       setIsOpenCreateModal(false)

      //     }
      //   })

    axios.post(`${apiUrl}/users`, { fullname: newUser })
      .then(res => {
        if (res.status === 201) {
          toast.success("Uğurla əlavə edildi!", toast_config)
          setData(prevData => [...prevData, res.data])
          console.log(res);
          setNewUser("")
          setIsOpenCreateModal(false)
        }
      })
  }

  return (
    <div className='container'>
      <div className="home-wrapper">

        <ProCard>

          {
            !data.length ?
              <Alert
                color='warning'
              >
                Məlumat yoxdur!
              </Alert>
              :
              <div>
                <Button
                  color="success"
                  className='mb-4'
                  onClick={() => setIsOpenCreateModal(true)}
                >
                  Add user
                </Button>
                <Table hover>
                  <tbody>
                    {
                      data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.fullname}</td>
                          <td>
                            <Button
                              color='primary'
                            >
                              <Link className='text-white text-decoration-none' to={`users/${item.id}`} >
                                Ətraflı
                              </Link>
                            </Button>
                            <Button
                              color='success'
                              onClick={() => {
                                setIsOpenEditModal(true)
                                setSelectedRow(item)
                              }}
                            >
                              Redaktə et
                            </Button>
                            <Button
                              color='danger'
                              onClick={() => deleteItem(item.id)}
                            >
                              Sil
                            </Button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </div>
          }
        </ProCard>

        {
          selectedRow ? <Modal
            isOpen={isOpenEditModal}
            toggle={() => setIsOpenEditModal(false)}
          >
            <ModalHeader toggle={() => setIsOpenEditModal(false)}>
              Redaktə et
            </ModalHeader>
            <Form onSubmit={(e) => handleEdit(e)} >

              <ModalBody>
                <Input
                  name='fullname'
                  defaultValue={selectedRow.fullname}
                />

              </ModalBody>
              <ModalFooter>
                <Button color="primary">
                  Yadda saxla
                </Button>{' '}
                <Button color="secondary" onClick={() => setIsOpenEditModal(false)}>
                  Ləğv et
                </Button>
              </ModalFooter>
            </Form>
          </Modal> : ''
        }

        <Modal isOpen={isOpenCreateModal} toggle={() => setIsOpenCreateModal(false)} >
          <ModalHeader toggle={() => setIsOpenCreateModal(false)}>Modal title</ModalHeader>
          <Form onSubmit={(e) => addUser(e)} >
            <ModalBody>
              <Label htmlFor="fullname">Əlavə edin</Label>
              <Input
                id='fullname'
                name='fullname'
                // defaultValue={(e) => setNewUser(e.target.value)}
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" >
                Do Something
              </Button>
              <Button color="secondary" onClick={() => setIsOpenCreateModal(false)} >
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

      </div>
    </div>
  )
}

export default Home 