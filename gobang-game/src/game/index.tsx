import React, { useMemo } from 'react'

/** 棋盘大小 */
const CHESS_BOARD_SIZE = 15;

/** 棋盘格的状态类型 */
enum LatticeStatus { Empty, Black, White };

/**
 * 五子棋游戏类
 */
class Gobang {
    /** 棋盘 */
    chessboard: LatticeStatus[][]

    player: [blackPlayer: Player, whitePlayer: Player]

    constructor() {
        this.chessboard = new Array(CHESS_BOARD_SIZE).fill(0).map(() => new Array(CHESS_BOARD_SIZE).fill(LatticeStatus.Empty));
        this.player = [
            new Player({
                gobang: this,
                piece: LatticeStatus.Black
            }),
            new Player({
                gobang: this,
                piece: LatticeStatus.White
            })
        ]
    }

    /** 行棋 */
    play(player: Player, position: [x: number, y: number]) {
        const [x, y] = position;
        this.chessboard[x][y] = player.piece;
        return this.checkForVictory(player);
    }

    /**
     * TODO：判断玩家是否胜利
     */
    checkForVictory(player: Player) {
        return false;
    }
}

/**
 * 玩家类
 */
class Player {

    /** 游戏对局 */
    gobang: Gobang

    /** 玩家名称 */
    piece: LatticeStatus

    constructor(props: { gobang: Gobang, piece: LatticeStatus }) {
        this.gobang = props.gobang;
        this.piece = props.piece;
    }

    play(position: [x: number, y: number]) {
        return this.gobang.play(this, position)
    }

}

function ChessboardRender(props: { chessboard: Gobang['chessboard'] }) {

    const { chessboard } = props;


    const renderCell = (status: LatticeStatus) => {
        return <div style={{
            width: 50,
            height: 50,
            border: "1px solid #000"
        }}>
            {status}
        </div>
    }


    return <div style={{
        border: "1px solid #000",
        height: 'fit-content',
        width: 'fit-content'
    }}>
        {
            chessboard.map(row => {
                return <div style={{ display: 'flex' }}>{row.map(renderCell)}</div>
            })
        }
    </div>
}




export default function GameRender() {

    const gobang = useMemo(() => {
        return new Gobang();
    }, []);

    return (
        <div>
            <ChessboardRender chessboard={gobang.chessboard} />
        </div>
    )
}
