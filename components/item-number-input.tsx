import { InputNumber } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import styles from "../styles/components/item-number-input.module.scss";

interface ItemNumberInputProps {
    className?: string;
    value: number;
    onChange: (e: number | null) => void;
    min: number;
    max: number;
}

export default function ItemNumberInput(props: ItemNumberInputProps) {
    const changeCount = (op: "INC" | "DEC") => {
        switch (op) {
            case "INC":
                return () => {
                    if (props.max !== undefined && props.value < props.max) {
                        props.onChange(props.value + 1);
                    }
                };
            case "DEC":
                return () => {
                    if (props.min !== undefined && props.value > props.min) {
                        props.onChange(props.value - 1);
                    }
                };
        }
    };

    return (
        <InputNumber
            className={props.className}
            controls={false}
            addonBefore={
                <div
                    className={styles.divCountControl}
                    onClick={changeCount("DEC")}>
                    <MinusOutlined />
                </div>
            }
            addonAfter={
                <div
                    className={styles.divCountControl}
                    onClick={changeCount("INC")}>
                    <PlusOutlined />
                </div>
            }
            value={props.value}
            onChange={props.onChange}
            min={props.min}
            max={props.max}
            step={1}
        />
    );
}
