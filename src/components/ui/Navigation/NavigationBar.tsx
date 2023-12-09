import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { signOut } = useSignOutUser();
  const { isSignedIn } = useUser();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bottom-auto bg-backgroundSecondary w-full"
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden"
        />
        <NavbarBrand>
          <NavLink
            className="flex justify-center align-center items-center hover:scale-105 ease-in-out duration-200"
            to="/"
          >
            <QuizZappLogo />
            <p className="font-bold text-xl sm:text-lg">QuizZapp</p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className="hidden md:flex justify-center items-center align-center gap-2 md:gap-10"
        justify="center"
      >
        {items.map(el => (
          <NavigationLink key={`${el.path}-${el.name}`} path={el.path}>
            <span className="mr-2">{el.icon}</span>
            <span className="text-sm lg:text-lg">{el.name}</span>
          </NavigationLink>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="hidden md:flex">
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
      <NavbarMenu className="bg-background/20">
        {items.map(el => (
          <NavigationLink key={`${el.path}-${el.name}`} path={el.path}>
            {el.icon && <span className="text-white mr-2">{el.icon}</span>}
            <span className="text-white">{el.name}</span>
          </NavigationLink>
        ))}
        {isSignedIn && (
          <NavigationLink color="danger">
            <span className="mr-2">
              <FaSignOutAlt />
            </span>
            <span onClick={() => signOut()}>Sign out</span>
          </NavigationLink>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
