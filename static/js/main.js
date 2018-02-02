/**
 * main.js
 * @author 武斌 <wubin.mail@foxmail.com>
 * @github https://github.com/Imasuperman
 * @giree  https://gitee.com/shuaibin
 * @homePage    http://www.wubin.pro
 */
layui.config({
    base: 'modules/',//模块目录
    version: new Date().getTime()
}).use(['element', 'layer', 'navbar', 'tab'], function() {
    var element = layui.element,
        $ = layui.jquery,
        layer = layui.layer,
        navbar = layui.navbar();
    tab = layui.tab({
        elem: '.admin-nav-card', //设置选项卡容器
        contextMenu: true,
        onSwitch: function (data) {
            // console.log(data.id); //当前Tab的Id
            // console.log(data.index); //得到当前Tab的所在下标
            // console.log(data.elem); //得到当前的Tab大容器
            // console.log(tab.getCurrentTabId())
        },
        closeBefore: function (obj) { //tab 关闭之前触发的事件
            //obj.title  -- 标题
            //obj.url    -- 链接地址
            //obj.id     -- id
            //obj.tabId  -- lay-id
            if (obj.title === 'BTable') {
                layer.confirm('确定要关闭' + obj.title + '吗?', { icon: 3, title: '系统提示' }, function (index) {
                    //因为confirm是非阻塞的，所以这里关闭当前tab需要调用一下deleteTab方法
                    tab.deleteTab(obj.tabId);
                    layer.close(index);
                });
                //返回true会直接关闭当前tab
                return false;
            }else if(obj.title==='表单'){
                layer.confirm('未保存的数据可能会丢失哦，确定要关闭吗?', { icon: 3, title: '系统提示' }, function (index) {
                    tab.deleteTab(obj.tabId);
                    layer.close(index);
                });
                return false;
            }
            return true;
        }
    });
    //左侧竖导航 start
    navbar.set({
        elem: '#nav',
        url: "./api/navbar.json"//数据源地址
    });
    //渲染左侧导航
    navbar.render();
    //监听点击事件
    navbar.on('click(side)', function (data) {
        tab.tabAdd(data.field);
    });
    //左侧竖导航 end
    //清除缓存
    $('#clearCache').on('click', function () {
        navbar.cleanCached();
        layer.alert('清除完成!', { icon: 1, title: '系统提示' }, function () {
            location.reload();//刷新

        });
    });
    $('.admin-side-toggle').on('click', function () {
        var sideWidth = $('#cr-admin-side').width();
        if (sideWidth === 200) {
            $('#cr-admin-body').animate({
                left: '0'
            }); //cr-admin-footer

            $('#cr-admin-footer').animate({
                left: '0'
            });
            $('#cr-admin-side').animate({
                width: '0'
            });
        } else {
            $('#cr-admin-body').animate({
                left: '200px'
            });
            $('#cr-admin-footer').animate({
                left: '200px'
            });
            $('#cr-admin-side').animate({
                width: '200px'
            });
        }
    });
    //iframe自适应
    $(window).on('resize', function () {
        var $content = $('.admin-nav-card .layui-tab-content');
        $content.height($(this).height() - 147);
        $content.find('iframe').each(function () {
            $(this).height($content.height());
        });
    }).resize();
    //手机左侧竖导航
    $('.site-tree-mobile').on('click', function () {
        $('body').addClass('site-mobile');
    });
    $('.site-mobile-shade').on('click', function () {
        $('body').removeClass('site-mobile');
    });
});