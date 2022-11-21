import TooltipRc from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css';
import { ReactNode } from 'react'

type PosicaoType = 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' |
    'bottomLeft' | 'bottomRight' | 'rightTop' | 'rightBottom' | 'leftTop' | 'leftBottom';
interface Props {
    label: JSX.Element;
    placement?: PosicaoType;
    children: ReactNode;
    classLabel?: string;
}

export const Tooltip = ({ children, label, placement = "top" }: Props) => {
    return (
        <TooltipRc
            placement={placement}
            trigger={'hover'}
            overlay={label}
            overlayInnerStyle={{
                opacity: 1,
                borderRadius: '6px',
                backgroundColor: '#3c3266',
                minHeight: '10px',
                padding: '5px 12px',
            }}
            overlayStyle={{
                backgroundColor: 'transparent',
            }}
        >
            {children as React.ReactElement}
        </TooltipRc>
    )
};

