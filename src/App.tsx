import React, { useState } from "react";
import "./App.css";
import Timer from "react-compound-timer";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";

const Chess = require("chess.js");

const paddingStyle = { padding: 10 };
const marginStyle = { margin: 10 };

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);
      setFen(chess.fen());
    }
  };

  return (
    <div className='flex-center'>
      <h1>Random Chess Game</h1>

      <Chessboard
        boardStyle={{
          display: "flex",
          flexWrap: "wrap",
          justifySelf: "center",
          marginBottom: 30,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        width={500}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />

      <Timer initialTime={0} startImmediately={false}>
        {({
          start,
          resume,
          pause,
          stop,
          reset,
          timerState,
        }: {
          start: any;
          resume: any;
          pause: any;
          stop: any;
          reset: any;
          timerState: any;
        }) => (
          <>
            <div>
              <span style={paddingStyle}>
                <Timer.Minutes /> minutes
              </span>
              <span style={paddingStyle}>
                <Timer.Seconds /> seconds
              </span>
              <span style={paddingStyle}>
                <Timer.Milliseconds /> milliseconds
              </span>
            </div>
            <div style={paddingStyle}>{timerState}</div>
            <br />
            <div>
              <button style={marginStyle} onClick={start}>
                Start
              </button>
              <button style={marginStyle} onClick={pause}>
                Pause
              </button>
              <button style={marginStyle} onClick={resume}>
                Resume
              </button>
              <button style={marginStyle} onClick={stop}>
                Stop
              </button>
              <button style={marginStyle} onClick={reset}>
                Reset
              </button>
            </div>
          </>
        )}
      </Timer>
    </div>
  );
};

export default App;
