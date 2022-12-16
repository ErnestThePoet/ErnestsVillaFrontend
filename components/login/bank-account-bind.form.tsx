import React from "react";
import * as RULES from "../../modules/form-rules";
import { Button, Form, Input, Space } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import type { FormSubmitResult } from "../../modules/types";

interface BankAccountBindFormProps {
    name: string;
    loading: boolean;
    result: FormSubmitResult;
    onFinish: (values: any) => void;
}

export function BankAccountBindForm(props: BankAccountBindFormProps) {
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
                {props.result.success ? (
                    <Space style={{ width: "100%", justifyContent: "center" }}>
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                        <span>认证通过</span>
                    </Space>
                ) : (
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={props.loading}>
                        提交认证
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
}
