import { Fragment } from 'react';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { GoTrash } from 'react-icons/go';
import { useRemoveUserMutation } from '../store';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {
  const [removeUser, results] = useRemoveUserMutation();

  const handleClick = () => {
    removeUser(user);
  };

  const header = (
    <Fragment>
      <Button
        className='mr-2'
        loading={results.isLoading}
        onClick={handleClick}
      >
        <GoTrash />
      </Button>
      {user.title}
    </Fragment>
  );
  return (
    <ExpandablePanel header={header}>
      <AlbumsList albums={user} />
    </ExpandablePanel>
  );
}
export default UsersListItem;
