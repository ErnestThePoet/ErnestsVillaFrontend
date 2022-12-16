import React, { useState } from "react";
import * as L from "../../logics/components/dialogs/bank-account-bind-dialog";
import { Modal, Tabs } from "antd";
import type {
    BankAccountBindResult,
    FormSubmitResult
} from "../../modules/types";
import { BankAccountBindForm } from "./bank-account-bind-dialog/bank-account-bind.form";

interface BankAccountBindDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    setBindResult: (result: BankAccountBindResult) => void;
}

export function BankAccountBindDialog(props: BankAccountBindDialogProps) {
    const [isBank1Loading, setIsBank1Loading] = useState(false);
    const [isBank2Loading, setIsBank2Loading] = useState(false);

    const [bank1SubmitResult, setBank1SubmitResult] =
        useState<FormSubmitResult>({
            success: false,
            msg: ""
        });

    const [bank2SubmitResult, setBank2SubmitResult] =
        useState<FormSubmitResult>({
            success: false,
            msg: ""
        });

    const tabItems = [
        {
            label: "YYH Bank",
            key: "0",
            children: (
                <BankAccountBindForm
                    name="form_bank_account_bind_1"
                    loading={isBank1Loading}
                    result={bank1SubmitResult}
                    onReBindClick={() => {
                        props.setBindResult({
                            bank1Success: false,
                            bank1Account: ""
                        });

                        setBank1SubmitResult({
                            success: false,
                            msg: ""
                        });
                    }}
                    onFinish={e =>
                        L.submitBank1Bind(
                            e.account,
                            e.password,
                            e.paymentPassword,
                            setIsBank1Loading,
                            setBank1SubmitResult,
                            props.setBindResult
                        )
                    }
                />
            )
        },
        {
            label: "HIT Bank",
            key: "1",
            children: (
                <BankAccountBindForm
                    name="form_bank_account_bind_2"
                    loading={isBank2Loading}
                    result={bank2SubmitResult}
                    onReBindClick={() => {
                        props.setBindResult({
                            bank2Success: false,
                            bank2Account: ""
                        });

                        setBank2SubmitResult({
                            success: false,
                            msg: ""
                        });
                    }}
                    onFinish={e =>
                        L.submitBank2Bind(
                            e.account,
                            e.password,
                            e.paymentPassword,
                            setIsBank2Loading,
                            setBank2SubmitResult,
                            props.setBindResult
                        )
                    }
                />
            )
        }
    ];

    return (
        <Modal
            destroyOnClose
            title="网银账号绑定"
            open={props.isOpen}
            onCancel={props.onCancel}
            footer={null}>
            <Tabs items={tabItems} />
        </Modal>
    );
}
