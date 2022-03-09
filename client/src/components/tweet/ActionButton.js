import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

const ActionButton = ({ children, color, onClick }) => {
  const [bgColor, setBgColor] = useState("transparent");
  return (
    <Wrapper
      style={{ backgroundColor: bgColor }}
      onMouseEnter={() => setBgColor(color)}
      onMouseLeave={() => setBgColor("transparent")}
      onClick={onClick}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  transition: 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* margin: auto; */
  border: none;
  border-radius: 50%;
  height: 26px;
  width: 26px;
  color: white;
  cursor: pointer;
`;

export default ActionButton;
