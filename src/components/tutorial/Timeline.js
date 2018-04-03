import React from 'react'
import styled from 'styled-components'

const Event = styled.div``

const Point = styled.div`
  position: absolute;
  left: -8px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme, active }) =>
    active ? theme.primaryBlue : '#1d4866'};
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
  border: 1px solid ${({ theme }) => theme.white};
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
`

const EventMain = Line.extend`
  position: relative;
  padding-bottom: 35px;

  & > ${EventBlock} {
    border-radius: 3px;
    background-color: ${({ theme, active }) =>
      active ? '#0e324c' : '#1d4866'};
    border: solid 1px
      ${({ theme, active }) => (active ? theme.primaryBlue : '#0e324c')};
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

const events = [
  {
    date: 'November 27, 2017',
    name: 'Angular 4.4.3 + Meteor 1.6',
    author: 'Nathan Fisher',
    versions: [],
  },
  {
    date: 'November 27, 2017',
    name: 'Ionic 3',
    author: 'Terry Andrews',
    versions: [],
  },
  {
    date: 'November 27, 2017',
    name: 'Socially Merge Version',
    author: 'Judith Lawrence',
    versions: [],
  },
]

export default props => (
  <Container>
    {props.events.map((event, i) => (
      <Event key={i} active={i === 0}>
        <EventDate>{event.date}</EventDate>
        <EventMain active={i === 0}>
          <Point active={i === 0} />
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
    ))}
  </Container>
)
