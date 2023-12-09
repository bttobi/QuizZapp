import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useAuthUser } from 'react-auth-kit';
import messages from '../../../api/messages/messages.json';
import { useSignOutUser } from '../../../api/hooks/user.hooks';

const ProfileDropdown = () => {
  const { signOut } = useSignOutUser();
  const auth = useAuthUser();
  const user = auth();
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user?.email.slice(0, 2).toUpperCase()}
          size="sm"
          src=""
        />
      </DropdownTrigger>
      <DropdownMenu
        color="primary"
        aria-label="Profile Actions"
        variant="solid"
      >
        <DropdownItem
          key="profile"
          className="h-14 gap-2 pointer-events-none"
          textValue={user?.email}
        >
          <p className="font-semibold">{messages.signedAs}</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="points" className="pointer-events-none">
          Points: 255
        </DropdownItem>
        <DropdownItem key="settings">My settings</DropdownItem>
        <DropdownItem onClick={() => signOut()} key="logout" color="danger">
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
