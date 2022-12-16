import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import * as RULES from "../../modules/form-rules";
import type {
    BankAccountBindResult,
    FormSubmitResult
} from "../../modules/types";
import { BankAccountBindDialog } from "../dialogs/bank-account-bind-dialog";

interface SignupFormProps {
    onFinish: (
        account: string,
        password: string,
        passwordConfirm: string,
        bankAccountBindResult: BankAccountBindResult,
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

    const [isBindBankAccountDialogOpen, setIsBindBankAccountDialogOpen] =
        useState(false);

    const [bankAccountBindResult, setBankAccountBindResult] =
        useState<BankAccountBindResult>({
            bank1Account: "",
            bank1Success: false,
            bank2Account: "",
            bank2Success: false
        });

    return (
        <Form
            name="form_signup"
            initialValues={{ remember: true }}
            onFinish={e =>
                props.onFinish(
                    e.account,
                    e.password,
                    e.passwordConfirm,
                    bankAccountBindResult,
                    setIsSigningUp,
                    setSignupResult
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

            <Form.Item name="passwordConfirm" rules={RULES.PW_RULES}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="请确认登录密码"
                />
            </Form.Item>

            <Form.Item>
                <Button
                    style={{ padding: 0 }}
                    type="link"
                    onClick={() => setIsBindBankAccountDialogOpen(true)}>
                    绑定网银账号
                </Button>

                <BankAccountBindDialog
                    isOpen={isBindBankAccountDialogOpen}
                    onCancel={() => setIsBindBankAccountDialogOpen(false)}
                    setBindResult={result =>
                        setBankAccountBindResult(
                            Object.assign(bankAccountBindResult, result)
                        )
                    }
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
