(function($) {
    $.fn.modalBox = function(prop) {

        var options = $.extend({
            height: '300',
            width: '300',
            name: 'test',
            description: ''
        }, prop);

        // return this.click(function(e) {
            addBlockPage();
            addPopupBox();
            addStyle();
            $('.modal-box').fadeIn();
        // });

        function addStyle() {
            $('.modal-box').css({
                'position':'absolute',
                'left':'30%',
                'top': '20%',
                'display':'none',
                'height': options.height + 'px',
                'width': options.width + 'px',
                'border':'1px solid #fff',
                'box-shadow': '0px 2px 7px #292929',
                '-moz-box-shadow': '0px 2px 7px #292929',
                '-webkit-box-shadow': '0px 2px 7px #292929',
                'border-radius':'10px',
                '-moz-border-radius':'10px',
                '-webkit-border-radius':'10px',
                'background': '#f2f2f2',
                'z-index':'50',
            });

            $('.modal-close').css({
                'position':'relative',
                'top':'-25px',
                'left':'20px',
                'float':'right',
                'display':'block',
                'height':'50px',
                'width':'50px',

                // 'background': 'url(images/close.png) no-repeat',
            });

            var pageHeight = $(document).height();
            var pageWidth = $(window).width();

            $('.block-page').css({
                'position':'absolute',
                'top':'0',
                'left':'0',
                'background-color':'rgba(0,0,0,0.6)',
                'height':pageHeight,
                'width':pageWidth,
                'z-index':'10'
            });

            $('.modal-content').css({
                'background-color':'#fff',
                'height':(options.height - 50) + 'px',
                'width':(options.width - 50) + 'px',
                'padding':'10px',
                'margin':'15px',
                'border-radius':'10px',
                '-moz-border-radius':'10px',
                '-webkit-border-radius':'10px'
            });
        }

        function addBlockPage() {
            var blockPage = document.createElement('div');
            $(blockPage).attr('class','block-page');
            $(blockPage).appendTo('body');
        }

        function addPopupBox() {
            var popup = document.createElement('div');
            $(popup).attr('class', 'modal-box');
            var closeLink = document.createElement('a');
            $(closeLink).attr({
                href: '#',
                class: 'modal-close'
            });
            var content = document.createElement('div');
            $(content).attr('class', 'modal-content');
            var title = document.createElement('h2');
            $(title).html(options.name);
            $(content).append(title);
            $(popup).append(closeLink);
            $(popup).append(content);
            $(popup).appendTo('.block-page');

            $('.modal-close').click(function() {
               $(this).parent().fadeOut().remove();
               $('.block-page').fadeOut().remove();
            });
        }
    }
}(jQuery));
