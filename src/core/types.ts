import { Piece } from "../entities/Piece"
import { Tile } from "../entities/Tile"

export const TILE_SIZE = 10

export enum Facing {
    NORTH,
    EAST,
    SOUTH,
    WEST
}

export enum PieceColor {
    BLACK = 0x050505,
    WHITE = 0xdcdcff,
}

export enum TileColor {
    BLACK = 0x000000,
    WHITE = 0xC4C6C4,
}

export enum PieceType {
    KING = 'k',
    QUEEN = 'q',
    ROOK = 'r',
    BISHOP = 'b',
    KNIGHT = 'n',
    PAWN = 'p',
}

export type Move = { x: number, y: number }

export type PieceSlot = Piece | null

export type TileMatrix = Tile[][]

export type TerrainDefinition = (TileDefinition | null)[][]

export type TileDefinition = { type: PieceType, color: PieceColor }
