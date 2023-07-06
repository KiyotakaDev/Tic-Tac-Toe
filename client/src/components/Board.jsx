import { Tile } from "./Tile";
import { useState } from "react";

export function Board() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [shift, setShift] = useState(true);


  // la funcion title cumple la funcion de actualizar cada TILE (casilla) del juego
  // por medio de una nueva copia del array TILES, tambien verifica si el tile que 
  // se quiere actualizar ya fue actualizado, o, si el juego ya termino. 
  const tileClick = (i) => {
    if (calculateWinner(tiles) || tiles[i]) {
      return;
    }

    const newArrayTiles = tiles.slice();
    if (shift) {
      newArrayTiles[i] = "X";
    } else {
      newArrayTiles[i] = "O";
    }
    setTiles(newArrayTiles);
    setShift(!shift);
  };

  function calculateWinner(tiles) {
    const cases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < cases.length; i++) {
      const [a, b, c] = cases[i];
      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        return tiles[a];
      }
    }
    return null;
  }

    const winner = calculateWinner(tiles);
  let status;
  if (winner) {
    status = 'Ganador: ' + winner;
  } else {
    status = 'Siguiente jugador: ' + (shift ? 'X' : 'O');
  }

  return (
    <>
    <div>{status}</div>
      <div className="flex justify-center items-center">
        <Tile value={tiles[0]} onTileClick={() => tileClick(0)} />
        <Tile value={tiles[1]} onTileClick={() => tileClick(1)} />
        <Tile value={tiles[2]} onTileClick={() => tileClick(2)} />
      </div>

      <div className="flex justify-center items-center">
        <Tile value={tiles[3]} onTileClick={() => tileClick(3)} />
        <Tile value={tiles[4]} onTileClick={() => tileClick(4)} />
        <Tile value={tiles[5]} onTileClick={() => tileClick(5)} />
      </div>

      <div className="flex justify-center items-center">
        <Tile value={tiles[6]} onTileClick={() => tileClick(6)} />
        <Tile value={tiles[7]} onTileClick={() => tileClick(7)} />
        <Tile value={tiles[8]} onTileClick={() => tileClick(8)} />
      </div>
    </>
  );
}
