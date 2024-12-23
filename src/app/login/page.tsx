'use client'
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema';
import authApiRequest from '@/apiRequests/auth';
import accountApiRequest from '@/apiRequests/account';
import { getDeviceId, getDeviceInfo } from '@/lib/utils';
import { handleErrorApi } from '@/lib/utils';


import '@/styles/pages/Login.scss';
import { useAppContext } from "@/app/app-provider";

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useAppContext();
    const [messageApi, contextHolder] = message.useMessage();

    // const form = useForm<LoginBodyType>({
    //     resolver: zodResolver(LoginBody),
    //     defaultValues: {
    //       email: '',
    //       password: ''
    //     }
    //   })

    const onFinish = async (values: LoginBodyType) => {
        if (loading) return
        setLoading(true)
        try {
            const deviceInfo = getDeviceInfo();
            const loginPayload = {
                ...values,
                deviceId: getDeviceId(),
                deviceName: `${deviceInfo?.browser} ${deviceInfo?.deviceName} ${deviceInfo?.deviceType} ${deviceInfo?.os}`,
            };
            const result = await authApiRequest.login(loginPayload)
            await authApiRequest.auth({
                sessionToken: result.payload?.result?.access_token,
                expiresAt: result.payload?.result?.expires
            })
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công',
            });
            setUser(result.payload?.result?.access_token);
            const profile = await accountApiRequest.me(result.payload?.result?.access_token ?? '');
            console.log("profile", profile);
            router.push('/overview')
            router.refresh()

        } catch (error: any) {
            handleErrorApi({
                error,
                setError: form.setError
            })

        } finally {
            setLoading(false)
        }
    };
    return (
        <div className='login-page'>
            {contextHolder}
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
                            <Button type="primary" htmlType="submit" loading={loading}>
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
