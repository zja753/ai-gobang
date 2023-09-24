import { CHESS_BOARD_SIZE, GobangStatus, LatticeStatus } from "./constants";
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

    status: GobangStatus;

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
        this.status = GobangStatus.Playing;
    }

    /** 行棋 */
    play(player: Player, position: Position) {
        const [x, y] = position;
        this.chessboard[y][x] = player.piece;
        return this.checkForVictory(player);
    }

    /** 判断玩家是否胜利 */
    checkForVictory(player: Player) {

        const { chessboard } = this;
        
        console.log("chessboard: ",chessboard);

        const dp = new Array(CHESS_BOARD_SIZE).fill(0).map(() => new Array(CHESS_BOARD_SIZE).fill(0).map(() => ({ l: 0, lt: 0, t: 0, rt: 0 })));

        let success = false;

        for (let y = 0; y < CHESS_BOARD_SIZE; y++) {
            for (let x = 0; x < CHESS_BOARD_SIZE; x++) {


                [{ key: 'l' as const, mx: -1, my: 0 }, { key: 'lt' as const, mx: -1, my: -1 }, { key: 't' as const, mx: 0, my: -1 }, { key: 'rt' as const, mx: 1, my: 0 }].forEach(({ key, mx, my }) => {
                    const preX = x + mx;
                    const preY = y + my;
                    const isMyPiece = chessboard[x][y] === player.piece ? 1 : 0;
                    if (preX < 0 || preY < 0 || preX >= CHESS_BOARD_SIZE) dp[y][x][key] = (isMyPiece ? 1 : 0);
                    else dp[y][x][key] = dp[preY][preX][key] + (isMyPiece ? 1 : 0);

                    if (dp[y][x][key] >= 5) success = true;
                })

            }
        }

        console.log("dp: ",dp);

        return success;
    }
}
