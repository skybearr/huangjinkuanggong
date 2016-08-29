/**
 *
 * @author 
 *
 */
class Ship extends eui.Component{
    public gouzi:eui.Group;
    private line:egret.Shape;
    private isCatch:boolean;
    private zeroX:number;
    private zeroY:number;
    private catched:eui.Image;
    
    private h:number = 540;
    private r:number = 70;
    private go:boolean = false;
    
	public constructor() {
    	super();
    	this.skinName = "ShipSkin";
	} 
	
    protected childrenCreated(): void
    {
        super.childrenCreated();

        this.gouzi.anchorOffsetX = 21;
        this.gouzi.x += 21;
        this.zeroX = this.gouzi.x;
        this.zeroY = this.gouzi.y;
        
        this.line = new egret.Shape();
        this.addChild(this.line);
        
        this.prepareStart();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.catchIt,this);
    }
    
    public catchIt(sth:egret.DisplayObject):void
    {
//        this.tw2.setPaused(true);
//        if(this.catched == null)
//        {
//            this.catched = new eui.Image();
//        }
//        this.catched.texture = RES.getRes("zz_s14_png");
        this.addChild(sth);
        this.tw2.setPaused(false);
    }
    
    private tw1:egret.Tween;
    private tw2:egret.Tween;
    private prepareStart():void
    {
        this.isCatch = false;
        this.tw1 = egret.Tween.get(this.gouzi, { loop: true });
        this.gouzi.rotation = this.r;
        this.tw1.to({ rotation: -this.r }, 3000).wait(100).to({ rotation: this.r},3000);
    }
    
    public start():void
    {
        if (this.isCatch || this.tw1 == null)
        {
            return;
        }
        this.tw1.setPaused(true);
        this.isCatch = true;
        
        this.tw2 = null;
        this.tw2 = egret.Tween.get(this.gouzi,{onChange:this.changeline,onChangeObj:this});
        
        this.line.visible = true;
        
        var r:number = this.gouzi.rotation;
        var hudu:number = r * Math.PI / 180;
        var tag: number = Math.tan(hudu)
        var w =  tag * this.h;
        var tarX:number = this.zeroX - w;
        var tarY:number = this.h;
        if (tarX < -GameLogic.getInstance().GameStage_width / 2)
        {
            tarX = - GameLogic.getInstance().GameStage_width / 2;
            tarY = GameLogic.getInstance().GameStage_width / 2 / tag;
        }
        else if(tarX > GameLogic.getInstance().GameStage_width / 2)
        {
            tarX = GameLogic.getInstance().GameStage_width / 2 ;
            tarY = -GameLogic.getInstance().GameStage_width / 2 / tag;
        }
        this.tw2.to({ x:tarX,y:tarY }, 1000).wait(100).to({ x: this.zeroX, y: this.zeroY }, 1000).call(this.goOn, this);
    }
    
    private changeline():void
    {
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, 0xFF00FF);
        this.line.graphics.moveTo(78, 98);
        this.line.graphics.lineTo(this.gouzi.x, this.gouzi.y);
        this.line.graphics.endFill();
        
        if (GameLogic.getInstance().game != null){
            GameLogic.getInstance().game.chectCatch();
        }
    }
    
    private goOn():void
    {
        this.line.visible = false;
        this.isCatch = false;
        this.tw1.setPaused(false);
    }
    
    public clear():void
    {
        egret.Tween.removeAllTweens();
        this.tw1 = null;
        this.tw2 = null;
        this.isCatch = false;
    }
}
