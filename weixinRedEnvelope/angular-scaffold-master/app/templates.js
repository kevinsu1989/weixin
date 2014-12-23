angular.module('templates', ['common/templates/layout.partials.html', 'modules/decorate/templates/acceptance.html', 'modules/decorate/templates/confirm.html', 'modules/decorate/templates/decorate-progress.partial.html', 'modules/decorate/templates/decorate.html', 'modules/decorate/templates/drawing.html', 'modules/decorate/templates/history.html', 'modules/decorate/templates/houses.html', 'modules/decorate/templates/invitation.html', 'modules/decorate/templates/notice-acceptance.html', 'modules/decorate/templates/notice-drawing.html', 'modules/decorate/templates/notice-initiate.html', 'modules/decorate/templates/notice-refund.html', 'modules/decorate/templates/progress.html', 'modules/decorate/templates/reference.html', 'modules/decorate/templates/refund.html', 'modules/home/templates/config.html', 'modules/home/templates/home.html', 'modules/register/templates/captcha.html', 'modules/register/templates/failure.html', 'modules/register/templates/mobile.html', 'modules/register/templates/register.html', 'modules/register/templates/success.html']);

angular.module("common/templates/layout.partials.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/layout.partials.html",
    "<div ui-view></div>");
}]);

angular.module("modules/decorate/templates/acceptance.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/acceptance.html",
    "<div class=\"request\">\n" +
    "  <form name=\"acceptanceForm\" ng-submit=\"submitVerify()\">\n" +
    "    <dl class=\"terms\">\n" +
    "      <dt class=\"small text-light\">您的装修公司</dt>\n" +
    "      <dd class=\"simulate-control\">某某某装修公司</dd>\n" +
    "    </dl>\n" +
    "    <dl class=\"terms\">\n" +
    "      <dt class=\"small text-light\">您的个人信息</dt>\n" +
    "      <dd class=\"simulate-control clearfix\">\n" +
    "        <span class=\"pull-left\">张三先生</span>\n" +
    "        <span class=\"pull-right text-lighter\">186****5297</span>\n" +
    "      </dd>\n" +
    "    </dl>\n" +
    "    <dl class=\"terms\">\n" +
    "      <dt class=\"small text-light\">您的装修房间</dt>\n" +
    "      <dd class=\"simulate-control\">\n" +
    "        炫特嘉园3C1905\n" +
    "      </dd>\n" +
    "    </dl>\n" +
    "    <dl class=\"terms\">\n" +
    "      <dt class=\"small text-light\">您希望的验收日期</dt>\n" +
    "      <dd>\n" +
    "        <input class=\"form-control\" type=\"date\" ng-model=\"date\"  placeholder=\"选择验收日期\" required />\n" +
    "      </dd>\n" +
    "    </dl>\n" +
    "    <div class=\"full-width\" style=\"position:absolute;bottom:10px;padding: 0 15px;\">\n" +
    "      <button type=\"submit\" class=\"btn btn-primary full-width\" ng-disabled=\"acceptanceForm.$invalid\">申请验收</button>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>");
}]);

