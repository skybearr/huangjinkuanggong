/**
 *
 * @author
 *
 */
var GameLogic = (function () {
    function GameLogic() {
        this.speedrate = 100000;
    }
    var d = __define,c=GameLogic,p=c.prototype;
    GameLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    };
    p.startMain = function () {
        this.removeGame();
        if (this.main == null) {
            this.main = new MainScene();
        }
        this.GameStage.addChild(this.main);
    };
    p.removeMain = function () {
        if (this.main != null && this.main.parent != null) {
            this.main.parent.removeChild(this.main);
        }
    };
    p.startGame = function () {
        this.removeMain();
        if (this.data == null) {
            this.data = [];
            var arr = RES.getRes("mission_json");
            for (var i = 0; i < arr.length; i++) {
                var vo = new MonsterVO();
                vo.id = parseInt(arr[i]['id']);
                vo.image = arr[i]['image'];
                vo.max_num = parseInt(arr[i]['max_num']);
                vo.left = parseInt(arr[i]['left']);
                vo.pos = parseInt(arr[i]['pos']);
                vo.movetype = parseInt(arr[i]['movetype']);
                vo.speed = parseInt(arr[i]['speed']);
                for (var j = 0; j < vo.max_num; j++) {
                    this.data.push(vo);
                }
            }
        }
        if (this.game == null) {
            this.game = new GameScene();
        }
        this.GameStage.addChild(this.game);
    };
    p.removeGame = function () {
        if (this.game != null && this.game.parent != null) {
            this.game.parent.removeChild(this.game);
        }
    };
    return GameLogic;
}());
egret.registerClass(GameLogic,'GameLogic');
//# sourceMappingURL=GameLogic.js.map