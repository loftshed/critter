import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
const HomeFeed = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Wrapper>HomeFeed</Wrapper>
      </div>
    </>
  );
};

export default HomeFeed;

const Wrapper = styled.div``;