angular.module("modules/decorate/templates/confirm.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/confirm.html",
    "<div id=\"reference\">\n" +
    "  <div class=\"main text-light\">\n" +
    "    <p>请和您委托的装修公司负责人共同到物业办理装修入场许可。需携带材料如下：</p>\n" +
    "    <dl class=\"indent\">\n" +
    "      <dt class=\"text-default\">您的个人信息材料：</dt>\n" +
    "      <dd>- 身份证原件</dd>\n" +
    "      <dd>- 购房合同</dd>\n" +
    "    </dl>\n" +
    "    <dl class=\"indent\">\n" +
    "      <dt class=\"text-default\">装修公司信息材料：</dt>\n" +
    "      <dd>- 营业执照</dd>\n" +
    "      <dd>- 现场负责人身份证原件</dd>\n" +
    "    </dl>\n" +
    "    <dl class=\"indent\">\n" +
    "      <dt class=\"text-default\">手续费用：</dt>\n" +
    "      <dd>- 您需缴纳的费用合计为：￥{{ total|number:2 }}</dd>\n" +
    "      <dd>\n" +
    "        <span class=\"tiny text-muted details\">\n" +
    "          ( 包括：\n" +
    "          <span class=\"item\" ng-repeat=\"item in charge.deposit\">{{ item.name }} ￥{{ item.money|number:2 }}</span>\n" +
    "          <span class=\"item\" ng-repeat=\"item in charge.expense\">{{ item.name }} ￥{{ item.money|number:2 }}</span>)\n" +
    "        </span>\n" +
    "      </dd>\n" +
    "    </dl>\n" +
    "    <dl class=\"indent\">\n" +
    "      <dt class=\"text-default\">现场需要您签字确认：</dt>\n" +
    "      <dd>- 您的装修图纸</dd>\n" +
    "      <dd>- 装修授权委托书</dd>\n" +
    "      <dd>- 其他相关装修规定</dd>\n" +
    "    </dl>\n" +
    "  </div>\n" +
    "  <div class=\"full-width\" style=\"position:absolute;bottom:10px;padding: 0 15px;\">\n" +
    "    <a type=\"submit\" class=\"btn btn-primary full-width\" href=\"tel:010-60238889\">预约办理装修许可: 010-60238889</a>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/decorate/templates/decorate-progress.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/decorate-progress.partial.html",
    "<dd>\n" +
    "  <a class=\"desc\" ng-click=\"nextStep(item)\">\n" +
    "    <span class=\"status pull-right\" ng-hide=\"!action\" ng-class=\"{'text-light': muted}\">{{ action }}</span>\n" +
    "    <span class=\"apartment text-default\" ng-transclude></span>\n" +
    "  </a>\n" +
    "  <ul class=\"list-unstyled text-muted small\" ng-if=\"group\">\n" +
    "    <li class=\"clearfix\" ng-repeat=\"item in group\">\n" +
    "      <span class=\"pull-left\">{{ item.time|date:'yyyy-MM-dd HH:mm' }}</span>\n" +
    "      <span class=\"pull-right\">{{ item.status|decorateStatus }}</span>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</dd>\n" +
    "\n" +
    "");
}]);

angular.module("modules/decorate/templates/decorate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/decorate.html",
    "<div id=\"decorate\" ui-view></div>");
}]);

angular.module("modules/decorate/templates/drawing.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/drawing.html",
    "<div class=\"drawing\">\n" +
    "  <h5 class=\"small text-light\">提交装修图纸方式：</h5>\n" +
    "  <a class=\"btn btn-success full-width\">1）在线提交装修图纸</a>\n" +
    "  <a class=\"btn btn-primary full-width\" ng-click=\"manualSubmit()\">2）装修公司现场提交</a>\n" +
    "</div>");
}]);

angular.module("modules/decorate/templates/history.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/history.html",
    "<div class=\"history\">\n" +
    "  <a class=\"text-default\" ui-sref=\"decorate.progress({decorateId: decorate.id})\" ng-repeat=\"decorate in decorates\">\n" +
    "    <dl class=\"terms tiny\">\n" +
    "      <dt class=\"clearfix\">\n" +
    "        <span class=\"pull-left text-light\">序列号：{{ decorate.id }}</span>\n" +
    "        <span class=\"pull-right text-warning\">{{ decorate.status|decorateStatus }}</span>\n" +
    "      </dt>\n" +
    "      <dd class=\"simulate-control\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-xs-6 col-sm-6 text-overflow\">\n" +
    "              <span class=\"text-muted\">社区：</span>{{ decorate.buildingName }}\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6 col-sm-6\">\n" +
    "              <span class=\"text-muted\">申请日期：</span>{{ decorate.time|date:'yyyy-MM-dd' }}\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </dd>\n" +
    "      <dd class=\"simulate-control text-overflow\"><span class=\"text-muted\">申请人：</span>{{ decorate.userName }} {{ decorate.userMobile }} @{{ decorate.roomName }}</dd>\n" +
    "      <dd class=\"simulate-control text-overflow\"><span class=\"text-muted\">装修公司：</span>{{ decorate.provider }}</dd>\n" +
    "    </dl>\n" +
    "  </a>\n" +
    "</div>");
}]);

