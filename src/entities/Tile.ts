import * as THREE from "three";
import { PieceSlot, TileColor, TileMatrix, TILE_SIZE } from "../core/types";
import { Checkerboard } from "./Checkerboard";
import { Entity } from "./Entity";
import { Piece } from "./Piece";

export class Tile extends Entity {

    x: number = 0
    y: number = 0
    tileColor: TileColor
    piece: PieceSlot = null
    terrain!: TileMatrix

    constructor(cb: Checkerboard, tileColor: TileColor, x: number, y: number) {
        super(
            new THREE.PlaneGeometry(TILE_SIZE, TILE_SIZE, 1, 1),
            new THREE.MeshBasicMaterial({ color: tileColor })
        )

        this.mesh.castShadow = true

        const g = cb.geometry as THREE.PlaneGeometry
        this.mesh.position.set(
            x * TILE_SIZE + TILE_SIZE / 2 - g.parameters.width / 2,
            y * TILE_SIZE + TILE_SIZE / 2 - g.parameters.height / 2,
            1
        )

        this.tileColor = tileColor
        this.x = x
        this.y = y

        cb.add(this.mesh)
    }

    setPiece(piece: Piece) {
        this.mesh.children = []
        this.mesh.add(piece.mesh)
        this.piece = piece
        this.piece.tile = this
    }

    delPiece() {
        this.piece = null
    }

}