import CollectionCard from './CollectionCard';

const CollectionsDesktop = ({ games, length }: { games: any[]; length: number }) => {
  return (
    <>
      {games.map((game) => (
        <CollectionCard length={length} key={game._id} img={game.rawgGame.background_image} />
      ))}
    </>
  );
};

export default CollectionsDesktop;
