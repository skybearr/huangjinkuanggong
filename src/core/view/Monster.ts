/**
 *
 * @author 
 *
 */
class Monster extends egret.Sprite
{
    private bg: egret.Bitmap;

    private vo: MonsterVO;
    private birthX: number;
    private birthY: number;
    private tarX: number;
    private tarY: number;

    public constructor(vo: MonsterVO)
    {
        super();
        this.vo = vo;

        this.init();
    }

    private init(): void
    {
        this.bg = new egret.Bitmap(RES.getRes(this.vo.image));
        this.addChild(this.bg);
        this.visible = false;
        this.play();
    }

    private play(): void
    {
        var tw = egret.Tween.get(this.bg);
        tw.to({ y: -5 }, 1000).wait(200).to({ y: 5 }, 1000).call(this.play, this);
    }

    public start(): void
    {
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
    }

    private moveOver(): void
    {
        this.start();
    }

    public clear(): void
    {
        egret.Tween.removeAllTweens();
    }
}
