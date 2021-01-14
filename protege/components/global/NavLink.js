import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink = (props) => {
  const {
    href,
    as,
    exact,
    className,
    activeClassName,
    inactiveClassName,
    children,
  } = props

  const router = useRouter()
  const stateClass =
    router.asPath === href ? activeClassName : inactiveClassName

  return (
    <Link href={href} as={as} {...props}>
      <a className={`${className} ${stateClass}`}>{children}</a>
    </Link>
  )
}

NavLink.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
  exact: PropTypes.bool,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  inactiveClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
}

NavLink.defaultProps = {
  href: '',
  as: '',
  exact: false,
  className: '',
  activeClassName: '',
  inactiveClassName: '',
}

export default NavLink
