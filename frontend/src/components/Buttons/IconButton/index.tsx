import { ButtonHTMLAttributes, ReactNode } from 'react';
import classes from './style.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => {
    return (
        <button {...props} type="button" title="icon-button" className={classes.iconButton}>
            {children}
        </button>
    )
}

export default IconButton;