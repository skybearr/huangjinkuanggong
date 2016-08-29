/**
 *
 * @author 
 *
 */
class GameLogic
{
    public constructor()
    {
    }

    private static _instance: GameLogic;
    public static getInstance(): GameLogic
    {
        if (this._instance == null)
        {
            this._instance = new GameLogic();
        }
        return this._instance;
    }

    public GameStage: egret.Stage;
    public GameStage_width: number;
    public GameStage_height: number;

    public main: MainScene;
    public game: GameScene;

    public data: MonsterVO[];
    
    public speedrate:number = 100000;

    public startMain(): void
    {
        this.removeGame();
        if (this.main == null)
        {
            this.main = new MainScene();
        }
        this.GameStage.addChild(this.main);
    }

    public removeMain(): void
    {
        if (this.main != null && this.main.parent != null)
        {
            this.main.parent.removeChild(this.main);
        }
    }

    public startGame(): void
    {
        this.removeMain();
        
        if (this.data == null)
        {
            this.data = [];
            var arr: Object[] = RES.getRes("mission_json");
            for (var i: number = 0; i < arr.length; i++)
            {
                var vo: MonsterVO = new MonsterVO();
                vo.id = parseInt(arr[i]['id']);
                vo.image = arr[i]['image'];
                vo.max_num = parseInt(arr[i]['max_num']);
                vo.left = parseInt(arr[i]['left']);
                vo.pos = parseInt(arr[i]['pos']);
                vo.movetype = parseInt(arr[i]['movetype']);
                vo.speed = parseInt(arr[i]['speed']);

                for(var j:number=0;j<vo.max_num;j++){
                    this.data.push(vo);
                }
            }
        }
        
        if (this.game == null)
        {
            this.game = new GameScene();
        }
        this.GameStage.addChild(this.game);
    }

    public removeGame(): void
    {
        if (this.game != null && this.game.parent != null)
        {
            this.game.parent.removeChild(this.game);
        }
    }
}
