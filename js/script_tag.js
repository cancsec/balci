    
  var whatsappOrderApp = {
    init: function() {

        let app_options = JSON.parse('\u007B\u0022tr\u0022\u003A\u007B\u0022status\u0022\u003A\u00221\u0022,\u0022phone_number\u0022\u003A\u0022\u002B905379508818\u0022,\u0022button_text\u0022\u003A\u0022Whatsapp\u0022,\u0022message\u0022\u003A\u0022Merhabalar\u003B\u0020size\u0020nas\\u0131l\u0020yard\\u0131mc\\u0131\u0020olabiliriz\u003F\u0022,\u0022screen_position\u0022\u003A\u0022right\u0022,\u0022show_on_main_page\u0022\u003A\u00221\u0022,\u0022revision\u0022\u003A\u00221684826845\u0022\u007D\u007D');

        let lang = this.getCookie("APP_LANGUAGE") !== "" ? this.getCookie("APP_LANGUAGE") : "tr";
        app_options = app_options[lang];

        if (app_options.status === '1') {
            if (app_options.show_on_main_page == '0' && this.checkMainPage()){
                return;
            }
            let app = document.createElement('div');
            app.innerHTML = '\u003Cstyle\u003E\n\u0020\u0020\u0023whatsapp\u002Dorder\u0020\u007B\n\u0020\u0020\u0020\u0020position\u003A\u0020fixed\u003B\n\u0020\u0020\u0020\u0020bottom\u003A\u002010px\u003B\n\u0020\u0020\u0020\u0020z\u002Dindex\u003A\u00209999\u003B\n\u0020\u0020\u0020\u0020display\u003A\u0020flex\u003B\n\u0020\u0020\u0020\u0020width\u003A\u002020rem\u003B\n\u0020\u0020\u0020\u0020height\u003A\u00205rem\u003B\n\u0020\u0020\u0020\u0020align\u002Ditems\u003A\u0020center\u003B\n\u0020\u0020\u0020\u0020color\u003A\u0020\u0023ffffff\u003B\n\u0020\u0020\u0020\u0020font\u002Dsize\u003A\u00201.4rem\u003B\n\u0020\u0020\u0020\u0020justify\u002Dcontent\u003A\u0020center\u003B\n\u0020\u0020\u0020\u0020background\u003A\u0020\u0023128c7e\u003B\n\u0020\u0020\u0020\u0020border\u002Dradius\u003A\u0020.4rem\u003B\n\u0020\u0020\u007D\n\n\u0020\u0020\u0023whatsapp\u002Dorder.left\u0020\u007B\n\u0020\u0020\u0020\u0020left\u003A\u002010px\u003B\n\u0020\u0020\u007D\n\u0020\u0020\u0023whatsapp\u002Dorder.right\u0020\u007B\n\u0020\u0020\u0020\u0020right\u003A\u002010px\u003B\n\u0020\u0020\u007D\n\u0020\u0020\u0023whatsapp\u002Dorder\u0020.fab\u0020\u007B\n\u0020\u0020\u0020\u0020margin\u002Dright\u003A\u00201rem\u003B\n\u0020\u0020\u0020\u0020font\u002Dsize\u003A\u00202.2rem\u003B\n\u0020\u0020\u007D\n\u003C\/style\u003E\n\n\n\u003Cdiv\u0020id\u003D\u0022app\u0022\u003E\n\u0020\u0020\u003Ca\u0020id\u003D\u0022whatsapp\u002Dorder\u0022\u0020href\u003D\u0022javascript\u003Avoid\u00280\u0029\u003B\u0022\u003E\n\u0020\u0020\u0020\u0020\u003Cspan\u0020class\u003D\u0022fab\u0020fa\u002Dwhatsapp\u0022\u003E\u003C\/span\u003E\n\u0020\u0020\u003C\/a\u003E\n\u003C\/div\u003E';

            let header = document.getElementById("header");
            if(header != null){
                header.parentNode.insertBefore(app, header);
            }
            var self = this;
            let whatsappButtonElement = document.getElementById('whatsapp-order');
            if(whatsappButtonElement  != null){
                whatsappButtonElement.classList.add(app_options.screen_position);
                whatsappButtonElement.append(app_options.button_text);
                whatsappButtonElement .addEventListener('click', function (e) {
                    self.redirectWhatsappOrderLink(app_options);
                });
            }
        }
    },
    isMobile: function() {
        return (
            navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/iPhone|iPad|iPod/i)
            || navigator.userAgent.match(/Opera Mini/i)
            || navigator.userAgent.match(/IEMobile/i)
        )
    },
    redirectWhatsappOrderLink: function (app_options) {
        let whatsappLink = 'http://{whatsapp_source}.whatsapp.com/send?phone={phone_number}&text={message}%20{site_url}';
        let whatsappSource = "web";
        if (this.isMobile()) {
            whatsappSource = "api";
        }
        let siteUrl = window.location.href;
        // var productName = IdeaApp.product.fullname;
        let url = whatsappLink
            .replace(/{site_url}/g, siteUrl)
            .replace(/{whatsapp_source}/g, whatsappSource)
            .replace(/{phone_number}/g, app_options.phone_number)
            .replace(/{message}/g, encodeURI(app_options.message));
        window.open(url, '_blank');
    },

    getCookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    checkMainPage: function () {

        let pathName = window.location.pathname.split('/');
        let isMainPage=false;

        if (pathName[0] === '' && pathName[1] === ''
            || pathName[0] === '' && pathName[1].length === 2 && pathName[2] === undefined
            || pathName[0] === '' && pathName[1].length === 2 && pathName[2] === '') {

            isMainPage = true;
        }

        return isMainPage;
    }
}

whatsappOrderApp.init();
