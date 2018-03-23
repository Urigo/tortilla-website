import * as React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import * as FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'
import { faBell, faBookmark } from '@fortawesome/fontawesome-free-regular'

const Header = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '15px 25px',
      boxShadow: '0 2px 4px 0 rgba(87, 71, 81, 0.2)',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <FontAwesomeIcon icon={faBars} style={{ color: '#d2d5de' }} />
      <Link
        to="/"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#162c5e',
          fontSize: '18px',
          lineHeight: '18px',
          fontWeight: 800,
          fontStyle: 'italic',
          textTransform: 'lowercase',
          textDecoration: 'none',
          marginLeft: '25px',
        }}
      >
        <img
          src={withPrefix('img/logo.png')}
          style={{ margin: 0, height: '40px' }}
          alt="Tortilla Logo"
        />
        <span>Tortilla</span>
      </Link>
      <input
        type="text"
        placeholder="Search..."
        style={{
          fontSize: '14px',
          fontWeight: '300',
          fontStyle: 'italic',
          borderRadius: '3px',
          border: 'solid 1px #d2d5de',
          color: '#c5c7d0',
          marginLeft: '25px',
          padding: '5px 10px',
        }}
      />
    </div>

    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <FontAwesomeIcon
        icon={faBookmark}
        style={{ color: '#d2d5de', marginRight: '20px' }}
      />
      <FontAwesomeIcon
        icon={faBell}
        style={{ color: '#d2d5de', marginRight: '20px' }}
      />
      <div
        style={{
          background: '#e1e4e9',
          width: '1px',
          height: '33px',
          marginRight: '20px',
        }}
      />
      <div
        style={{
          background: '#84b5ef',
          width: '35px',
          height: '35px',
          borderRadius: '50%',
        }}
      />
    </div>
  </div>
)

export default Header
