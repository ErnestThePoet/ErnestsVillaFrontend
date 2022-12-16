import React from "react";
import * as RULES from "../../../modules/form-rules";
import { Button, Form, Input, Space, Result } from "antd";
import type { FormSubmitResult } from "../../../modules/types";

interface BankAccountBindFormProps {
    name: string;
    loading: boolean;
    result: FormSubmitResult;
    onReBindClick: () => void;
    onFinish: (values: any) => void;
}

export function BankAccountBindForm(props: BankAccountBindFormProps) {
    if (props.result.success) {
        return (
            <Result
                status="success"
                title="认证成功"
                extra={[
                    <Button key="0" type="link" onClick={props.onReBindClick}>
                        重新认证
                    </Button>
                ]}
            />
        );
    }

    return (
        <Form name={props.name} onFinish={props.onFinish}>
            <Form.Item
                name="account"
                label="银行账号:"
                rules={RULES.BANK_ACCOUNT_RULES}>
                <Input placeholder="银行账号" />
            </Form.Item>

            <Form.Item
                name="password"
                label="银行密码:"
                rules={RULES.BANK_PW_RULES}>
                <Input type="password" placeholder="请输入银行密码" />
            </Form.Item>

            <Form.Item
                name="paymentPassword"
                label="支付密码:"
                rules={RULES.BANK_PAYMENT_PW_RULES}>
                <Input type="password" placeholder="请输入银行支付密码" />
            </Form.Item>

            <Form.Item validateStatus="error" help={props.result.msg}>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={props.loading}>
                    提交认证
                </Button>
            </Form.Item>
        </Form>
    );
}
