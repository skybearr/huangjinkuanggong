/**
 *
 * @author 
 *
 */
class GameScene extends eui.Component{
    private ship:Ship;
    private monsterArr:Monster[];
    private monsterCon:egret.Sprite;
    
	public constructor() {
    	super();
        this.skinName = "GameSceneSkin";
	}
	
    protected childrenCreated(): void
    {
        super.childrenCreated();
        
        this.monsterArr = [];
        this.monsterCon = new egret.Sprite();
        this.addChild(this.monsterCon);
        
        this.initMonsters();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.start,this);
    }
    
    private initMonsters():void
    {
        this.removeMonsters();
        
        var arr:MonsterVO[] = GameLogic.getInstance().data;
        if(arr != null)
        {
            for(var i:number=0;i<arr.length;i++){
                var m:Monster = new Monster(arr[i]);
                this.addChild(m);
                this.monsterCon.addChild(m);
                this.monsterArr.push(m);
            }
        }
        this.monsterCon.x = 0;
        this.monsterCon.y = 140;
        this.monsterStart();
    }
    
    private monsterStart():void
    {
        for (var i: number = 0; i < this.monsterArr.length; i++)
        {
            this.monsterArr[i].start();
        }
    }
    

    public chectCatch(): void
    {
        for(var i:number=0;i<this.monsterArr.length;i++){
            if(ViewUtil.hitTest(this.monsterArr[i],this.ship)){
                this.ship.catchIt(this.monsterArr[i]);
                break;
            }
        }
    }
    
    private start():void
    {
        this.ship.start();
    }
    
    private removeMonsters():void
    {
        for(var i:number=0;i<this.monsterArr.length;i++){
            if (this.monsterArr[i] != null && this.monsterArr[i].parent != null){
                this.monsterArr[i].parent.removeChild(this.monsterArr[i]);
                this.monsterArr[i].clear();
                this.monsterArr[i] = null;
            }
        }
        this.monsterArr = [];
    }
    
    private gameOver(): void
    {
        GameLogic.getInstance().startMain();
    }

}
