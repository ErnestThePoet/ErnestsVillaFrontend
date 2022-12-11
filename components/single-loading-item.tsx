import { Space,Skeleton } from "antd";

export default function SingleLoadingItem() {
    return (
        <Space>
            <Skeleton.Image active={true} />
            <Skeleton active style={{width:30}} />
        </Space>
    );
}