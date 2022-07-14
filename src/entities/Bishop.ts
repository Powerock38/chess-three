import { Move, TileMatrix } from "../core/types";
import { Piece } from "./Piece";

export class Bishop extends Piece {

    static getMoves(terrain: TileMatrix, x: number, y: number): Move[] {
        const moves = []
        for (let x_ = x + 1, y_ = y + 1; x_ < terrain[y].length && y_ < terrain.length; x_++, y_++) {
            moves.push({ x: x_, y: y_ })
            if (terrain[y_][x_].piece) break
        }
        for (let x_ = x - 1, y_ = y + 1; x_ >= 0 && y_ < terrain.length; x_--, y_++) {
            moves.push({ x: x_, y: y_ })
            if (terrain[y_][x_].piece) break
        }
        for (let x_ = x + 1, y_ = y - 1; x_ < terrain[y].length && y_ >= 0; x_++, y_--) {
            moves.push({ x: x_, y: y_ })
            if (terrain[y_][x_].piece) break
        }
        for (let x_ = x - 1, y_ = y - 1; x_ >= 0 && y_ >= 0; x_--, y_--) {
            moves.push({ x: x_, y: y_ })
            if (terrain[y_][x_].piece) break
        }
        return moves
    }

    getMoves(): Move[] {
        return Bishop.getMoves(this.tile.terrain, this.tile.x, this.tile.y)
    }

}