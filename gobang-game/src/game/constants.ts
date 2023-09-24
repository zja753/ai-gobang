/** 棋盘大小 */
export const CHESS_BOARD_SIZE = 15;

/** 棋盘格的状态类型 */
export enum LatticeStatus { Empty = '空', Black = '黑', White = '白' };

/** 五子棋对局状态 */
export enum GobangStatus { Playing, Tied, BalckWin, WhiteWin };