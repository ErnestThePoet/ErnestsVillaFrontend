import React from "react";
import { observer } from "mobx-react-lite";
import * as L from "../../logics/components/dialogs/change-pw-dialog";
import * as RULES from "../../modules/form-rules";
import { Button, Form, Input, Modal } from "antd";
import changePwDialogState from "../../states/change-pw-dialog-state";

const ChangePwDialog: React.FC = observer(() => {
    return (
        <Modal
            destroyOnClose
            title="修改密码"
            open={changePwDialogState.isOpen}
            onCancel={() => changePwDialogState.setIsOpen(false)}
            footer={null}>
            <Form name="form_change_pw" onFinish={() => L.changePw()}>
                <Form.Item name="oldPw" label="原密码:" rules={RULES.PW_RULES}>
                    <Input
                        type="password"
                        placeholder="请输入原密码"
                        value={changePwDialogState.oldPw}
                        onChange={e =>
                            changePwDialogState.setOldPw(e.target.value)
                        }
                    />
                </Form.Item>

                <Form.Item name="newPw" label="新密码:" rules={RULES.PW_RULES}>
                    <Input
                        type="password"
                        placeholder="请输入新密码"
                        value={changePwDialogState.newPw}
                        onChange={e =>
                            changePwDialogState.setNewPw(e.target.value)
                        }
                    />
                </Form.Item>

                <Form.Item
                    name="newPwConfirm"
                    label="请确认:"
                    rules={[
                        {
                            required: true,
                            message: "请输入密码"
                        }
                    ]}>
                    <Input
                        type="password"
                        placeholder="请确认新密码"
                        value={changePwDialogState.newPwConfirm}
                        onChange={e =>
                            changePwDialogState.setNewPwConfirm(e.target.value)
                        }
                    />
                </Form.Item>

                <Form.Item
                    validateStatus="error"
                    help={changePwDialogState.resultMsg}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={changePwDialogState.isConfirmLoading}>
                        修改密码
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default ChangePwDialog;
