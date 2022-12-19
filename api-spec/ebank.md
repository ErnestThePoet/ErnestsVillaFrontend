#### 网银注册
* url:/api/signup
* 请求方法：POST
* 请求参数：表单
{
    account:string;保证不与现有登录名重复
    password:string; 登录密码明文
    paymentPassword:string; 支付密码明文
}
* 返回类型：JSON
* 返回格式：
{
    success:boolean;
	msg:string;
}

#### 登录接口
* url:/api/login
* 请求方法：POST
* 请求参数：表单
{
    account:string, 登录账号明文;
    password:string, 登录密码明文;
}
* 返回类型：json
* 返回格式：
{
    success:boolean, 表示是否成功;
    msg:string，错误信息;
    accessId:string, 会话ID串;
}

#### 账号绑定认证接口
* url:/api/auth
* 请求方法：POST
* 请求参数：表单
{
    account:string, 登录账号明文;
    password:string, 登录密码明文;
    paymentPassword:string;支付密码明文
}
* 返回类型：json
* 返回格式：
{
    success:boolean, 表示是否成功;
    msg:string，错误信息;
}

#### 余额查询
* url:/api/balance_query
* 请求方法：POST
* 请求参数：表单
{
    accessId:string;
}
* 返回类型：json
* 返回格式：
{
    success:boolean, 表示是否登陆成功;
    msg:string，错误信息;
    cents:number;
}

#### 充值
* url:/api/charge
* 请求方法：POST
* 请求参数：表单
{
    accessId:string;
    cents:number;
}
* 返回类型：JSON
* 返回格式：
{
    success:boolean, 表示是否成功;
    msg:string，错误信息;
}

#### 支付
* url:/api/pay
* 请求方法：POST
* 请求参数：表单
{
    accessId:string;
    paymentPassword:string;
    payeeAccount:string;
    timeStamp:string;
    cents:number;
    oimd:string; Base64编码的OIMD
    ds:string; Base64编码的DS
}
* 返回类型：JSON
* 返回格式：
{
    success:boolean, 表示是否成功;
    msg:string，错误信息;
}

#### 获取转账记录
* url:/api/transactions
* 请求方法：POST
* 请求参数：表单
{
    accessId:string;
}
* 返回类型：JSON
* 返回格式：
{
    success:boolean, 表示是否成功;
    msg:string，错误信息;

    transactions:Array<{
        id:number;
        time:number;
        balanceDiffCents:number;
        
        oppositeAccount:string;
        description:string;
    }>
}
