import { faEdit } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import styled from 'styled-components'
import FaIcon from '../../../../common/FaIcon'

const Wrap = styled.span `
  margin-left: 10px;
`

const EditIcon = styled(FaIcon).attrs({
  icon: faEdit
}) `
  cursor: pointer;
`

const EditButton = (props) => {
  return (
    <Wrap>
      <EditIcon {...props} />
    </Wrap>
  )
}

export default EditButton
