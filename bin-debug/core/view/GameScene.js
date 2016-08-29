/**
 *
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.skinName = "GameSceneSkin";
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.monsterArr = [];
        this.monsterCon = new egret.Sprite();
        this.addChild(this.monsterCon);
        this.initMonsters();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
    };
    p.initMonsters = function () {
        this.removeMonsters();
        var arr = GameLogic.getInstance().data;
        if (arr != null) {
            for (var i = 0; i < arr.length; i++) {
                var m = new Monster(arr[i]);
                this.addChild(m);
                this.monsterCon.addChild(m);
                this.monsterArr.push(m);
            }
        }
        this.monsterCon.x = 0;
        this.monsterCon.y = 140;
        this.monsterStart();
    };
    p.monsterStart = function () {
        for (var i = 0; i < this.monsterArr.length; i++) {
            this.monsterArr[i].start();
        }
    };
    p.chectCatch = function () {
        for (var i = 0; i < this.monsterArr.length; i++) {
            if (ViewUtil.hitTest(this.monsterArr[i], this.ship)) {
                this.ship.catchIt(this.monsterArr[i]);
                break;
            }
        }
    };
    p.start = function () {
        this.ship.start();
    };
    p.removeMonsters = function () {
        for (var i = 0; i < this.monsterArr.length; i++) {
            if (this.monsterArr[i] != null && this.monsterArr[i].parent != null) {
                this.monsterArr[i].parent.removeChild(this.monsterArr[i]);
                this.monsterArr[i].clear();
                this.monsterArr[i] = null;
            }
        }
        this.monsterArr = [];
    };
    p.gameOver = function () {
        GameLogic.getInstance().startMain();
    };
    return GameScene;
}(eui.Component));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map