import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProCard from '../lib/ProCard'
import axios from 'axios'
import { Container } from 'reactstrap'

function UserItem() {
    const params = useParams()
    const [userData, setUserData] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${params.id}`)
            .then(res => {
                if (res.status === 200) {
                    setUserData(res.data)
                }
            })
    }, [])

    console.log(userData);
    return (
        <Container>
            <div className='user-details'>
                <ProCard>
                    <h5>User</h5>
                    <span className='username d-flex gap-1'>
                        Name:
                        <Link className='user text-decoration-none'>
                            {userData.fullname}
                        </Link>
                    </span>
                </ProCard>
            </div>
        </Container>
    )
}

export default UserItem