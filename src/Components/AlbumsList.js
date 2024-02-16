import Button from './Button';
import Skeleton from './Skeleton';
import AlbumsListItem from './AlbumsListItem';
import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store';

function AlbumsList({ albums }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(albums);
  const [addAlbums, results] = useAddAlbumMutation();

  const handleClick = () => {
    addAlbums(albums);
  };

  let content;

  if (isLoading) {
    content = <Skeleton times={3} className='w-8 h-8' />;
  } else if (error) {
    content = <div>Oops.. An error occurs</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem album={album} key={album.id} />;
    });
  }

  return (
    <div>
      <div className='flex items-center justify-between m-2'>
        <h3 className='italic'>Add new albums</h3>
        <Button loading={results.isLoading} onClick={handleClick}>
          +Add albums
        </Button>
      </div>
      {content}
    </div>
  );
}
export default AlbumsList;
