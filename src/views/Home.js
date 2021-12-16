import React from 'react';
import styled from 'styled-components';

const DivStyle = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Home() {
  return (
    <DivStyle>
      <img
        src="https://i.ibb.co/n69w0F5/about-for-the-home-page-2.png"
        alt="about luna yogi"
        style={{
          width: '60%',
          height: 'auto',
        }}
      />
    </DivStyle>
  );
}
