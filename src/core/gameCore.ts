import * as BABYLON from 'babylonjs'
import * as Ammo from 'ammo.js';
import Playground from '../components/playground'

export default class GameCore {
    private game: any = {};
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private camera: BABYLON.UniversalCamera;

    constructor() {
        // 得到canvas对象的引用
        this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        // 初始化 BABYLON 3D engine
        this.engine = new BABYLON.Engine(this.canvas, true);
        // 创建一个场景scene
        this.scene = new BABYLON.Scene(this.engine);

        this.createBasicEnv();

        this.setPhysicsEnv();

        this.game = {
            scene: this.scene,
            camera: this.camera
        }

        this.game.playground = new Playground(this.game)

        this.doRender();
        this.scene.registerBeforeRender(() => {
            this.update();
        })
    }

    // 創建基礎環境，打光和相機
    private createBasicEnv() {
        // 添加一组灯光到场景
        let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
        // var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(20, 20, 10), scene);

        // 添加一个相机，并绑定鼠标事件
        // var camera = new BABYLON.ArcRotateCamera("Camera", 2 * Math.PI / 3, Math.PI / 3, 2, new BABYLON.Vector3(0, 5, 10), scene);
        this.camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 15, 30), this.scene);
        //相机观察的目标，在这里表示：相机放在(0,0,-10)，镜头对准观察 (0,0,0)
        this.camera.setTarget(BABYLON.Vector3.Zero());

        // 让相机响应用户操作
        this.camera.attachControl(this.canvas, true);
        // 讓相機應用重力
        // camera.applyGravity = true;
        // 开启相機碰撞检测
        // this.camera.checkCollisions = true;
    }

    // 創建物理環境
    private setPhysicsEnv() {
        // 定义和应用重力和Cannon物理引擎，教學https://endoc.cnbabylon.com/how_to/using_the_physics_engine
        var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
        // var physicsPlugin = new BABYLON.CannonJSPlugin();
        var physicsPlugin = new BABYLON.AmmoJSPlugin();
        this.scene.enablePhysics(gravityVector, physicsPlugin);
    }

    // 每一幀的更新
    private update() {
        this.game.playground.update();
    }

    // 循环以及自适应
    private doRender(): void {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        window.addEventListener('resize', () => {
            this.engine.resize();
        })
    }
}