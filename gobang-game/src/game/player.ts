import { LatticeStatus } from "./constants";
import Gobang from "./gobang";
import { Position } from "./interface";

/**
 * 玩家类
 */
export default class Player {

    /** 游戏对局 */
    gobang: Gobang

    /** 玩家名称 */
    piece: LatticeStatus

    constructor(props: { gobang: Gobang, piece: LatticeStatus }) {
        this.gobang = props.gobang;
        this.piece = props.piece;
    }

    play(position: Position) {
        return this.gobang.play(this, position)
    }

}