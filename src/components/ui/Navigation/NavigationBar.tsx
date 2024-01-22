import React from 'react';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  useDisclosure,
} from '@nextui-org/react';
import { FaSignOutAlt } from 'react-icons/fa';
import QuizZappLogo from '../Logo/QuizZappLogo';
import NavigationLink from './NavigationLink';
import { RouteType } from '../../../appRoutes.routes';
import useUser from '../../../hooks/useUser';
import { NavLink } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import messages from '../../../api/messages/messages.json';
import { useSignOutUser } from '../../../api/hooks/user.hooks';

interface NavigationBarProps {
  items: RouteType[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({ items }) => {
  const { isOpen, onOpenChange } = useDisclosure();
  const { signOut } = useSignOutUser();
  const { isSignedIn } = useUser();

  return (
    <Navbar
      isMenuOpen={isOpen}
      onMenuOpenChange={onOpenChange}
      className="bottom-auto bg-backgroundSecondary w-full"
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden"
        />
        <NavbarBrand>
          <NavLink
            className="flex justify-center align-center items-center hover:scale-105 ease-in-out duration-200"
            to="/"
          >
            <QuizZappLogo width={'35px'} height={'35px'} />
            <p className="font-bold text-xl sm:text-lg sm:visible hidden">
              QuizZapp
            </p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className="hidden md:flex vitems-center align-center gap-2 md:gap-8 md:mx-5"
        justify="center"
      >
        {items.map(el => (
          <NavigationLink key={`${el.path}-${el.name}`} path={el.path}>
            <span className="mr-2">{el.icon}</span>
            <span className="text-sm lg:text-lg">{el.name}</span>
          </NavigationLink>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="w-min">
        {isSignedIn ? (
          <ProfileDropdown />
        ) : (
          <>
            <NavigationLink path="/signin">
              <Button color="secondary" variant="flat">
                {messages.signIn}
              </Button>
            </NavigationLink>
            <NavigationLink path="/signup">
              <Button color="secondary" variant="flat">
                {messages.signUp}
              </Button>
            </NavigationLink>
          </>
        )}
      </NavbarContent>
      <NavbarMenu className="bg-background/70 pt-8">
        {items.map(el => (
          <NavigationLink key={`${el.path}-${el.name}`} path={el.path}>
            {el.icon && <span className="text-white mr-2">{el.icon}</span>}
            <span onClick={() => onOpenChange()} className="text-white">
              {el.name}
            </span>
          </NavigationLink>
        ))}
        {isSignedIn && (
          <NavigationLink onClick={() => onOpenChange()} color="danger">
            <span onClick={() => onOpenChange()} className="mr-2">
              <FaSignOutAlt />
            </span>
            <span
              onClick={() => {
                onOpenChange();
                signOut();
              }}
            >
              Sign out
            </span>
          </NavigationLink>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
