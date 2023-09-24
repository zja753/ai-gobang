import React, { useMemo, useRef, useState } from 'react'
import { LatticeStatus } from './constants';
import Gobang from './gobang';
import { IChessboardRenderProps, IGameRenderProps } from './interface';
import cls from 'classnames';
import './index.css';
import { message } from 'antd';

/**
 * 棋盘渲染
 */
function ChessboardRender(props: IChessboardRenderProps) {

    const { chessboard, onPut } = props;

    const renderCell = (status: LatticeStatus, put: () => void, justRender?: boolean) => {
        if (justRender) {
            return <div className='cell' />
        }

        return <div className='cell'>
            <div className={cls({
                'interact-point': true,
                'interact-point-empty': status === LatticeStatus.Empty,
                'interact-point-black': status === LatticeStatus.Black,
                'interact-point-white': status === LatticeStatus.White
            })} onClick={() => put()} />
        </div>
    }

    return <div className='chessboard'>
        {
            chessboard.map((row, rowIndex) => {
                return <div className='row'>
                    {
                        row.map((cell, colIndex) => renderCell(cell, () => onPut([colIndex, rowIndex])))
                            .concat(renderCell(LatticeStatus.Empty, () => { }, true))
                    }
                </div>
            })
        }
    </div>
}

/**
 * 游戏渲染
 */
export default function GameRender(props: IGameRenderProps) {

    const gobang = useMemo(() => {
        return new Gobang();
    }, []);

    const curPlayer = useRef(gobang.player.blackPlayer);

    const [, setUpdateFlag] = useState(0);
    const update = () => setUpdateFlag(flag => flag + 1);

    /** 
     * 落子然后换边
     */
    const handlePut: IChessboardRenderProps['onPut'] = (position) => {
        const win = curPlayer.current.play(position);

        if (win) {
            message.success(`${curPlayer.current.piece}方胜利!`);
        }

        if (curPlayer.current.piece === LatticeStatus.Black) {
            curPlayer.current = gobang.player.whitePlayer;
        } else {
            curPlayer.current = gobang.player.blackPlayer;
        }

        update();
    }

    return <ChessboardRender chessboard={gobang.chessboard} onPut={handlePut} />
}
