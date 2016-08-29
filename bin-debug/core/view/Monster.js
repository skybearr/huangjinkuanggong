/**
 *
 * @author
 *
 */
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(vo) {
        _super.call(this);
        this.vo = vo;
        this.init();
    }
    var d = __define,c=Monster,p=c.prototype;
    p.init = function () {
        this.bg = new egret.Bitmap(RES.getRes(this.vo.image));
        this.addChild(this.bg);
        this.visible = false;
        this.play();
    };
    p.play = function () {
        var tw = egret.Tween.get(this.bg);
        tw.to({ y: -5 }, 1000).wait(200).to({ y: 5 }, 1000).call(this.play, this);
    };
    p.start = function () {
        this.birthX = 0;
        this.birthY = Math.random() * 400;
        this.tarX = GameLogic.getInstance().GameStage_width;
        this.tarY = this.birthY;
        this.x = this.birthX;
        this.y = this.birthY;
        this.visible = true;
        var speedrate = GameLogic.getInstance().speedrate;
        var tw = egret.Tween.get(this);
        tw.to({ x: this.tarX, y: this.tarY }, speedrate / this.vo.speed).call(this.moveOver, this);
    };
    p.moveOver = function () {
        this.start();
    };
    p.clear = function () {
        egret.Tween.removeAllTweens();
    };
    return Monster;
}(egret.Sprite));
egret.registerClass(Monster,'Monster');
//# sourceMappingURL=Monster.js.map