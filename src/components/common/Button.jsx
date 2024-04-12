import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Button(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

const StyledButton = styled(Link)`
  width: ${(props) => props.width || "350px"};
  height: ${(props) => props.height || "30px"};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.backgroundColor || "#829FD7"};
  color: ${(props) => props.textColor || "white"};
  font-size: 18px;
  font-weight: 500;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 20px;
`;
