import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

import { Container } from './Menu'

export const SubMenu = Container.extend`
  width: 270px;
  background-color: #1d4866;
`

export const SubMenuHeader = styled.div`
  position: relative;
  padding: 0 25px;
  border-bottom: 1px solid #0e324c;
`

export const SubMenuHeaderTitle = styled.div`
  margin: 10px 0;
  font-size: 24px;
  font-weight: 800;
  color: #092133;
  text-transform: uppercase;
`

export const SubMenuHeaderSubtitle = styled.div`
  margin: 10px 0;
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.white};
`

export const SubMenuHeaderClose = styled(FontAwesomeIcon).attrs({
  icon: faTimes,
}) `
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 16px;
  color: #0e324c;
  cursor: pointer;
`
