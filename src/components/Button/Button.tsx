import { FC, ComponentPropsWithoutRef } from "react";
import './button.style.scss';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    square?: boolean;
    customClassNames?: string;
}
const Button: FC<ButtonProps> = (
    { square,
      children,
      customClassNames,
      ...props
    }) => (
       <button
            {...props}
            className={`btn ${customClassNames ? customClassNames: ''} ${square ? 'btn__square' : ''}`}
       >
        {children}
       </button> 
    )


export default Button;