import { Facing, Move, PieceColor, TileMatrix } from "../core/types";
import { Piece } from "./Piece";

export class Pawn extends Piece {

    static getMoves(terrain: TileMatrix, x: number, y: number, facing: Facing, hasMoved: boolean, color: PieceColor): Move[] {
        const moves: Move[] = []
        const unit = facing === Facing.SOUTH ? 1 : -1

        if (!terrain[y + unit][x]?.piece)
            moves.push({ x, y: y + unit })

        if (terrain[y + unit][x - 1]?.piece && terrain[y + unit][x - 1].piece!.color !== color)
            moves.push({ x: x - 1, y: y + unit })

        if (terrain[y + unit][x + 1]?.piece && terrain[y + unit][x + 1].piece!.color !== color)
            moves.push({ x: x + 1, y: y + unit })

        if (!hasMoved)
            moves.push({ x, y: y + 2 * unit })

        return moves.filter(move => move.y >= 0 && move.y < terrain.length)
    }

    getMoves(): Move[] {
        return Pawn.getMoves(this.tile.terrain, this.tile.x, this.tile.y, this.facing, this.hasMoved, this.color)
    }

}