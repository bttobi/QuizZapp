import React from 'react';
import { Link, LinkProps, NavbarItem } from '@nextui-org/react';
import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavigationLinkProps extends LinkProps {
  path?: string;
  color?: LinkProps['color'];
  children?: ReactNode;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  color = 'foreground',
  path,
  children,
}) => {
  const isActive = path === useLocation().pathname;

  return (
    <NavbarItem isActive={isActive}>
      <NavLink to={path || '/'}>
        <Link color={isActive ? 'primary' : color} as="div">
          {children}
        </Link>
      </NavLink>
    </NavbarItem>
  );
};

export default NavigationLink;
