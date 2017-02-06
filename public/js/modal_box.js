function createModalBox(feature) {

            addBlockPage();
            addPopupBox();
            addStyle();
            $('.modal-box').fadeIn();


        function addStyle() {
            $('.modal-box').css({
                'position':'absolute',
                'left':'30%',
                'top': '20%',
                'display':'none',
                'height': '500px',
                'width': '500px',
                'border':'1px solid #fff',
                // 'box-shadow': '0px 2px 7px #292929',
                // '-moz-box-shadow': '0px 2px 7px #292929',
                // '-webkit-box-shadow': '0px 2px 7px #292929',
                'border-radius':'10px',
                // '-moz-border-radius':'10px',
                // '-webkit-border-radius':'10px',
                'background': '#f2f2f2',
                // 'z-index':'50',
            });

            // $('.modal-close').css({
            //     'position':'relative',
            //     'top':'-25px',
            //     'left':'20px',
            //     'float':'right',
            //     'display':'block',
            //     'height':'50px',
            //     'width':'50px',
            //
            //     // 'background': 'url(images/close.png) no-repeat',
            // });

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
                'height':'450px',
                'width':'450px',
                'padding':'10px',
                'margin':'15px',
                'border-radius':'10px',
                // '-moz-border-radius':'10px',
                // '-webkit-border-radius':'10px'
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

            var labelShapeName = document.createElement('label');
            $(labelShapeName).html = 'Название';
            var inputShapeName = document.createElement('input');
            $(inputShapeName).attr({
                type: 'text',
                id: 'shape-name'
            });
            var labelShapeDesc = document.createElement('label');
            // $(labelShapeDesc).html = 'Описание';
            var inputShapeDesc = document.createElement('input');
            $(inputShapeDesc).attr({
                type: 'text',
                id: 'shape-desc'
            });
            var btnOK = document.createElement('button');
            var btnCancel = document.createElement('button');
            $(content).append(labelShapeName, inputShapeName, labelShapeDesc, inputShapeDesc, btnOK, btnCancel);
            $(content).append(labelShapeDesc);
            feature.name = 'name1';
            feature.desc = 'desc1';
            $(popup).append(closeLink);
            $(popup).append(content);
            $(popup).appendTo('.block-page');

            // $('.modal-close').click(function() {
            //    $(this).parent().fadeOut().remove();
            //    $('.block-page').fadeOut().remove();
            // });
        }
    }

