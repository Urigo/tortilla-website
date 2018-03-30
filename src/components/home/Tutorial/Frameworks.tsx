import * as React from 'react'
import styled from 'styled-components'

const FrameworkImagePlaceholder = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #d2d5de;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`

const FrameworksContainer = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 5px;
  }
`
export default props => (
  <FrameworksContainer>
    <FrameworkImagePlaceholder />
    <FrameworkImagePlaceholder />
    <FrameworkImagePlaceholder />
  </FrameworksContainer>
)
