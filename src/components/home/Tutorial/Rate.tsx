import * as React from 'react'
import styled from 'styled-components'
import * as Rating from 'react-rating'
import * as FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'

const EmptyStar = styled(FontAwesomeIcon).attrs({
  icon: faStar,
})`
  font-size: 16px;
  color: #e6ecf4;
  margin-right: 2px;
`

const FullStar = EmptyStar.extend`
  color: #f5b957;
`

const TutorialRateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * {
    margin-right: 5px;
  }
`

const Rates = props => (
  <Rating
    initialRating={4}
    emptySymbol={<EmptyStar />}
    fullSymbol={<FullStar />}
  />
)

const Voters = styled.div`
  font-size: 10px;
  font-weight: 300;
  color: #b6b8c2;
`

export default props => (
  <TutorialRateContainer>
    <Rates />
    <Voters>5.2K Voters</Voters>
  </TutorialRateContainer>
)
