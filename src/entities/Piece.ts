import * as THREE from "three";
import { Facing, Move, PieceColor, PieceType, TileDefinition, TILE_SIZE } from "../core/types";
import { Entity } from "./Entity";
import { Tile } from "./Tile";

export class Piece extends Entity {

    color: PieceColor
    type: PieceType
    facing: Facing
    hasMoved: boolean = false
    tile: Tile

    constructor(tileDefinition: TileDefinition, tile: Tile) {
        super(
            new THREE.BoxGeometry(TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE),
            new THREE.MeshBasicMaterial({ color: tileDefinition.color })
        )

        this.mesh.castShadow = true

        this.mesh.position.set(0, 0, TILE_SIZE / 2)

        this.color = tileDefinition.color
        this.type = tileDefinition.type
        this.facing = tileDefinition.color === PieceColor.WHITE ? Facing.NORTH : Facing.SOUTH
        this.tile = tile
    }

    move(newTile: Tile) {
        if (newTile.piece?.color === this.color)
            return console.error("Cannot move to occupied tile")

        this.tile.delPiece()
        newTile.setPiece(this)
        this.hasMoved = true
    }

    getMoves(): Move[] {
        return []
    }

}