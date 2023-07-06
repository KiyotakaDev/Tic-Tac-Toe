export function Tile({ value, onTileClick }) {
  return (
    <div
      className="w-20 h-20 bg-green-300 border-l-rose-500 m-1 text-center"
      onClick={onTileClick}
    >
      {value}
    </div>
  );
}
