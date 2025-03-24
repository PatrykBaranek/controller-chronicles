import Collections from '#/components/Collections/Collections';
import ProfileComponent from '#/components/Profile/Profile';

function Profile() {
  return (
    <div className='mt-[2rem] flex w-full flex-col justify-center gap-[5rem] pb-[1rem] lg:items-center lg:gap-[3.5rem] lg:px-[2rem] xl:flex-row'>
      <ProfileComponent />
      <Collections />
    </div>
  );
}

export default Profile;