angular.module("modules/decorate/templates/houses.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/houses.html",
    "<div class=\"have-house\" ng-if=\"!(groups|empty)\">\n" +
    "  <dl class=\"terms\" ng-repeat=\"(community, houses) in groups\">\n" +
    "    <dt class=\"small text-light\">{{ community }}</dt>\n" +
    "    <dd ng-repeat=\"house in houses\">\n" +
    "      <a class=\"desc\" ng-if=\"house.decorateId\" ui-sref=\"decorate.progress({decorateId: house.decorateId})\">\n" +
    "        <span class=\"status pull-right\" ng-class=\"{'text-muted': house.status === 2}\">{{ house.status|houseStatus }}</span>\n" +
    "        <span class=\"apartment text-overflow text-default\">{{ house.apartment }}</span>\n" +
    "      </a>\n" +
    "      <a class=\"desc\" ng-if=\"!house.decorateId\" ui-sref=\"decorate.invitation({houseId: house.id})\">\n" +
    "        <span class=\"status pull-right\" ng-class=\"{'text-muted': house.status === 2}\">{{ house.status|houseStatus }}</span>\n" +
    "        <span class=\"apartment text-overflow text-default\">{{ house.apartment }}</span>\n" +
    "      </a>\n" +
    "    </dd>\n" +
    "  </dl>\n" +
    "  <div class=\"correction small text-muted\">\n" +
    "    <p>房间信息不对？</p>\n" +
    "    <p>请联系客服确认：<a href=\"tel:01060898888\">010-60898888</a></p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"havent-house\" ng-if=\"groups|empty\">\n" +
    "  <div class=\"correction small\">\n" +
    "    <p>啊哦，系统未搜索到与您相关的房间信息~ <br />其实您有相关的房间？</p>\n" +
    "    <p>请联系客服确认：<a href=\"tel:01060898888\">010-60898888</a></p>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/decorate/templates/invitation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/invitation.html",
    "<div class=\"request\">\n" +
    "  <form name=\"delegateForm\" ng-submit=\"submitRequest()\">\n" +
    "    <dl class=\"terms\">\n" +
    "      <dt class=\"small text-light\">请选择委托的装修公司</dt>\n" +
    "      <dd class=\"select\">\n" +
    "        <select class=\"form-control\" name=\"provider\" ng-model=\"provider\" ng-options=\"provider.name for provider in providers\" required>\n" +
    "          <option value=\"\">请选择</option>\n" +
    "        </select>\n" +
    "      </dd>\n" +
    "    </dl>\n" +
    "    <div ng-show=\"delegateForm.provider.$valid\">\n" +
    "      <dl class=\"terms\">\n" +
    "        <dt class=\"small text-light\">您的装修需求</dt>\n" +
    "        <dd>\n" +
    "          <input class=\"form-control\" name=\"date\" type=\"date\" ng-model=\"date\"  placeholder=\"选择预计开工的日期\" required />\n" +
    "        </dd>\n" +
    "      </dl>\n" +
    "\n" +
    "      <dl class=\"terms\">\n" +
    "        <dt class=\"small text-light\">您的个人信息</dt>\n" +
    "        <dd class=\"simulate-control clearfix\">\n" +
    "          <span class=\"pull-left\">张三先生</span>\n" +
    "          <span class=\"pull-right text-lighter\">186****5297</span>\n" +
    "        </dd>\n" +
    "      </dl>\n" +
    "\n" +
    "      <dl class=\"terms\">\n" +
    "        <dt class=\"small text-light\">您要装修的房间是</dt>\n" +
    "        <dd class=\"simulate-control\">\n" +
    "          {{ house.community }} {{ house.apartment }}\n" +
    "        </dd>\n" +
    "      </dl>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-hide=\"delegateForm.provider.$valid\" class=\"correction small\">\n" +
    "      <a ui-sref=\"decorate.reference\">您想委托的装修公司不在列表？</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"full-width\" style=\"position:fixed;bottom:10px;padding: 0 15px;width:100%;\">\n" +
    "      <button type=\"submit\" class=\"btn btn-primary full-width\" ng-disabled=\"delegateForm.$invalid\">提交</button>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>");
}]);

