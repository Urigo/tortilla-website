import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Point = styled.div`
  position: absolute;
  left: -8px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: solid 1px #0e324c;
`

const Line = styled.div`
  border-left: 1px solid #0e324c;
  padding-left: 20px;
`

const EventDate = Line.extend`
  font-size: 10px;
  font-weight: 300;
  font-style: italic;
  color: #718696;
`

const Author = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const AuthorName = styled.div`
  margin-left: 5px;
  font-size: 12px;
  font-weight: normal;
  color: ${({ theme }) => theme.white};
`

const AuthorImage = styled.div`
  margin: 0;
  width: 20px;
  height: 20px;
  background-color: #718696;
  border-radius: 50%;
`

const Details = styled.div`
  padding: 5px 5px 0 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Name = styled.div`
  padding: 10px;
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  color: ${({ theme }) => theme.white};
`

const EventBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
`

const EventMain = Line.extend`
  position: relative;
  padding-bottom: 35px;
`

const Event = styled.div`
  ${EventBlock} {
    background-color: ${({ theme, active }) =>
      active ? '#0e324c' : '#1d4866'};
    border: solid 1px
      ${({ theme, active }) => (active ? theme.primaryBlue : '#0e324c')};
  }

  ${Point} {
    background-color: ${({ theme, active }) =>
      active ? theme.primaryBlue : '#1d4866'};
  }

  ${AuthorImage} {
    border: 1px solid
      ${({ theme, active }) =>
        active ? theme.white : 'rgba(210, 213, 222, 0.37)'};
  }
`

const Container = styled.div`
  padding: 15px 15px 15px 25px;
  display: flex;
  flex-direction: column;

  ${Event}:first-child > ${EventDate} {
    border-left: 0 none;
  }

  ${Event}:last-child > ${EventMain} {
    border-left: 0 none;
  }
`
export default class Timeline extends React.Component {
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.any),
    active: PropTypes.any,
    onSelect: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      active: props.active,
    }
  }

  select(event) {
    if (this.isActive(event)) {
      return
    }

    this.setState({
      active: event.id,
    })

    if (this.props.onSelect) {
      this.props.onSelect(event)
    }
  }

  isActive(event) {
    return event.id === this.state.active
  }

  renderEvent(event) {
    const active = this.isActive(event)

    return (
      <Event key={event.id} active={active} onClick={() => this.select(event)}>
        <EventDate>{event.date}</EventDate>
        <EventMain>
          <Point />
          <EventBlock>
            <Details>
              <Author>
                <AuthorImage />
                <AuthorName>{event.author.name}</AuthorName>
              </Author>
            </Details>
            <Name>{event.name}</Name>
          </EventBlock>
        </EventMain>
      </Event>
    )
  }

  render() {
    return (
      <Container>
        {this.props.events.map(event => this.renderEvent(event))}
      </Container>
    )
  }
}
