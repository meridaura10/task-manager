import React, { useState } from 'react'
import RegistrationForm from '../components/RegistrationForm'
import { Layout, Row } from 'antd'
const RegistrationPage: React.FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className='h100'>
                <RegistrationForm />
            </Row>
        </Layout>
    )
}

export default RegistrationPage