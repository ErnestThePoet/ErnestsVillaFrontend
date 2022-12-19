import { Rule } from "antd/lib/form";

export const ACCOUNT_RULES: Rule[] = [
    {
        required: true,
        message: "请输入登录账号"
    },
    {
        min: 3,
        message: "登录账号长度在3-10之间"
    },
    {
        max: 10,
        message: "登录账号长度在3-10之间"
    },
    {
        pattern: /^[\da-zA-Z_-]+$/,
        message: "登录账号只能包含字母/数字/下划线和'-'"
    }
];

export const PW_RULES: Rule[] = [
    {
        required: true,
        message: "请输入密码"
    },
    {
        min: 5,
        message: "密码长度在5-15之间"
    },
    {
        max: 15,
        message: "密码长度在5-15之间"
    }
];

export const BANK_ACCOUNT_RULES: Rule[] = [
    {
        required: true,
        message: "请输入登录账号"
    },
    {
        min: 3,
        message: "登录账号长度在3-10之间"
    },
    {
        max: 10,
        message: "登录账号长度在3-10之间"
    },
    {
        pattern: /^[\da-zA-Z_-]+$/,
        message: "登录账号只能包含字母/数字/下划线和'-'"
    }
];

export const BANK_PW_RULES: Rule[] = [
    {
        required: true,
        message: "请输入密码"
    },
    {
        min: 4,
        message: "密码长度在4-15之间"
    },
    {
        max: 15,
        message: "密码长度在5-15之间"
    }
];

export const BANK_PAYMENT_PW_RULES: Rule[] = [
    {
        required: true,
        message: "请输入支付密码"
    },
    {
        min: 4,
        message: "支付密码长度在4-15之间"
    },
    {
        max: 15,
        message: "支付密码长度在5-15之间"
    }
];

export const ITEM_NAME_RULES: Rule[] = [
    {
        required: true,
        message: "请输入商品名称"
    },
    {
        max: 50,
        message: "商品名称最大长度为50"
    }
];

export const ITEM_DESCRIPTION_RULES: Rule[] = [
    {
        required: true,
        message: "请输入商品描述"
    },
    {
        max: 1000,
        message: "商品描述最大长度为1000"
    }
];

export const CONSIGNEE_NAME_RULES: Rule[] = [
    {
        required: true,
        message: "请输入收件人姓名"
    },
    {
        max: 25,
        message: "收件人姓名最大长度为25"
    }
];

export const CONSIGNEE_ADDRESS_RULES: Rule[] = [
    {
        required: true,
        message: "请输入收货地址"
    },
    {
        max: 250,
        message: "收货地址最大长度为250"
    }
];

export const CONSIGNEE_PHONE_NUMBER_RULES: Rule[] = [
    {
        required: true,
        message: "请输入收件人电话号码"
    },
    {
        max: 20,
        message: "收件人电话号码最大长度为20"
    },
    {
        pattern: /^\d+$/,
        message: "收件人电话号码只能包含数字"
    }
];
