
import * as THREE from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils"

export class FBXEntity {

    static loader = new FBXLoader()

    static loaded = new Map<string, THREE.Object3D>()

    static load(path: string) {
        return new Promise<THREE.Object3D>((resolve, reject) => {
            if (FBXEntity.loaded.has(path)) {
                const object = FBXEntity.loaded.get(path)!
                console.log("Loading from cache", object)
                //@ts-ignore
                resolve(SkeletonUtils.clone(object))
            } else {
                FBXEntity.loader.load(path, (object) => {
                    FBXEntity.loaded.set(path, object)
                    resolve(object)
                }, undefined, reject)
            }
        })
    }

    static async loadMultiple(paths: string[]) {
        const groups = await Promise.all(paths.map(path => FBXEntity.load(path)))
        console.log(groups)
        const objs = groups.flatMap(group => group.children)
        const animations = groups.flatMap(obj => obj.animations)
        const mesh = objs.filter((obj) => (obj as THREE.Mesh).isMesh)[0]

        mesh.castShadow = true
        mesh.receiveShadow = true

        mesh.animations = animations

        return mesh
    }

    mesh: THREE.Object3D
    mixer: THREE.AnimationMixer
    actions: THREE.AnimationAction[]

    constructor(object: THREE.Object3D) {
        this.mixer = new THREE.AnimationMixer(object)

        this.actions = object.animations.map(a => this.mixer.clipAction(a))

        object.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })

        object.rotation.set(Math.PI / 2, 0, 0)

        this.mesh = object

        console.log(this.actions)
    }

    remove() {
        if (!this.mesh.parent) return console.warn('Object not added to scene')
        this.mesh.parent.remove(this.mesh)
    }

    render() { }
    update() { }

    add(object: THREE.Object3D) {
        this.mesh.add(object)
    }

    playAction(index: number, weight = 1): THREE.AnimationAction {
        this.mixer.stopAllAction()
        const action = this.actions[index]
        action.weight = weight
        action.fadeIn(0.5)
        action.play()
        return action
    }

    blendAnimations(actions: THREE.AnimationAction[], weight = 1) {
        this.mixer.stopAllAction()
        for (const action of actions) {
            action.weight = weight
            action.fadeIn(0.5)
            action.play()
            weight = 1 - weight
        }
    }

}
