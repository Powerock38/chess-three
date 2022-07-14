import { Move, TileMatrix } from "../core/types";
import { Piece } from "./Piece";

export class Knight extends Piece {

    static getMoves(terrain: TileMatrix, x: number, y: number): Move[] {
        const moves = []
        moves.push({ x: x + 1, y: y + 2 })
        moves.push({ x: x + 2, y: y + 1 })
        moves.push({ x: x + 2, y: y - 1 })
        moves.push({ x: x + 1, y: y - 2 })
        moves.push({ x: x - 1, y: y - 2 })
        moves.push({ x: x - 2, y: y - 1 })
        moves.push({ x: x - 2, y: y + 1 })
        moves.push({ x: x - 1, y: y + 2 })
        return moves.filter(move => move.x >= 0 && move.x < terrain[y].length && move.y >= 0 && move.y < terrain.length)
    }

    getMoves(): Move[] {
        return Knight.getMoves(this.tile.terrain, this.tile.x, this.tile.y)
    }

}