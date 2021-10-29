import { color } from '@assets/color';
import { Layout, Menu, Card } from 'antd';
import { useEffect, useState } from 'react'


interface IProps {
    value: number;
    title: string;
    animate?: boolean;
    color: string;
}

export default function CartNumber(props: IProps) {

    const maxValue = 1000
    const seed = Math.pow(10, 5 - maxValue.toString().length);
    // console.log(seed)

    const [_value, set_value] = useState(props.value)
    const [_countdown, set_countdown] = useState(null)

    useEffect(() => {
        if (!!props.animate)
            return set_countdown(
                setInterval(() => {
                    set_value(_value => _value + 1);
                }, seed)
            )
    }, [props.animate])

    useEffect(() => {
        if (_value >= maxValue) {
            clearInterval(_countdown)
            set_countdown(null)
            // return set_countdown(null)
        }
    }, [_value])

    useEffect(() => {
        set_value(_value)
    }, [props.value])

    return (
        <Card style={{
            width: 250, display: 'flex',
            justifyContent: 'center', alignItems: 'center',
            backgroundColor: color.sectionDark, border: 0, 
            boxShadow: '0 0 6px 0px #00000017'
        }}>
            <div>
                <div style={{ fontSize: '1.9rem', color: props.color }}>{_value}</div>
                <b style={{ textAlign: 'center', display: 'block', color: "#fff" }}>{props.title}</b>
            </div>
        </Card>
    )
}