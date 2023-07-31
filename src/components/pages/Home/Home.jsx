import { useEffect, useState } from 'react'
import ProCard from '../../lib/ProCard'
import axios from 'axios'
import { Alert, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import Swal from 'sweetalert2/dist/sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

function Home() {
  const [data, setData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [newEditInput, setNewEditInput] = useState("")

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

  function editItem(newInp) {
    const newData = [...data]

    const { id } = selectedRow
    const item = newData.find(item => item.id === selectedRow.id)
    item.fullname = newInp

    axios.put(`http://localhost:3000/users/${selectedRow.id}`, { fullname: newInp })
      .then(res => {
        if (res.status === 200) {
          setData(newData)
          Swal.fire('Successfull', 'success')
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
                            Ətraflı
                          </Button>
                          <Button
                            color='success'
                            onClick={() => {
                              setIsOpenEditModal(true)
                              setSelectedRow(item)
                              setNewEditInput(item.fullname)

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
            <ModalBody>
              <input type="text"
                value={newEditInput}
                onChange={(e) => setNewEditInput(e.target.value)}
                className='border-0'
              />

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => {
                editItem(newEditInput)
                setIsOpenEditModal(false)
              }}>
                Yadda saxla
              </Button>{' '}
              <Button color="secondary" onClick={() => setIsOpenEditModal(false)}>
                Ləğv et
              </Button>
            </ModalFooter>
          </Modal> : ''
        }

      </div>
    </div>
  )
}

export default Home 