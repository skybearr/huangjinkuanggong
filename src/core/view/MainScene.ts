/**
 *
 * @author 
 *
 */
class MainScene extends eui.Component{
    private start_btn:eui.Image;
	public constructor() {
    	super();
    	GameLogic.getInstance().main = this;
        this.skinName = "MainSceneSkin";
	}
	
	protected childrenCreated():void
	{
	    super.childrenCreated();
	    
        RES.loadGroup("game");
	}
	
    public loadOver():void
    {
        if(this.start_btn != null)
        {
            this.start_btn.visible = true;
            this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.start,this);
        } 
    }
    
    private start():void
    {
        GameLogic.getInstance().startGame();
    }
}
