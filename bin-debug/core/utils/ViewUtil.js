/**
 *
 * @author
 *
 */
var ViewUtil = (function () {
    function ViewUtil() {
    }
    var d = __define,c=ViewUtil,p=c.prototype;
    ViewUtil.getShape = function (width, height, color, alpha) {
        if (width === void 0) { width = 640; }
        if (height === void 0) { height = 960; }
        if (color === void 0) { color = 0x000000; }
        if (alpha === void 0) { alpha = 0.7; }
        var shp = new egret.Shape();
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        shp.touchEnabled = false;
        return shp;
    };
    ViewUtil.getArtNum = function (art_src, src) {
        var con = new egret.Sprite();
        var i = 0;
        while (i < src.length) {
            var texture = RES.getRes(art_src + src.charAt(i));
            var bmp = new egret.Bitmap(texture);
            bmp.x = con.width + 1;
            bmp.y = -texture.textureHeight / 2;
            con.addChild(bmp);
        }
        return con;
    };
    /**检测碰撞*/
    ViewUtil.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    return ViewUtil;
}());
egret.registerClass(ViewUtil,'ViewUtil');
//# sourceMappingURL=ViewUtil.js.map