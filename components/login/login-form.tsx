import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import * as RULES from "../../modules/form-rules";
import { FormSubmitResult } from "../../modules/types";

interface LoginFormProps {
    onFinish: (
        setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>,
        setLoginResult: React.Dispatch<React.SetStateAction<FormSubmitResult>>
    ) => void;
}

export default function LoginForm(props: LoginFormProps) {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginResult, setLoginResult] = useState<FormSubmitResult>({
        success: false,
        msg: ""
    });

    return (
        <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={() => props.onFinish(setIsLoggingIn, setLoginResult)}>
            <Form.Item name="login_username" rules={RULES.ACCOUNT_RULES}>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    id="in-login-account"
                    placeholder="请输入登录账号"
                />
            </Form.Item>

            <Form.Item name="login_password" rules={RULES.PW_RULES}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    id="in-login-password"
                    placeholder="请输入登录密码"
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="login_remember" noStyle>
                    <Checkbox id="cb-remember">7日内自动登录</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item validateStatus="error" help={loginResult.msg}>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={isLoggingIn}>
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
}
