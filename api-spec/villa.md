#### 注册账号接口
* 请求方法：POST
* 请求参数：表单
{
    account:string;
    bank1Account:string;
    bank2Account:string;
    password:string;
}
* 返回类型：json
* 返回格式：
{
	success:boolean;
	msg:string;
}

#### 手动登录接口 OK
* 请求方法：PUT
* 请求参数：表单
    {
        account:string, 登录账号明文;
        password:string, 登录密码;
        remember:boolean，是否需要7天自动登录;
    }
* 返回类型：json
* 返回格式：
    {
        success:boolean, 表示是否登陆成功;
        msg:string，错误信息;
        account:string;
        bank1Account:string;
        bank2Account:string;
        accessId:string;
        sessionId:string;
    }

#### 自动登录接口 OK
* 请求方法：PUT
* 请求参数：表单
    {
        sessionId:string;
    }
* 返回类型：json
* 返回格式：
    {
        success:boolean, 表示是否登陆成功;
        msg:string;
        account:string;
        bank1Account:string;
        bank2Account:string;
        accessId:string;
    }

#### 退出登录接口 OK
* 请求方法：PUT
* 请求参数：表单
    {
        sessionId:string;
    }
* 返回类型：json
* 返回格式：{}

#### 修改密码接口 OK
* 请求方法：PUT
* 请求参数：表单
    {
        account:string;
        password:string, 登录密码;
        newPassword:string, 新登录密码;
    }
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
}

#### 上传图片
* 请求方法：POST
* 请求参数：表单
    {
        previewImage:File;
    }
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;

    previewImageFileName:string;
}

#### 发布商品
* 请求方法：POST
* 请求参数：表单
    {
        accessId:string;
        name:string;
        description:string;
        previewImageFileName:string;
        remaining:number;
        priceYuan:string;
    }
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
}

#### 修改商品
* 请求方法：PUT
* 请求参数：表单
    {
        accessId:string;
        itemId:number;
        name:string;
        description:string;
        previewImageFileName:string;
        remaining:number;
        priceYuan:string;
    }
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
}

#### 删除商品
* 请求方法：DELETE
* 请求参数：url
    {
        accessId:string;
        itemId:number;
    }
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
}

#### 获取推荐商品
* 请求方法：GET
* 请求参数：url
{
    count:number;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;

    recommendations:Array<{
        itemId:number;
        name:string;
        previewImageFileName:string;
        priceYuan:number;
        purchaseCount:number;
    }>
}

#### 搜索商品
* 请求方法：GET
* 请求参数：url
{
    accessId:string;
    keyword:string;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;

    results:Array<{
        itemId:number;
        name:string;
        previewImageFileName:string;
        priceYuan:number;
        purchaseCount:number;
    }>
}

interface SingleItemDetail {
    itemId: number;
    sellerAccount: string;
    name: string;
    description: string;
    previewImageFileName: string;
    remaining: number;
    priceYuan: string;
    purchaseCount: number;
}

#### 获取商品详情
* 请求方法：GET
* 请求参数：url
{
    accessId:string;
    itemId:number;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;

    itemDetail:Array<SingleItemDetail>
}

interface SingleItemPurchaseWish {
    id:number;
    item: SingleItemDetail;
    count: number;
}

#### 获取购物车列表
* 请求方法：GET
* 请求参数：url
{
    accessId:string;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
    
    cartItems:Array<SingleItemPurchaseWish>
}

#### 添加到购物车
* 请求方法：POST
* 请求参数：表单
{
    accessId:string;
    itemId:number;
    count:number;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
    id:number;
}

#### 从购物车中删除
* 请求方法：DELETE
* 请求参数：url
{
    accessId:string;
    id:number;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
}

#### 修改购物车商品购买数量
* 请求方法：PUT
* 请求参数：表单
{
    accessId:string;
    id:number;
    count:number;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
}

#### 清空用户购物车
* 请求方法：DELETE
* 请求参数：url
{
    accessId:string;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
}

#### 获取待支付订单
* 请求方法：GET
* 请求参数：url
{
    accessId:string;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;

    hasUnpaidPurchase:boolean;

    purchaseId:number;
    totalPriceYuan:string;
    totalPriceCents:number;
    expireTime:number;
    
    sellerPayments:Array<{
        sellerAccount:string;
        totalPriceYuan:string;
        totalPriceCents:number;
    }>;
}

#### 创建订单
* 请求方法：POST
* 请求参数：
{
    accessId:string;
    items:Array<{
        itemId:number;
        count:number;
    }>;
    consigneeName:string;
    consigneeAddress:string;
    consigneePhoneNumber:string;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;

    purchaseId:number;
    totalPriceYuan:string;
    totalPriceCents:number;
    expireTime:number;

    sellerPayments:Array<{
        sellerAccount:string;
        totalPriceYuan:string;
        totalPriceCents:number;
    }>;
}

#### 取消订单
* 请求方法：DELETE
* 请求参数：url
{
    accessId:string;
    purchaseId:number;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
}

#### 付款完成后完成订单
* 请求方法：POST
* 请求参数：表单
{
    accessId:string;
    purchaseId:number;(OI)

    timeStamp:string;(OI)
    pimd:string; Base64编码的PIMD
    ds:string; Base64编码的DS
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;
}

interface SinglePurchasedItemDetail {
    purchaseId: number;
    sellerAccount: string;
    itemId: number;
    count: number;
    paymentYuan: string;
    purchaseTime: number;

    name: string;
    previewImageFileName: string;
}

#### 获取所有订单
* 请求方法：GET
* 请求参数：url
{
    accessId:string;
}
* 返回类型：json
* 返回格式：
{
    success:boolean;
    msg:string;

    purchasedItemDetails:Array<SinglePurchasedItemDetail>;
}