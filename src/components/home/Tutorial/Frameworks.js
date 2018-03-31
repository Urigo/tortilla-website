import React from 'react'
import styled from 'styled-components'

const FrameworkImagePlaceholder = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${props => props.theme.primaryGray};
  box-shadow: ${props => props.theme.boxShadow};
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
