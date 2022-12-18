import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import * as RULES from "../../modules/form-rules";
import type { FormSubmitResult } from "../../modules/types";
import type {
    SetFormSubmitResultFn,
    SetLoadingFn
} from "../../modules/fn-types";

interface LoginFormProps {
    onFinish: (
        account: string,
        password: string,
        remember: boolean,
        setIsLoggingIn: SetLoadingFn,
        setLoginResult: SetFormSubmitResultFn
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
            name="form_login"
            initialValues={{ remember: true }}
            onFinish={e =>
                props.onFinish(
                    e.account,
                    e.password,
                    e.remember,
                    setIsLoggingIn,
                    setLoginResult
                )
            }>
            <Form.Item name="account" rules={RULES.ACCOUNT_RULES}>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入登录账号"
                />
            </Form.Item>

            <Form.Item name="password" rules={RULES.PW_RULES}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="请输入登录密码"
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" noStyle>
                    <Checkbox>7日内自动登录</Checkbox>
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
