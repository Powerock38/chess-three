
import * as THREE from "three"

export class Entity {
    geometry: THREE.BufferGeometry
    material: THREE.Material
    mesh: THREE.Mesh

    static list: Entity[] = []
    static updateAll() {
        for (const entity of Entity.list) {
            entity.update()
        }
    }

    constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
        this.geometry = geometry
        this.material = material
        this.mesh = new THREE.Mesh(geometry, material)
        Entity.list.push(this)
    }


    remove() {
        if (!this.mesh.parent) return console.warn('Mesh not added to scene')
        this.mesh.parent.remove(this.mesh)
    }

    render() {}
    update() {}

    add(mesh: THREE.Mesh) {
        this.mesh.add(mesh)
    }

}
