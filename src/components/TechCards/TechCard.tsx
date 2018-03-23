import * as React from 'react'

const TechCard = props => (
  <div
    style={{
      flex: 1,
      padding: '0 30px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: '270px',
      backgroundImage: `linear-gradient(141deg, ${props.colors.from}, ${
        props.colors.to
      })`,
      border: 'solid 1px #f2f5f7',
    }}
  >
    <div
      style={{
        flex: '1 0 190px',
        paddingRight: '15px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '30px',
          width: '190px',
          height: '100%',
          borderRadius: '15px',
          backgroundImage: `linear-gradient(149deg, ${props.colors.from}, ${
            props.colors.to
          })`,
          boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.12)',
        }}
      />
    </div>
    <div
      style={{
        flex: '1 1 auto',
        padding: '35px 0 20px 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#fff',
          }}
        >
          Get Started with
        </div>
        <div
          style={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#fff',
          }}
        >
          {props.name}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          fontWeight: 300,
          color: '#fff',
        }}
      >
        {props.text}
      </div>
      <div>
        <div
          style={{
            display: 'inline-block',
            padding: '10px 45px',
            borderRadius: '3px',
            backgroundColor: '#fff',
            fontSize: '14px',
            fontWeight: 400,
            textAlign: 'center',
            color: props.colors.link,
            boxShadow: `${props.colors.shadow} 0px 10px 15px`,
          }}
        >
          Install Meteor
        </div>
      </div>
    </div>
  </div>
)

export default TechCard
