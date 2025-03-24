import useStore from '#/store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { platforms, sortingOptions, stores } from './Filters.mock';
import Autocomplete, { Option } from './components/Autocomplete';
import Datepicker from './components/Datepicker';
import RadioGroup from './components/RadioGroup';
import { type Dayjs } from 'dayjs';
import { formatDate, formatParams } from './FilterDrawer.utils';
import { useQuery } from '@tanstack/react-query';
import { getFilteredGames } from '#/api/gamesApi';
import { useEffect, useState } from 'react';
import { Form } from 'react-router';

export type FormValues = {
  Platforms?: Option;
  Stores?: Option;
  Sort?: Option;
  Order?: {
    label: string;
    value: string;
  };
  From?: Dayjs;
  To?: Dayjs;
};

const radioOptions = [
  { label: 'ASC', value: '' },
  { label: 'DESC', value: '-' },
];

const FilterDrawer = () => {
  const { isFiltersOpen, toggleFiltersOpen, storeGames } = useStore();

  const { control, handleSubmit, watch } = useForm<FormValues>();
  const isSorted = watch('Sort');

  const [query, setQuery] = useState('');
  const { data, refetch } = useQuery({
    queryKey: ['/games', query],
    queryFn: () => getFilteredGames(query),
  });

  const onSubmit: SubmitHandler<FormValues> = ({ Platforms, Stores, Sort, Order, From, To }) => {
    const paramObj = {
      platforms: Platforms?.name,
      stores: Stores?.name,
      sort: Sort?.name,
      dates: formatDate(From, To),
      order: Order?.value,
    };
    if (!Object.keys(formatParams(paramObj)).length) {
      toggleFiltersOpen();
      return;
    }
    const params = new URLSearchParams(formatParams(paramObj)).toString();
    setQuery(params);
    toggleFiltersOpen();
  };

  useEffect(() => {
    if (query.length > 1) {
      refetch();
      data && storeGames(data?.results);
    }
  }, [data, query]);

  const onBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toggleFiltersOpen();
  };

  return (
    <Form action='/games' method='get' onSubmit={handleSubmit(onSubmit)}>
      <form
        className={`fixed top-0 left-0 z-10 flex h-screen w-full flex-col gap-10 p-8 ${isFiltersOpen ? 'translate-x-0 opacity-100' : 'translate-x-[200%] opacity-0'} bg-gradient-to-br from-[rgba(60,112,85,0.5)] via-[rgba(34,23,56,0.8)] to-[rgba(34,20,117,0.4)] backdrop-blur-[10px] transition-all delay-200 duration-600 ease-in-out md:w-1/2 md:${isFiltersOpen ? 'translate-x-full' : 'translate-x-[300%]'} md:shadow-lg xl:${isFiltersOpen ? 'translate-x-[235%]' : 'translate-x-[400%]'} xl:w-[30vw]`}
      >
        <div className='mb-8 flex items-center justify-end gap-4'>
          <button
            onClick={onBack}
            className='font-inherit cursor-pointer rounded-md border-none bg-[#00eaffae] px-2 py-[0.3rem] text-[0.9rem] font-medium text-black shadow'
          >
            Back
          </button>
          <button
            type='submit'
            className='font-inherit cursor-pointer rounded-md border-none bg-[#a63ee7ae] px-2 py-[0.3rem] text-[0.9rem] font-medium text-white shadow'
          >
            Filter
          </button>
        </div>

        <Autocomplete control={control} options={platforms} label='platforms' />
        <Autocomplete control={control} options={stores} label='stores' />
        <Autocomplete control={control} options={sortingOptions} label='sort' />

        {isSorted && (
          <RadioGroup control={control} options={radioOptions} size='small' name='order' />
        )}

        <div>
          <p className='mb-4 text-center text-[#ffffff99]'>Release date</p>
          <div className='flex justify-center gap-4'>
            <Datepicker control={control} label='from' />
            <Datepicker control={control} label='to' />
          </div>
        </div>

        <style>{`
          .MuiAutocomplete-popper > * {
            background: linear-gradient(90deg, #223682 0%, #547c95 100%);
            border-radius: 10px;
            color: #ffffff99;
            font-family: inherit;
          }
        `}</style>
      </form>
    </Form>
  );
};

export default FilterDrawer;
