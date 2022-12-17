import axios from "axios";
import type {
    FormSubmitResult,
    BankAccountBindResult
} from "../../../modules/types";
import { message } from "antd";
import { BANK1_APIS, BANK2_APIS } from "../../../modules/bank-apis";
import { BANK_MONKING } from "../../../modules/url-env.mjs";

export function submitBank1Bind(
    account: string,
    password: string,
    paymentPassword: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setResult: React.Dispatch<React.SetStateAction<FormSubmitResult>>,
    setBindResult: (result: BankAccountBindResult) => void
) {
    if (BANK_MONKING) {
        setResult({
            success: true,
            msg: ""
        });

        setBindResult({
            bank1Success: true,
            bank1Account: account
        });

        return;
    }

    setIsLoading(true);

    axios
        .postForm(BANK1_APIS.auth, {
            account,
            password,
            paymentPassword
        })
        .then(res => {
            if (res.data.success) {
                setResult({
                    success: true,
                    msg: ""
                });

                setBindResult({
                    bank1Success: true,
                    bank1Account: account
                });
            } else {
                setResult({
                    success: false,
                    msg: res.data.msg
                });

                setBindResult({
                    bank1Success: false
                });
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);

            setBindResult({
                bank1Success: false
            });
        })
        .finally(() => setIsLoading(false));
}

export function submitBank2Bind(
    account: string,
    password: string,
    paymentPassword: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setResult: React.Dispatch<React.SetStateAction<FormSubmitResult>>,
    setBindResult: (result: BankAccountBindResult) => void
) {
    if (BANK_MONKING) {
        setResult({
            success: true,
            msg: ""
        });

        setBindResult({
            bank2Success: true,
            bank2Account: account
        });

        return;
    }

    setIsLoading(true);

    axios
        .postForm(BANK2_APIS.auth, {
            account,
            password,
            paymentPassword
        })
        .then(res => {
            if (res.data.success) {
                setResult({
                    success: true,
                    msg: ""
                });

                setBindResult({
                    bank2Success: true,
                    bank2Account: account
                });
            } else {
                setResult({
                    success: false,
                    msg: res.data.msg
                });

                setBindResult({
                    bank2Success: false
                });
            }
        })
        .catch(reason => {
            console.log(reason);
            message.error(reason.message);

            setBindResult({
                bank2Success: false
            });
        })
        .finally(() => setIsLoading(false));
}
