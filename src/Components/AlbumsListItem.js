import { Fragment } from 'react';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { GoTrash } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import PhotosList from './PhotosList';

function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleClick = () => {
    removeAlbum(album);
  };

  const header = (
    <Fragment>
      <Button
        loading={results.isLoading}
        onClick={handleClick}
        className='mr-2'
      >
        <GoTrash />
      </Button>
      {album.title}
    </Fragment>
  );
  return (
    <ExpandablePanel header={header}>
      <PhotosList photos={album} />
    </ExpandablePanel>
  );
}
export default AlbumsListItem;
