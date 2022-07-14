import { Move, TileMatrix } from "../core/types";
import { Piece } from "./Piece";

export class King extends Piece {

    static getMoves(terrain: TileMatrix, x: number, y: number): Move[] {
        const moves = []
        moves.push({ x: x + 1, y: y + 1 })
        moves.push({ x: x + 1, y })
        moves.push({ x: x + 1, y: y - 1 })
        moves.push({ x, y: y + 1 })
        moves.push({ x, y: y - 1 })
        moves.push({ x: x - 1, y: y + 1 })
        moves.push({ x: x - 1, y })
        moves.push({ x: x - 1, y: y - 1 })
        return moves.filter(move => move.x >= 0 && move.x < terrain[y].length && move.y >= 0 && move.y < terrain.length)
    }

    getMoves(): Move[] {
        return King.getMoves(this.tile.terrain, this.tile.x, this.tile.y)
    }

}