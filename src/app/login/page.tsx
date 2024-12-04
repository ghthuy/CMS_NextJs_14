'use client'
import { Button, Form, Input } from 'antd';
import '@/styles/pages/Login.scss';
import Image from 'next/image';

const LoginPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    return (
        <div className='login-page'>
            <div className='login-page--ins'>
                <div className='form-wrapper'>
                    <figure>
                        <Image
                            src="/images/logo.svg"
                            alt="CMS Network"
                            width={80}
                            height={80}
                        />
                    </figure>
                    <h1>CMS Network</h1>
                    <p>Log in to your CMS</p>
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={onFinish} // Handle form submission
                    >
                        <Form.Item
                            label="Email / Username"
                            name="username" // Add 'name' to identify the field
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Email / Username!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your email" className="h-12" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password" // Add 'name' to identify the field
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="••••••••" className="h-12" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className='login-page--ins'></div>
        </div>
    );
};

export default LoginPage;
