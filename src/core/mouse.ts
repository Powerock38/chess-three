import * as THREE from "three"
import camera from "./camera";
import { renderer } from "./renderer";

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

export function listenMouse(scene: THREE.Scene, onIntersect: (inter: THREE.Intersection) => void) {
    function onMouseClick(event: MouseEvent) {
        mouse.set(
            (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            (event.clientY / renderer.domElement.clientHeight) * - 2 + 1
        )
        // console.log(mouse)
        raycaster.setFromCamera(mouse, camera)
        const inter = raycaster.intersectObjects(scene.children)
        onIntersect(inter[0])
    }
    renderer.domElement.addEventListener('click', onMouseClick, false);
}