angular.module("modules/decorate/templates/notice-acceptance.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/notice-acceptance.html",
    "<p class=\"message\">您已申请装修验收，我们会尽快与您和您的装修公司联络，实施验收。</p>\n" +
    "<dl class=\"terms small\">\n" +
    "  <dt class=\"text-warning text-right\">待物业反馈</dt>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">社区：</span>{{ decorate.house.community }}</dd>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">申请人：</span>张先生 186****5297 @{{ decorate.house.apartment }}</dd>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">装修公司：</span>{{ decorate.provider.name }}</dd>\n" +
    "</dl>\n" +
    "<div class=\"full-width\" style=\"position:absolute;bottom:10px;padding: 0 15px;\">\n" +
    "  <p class=\"text-muted tiny\">您也可以随时关注我的装修手续，了解办理进展。</p>\n" +
    "  <a ui-sref=\"decorate.progress({decorateId: decorate.id})\" class=\"btn btn-default full-width\">查看我的装修手续</a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/decorate/templates/notice-drawing.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/notice-drawing.html",
    "<p class=\"message\">已通知您委托的装修公司提交装修平面设计图。也请督促他们尽快提交。</p>\n" +
    "<dl class=\"terms small\">\n" +
    "  <dt class=\"text-warning text-right\">待装修公司提交图纸</dt>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">社区：</span>{{ decorate.house.community }}</dd>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">申请人：</span>张先生 186****5297 @{{ decorate.house.apartment }}</dd>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">装修公司：</span>{{ decorate.provider.name }}</dd>\n" +
    "</dl>\n" +
    "<div class=\"full-width\" style=\"position:absolute;bottom:10px;padding: 0 15px;\">\n" +
    "  <p class=\"text-muted tiny\">您也可以随时关注我的装修手续，了解办理进展。</p>\n" +
    "  <a ui-sref=\"decorate.progress({decorateId: decorate.id})\" class=\"btn btn-default full-width\">查看我的装修手续</a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/decorate/templates/notice-initiate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/notice-initiate.html",
    "<p class=\"message\">已向您委托的装修公司发出握手请求，请提醒对方在24小时内相应。</p>\n" +
    "<dl class=\"terms small\">\n" +
    "  <dt class=\"text-warning text-right\">待装修公司握手</dt>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">社区：</span>{{ decorate.house.community }}</dd>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">申请人：</span>张先生 186****5297 @{{ decorate.house.apartment }}</dd>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">装修公司：</span>{{ decorate.provider.name }}</dd>\n" +
    "</dl>\n" +
    "<div class=\"full-width\" style=\"position:absolute;bottom:10px;padding: 0 15px;\">\n" +
    "  <p class=\"text-muted tiny\">您也可以随时关注我的装修手续，了解办理进展。</p>\n" +
    "  <a ui-sref=\"decorate.progress({decorateId: decorate.id})\" class=\"btn btn-default full-width\">查看我的装修手续</a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/decorate/templates/notice-refund.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/notice-refund.html",
    "<p class=\"message\">您已申请验收退款。我们需要在此后3个月内对您房间的装修质量作进一步观察。</p>\n" +
    "<dl class=\"terms small\">\n" +
    "  <dt class=\"text-warning text-right\">待物业退款</dt>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">社区：</span>{{ decorate.house.community }}</dd>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">申请人：</span>张先生 186****5297 @{{ decorate.house.apartment }}</dd>\n" +
    "  <dd class=\"simulate-control\"><span class=\"text-muted\">装修公司：</span>{{ decorate.provider.name }}</dd>\n" +
    "</dl>\n" +
    "<div class=\"full-width\" style=\"position:absolute;bottom:10px;padding: 0 15px;\">\n" +
    "  <p class=\"text-muted tiny\">您也可以随时关注我的装修手续，了解办理进展。</p>\n" +
    "  <a ui-sref=\"decorate.progress({decorateId: decorate.id})\" class=\"btn btn-default full-width\">查看我的装修手续</a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/decorate/templates/progress.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/progress.html",
    "<div class=\"decorate-progress\">\n" +
    "  <div class=\"title small text-light\">北京时代天街10栋1单元1601室 装修单</div>\n" +
    "  <dl class=\"terms\">\n" +
    "    <decorate-progress stage=\"before\" decorate-id=\"decorateId\" items=\"progress\">在线提交装修许可申请</decorate-progress>\n" +
    "  </dl>\n" +
    "  <dl class=\"terms\">\n" +
    "    <decorate-progress stage=\"process\" decorate-id=\"decorateId\" items=\"progress\">现场办理装修许可</decorate-progress>\n" +
    "  </dl>\n" +
    "  <dl class=\"terms\">\n" +
    "    <decorate-progress stage=\"after\" decorate-id=\"decorateId\" items=\"progress\">在线申请验收&amp;押金退款</decorate-progress>\n" +
    "  </dl>\n" +
    "</div>");
}]);

