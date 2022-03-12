import { ReactNode, FC } from 'react'
import styled from "styled-components";



type Props = { 
    children: ReactNode,
    // All other props
  [x:string]: any;
   }

const Button: FC<Props> = ({children, ...rest}) => (<StyledButton {...rest}>
    {children}
    </StyledButton>)

export default Button;

export const StyledButton = styled.button`
    
border:none;
background-color:green;
padding:0.2rem 0.8rem;
border-radius:5px;
color:white;
`;


