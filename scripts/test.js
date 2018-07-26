
var
    form = $('#test-form'),
    langs = form.find('[name=lang]'),
    selectAll = form.find('label.selectAll :checkbox'),
    selectAllLabel = form.find('label.selectAll span.selectAll'),
    deselectAllLabel = form.find('label.selectAll span.deselectAll'),
    invertSelect = form.find('a.invertSelect');

// 重置初始化状态:
form.find('*').show().off();
form.find(':checkbox').prop('checked', false).off();
deselectAllLabel.hide();
// 拦截form提交事件:
form.off().submit(function (e) {
    e.preventDefault();
    alert(form.serialize());
});

// TODO:绑定事件
selectAll.change(function(){
if(selectAll.prop('checked'))
{
langs.prop('checked',true);
selectAllLabel.hide();
deselectAllLabel.show();
}
else
{
langs.prop('checked',false);
selectAllLabel.show();
deselectAllLabel.hide();
}
});

invertSelect.click(function(){
langs.each(function(){
$(this).prop('checked', !$(this).prop('checked'));
});
});


      
langs.change(function(){
var count = 0; 
langs.each(function(){
if ($(this).prop('checked') === true)
count += 1;
});
if(count === 5)
{
selectAll.prop('checked',true);
selectAllLabel.hide();
deselectAllLabel.show();
}
else
{
selectAll.prop('checked',false);
selectAllLabel.show();
deselectAllLabel.hide();
}
});

//
$.fn.external = function () {
    // return返回的each()返回结果，支持链式调用:
    return this.filter('a').each(function () {
        // 注意: each()内部的回调函数的this绑定为DOM本身!
        var a = $(this);
        var url = a.attr('href');
        if (url && (url.indexOf('http://')===0 || url.indexOf('https://')===0)) {
            a.attr('href', '#0')
             .removeAttr('target')
             .append(' <i class="uk-icon-external-link"></i>')
             .click(function () {
                if(confirm('你确定要前往' + url + '？')) {
                    window.open(url);
                }
            });
        }
    });
}

$('#test-external a').external();
