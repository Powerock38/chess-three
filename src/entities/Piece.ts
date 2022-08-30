import * as THREE from "three";
import { Facing, Move, PieceColor, PieceType, TileDefinition } from "../core/types";
import { FBXEntity } from "./FBXEntity";
import { Tile } from "./Tile";

export class Piece extends FBXEntity {

    color: PieceColor
    type: PieceType
    facing: Facing
    hasMoved: boolean = false
    tile: Tile

    constructor(fbx: THREE.Object3D, tileDefinition: TileDefinition, tile: Tile) {
        // super(
        //     new THREE.BoxGeometry(TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE),
        //     new THREE.MeshBasicMaterial({ color: tileDefinition.color })
        // )
        super(fbx)

        this.mesh.castShadow = true

        // this.mesh.position.set(0, 0, TILE_SIZE / 2)

        this.color = tileDefinition.color
        this.type = tileDefinition.type
        this.facing = tileDefinition.color === PieceColor.WHITE ? Facing.NORTH : Facing.SOUTH

        if (this.facing === Facing.SOUTH) {
            this.mesh.rotation.y = Math.PI
        }

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