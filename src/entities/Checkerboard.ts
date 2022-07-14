import * as THREE from "three";
import { listenMouse } from '../core/mouse';
import { Move, PieceColor, PieceSlot, PieceType, TerrainDefinition, TileColor, TileMatrix, TILE_SIZE } from "../core/types";
import { Bishop } from "./Bishop";
import { Entity } from "./Entity";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Queen } from "./Queen";
import { Rook } from "./Rook";
import { Tile } from "./Tile";

export class Checkerboard extends Entity {

    terrain: TileMatrix
    selection: PieceSlot = null
    currentTurn: PieceColor = PieceColor.WHITE

    constructor(scene: THREE.Scene, terrainDef: TerrainDefinition, width = 8, height = 8) {
        super(
            new THREE.PlaneGeometry(width * TILE_SIZE, height * TILE_SIZE, width, height),
            new THREE.MeshBasicMaterial({ color: 0xC4C6C4 })
        )
        this.mesh.receiveShadow = true
        this.mesh.position.set(0, 0, 0)
        this.mesh.rotation.set(-Math.PI / 2, 0, 0)

        this.terrain = terrainDef.map((line, y) => line.map((tileDef, x) => {
            const tile = new Tile(this, y % 2 === x % 2 ? TileColor.BLACK : TileColor.WHITE, x, y)
            if (tileDef !== null) {
                let piece: Piece
                switch (tileDef.type) {
                    case PieceType.PAWN:
                        piece = new Pawn(tileDef, tile)
                        break

                    case PieceType.ROOK:
                        piece = new Rook(tileDef, tile)
                        break

                    case PieceType.BISHOP:
                        piece = new Bishop(tileDef, tile)
                        break

                    case PieceType.KNIGHT:
                        piece = new Knight(tileDef, tile)
                        break

                    case PieceType.QUEEN:
                        piece = new Queen(tileDef, tile)
                        break

                    case PieceType.KING:
                        piece = new King(tileDef, tile)
                        break

                    default:
                        throw new Error("Unknown piece type " + tileDef.type)
                }

                tile.setPiece(piece)
            }

            return tile
        }))

        for (const tile of this.terrain.flat()) {
            tile.terrain = this.terrain
        }

        scene.add(this.mesh)

        listenMouse(scene, this.onClick.bind(this))
    }

    private getFilteredMoves(piece: Piece) {
        return piece.getMoves().filter(move =>
            this.terrain[move.y][move.x].piece === null
            || this.terrain[move.y][move.x].piece!.color !== piece.color
        )
    }

    private onClick(inter: THREE.Intersection) {
        if (inter) {
            let tile = this.terrain.flat()
                .find(tile => tile !== null && (tile.mesh.uuid === inter.object.uuid || tile.piece?.mesh.uuid === inter.object.uuid)) ?? null

            if (tile) {
                console.log(tile)
                if (tile.piece && tile.piece === this.selection) { // clicked the same piece
                    this.selection = null
                    console.log("Deselected")
                    // hide moves
                    this.drawMoves([])
                } else if (tile.piece && tile.piece.color === this.currentTurn) { // clicked another ally piece
                    this.selection = tile.piece
                    console.log("Selected", this.selection)
                    // draw moves
                    this.drawMoves(this.getFilteredMoves(this.selection))
                } else if (this.selection !== null) { // clicked an empty tile or enemy and selection is filled
                    const moves = this.getFilteredMoves(this.selection)
                    if (moves.some(move => move.x === tile!.x && move.y === tile!.y)) {
                        this.selection.move(tile)
                        this.selection = null
                        this.currentTurn = this.currentTurn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE
                        // hide moves
                        this.drawMoves([])
                        //scan for check and checkmate
                        console.log("turn:", this.currentTurn === PieceColor.WHITE ? "white" : "black")
                    } else {
                        console.log("Invalid move", moves)
                    }
                } else {
                    this.selection = null
                    console.log("Deselected")
                }

            }
        }
    }

    drawMoves(moves: Move[]) {
        for (const tile of this.terrain.flat()) {
            const mat = tile.mesh.material as THREE.MeshBasicMaterial
            mat.color.set(tile.tileColor)
        }
        for (const move of moves) {
            const mat = this.terrain[move.y][move.x].mesh.material as THREE.MeshBasicMaterial
            mat.color.set(0xFF0000)
        }
    }

}