/**
 *
 * @author
 *
 */
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship() {
        _super.call(this);
        this.h = 540;
        this.r = 70;
        this.go = false;
        this.skinName = "ShipSkin";
    }
    var d = __define,c=Ship,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.gouzi.anchorOffsetX = 21;
        this.gouzi.x += 21;
        this.zeroX = this.gouzi.x;
        this.zeroY = this.gouzi.y;
        this.line = new egret.Shape();
        this.addChild(this.line);
        this.prepareStart();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.catchIt, this);
    };
    p.catchIt = function (sth) {
        //        this.tw2.setPaused(true);
        //        if(this.catched == null)
        //        {
        //            this.catched = new eui.Image();
        //        }
        //        this.catched.texture = RES.getRes("zz_s14_png");
        this.addChild(sth);
        this.tw2.setPaused(false);
    };
    p.prepareStart = function () {
        this.isCatch = false;
        this.tw1 = egret.Tween.get(this.gouzi, { loop: true });
        this.gouzi.rotation = this.r;
        this.tw1.to({ rotation: -this.r }, 3000).wait(100).to({ rotation: this.r }, 3000);
    };
    p.start = function () {
        if (this.isCatch || this.tw1 == null) {
            return;
        }
        this.tw1.setPaused(true);
        this.isCatch = true;
        this.tw2 = null;
        this.tw2 = egret.Tween.get(this.gouzi, { onChange: this.changeline, onChangeObj: this });
        this.line.visible = true;
        var r = this.gouzi.rotation;
        var hudu = r * Math.PI / 180;
        var tag = Math.tan(hudu);
        var w = tag * this.h;
        var tarX = this.zeroX - w;
        var tarY = this.h;
        if (tarX < -GameLogic.getInstance().GameStage_width / 2) {
            tarX = -GameLogic.getInstance().GameStage_width / 2;
            tarY = GameLogic.getInstance().GameStage_width / 2 / tag;
        }
        else if (tarX > GameLogic.getInstance().GameStage_width / 2) {
            tarX = GameLogic.getInstance().GameStage_width / 2;
            tarY = -GameLogic.getInstance().GameStage_width / 2 / tag;
        }
        this.tw2.to({ x: tarX, y: tarY }, 1000).wait(100).to({ x: this.zeroX, y: this.zeroY }, 1000).call(this.goOn, this);
    };
    p.changeline = function () {
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, 0xFF00FF);
        this.line.graphics.moveTo(78, 98);
        this.line.graphics.lineTo(this.gouzi.x, this.gouzi.y);
        this.line.graphics.endFill();
        if (GameLogic.getInstance().game != null) {
            GameLogic.getInstance().game.chectCatch();
        }
    };
    p.goOn = function () {
        this.line.visible = false;
        this.isCatch = false;
        this.tw1.setPaused(false);
    };
    p.clear = function () {
        egret.Tween.removeAllTweens();
        this.tw1 = null;
        this.tw2 = null;
        this.isCatch = false;
    };
    return Ship;
}(eui.Component));
egret.registerClass(Ship,'Ship');
//# sourceMappingURL=Ship.js.map