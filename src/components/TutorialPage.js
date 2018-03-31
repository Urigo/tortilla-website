import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: inherit;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const SideMenu = styled.div`
  flex: 0 0 auto;
  background: #0e324c;
  align-self: stretch;
`

const Content = styled.div`
  flex: 1 0 auto;
  background-color: #fff;
`

const Sections = styled.div`
  display: flex;
  flex-direction: column;
`

export default props => {
  return (
    <Container>
      <SideMenu>
        <div style={{ width: 72 }} />
        <Sections>
          {props.tutorial.version.steps.map((step, i) => (
            <div key={i}>
              {step.id} {step.name}
            </div>
          ))}
        </Sections>
      </SideMenu>
      <Content dangerouslySetInnerHTML={{ __html: props.step.html }} />
    </Container>
  )
}
