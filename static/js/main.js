/**
 * main.js
 * @author 武斌 <wubin.mail@foxmail.com>
 * @github https://github.com/Imasuperman
 * @giree  https://gitee.com/shuaibin
 * @homePage    http://www.wubin.pro
 */
layui.config({
    base: 'modules/',
    version: new Date().getTime()
}).use(['element', 'layer', 'navbar', 'tab'], function() {
    var element = layui.element,
        $ = layui.jquery,
        layer = layui.layer,
        navbar = layui.navbar();
        //左侧竖导航 start
        navbar.set({
            elem: '#nav',
            url: "./api/navbar.json"//数据源地址
        });
        navbar.render();
        // 左侧竖导航 end
        $(".panel a").on("click",function(){
            window.parent.addTab($(this));
        })
});