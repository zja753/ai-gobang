import Gobang from "./gobang";

export interface IGameRenderProps {

}

export interface IChessboardRenderProps {
    chessboard: Gobang['chessboard'];
    onPut: (position: Position) => void
}

export type Position = [x: number, y: number];