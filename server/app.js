import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();
export const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on('board', (data) => {
    console.log(data);
  })

  // Setting the player
  let player = {
    socket: socket.id,
    username: "",
  };
  socket.on("setUsername", (username) => {
    player.username = username;
    console.log(`Username: ${username}`);
    io.emit("player", player);
  });

  // Setting board
  socket.on('board', (board) => {
    console.log(board);
  })
  let currentPlayer = "X";
  socket.emit('current', currentPlayer)
  // Winning combos
  const checkWinner = (board) => {
    const winningCombos = [
      // Horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Verticals
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 5],
      // Diagonals
      [0, 4, 5],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isBoardFull = (board) => {
    return board.every((cell) => cell !== " ");
  };

  socket.emit("board", gameBoard);
  let message = "Draw";
  socket.on("move", (index) => {
    if (gameBoard[index] === "") {
      gameBoard[index] = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      io.emit('turn', currentPlayer)
      io.emit("boardState", gameBoard);

      const winner = checkWinner(gameBoard);
      if (winner) {
        io.emit("gameEnd", { result: "win", winner });
      } else if (isBoardFull(gameBoard)) {
        io.emit("gameEnd", { result: "tie", message });
      }
    }
  });

  // Event for reset
  socket.on("reset", () => {
    gameBoard = Array(9).fill("");
    currentPlayer = "X";
    io.emit("boardState", gameBoard);
  });
});

app.set("port", 3000);
export const port = app.get("port");
