import React from "react";
import * as RULES from "../../modules/form-rules";
import { Button, Form, Input } from "antd";
import type { FormSubmitResult } from "../../modules/types";

interface BankLoginPayFormProps {
    pay: boolean;

    loginName: string;
    payName: string;

    accountDisplay: string;

    loginLoading: boolean;
    payLoading: boolean;

    loginResult: FormSubmitResult;
    payResult: FormSubmitResult;

    onLoginFinish: (values: any) => void;
    onPayFinish: (values: any) => void;
}

export function BankLoginPayForm(props: BankLoginPayFormProps) {
    if (props.pay) {
        return (
            <Form name={props.payName} onFinish={props.onPayFinish}>
                <Form.Item>
                    <b>{`输入${props.accountDisplay}的支付密码：`}</b>
                </Form.Item>

                <Form.Item
                    name="paymentPassword"
                    label="银行支付密码:"
                    rules={RULES.BANK_PAYMENT_PW_RULES}>
                    <Input type="password" placeholder="请输入银行支付密码" />
                </Form.Item>

                <Form.Item validateStatus="error" help={props.payResult.msg}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={props.payLoading}>
                        支付
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    return (
        <Form
            name={props.loginName}
            onFinish={props.onLoginFinish}
            layout="vertical">
            <Form.Item>
                <b>{`登录${props.accountDisplay}的银行账号：`}</b>
            </Form.Item>

            <Form.Item
                name="password"
                label="银行登录密码:"
                rules={RULES.BANK_PW_RULES}>
                <Input type="password" placeholder="请输入银行登录密码" />
            </Form.Item>

            <Form.Item validateStatus="error" help={props.loginResult.msg}>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={props.loginLoading}>
                    登录银行
                </Button>
            </Form.Item>
        </Form>
    );
}
