import { Menu, MenuItem, MenuButton, MenuDivider, MenuItemProps } from '@szhsin/react-menu';
import { ReactNode } from 'react';

import '@szhsin/react-menu/dist/index.css';

interface IDropdownV2Props {
    menuButton: JSX.Element;
    children: ReactNode;
    posicao?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    className?: string;
}

export const Dropdown = ({ menuButton, children, posicao = 'bottom', className, align }: IDropdownV2Props) => {
    return (
        <Menu
            menuButton={<MenuButton>{menuButton}</MenuButton>}
            offsetX={6}
            offsetY={6}
            direction={posicao}
            align={align}
            menuClassName={`min-w-[80px] py-[4px] ${className} `}
        >
            {children}
        </Menu>
    );
};

export const DropdownV2Menu = (props: MenuItemProps) => {
    return (
        <MenuItem {...props} className={`hover:bg-cinza px-10px`}>
            {props.children}
        </MenuItem>
    );
};

export const DropdownV2Divide = () => {
    return <MenuDivider className="my-[4px]" />;
};
