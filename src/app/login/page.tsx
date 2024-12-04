'use client'
import { Button, Form, Input } from 'antd';

const LoginPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    return (
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
                <Input placeholder="Enter your email" />
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
                <Input.Password placeholder="••••••••" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Sign in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginPage;
