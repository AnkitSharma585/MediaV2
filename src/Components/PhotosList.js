import Button from './Button';
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store';

function PhotosList({ photos }) {
  const { data, error, isLoading } = useFetchPhotosQuery(photos);
  const [addPhotos, results] = useAddPhotoMutation();

  const handleClick = () => {
    addPhotos(photos);
  };

  let content;

  if (isLoading) {
    content = <Skeleton times={3} className='w-8 h-8' />;
  } else if (error) {
    content = <div>Oops.. An error occurs</div>;
  } else {
    content = data.map((photo) => {
      return <PhotosListItem photo={photo} key={photo.id} />;
    });
  }

  return (
    <div>
      <div className='flex items-center justify-between m-2'>
        <h3>Add new photos</h3>
        <Button loading={results.isLoading} onClick={handleClick}>
          +Add photos
        </Button>
      </div>
      <div className='flex items-center justify-center m-2 gap-2 flex-wrap'>
        {content}
      </div>
    </div>
  );
}
export default PhotosList;
