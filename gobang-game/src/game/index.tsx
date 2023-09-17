import React, { useMemo } from 'react'
import { LatticeStatus } from './constants';
import Gobang from './gobang';
import { IChessboardRenderProps, IGameRenderProps } from './interface';

function ChessboardRender(props: IChessboardRenderProps) {

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

export default function GameRender(props: IGameRenderProps) {

    const gobang = useMemo(() => {
        return new Gobang();
    }, []);

    return (
        <div>
            <ChessboardRender chessboard={gobang.chessboard} />
        </div>
    )
}
