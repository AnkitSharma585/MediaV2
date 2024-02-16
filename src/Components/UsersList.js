import { useAddUserMutation, useFetchUsersQuery } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import UsersListItem from './UsersListItem';

function UsersList(users) {
  const { data, error, isFetching } = useFetchUsersQuery(users);
  const [addUsers, results] = useAddUserMutation();

  const handleClick = () => {
    addUsers(users);
  };

  let content;

  if (isFetching) {
    content = <Skeleton times={3} className='w-full h-8' />;
  } else if (error) {
    content = <div>Oops.. An error occurs</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem user={user} key={user.id} />;
    });
  }

  return (
    <div>
      <div className='flex items-center justify-between m-2'>
        <h1 className='font-bold text-3xl text-gray-700'>Add new users</h1>
        <Button primary onClick={handleClick} loading={results.isLoading}>
          +Add users
        </Button>
      </div>
      {content}
    </div>
  );
}
export default UsersList;
