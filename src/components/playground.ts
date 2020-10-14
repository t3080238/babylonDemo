import * as BABYLON from 'babylonjs'

export default class Playground {
    private game: any;
    private coinList: any[] = [];

    constructor(game) {
        this.game = game;
        this.setObject();
        this.setMouseEvent();
    }

    public update() {
        this.coinList.forEach((coin, i) => {
            if (coin.position.z > 9 && coin.physicsImpostor.mass === 1) {
                // coin.physicsImpostor.setMass(100);
            }

            if (coin.position.y < -10) {
                coin.dispose();
                this.coinList.splice(i, 1);
            }
        })
    }

    private setObject() {
        let a = 2 / 100;
        let limitZ = 0;

        for (let i = 0; i < 20; i++) {
            let coin = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameter: 1.4, height: 0.2 }, this.game.scene);
            let x = Math.random() * 8 - 4;
            let z = Math.random() * 8 + 1;

            coin.position.set(x, 1, z);
            let ballMaterial = this.setMaterial({ diffuseColor: new BABYLON.Color3(1, 1, 0) });
            coin.material = ballMaterial;
            // 物理
            coin.physicsImpostor = new BABYLON.PhysicsImpostor(coin, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 1, restitution: 0 }, this.game.scene);
            this.coinList.push(coin);
        }

        setInterval(() => {
            // if (this.coinList.length >= 100) {
            //     limitZ += 0.1;
            //     return;
            // }
            // limitZ = 0;
            // // // 添加一个球体到场景中
            // let coin = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameter: 1.4, height: 0.2 }, this.game.scene);
            // let x = Math.random() * 8 - 4;
            // coin.position.set(x, 3, 1.5);
            // let ballMaterial = this.setMaterial( { diffuseColor: new BABYLON.Color3(1, 1, 0) });
            // coin.material = ballMaterial;
            // // 物理
            // coin.physicsImpostor = new BABYLON.PhysicsImpostor(coin, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 1, restitution: 0 }, this.game.scene);

            // this.coinList.push(coin);

        }, 2000)

        // sphere.applyGravity = true;

        // // 设置长宽高并创建
        // var myBox = BABYLON.MeshBuilder.CreateBox("myBox", { height: 5, width: 2, depth: 0.5 }, this.game.scene);
        // // 设置宽高并创建平面
        // var myPlane = BABYLON.MeshBuilder.CreatePlane("myPlane", { size: 10, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, this.game.scene);
        // // var sourcePlane = new BABYLON.Plane(0, -1, 1, 0);
        // // sourcePlane.normalize();

        // var myGround = BABYLON.MeshBuilder.CreateGround("myGround", { width: 6, height: 4, subdivisions: 4 }, this.game.scene);

        // //可以先初始化一个数据
        // var myPoints = [
        //     new BABYLON.Vector3(0, 0, 0),
        //     new BABYLON.Vector3(0, 1, 1),
        //     new BABYLON.Vector3(0, 1, 0)
        // ];
        // //创建一个线条
        // var lines = BABYLON.MeshBuilder.CreateLines("lines", { points: myPoints }, this.game.scene);
        // lines.scaling = new Vector3(10, 10, 10);

        // myBox.material = myMaterial;//mesh是之前创建的物体
        // // myPlane.material = myMaterial;

        // sphere.animations = [];
        // sphere.animations.push(ani);

        // this.game.scene.beginAnimation(sphere, 0, 100, true);

        // 平台
        // let table = BABYLON.MeshBuilder.CreateGround("table", { width: 10, height: 10 }, this.game.scene);
        // table.position.set(0, 0, 5);
        let table = BABYLON.MeshBuilder.CreateBox("table", { width: 10, height: 1, depth: 10 }, this.game.scene);
        table.position.set(0, -0.5, 5);
        // table.position.set(0, -0.5, 0);

        table.physicsImpostor = new BABYLON.PhysicsImpostor(table, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.3, restitution: 0 }, this.game.scene);

        // 推台
        let pushBox = BABYLON.MeshBuilder.CreateBox("pushBox", { height: 1, width: 10, depth: 6 }, this.game.scene);
        pushBox.position.set(0, 0.5, -3);
        pushBox.physicsImpostor = new BABYLON.PhysicsImpostor(pushBox, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.7, restitution: 0 }, this.game.scene);
        // 推台動作
        // let ani = this.setAnimation();
        // pushBox.animations = [];
        // pushBox.animations.push(ani);
        // this.game.scene.beginAnimation(pushBox, 0, 120, true);

        pushBox.registerAfterRender(() => {
            if (pushBox.position.z < -3) {
                a = 2 / 100;
            }
            else if (pushBox.position.z > limitZ) {
                a = -2 / 100;
            }

            pushBox.position.z += a;

            // pushBox.position.set(pushBox.position.x, pushBox.position.y, pushBox.position.z + a);
        })

        // setInterval(() => {
        //     if (pushBox.position.z < -3) {
        //         a = 4 / 100;
        //     }
        //     else if (pushBox.position.z > 1) {
        //         a = -4 / 100;
        //     }

        //     pushBox.position.set(pushBox.position.x, pushBox.position.y, pushBox.position.z + a);
        // }, 1000 / 60);
        var pushBoxMaterial = this.setMaterial({ diffuseColor: new BABYLON.Color3(1, 0, 0) });
        pushBox.material = pushBoxMaterial
        // 三面牆
        let wallTop = BABYLON.MeshBuilder.CreatePlane("wallTop", { width: 10, height: 1, sideOrientation: BABYLON.Mesh.DEFAULTSIDE }, this.game.scene);
        wallTop.position.set(0, 1.5, 0.4);
        wallTop.rotation.set(0, Math.PI, 0);
        wallTop.physicsImpostor = new BABYLON.PhysicsImpostor(wallTop, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, this.game.scene);
        let wallLeft = BABYLON.MeshBuilder.CreatePlane("wallLeft", { width: 10, height: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, this.game.scene);
        wallLeft.position.set(5, 0.5, 5);
        wallLeft.rotation.set(0, Math.PI / 2, 0);
        wallLeft.physicsImpostor = new BABYLON.PhysicsImpostor(wallLeft, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, this.game.scene);
        let wallRight = BABYLON.MeshBuilder.CreatePlane("wallRight", { width: 10, height: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, this.game.scene);
        wallRight.position.set(-5, 0.5, 5);
        wallRight.rotation.set(0, -Math.PI / 2, 0);
        wallRight.physicsImpostor = new BABYLON.PhysicsImpostor(wallRight, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, this.game.scene);
        var wallMaterial = this.setMaterial({ diffuseColor: new BABYLON.Color3(1, 0, 1) });
        wallTop.material = wallMaterial;
        wallLeft.material = wallMaterial;
        wallRight.material = wallMaterial;
    }

    private setMouseEvent() {
        var mouseWall = BABYLON.MeshBuilder.CreatePlane("mouseWall", { width: 40, height: 40, sideOrientation: BABYLON.Mesh.DEFAULTSIDE }, this.game.scene)
        mouseWall.material = this.setMaterial({ diffuseColor: new BABYLON.Color3(1, 1, 0) })
        mouseWall.position.set(0, 0, 10);
        mouseWall.rotation.set(0.5, Math.PI, 0);
        mouseWall.material.alpha = 0;

        // // 当点击事件被处罚时
        // window.addEventListener("click", (event) => {
        //     console.log(event);
        //     // We try to pick an object
        //     var pickResult = this.game.scene.pick(this.game.scene.pointerX, this.game.scene.pointerY);
        //     console.log(pickResult);
        // });

        this.game.scene.onPointerDown = (evt, pickResult) => {
            // if the click hits the ground object, we change the impact position
            if (pickResult.hit) {
                this.addCoin(pickResult.pickedPoint.x);
            }
        };

    }

    private addCoin(positionX) {
        let coin = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameter: 1.4, height: 0.2 }, this.game.scene);
        let x = positionX > 4 ? 4 : positionX;
        x = x < -4 ? -4 : x;
        coin.position.set(x, 3, 1.5);
        let ballMaterial = this.setMaterial({ diffuseColor: new BABYLON.Color3(1, 1, 0) });
        coin.material = ballMaterial;
        // 物理
        coin.physicsImpostor = new BABYLON.PhysicsImpostor(coin, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, friction: 1, restitution: 0 }, this.game.scene);

        this.coinList.push(coin);
    }

    setMaterial(color) {
        //第一个参数是材质名称，第二个是场景实例
        let material = new BABYLON.StandardMaterial("myMaterial", this.game.scene);//创建一个材质

        // if (color.diffuseColor) material.diffuseColor = new BABYLON.Color3(0, 1, 1);//漫反射颜色
        if (color.diffuseColor) material.diffuseColor = color.diffuseColor;//漫反射颜色
        if (color.specularColor) material.specularColor = color.specularColor;//镜面颜色
        if (color.emissiveColor) material.emissiveColor = color.emissiveColor;//自发光颜色
        if (color.ambientColor) material.ambientColor = color.ambientColor;//环境光颜色
        // myMaterial.wireframe = true;
        return material;
    }

    setAnimation() {
        var animationBox = new BABYLON.Animation("myAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        // An array with all animation keys
        var keys = [];

        //在动画key==0时, 缩放scaling的值是"1"
        keys.push({
            frame: 0,
            value: -3
        });

        //在动画key==20时, 缩放scaling的值是"0.2"
        keys.push({
            frame: 60,
            value: 1
        });

        //在动画key==100时, 缩放scaling的值是"1"
        keys.push({
            frame: 120,
            value: -3
        });

        animationBox.setKeys(keys);

        return animationBox;
    }

    setCameraBox() {
        this.game.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    }

}