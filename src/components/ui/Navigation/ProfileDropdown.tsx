import React from 'react';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from '@nextui-org/react';
import { useAuthUser } from 'react-auth-kit';
import messages from '../../../api/messages/messages.json';
import {
  useGetUserRanking,
  useSignOutUser,
} from '../../../api/hooks/user.hooks';
import { getRankingColor } from '../../../helpers/rankingStyling';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const { signOut } = useSignOutUser();
  const { rankingData, isFetching } = useGetUserRanking();
  const navigate = useNavigate();
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
          key="user-details"
          className="h-14 gap-2 pointer-events-none"
          textValue={user?.email}
        >
          <p className="font-semibold">{messages.signedAs}</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem
          key="ranking"
          textValue={`${messages.points}: ${rankingData?.points}`}
          className="pointer-events-none"
        >
          {isFetching ? (
            <Spinner data-testid="spinner" color="white" />
          ) : (
            <div className="flex flex-col font-semibold">
              <span
                className={getRankingColor(rankingData?.place || 0)}
              >{`${messages.place}: ${rankingData?.place}`}</span>
              <span className="text-secondary">{`${messages.points}: ${rankingData?.points}`}</span>
            </div>
          )}
        </DropdownItem>
        <DropdownItem
          key="profile"
          textValue={`${messages.myProfile}`}
          color="primary"
          onClick={() => navigate(`/profile/${user?.userID}`)}
        >
          {messages.myProfile}
        </DropdownItem>
        {/* TODO: possibly add user profile <DropdownItem key="settings">My settings</DropdownItem> */}
        <DropdownItem onClick={() => signOut()} key="signout" color="danger">
          {messages.signOut}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
