import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import * as RULES from "../../modules/form-rules";
import { FormSubmitResult } from "../../modules/types";

interface SignupFormProps {
    onFinish: (
        setIsSigningUp: React.Dispatch<React.SetStateAction<boolean>>,
        setSignupResult: React.Dispatch<React.SetStateAction<FormSubmitResult>>
    ) => void;
}

export default function SignupForm(props: SignupFormProps) {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [signupResult, setSignupResult] = useState<FormSubmitResult>({
        success: false,
        msg: ""
    });

    return (
        <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={() => props.onFinish(setIsSigningUp, setSignupResult)}>
            <Form.Item name="signup_username" rules={RULES.ACCOUNT_RULES}>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    id="in-signup-account"
                    placeholder="请输入登录账号"
                />
            </Form.Item>

            <Form.Item name="signup_password" rules={RULES.PW_RULES}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    id="in-signup-password"
                    placeholder="请输入登录密码"
                />
            </Form.Item>

            <Form.Item name="signup_password_confirm" rules={RULES.PW_RULES}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    id="in-signup-password-confirm"
                    placeholder="请确认登录密码"
                />
            </Form.Item>

            <Form.Item validateStatus="error" help={signupResult.msg}>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={isSigningUp}>
                    注册
                </Button>
            </Form.Item>
        </Form>
    );
}