angular.module("modules/decorate/templates/reference.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/reference.html",
    "<div id=\"reference\">\n" +
    "  <div class=\"main text-light\">\n" +
    "    <p>请了解以下龙湖社区供应商备案须知，尽快携带必须材料，来物业备案。</p>\n" +
    "    <dl class=\"indent\">\n" +
    "      <dt class=\"text-default\">请携带以下材料：</dt>\n" +
    "      <dd>- 公司营业执照复印件</dd>\n" +
    "      <dd>- 法人身份证复印件</dd>\n" +
    "      <dd>- 法人手机号</dd>\n" +
    "      <dd>- 现场负责人身份证原件及复印件</dd>\n" +
    "      <dd>- 现场负责人手机号</dd>\n" +
    "    </dl>\n" +
    "    <dl>\n" +
    "      <dt class=\"text-default\">请到这里来备案：</dt>\n" +
    "      <dd>北京时代天街 客服中心</dd>\n" +
    "      <dd>地址：北京市大兴区广平路3号B102</dd>\n" +
    "      <dd>电话：<a href=\"tel:010-60238899\">010-60238899</a></dd>\n" +
    "    </dl>\n" +
    "  </div>\n" +
    "  <div class=\"full-width\" style=\"position:absolute;bottom:10px;padding: 0 15px;\">\n" +
    "    <a type=\"submit\" class=\"btn btn-primary full-width\">将《备案须知》分享给装修公司</a>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/decorate/templates/refund.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/refund.html",
    "<div id=\"reference\">\n" +
    "  <div class=\"main text-light\">\n" +
    "    <p>您的房间装修已验收。</p>\n" +
    "    <p>我们需要在此后3个月内对您房间的装修质量作进一步观察，确认无外观防漏等问题后，为您办理正式押金退款。</p>\n" +
    "    <dl class=\"indent\">\n" +
    "      <dt class=\"text-default\">预计退款金额：</dt>\n" +
    "      <dd>- 退款金额：￥{{ repay|number:2 }}</dd>\n" +
    "      <dd>\n" +
    "        <span class=\"tiny text-muted details\">\n" +
    "          ( 扣除：<span class=\"item\" ng-repeat=\"item in charge.expense\">{{ item.name }} ￥{{ item.money|number:2 }}</span>)\n" +
    "        </span>\n" +
    "      </dd>\n" +
    "    </dl>\n" +
    "    <dl class=\"indent\">\n" +
    "      <dt class=\"text-default\">预计退款时间：</dt>\n" +
    "      <dd>- 退款时间：2014-08-08</dd>\n" +
    "    </dl>\n" +
    "  </div>\n" +
    "  <div class=\"full-width\" style=\"position:absolute;bottom:10px;padding: 0 15px;\">\n" +
    "    <a ng-click=\"submitRefund()\" class=\"btn btn-primary full-width\">申请退款</a>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/home/templates/config.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/home/templates/config.html",
    "<div id=\"config\">\n" +
    "  <div id=\"content\">\n" +
    "    <ul class=\"list list-unstyled text-right\">\n" +
    "      <li class=\"clearfix\" ng-repeat=\"item in installed\" ng-click=\"uninstall(item)\">\n" +
    "        <span class=\"pull-left\">{{ item.name }}</span>\n" +
    "        <span class=\"fa fa-minus-circle fa-lg text-danger\"></span>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <div class=\"adds small\" ng-if=\"!(uninstalled|empty)\">您还可以添加以下应用：</div>\n" +
    "    <ul class=\"list list-unstyled text-right\">\n" +
    "      <li class=\"clearfix\" ng-repeat=\"item in uninstalled\" ng-click=\"install(item)\">\n" +
    "        <span class=\"pull-left\">{{ item.name }}</span>\n" +
    "        <span class=\"fa fa-plus-circle fa-lg text-success\"></span>        \n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/home/templates/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/home/templates/home.html",
    "<div id=\"home\">\n" +
    "  <header id=\"header\">\n" +
    "    <a href=\"\" class=\"comunity clearfix\">\n" +
    "      <span class=\"pull-left title\">\n" +
    "        <i class=\"fa fa-map-marker\"></i> 北京 龙湖社区        \n" +
    "      </span>\n" +
    "      <span class=\"pull-right indicate\">\n" +
    "        <i class=\"fa fa-angle-right\"></i>  \n" +
    "      </span>\n" +
    "    </a>\n" +
    "  </header>\n" +
    "  <div id=\"content\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "      <div class=\"row\" ng-repeat=\"items in catagory|group:3\">\n" +
    "        <div class=\"col-xs-4 col-sm-4\" ng-repeat=\"item in items\">\n" +
    "          <a class=\"cell metro_{{ (($parent.$index + 1) * 3 + $index) % 10 }}\" ui-sref=\"{{ item.sref }}\" ng-class=\"{plus:item.name === 'plus'}\" cs-square>\n" +
    "            <i class=\"badge\" ng-if=\"item.notify\">{{ item.notify }}</i>\n" +
    "            <i class=\"fa fa-plus\" ng-if=\"item.name === 'plus'\"></i>\n" +
    "            <i class=\"fa fa-pied-piper-alt\" ng-if=\"item.name !== 'plus'\"></i>\n" +
    "            <span class=\"category\" ng-if=\"item.name !== 'plus'\">{{ item.name }}</span>\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/register/templates/captcha.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/captcha.html",
    "<form role=\"form\" name=\"captchaForm\" ng-submit=\"submit()\" autocomplete=\"false\">\n" +
    "  <div class=\"form-group form-group-first\">\n" +
    "    <input type=\"text\" name=\"captcha\" ng-model=\"captcha\" class=\"form-control\" id=\"inputCapcha\" placeholder=\"请输入验证码\" cs-number cs-focus required ng-pattern=\"/^\\d{4,8}$/\" ng-if=\"!message\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group form-group-first has-error\" ng-if=\"message\" ng-click=\"$parent.message=''\">\n" +
    "    <input type=\"text\" name=\"message\" ng-model=\"message\" class=\"form-control no-bg\" readonly />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <button type=\"submit\" class=\"btn btn-primary full-width\" ng-disabled=\"captchaForm.$invalid || processing\">\n" +
    "      <span ng-hide=\"processing\">{{ submitText || '注册账号' }}</span><span ng-show=\"processing\">请稍后...</span>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <small ng-if=\"!resend\">{{ remaining }}秒后可重新发送</small>\n" +
    "    <a ng-if=\"resend\" class=\"small\" ng-click=\"refresh()\">重发验证码</a>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("modules/register/templates/failure.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/failure.html",
    "<p class=\"text-center text-danger mg-vt-30\">验证码输入有误，请重新输入！</p>\n" +
    "<a ui-sref=\"register.captcha\" class=\"btn btn-primary full-width\">重新验证</a>");
}]);

angular.module("modules/register/templates/mobile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/mobile.html",
    "<form role=\"form\" name=\"mobileForm\" ng-submit=\"submit()\">\n" +
    "  <div class=\"form-group form-group-first\">\n" +
    "    <input type=\"text\" name=\"mobile\" ng-model=\"mobile\" class=\"form-control\" id=\"inputMobile\" placeholder=\"请输入手机号码\" cs-number required ng-pattern=\"/^\\d{11}$/\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <button type=\"submit\" class=\"btn btn-primary full-width\" ng-disabled=\"mobileForm.$invalid\">获取验证码</button>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("modules/register/templates/register.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/register.html",
    "<div id=\"register\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-12 col-sm-12\" ui-view></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/register/templates/success.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/success.html",
    "<p class=\"text-center mg-vt-30\">恭喜你，注册成功！</p>\n" +
    "<a href=\"\" class=\"btn btn-primary full-width\">立即完善资料</a>\n" +
    "\n" +
    "<p class=\"text-center mg-vt-15\">\n" +
    "  <a href=\"#/home\">返回我的管家</a>\n" +
    "</p>");
}]);
