import searchIco from '#/assets/searchIco.svg';
import { useSearchParams } from 'react-router';
import { Form } from 'react-router';

const Searchbar = () => {
  const [searchParams] = useSearchParams();

  return (
    <Form
      action='/games'
      method='get'
      className='relative mt-4 flex h-8 w-full rounded-full md:mt-0 md:w-[clamp(35vw,36vw,45vw)]'
    >
      <input
        type='text'
        name='query'
        aria-label='searchbar'
        defaultValue={searchParams.get('query') ?? ''}
        className='w-full rounded-full border border-[rgba(255,255,255,0.2)] bg-gradient-to-r from-[rgba(15,85,232,0.2)] to-[rgba(157,223,243,0.2)] pl-8 text-left text-[#ebebf5bf] focus:border-[rgba(255,255,255,0.4)] focus:outline-none md:pl-[clamp(3vw,4vw,5vw)]'
      />

      <button className='absolute right-0 h-full w-1/5 cursor-pointer rounded-r-full border-none bg-[rgba(161,161,161,0.2)] md:w-20'>
        <img src={searchIco} alt='search' className='w-4 align-middle' />
      </button>
    </Form>
  );
};

export default Searchbar;
