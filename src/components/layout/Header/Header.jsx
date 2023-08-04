import React, { useEffect } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import axios from 'axios'

function Header() {

        // const addUser = () => {
        //     axios.post('http://localhost:3000/users', {
        //         fullname: 'Murad Ibrahimov'
        //     }).then(res => console.log("Post data", res))
        // }

    return (
        <div className='container'>
            <div className='header-wrapper d-flex justify-content-between align-items-center'>
                <div className=''>
                    <Logo />
                    <Link
                        to='/posts'
                        style={{
                            marginLeft: "50px",
                            color: "#fff"
                        }}
                        className='btn'
                    >
                        Posts
                    </Link>
                </div>
                <div>
                    <Button
                        color="light"
                        style={{
                            color: '#5E72E4',
                            fontSize: '14px'
                        }}
                        // onClick={addUser}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header