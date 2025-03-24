import { Link } from 'react-router';

function CollectionsButton({ text }: { text: string }) {
  return (
    <Link
      className='text-bold text-[1.05rem] text-[#00ebff] transition-all hover:scale-125'
      to='collections'
    >
      {text}
    </Link>
  );
}

export default CollectionsButton;
