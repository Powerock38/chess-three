import { Move, TileMatrix } from "../core/types";
import { Piece } from "./Piece";

export class Rook extends Piece {

    static getMoves(terrain: TileMatrix, x: number, y: number): Move[] {
        const moves: Move[] = []
        for (let x_ = x + 1; x_ < terrain[y].length; x_++) {
            moves.push({ x: x_, y })
            if (terrain[y][x_].piece) break
        }
        for (let x_ = x - 1; x_ >= 0; x_--) {
            moves.push({ x: x_, y })
            if (terrain[y][x_].piece) break
        }
        for (let y_ = y + 1; y_ < terrain.length; y_++) {
            moves.push({ x, y: y_ })
            if (terrain[y_][x].piece) break
        }
        for (let y_ = y - 1; y_ >= 0; y_--) {
            moves.push({ x, y: y_ })
            if (terrain[y_][x].piece) break
        }
        return moves
    }

    getMoves(): Move[] {
        return Rook.getMoves(this.tile.terrain, this.tile.x, this.tile.y)
    }

}