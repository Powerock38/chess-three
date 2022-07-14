import { Move } from "../core/types";
import { Bishop } from "./Bishop";
import { Piece } from "./Piece";
import { Rook } from "./Rook";

export class Queen extends Piece {

    getMoves(): Move[] {
        return Rook.getMoves(this.tile.terrain, this.tile.x, this.tile.y).concat(Bishop.getMoves(this.tile.terrain, this.tile.x, this.tile.y))
    }

}