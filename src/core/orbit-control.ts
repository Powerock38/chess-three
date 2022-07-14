import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { camera } from './camera'
import { renderer } from './renderer'

export const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true
