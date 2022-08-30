import * as THREE from 'three'
import camera from './core/camera'
import { fpsGraph } from './core/gui'
import { orbitControls } from './core/orbit-control'
import { renderer, scene } from './core/renderer'
import { PieceColor, PieceType } from './core/types'

import { Checkerboard } from './entities/Checkerboard'
import { FBXEntity } from './entities/FBXEntity'
import './style.css'

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
hemiLight.position.set(0, 200, 0)
scene.add(hemiLight)

// const fbxPaths = import.meta.glob('/src/assets/king/*.fbx')
// for (const path in fbxPaths) {
//     FBXEntity.load(path)
// }

//const test = FBXEntity.load('/src/assets/king/draw_sword_1.fbx')

//const fbxs1 = [await FBXEntity.load("/src/assets/pawn.fbx")]
//const fbxs2 = await Promise.all(new Array(31).fill(null).map(_ => FBXEntity.load("/src/assets/pawn.fbx")))
//const fbxs = [...fbxs1, ...fbxs2]


const fbxs = [
    await FBXEntity.loadMultiple(["/src/assets/pawn.fbx", "/src/assets/mma-kick.fbx"]),
    ...await Promise.all(new Array(31).fill(null).map(_ => FBXEntity.loadMultiple(["/src/assets/pawn.fbx", "/src/assets/mma-kick.fbx"])))
]

const cb = new Checkerboard(fbxs, scene, [
    [{ type: PieceType.ROOK, color: PieceColor.BLACK }, { type: PieceType.BISHOP, color: PieceColor.BLACK }, { type: PieceType.KNIGHT, color: PieceColor.BLACK }, { type: PieceType.KING, color: PieceColor.BLACK }, { type: PieceType.QUEEN, color: PieceColor.BLACK }, { type: PieceType.BISHOP, color: PieceColor.BLACK }, { type: PieceType.KNIGHT, color: PieceColor.BLACK }, { type: PieceType.ROOK, color: PieceColor.BLACK }],
    [{ type: PieceType.PAWN, color: PieceColor.BLACK }, { type: PieceType.PAWN, color: PieceColor.BLACK }, { type: PieceType.PAWN, color: PieceColor.BLACK }, { type: PieceType.PAWN, color: PieceColor.BLACK }, { type: PieceType.PAWN, color: PieceColor.BLACK }, { type: PieceType.PAWN, color: PieceColor.BLACK }, { type: PieceType.PAWN, color: PieceColor.BLACK }, { type: PieceType.PAWN, color: PieceColor.BLACK }],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [{ type: PieceType.PAWN, color: PieceColor.WHITE }, { type: PieceType.PAWN, color: PieceColor.WHITE }, { type: PieceType.PAWN, color: PieceColor.WHITE }, { type: PieceType.PAWN, color: PieceColor.WHITE }, { type: PieceType.PAWN, color: PieceColor.WHITE }, { type: PieceType.PAWN, color: PieceColor.WHITE }, { type: PieceType.PAWN, color: PieceColor.WHITE }, { type: PieceType.PAWN, color: PieceColor.WHITE }],
    [{ type: PieceType.ROOK, color: PieceColor.WHITE }, { type: PieceType.BISHOP, color: PieceColor.WHITE }, { type: PieceType.KNIGHT, color: PieceColor.WHITE }, { type: PieceType.QUEEN, color: PieceColor.WHITE }, { type: PieceType.KING, color: PieceColor.WHITE }, { type: PieceType.BISHOP, color: PieceColor.WHITE }, { type: PieceType.KNIGHT, color: PieceColor.WHITE }, { type: PieceType.ROOK, color: PieceColor.WHITE }],
])

const clock = new THREE.Clock()

function render() {
    fpsGraph.begin()

    orbitControls.update()
    cb.animate(clock)
    renderer.render(scene, camera)

    fpsGraph.end()
    requestAnimationFrame(render)
}

render()
