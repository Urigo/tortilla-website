import React from 'react'
import styled from 'styled-components'

const Versions = styled.div`
  flex: 0 0 145px;
  padding-right: 25px;

  & > * {
    margin-bottom: 10px;
  }
`

const Version = styled.div`
  padding: 0 10px;
  border-radius: 3px;
  border: solid 1px
    ${({ active, theme }) => (active ? theme.primaryBlue : theme.primaryGray)};
  font-size: 10px;
  font-weight: normal;
  color: ${({ active, theme }) =>
    active ? theme.primaryBlue : theme.primaryGray};
`

export default props => (
  <Versions className={props.className}>
    {props.versions.map((version, i) => (
      <Version key={i} active={version.active}>
        {version.name}
      </Version>
    ))}
  </Versions>
)
