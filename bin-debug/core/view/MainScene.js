/**
 *
 * @author
 *
 */
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        _super.call(this);
        GameLogic.getInstance().main = this;
        this.skinName = "MainSceneSkin";
    }
    var d = __define,c=MainScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        RES.loadGroup("game");
    };
    p.loadOver = function () {
        if (this.start_btn != null) {
            this.start_btn.visible = true;
            this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
        }
    };
    p.start = function () {
        GameLogic.getInstance().startGame();
    };
    return MainScene;
}(eui.Component));
egret.registerClass(MainScene,'MainScene');
//# sourceMappingURL=MainScene.js.map