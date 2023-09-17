import { CHESS_BOARD_SIZE, LatticeStatus } from "./constants";
import { Position } from "./interface";
import Player from "./player";

/**
 * 五子棋游戏类
 */
export default class Gobang {
    /** 棋盘 */
    chessboard: LatticeStatus[][]

    /** 玩家 */
    player: {
        blackPlayer: Player, whitePlayer: Player
    }

    constructor() {
        this.chessboard = new Array(CHESS_BOARD_SIZE).fill(0).map(() => new Array(CHESS_BOARD_SIZE).fill(LatticeStatus.Empty));
        this.player = {
            blackPlayer:
                new Player({
                    gobang: this,
                    piece: LatticeStatus.Black
                }),
            whitePlayer:
                new Player({
                    gobang: this,
                    piece: LatticeStatus.White
                })
        }
    }

    /** 行棋 */
    play(player: Player, position: Position) {
        const [x, y] = position;
        this.chessboard[y][x] = player.piece;
        return this.chessboard;
    }

    /**
     * TODO：判断玩家是否胜利
     */
    checkForVictory(player: Player) {
        return false;
    }
}
