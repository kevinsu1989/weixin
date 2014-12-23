angular.module('templates', ['common/templates/layout.partials.html', 'modules/decorate/templates/acceptance.html', 'modules/decorate/templates/confirm.html', 'modules/decorate/templates/decorate-progress.partial.html', 'modules/decorate/templates/decorate.html', 'modules/decorate/templates/drawing.html', 'modules/decorate/templates/history.html', 'modules/decorate/templates/houses.html', 'modules/decorate/templates/invitation.html', 'modules/decorate/templates/notice-acceptance.html', 'modules/decorate/templates/notice-drawing.html', 'modules/decorate/templates/notice-initiate.html', 'modules/decorate/templates/notice-refund.html', 'modules/decorate/templates/progress.html', 'modules/decorate/templates/reference.html', 'modules/decorate/templates/refund.html', 'modules/home/templates/config.html', 'modules/home/templates/home.html', 'modules/redenvelope/templates/active_end.html', 'modules/redenvelope/templates/agreement.html', 'modules/redenvelope/templates/friend.html', 'modules/redenvelope/templates/getSeed.html', 'modules/redenvelope/templates/jabme.html', 'modules/redenvelope/templates/myachivement.html', 'modules/redenvelope/templates/myinfo.html', 'modules/redenvelope/templates/myjab.html', 'modules/redenvelope/templates/realname.html', 'modules/redenvelope/templates/regist.html', 'modules/redenvelope/templates/regsuccess.html', 'modules/redenvelope/templates/rule.html', 'modules/redenvelope/templates/view.html', 'modules/register/templates/realname.html', 'modules/register/templates/regist.html']);

angular.module("common/templates/layout.partials.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/layout.partials.html",
    "<!-- <a href=\"/index2.jsp?v=1\" style=\"font-size:40px;\">接口</a> -->\n" +
    " <div class=\"container posit\">\n" +
    "	<div ui-view class=\"bigbox\">\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "      <div class=\"footer\">\n" +
    "          <div class=\"row\" ng-if=\"footer==0\">\n" +
    "            <div class=\"col-xs-12 col-sm-12 col-md-12\">\n" +
    "                <a href=\"http://www.duomeidai.com\"><div class=\"pull-left fot-logo FadeInR\"></div></a>\n" +
    "                <h4 class=\"pull-right FadeInR\"  style=\"-webkit-animation-delay: 0.2s\">实现平凡人的财富梦想</h4>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"row\" ng-if=\"footer==1\">\n" +
    "            <div class=\"col-xs-12 col-sm-12 col-md-12\"><p><span class=\"FadeInR\">不以过高收益来吸引用户</span><br/><span class=\"FadeInR\"  style=\"-webkit-animation-delay: 0.2s\">不因资金站岗而放松风控</span></p></div>\n" +
    "          </div>\n" +
    "          <div class=\"row\" ng-if=\"footer==2\">\n" +
    "            <div class=\"col-xs-12 col-sm-12 col-md-12 FadeInR\"><p>关注\"多美惠通多美贷\"，寻找更多好戳友</p></div>\n" +
    "          </div>\n" +
    "          <div class=\"row\" ng-if=\"footer==3\">\n" +
    "            <div class=\"col-xs-12 col-sm-12 col-md-12 FadeInR\"><p>邀请好友玩红包，可获取更多奖励</p></div>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div id=\"errBox\"> \n" +
    "	<div id=\"errBoxShadow\"></div>\n" +
    "	<div id=\"errBoxText\"></div>\n" +
    "</div>");
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

angular.module("modules/redenvelope/templates/active_end.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/active_end.html",
    "<div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "    <h4 class=\"tipetex mart2\">活动已经结束了！下次早点来吧！</h4>\n" +
    "    <div class=\"row mart2\">\n" +
    "        <div class=\"col-xs-5 col-sm-6 col-md-6\">\n" +
    "            <div class=\"text-right\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_9_1.png?version=1\" alt=\"\" /></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <a href=\"http://www.duomeidai.com/borrowList.action\" type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\">我要投资</a>\n" +
    "    <h3 class=\"text-center color6\">用红包投资，获最高12%年化收益。</h3>\n" +
    "    <a href=\"http://www.duomeidai.com\" type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\">我的账户</a>\n" +
    "    <h3 class=\"text-center color6\">查看个人信息、红包、投资收益。</h3>\n" +
    "    <div class=\"mart2\"><img ng-src=\"http://dev.static.duomeidai.com/redenvelope/img/{{Qr_code}}.jpg?version=1\" alt=\"\" class=\"widimg\" /></div>\n" +
    "    <h3 class=\"text-center color6\">关注多美贷，第一时间获取最新活动信息</h3>\n" +
    "   	<div class=\"padt2\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/redenvelope/templates/agreement.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/agreement.html",
    "<div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "	<h2 class=\"text-center\">服务协议</h2>\n" +
    "    <div class=\"pad0\">\n" +
    "        <p class=\"text-left font16\">\"多美贷\"网站（www.duomeidai.com，以下简称\"本网站\"）由多美惠通（北京）网络科技有限公司 （以下简称\"本公司\")负责运营。本服务协议双方为本网站用户与本公司，适用于用户注册使用本网站服务的全部活动。</p>\n" +
    "        <p class=\"text-left font16\">在注册成为本网站用户前，请您务必认真、仔细阅读并充分理解本服务协议全部内容。您在注册本网站取得用户身份时勾选同意本服务协议并成功注册为本网站用户，视为您已经充分理解和同意本服务协议全部内容，并签署了本服务协议，本服务协议立即在您与本公司之间产生合同法律效力，您注册使用本网站服务的全部活动将受到本服务协议的约束并承担相应的责任和义务。如您不同意本服务协议内容，请不要注册使用本网站服务。</p>\n" +
    "        <p class=\"text-left font16\">本服务协议包括以下所有条款，同时也包括本网站已经发布的或者将来可能发布的各类规则。所有规则均为本服务协议不可分割的一部分，与本服务协议具有同等法律效力。</p>\n" +
    "        <p class=\"text-left font16\">用户在此确认知悉并同意本公司有权根据需要不时修改、增加或删减本服务协议。本公司将采用在本网站公示的方式通知用户该等修改、增加或删减，用户有义务注意该等公示。一经本网站公示，视为已经通知到用户。若用户在本服务协议及各类规则变更后继续使用本网站服务的，视为用户已仔细认真阅读、充分理解并同意接受修改后的本服务协议及各类规则，且用户承诺遵守修改后的本服务协议及各类规则内容，并承担相应的义务和责任。若用户不同意修改后的本服务协议及各类规则内容，应立即停止使用本网站服务，本公司保留中止、终止或限制用户继续使用本网站服务的权利，但该等终止、中止或限制行为并不豁免用户在本网站已经进行的交易下所应承担的责任和义务。本公司不承担任何因此导致的法律责任。</p>\n" +
    "        <p class=\"text-left font16\">一. 本网站服务</p>\n" +
    "        <p class=\"text-left font16\">本网站为用户提供【信用咨询、评估、管理，促成用户与本网站其他用户达成交易的居间服务，还款管理等服务】，用户通过本网站居间服务与其他用户达成的所有交易项下资金的存放和移转均通过银行或第三方支付平台机构实现，本网站并不存放交易资金。</p>\n" +
    "        <p class=\"text-left font16\">二. 服务费用</p>\n" +
    "        <p class=\"text-left font16\">用户注册使用本网站服务，本公司有权向用户收取服务费用，具体服务费用以本网站公告或其他协议为准。用户承诺按照本服务协议约定向本网站支付服务费用，并同意本网站有权自其有关账户中直接扣划服务费用。用户通过本网站与其他方签订协议的，用户按照签署的协议约定向其他方支付费用。</p>\n" +
    "        <p class=\"text-left font16\">三. 使用限制</p>\n" +
    "        <p class=\"text-left font16\">1. 注册成为本网站用户必须满足如下主体资格条件：具有中华人民共和国（以下简称\"中国\"）国籍（不包括中国香港、澳门及台湾地区）、年龄在18周岁以上、具有完全民事行为能力的自然人。若不具备前述主体资格条件，请立即终止注册使用本网站服务.若违反前述规定注册使用本网站服务，本公司保留终止用户资格、追究用户或用户的监护人相关法律责任的权利。 </p>\n" +
    "        <p class=\"text-left font16\">2. 用户在注册使用本网站服务时应当根据本网站的要求提供自己的真实信息（包括但不限于真实姓名、联系电话、地址、电子邮箱等信息），并保证向本网站提供的各种信息和资料是真实、准确、完整、有效和合法的，复印件与原件一致。如用户向本网站提供的各项信息和资料发生变更，用户应当及时向本网站更新用户的信息和资料，如因用户未及时更新信息和资料导致本网站无法向用户提供服务或发生错误，由此产生的法律责任和后果由用户自己承担。如使用他人信息和文件注册使用本网站服务或向本网站提供的信息和资料不符合上述规定，由此引起的一切责任和后果均由用户本人全部承担，本公司及本网站不因此承担任何法律责任，如因此而给本公司及本网站造成损失，用户应当承担赔偿本公司及本网站损失的责任。 </p>\n" +
    "        <p class=\"text-left font16\">3. 成功注册为本网站用户后，用户应当妥善保管自己的用户名和密码，不得将用户名转让、赠与或授权给第三方使用。用户在此确认，使用其用户的用户名和密码登录本网站及由用户在本网站的用户账户下发出的一切指令均视为用户本人的行为和意思，该等指令不可逆转，由此产生的一切责任和后果由用户本人承担，本公司及本网站不承担任何责任。 </p>\n" +
    "        <p class=\"text-left font16\">4. 用户不得利用本网站从事任何违法违规活动，用户在此承诺合法使用本网站提供的服务，遵守中国现行法律、法规、规章、规范性文件以及本服务协议的约定。若用户违反上述规定，所产生的一切法律责任和后果与本公司和本网站无关，由用户自行承担，如因此给本公司和本网站造成损失的，由用户赔偿本公司和本网站的损失。本公司保留将用户违法违规行为及有关信息资料进行公示、计入用户信用档案、按照法律法规的规定提供的有关政府部门或按照有关协议约定提供给第三方的权利。 </p>\n" +
    "        <p class=\"text-left font16\">5. 如用户在本网站的某些行为或言论不合法、违反有关协议约定、侵犯本公司的利益等，本公司有权基于独立判断直接删除用户在本网站上作出的上述行为或言论，有权中止、终止、限制用户使用本网站服务，而无需通知用户，亦无需承担任何责任。如因此而给本公司及本网站造成损失的，应当赔偿本公司及本网站的损失。 </p>\n" +
    "        <p class=\"text-left font16\">四. 不保证条款</p>\n" +
    "        <p class=\"text-left font16\">本网站提供的服务中不含有任何明示、暗示的，对任何用户、任何交易的真实性、准确性、可靠性、有效性、完整性等的任何保证和承诺，用户需根据自身风险承受能力，衡量本网站披露的交易内容及交易对方的真实性、可靠性、有效性、完整性，用户因其选择使用本网站提供的服务、参与的交易等而产生的直接或间接损失均由用户自己承担，包括但不限于资金损失、利润损失、营业中断等。本公司及其股东、创始人、全体员工、代理人、关联公司、子公司、分公司均不对以上损失承担任何责任。</p>\n" +
    "        <p class=\"text-left font16\">五. 责任限制</p>\n" +
    "        <p class=\"text-left font16\">1. 基于互联网的特殊性，本公司无法保证本网站的服务不会中断，对于包括但不限于本公司、本网站及相关第三方的设备、系统存在缺陷，计算机发生故障、遭到病毒、黑客攻击或者发生地震、海啸等不可抗力而造成服务中断或因此给用户造成的损失，本公司不承担任何责任，有关损失由用户自己承担。 </p>\n" +
    "        <p class=\"text-left font16\">2. 本公司无义务监测本网站内容。用户对于本网站披露的信息、选择使用本网站提供的服务，选择参与交易等，应当自行判断真实性和承担风险，由此而产生的法律责任和后果由用户自己承担，本公司不承担任何责任。 </p>\n" +
    "        <p class=\"text-left font16\">3. 与本公司合作的第三方机构向用户提供的服务由第三方机构自行负责，本公司不对此等服务承担任何责任。 </p>\n" +
    "        <p class=\"text-left font16\">4. 本网站的内容可能涉及第三方所有的信息或第三方网站，该等信息或第三方网站的真实性、可靠性、有效性等由相关第三方负责，用户对该等信息或第三方网站自行判断并承担风险，与本网站和本公司无关。 </p>\n" +
    "        <p class=\"text-left font16\">5. 无论如何，本公司对用户承担的违约赔偿（如有）总额不超过向用户收取的服务费用总额。 </p>\n" +
    "        <p class=\"text-left font16\">六. 用户资料的使用与披露 </p>\n" +
    "        <p class=\"text-left font16\">1. 用户在此同意，对于用户提供的和本公司为提供本网站服务所需而自行收集的用户个人信息和资料，本公司有权按照本服务协议的约定进行使用或者披露。 </p>\n" +
    "        <p class=\"text-left font16\">2. 用户授权本公司基于履行有关协议、解决争议、调停纠纷、保障本网站用户交易安全的目的等使用用户的个人资料（包括但不限于用户自行提供的以及本公司信审行为所获取的其他资料）。本公司有权调查多个用户以识别问题或解决争议， 特别是本公司可审查用户的资料以区分使用多个用户名或别名的用户。 </p>\n" +
    "        <p class=\"text-left font16\">为避免用户通过本网站从事欺诈、非法或其他刑事犯罪活动，保护本网站及其正常用户合法权益，用户授权本公司可通过人工或自动程序对用户的个人资料进行评价和衡量。</p>\n" +
    "        <p class=\"text-left font16\">用户同意本公司可以使用用户的个人资料以改进本网站的推广和促销工作、分析网站的使用率、改善本网站的内容和产品推广形式，并使本网站内容、设计和服务更能符合用户的要求。这些使用能改善本网站的网页，以调整本网站网页使其更能符合用户的需求，从而使用户在使用本网站服务时得到更为顺利、有效、安全及度身订造的交易体验。</p>\n" +
    "        <p class=\"text-left font16\">用户在此同意允许本公司通过在本网站的某些网页上使用诸如\"Cookies\"的设置收集用户信息并进行分析研究，以为用户提供更好的量身服务。 </p>\n" +
    "        <p class=\"text-left font16\">3. 本公司有义务根据有关法律、法规、规章及其他政府规范性文件的要求向司法机关和政府部门提供用户的个人资料及交易信息。</p>\n" +
    "		<p class=\"text-left font16\">在用户未能按照与本公司签订的包括但不限于本服务协议或者与本网站其他用户签订的借款协议等其他法律文本的约定履行自己应尽的义务时，本公司有权将用户提供的及本公司自行收集的用户的个人信息、违约事实等通过网络、报刊、电视等方式对任何第三方披露，且本公司有权将用户提交或本公司自行收集的用户的个人资料和信息与任何第三方进行数据共享，以便对用户的其他申请进行审核等使用。由此而造成用户损失的，本公司不承担法律责任。 </p>\n" +
    "        <p class=\"text-left font16\">4. 本公司采用行业标准惯例以保护用户的个人信息和资料，鉴于技术限制，本公司不能确保用户的全部私人通讯及其他个人资料不会通过本条款中未列明的途径泄露出去。 </p>\n" +
    "        <p class=\"text-left font16\">七. 知识产权保护条款</p>\n" +
    "        <p class=\"text-left font16\">1. 本网站中的所有内容均属于本公司所有,包括但不限于文本、数据、文章、设计、源代码、软件、图片、照片、音频、视频及其他全部信息。本网站内容受中国知识产权法律法规及各国际版权公约的保护。</p>\n" +
    "        <p class=\"text-left font16\">2. 未经本公司事先书面同意,用户承诺不以任何形式复制、模仿、传播、出版、公布、展示本网站内容,包括但不限于电子的、机械的、复印的、录音录像的方式和形式等。用户承认本网站内容是属于本公司的财产。</p>\n" +
    "        <p class=\"text-left font16\">3. 未经本公司书面同意,用户不得将本网站包含的资料等任何内容发布到任何其他网站或者服务器。任何未经授权对本网站内容的使用均属于违法行为,本公司有权追究用户的法律责任。</p>\n" +
    "        <p class=\"text-left font16\">八. 违约责任 </p>\n" +
    "        <p class=\"text-left font16\">如一方发生违约行为，守约方可以书面通知方式要求违约方在指定的时限内停止违约行为，并就违约行为造成的损失要求违约方进行赔偿。</p>\n" +
    "        <p class=\"text-left font16\">九. 法律适用及争议解决 </p>\n" +
    "        <p class=\"text-left font16\">1. 本服务协议的签订、效力、履行、终止、解释和争端解决受中国法律法规的管辖。 </p>\n" +
    "        <p class=\"text-left font16\">2. 因本服务协议发生任何争议或与本服务协议有关的争议，首先应由双方友好协商解决，协商不成的，任何一方有权将纠纷提交至本公司所在地有管辖权的人民法院诉讼解决。 </p>\n" +
    "        <p class=\"text-left font16\">十. 其他条款 </p>\n" +
    "        <p class=\"text-left font16\">1. 本服务协议自您同意勾选并成功注册为本网站用户之日起生效，除非本网站终止本服务协议或者用户丧失本网站用户资格，否则本服务协议始终有效。本服务协议终止并不免除用户根据本服务协议或其他有关协议、规则所应承担的义务和责任。 </p>\n" +
    "        <p class=\"text-left font16\">2. 本公司对于用户的违约行为放弃行使本服务协议规定的权利的，不得视为其对用户的其他违约行为放弃主张本服务协议项下的权利。 </p>\n" +
    "        <p class=\"text-left font16\">3. 本服务协议部分条款被认定为无效时，不影响本服务协议其他条款的效力。 </p>\n" +
    "        <p class=\"text-left font16\">4. 本服务协议不涉及用户与本网站其他用户之间因网上交易而产生的法律关系及法律纠纷，但用户在此同意将全面接受和履行与本网站其他用户通过本网站签订的任何电子法律文本，并承诺按该法律文本享有和/或放弃相应的权利、承担和/或豁免相应的义务。 </p>\n" +
    "        <p class=\"text-left font16\">5. 本公司对本服务协议享有最终的解释权。 </p>\n" +
    "    </div>\n" +
    "    \n" +
    "   <div class=\"padt2\"></div>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/friend.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/friend.html",
    "<div id=\"friend\" class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"onload\">\n" +
    "  	<div ng-if=\"status!=9\">\n" +
    "	  	<div class=\"row\">\n" +
    "	  		<ul class=\"nav nav-justified hb_tab\">\n" +
    "              <li class=\"active_2\"><a href=\"javascript:\">【{{nick}}】的红包</a></li>\n" +
    "              <li>\n" +
    "              	<a ng-click=\"myInfo()\">我的红包</a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "            <div class=\"col-xs-5 col-sm-5 col-md-6 padrnone\">\n" +
    "                <h3 class=\"text-left padl8 fon13\"><b class=\"corred\">{{fks}}</b>位戳友</h3>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-7 col-sm-7 col-md-6 padlnone\">\n" +
    "                <h3 class=\"text-right padr8 fon13\"><span>{{day|timefilter}}</span>天<span>{{hour|timefilter}}</span>小时<span>{{min|timefilter}}</span>分<span>{{sec|timefilter}}</span>秒截止</h3>\n" +
    "            </div>\n" +
    "	    </div>\n" +
    "<!-- 	    <div class=\"row\" ng-if=\"partner.busName!=''\">\n" +
    "		    <div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
    "		        <h3 class=\"hzhb_ll\"><a ng-click=\"partShow();\"><b>【{{partner.busName}}】</b></a></h3>\n" +
    "		    </div>\n" +
    "		    <div class=\"col-xs-6 col-sm-6 col-md-6 padlnone\">\n" +
    "		        <p class=\"hzhb_rr\">送TA一个会长大的红包</p>\n" +
    "		    </div>\n" +
    "		</div> -->\n" +
    "\n" +
    "\n" +
    "		<div class=\"mart1 zhz_bg\" id=\"hb-img\" ng-click=\"clickFriend()\">\n" +
    "	        <p class=\"lead\"><i>{{money|moneyfilter}}</i>元</p>\n" +
    "	    </div>\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "	<div ng-if=\"status==0\">\n" +
    "        <h3 class=\"color6\">长到{{next}}元即可领取&nbsp;还差{{need}}元</h3>\n" +
    "		<div class=\"row\">\n" +
    "		    <div class=\"col-xs-6 col-sm-6 col-md-6\" ng-click=\"clickFriend()\">\n" +
    "		        <div class=\"hand_bg\"><img class=\"handanimate\" src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_9.png?version=1\" alt=\"\"/></div>\n" +
    "		    </div>\n" +
    "		    <div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
    "		        <h3 class=\"text-left color6 mart1\">戳它</h3>\n" +
    "		        <h3 class=\"text-left color6 mar0\">掉了红包各分一半</h3>\n" +
    "		    </div>\n" +
    "		</div>\n" +
    "		<div class=\"mart3\"></div>\n" +
    "        <div class=\"partners\" ng-if=\"partner.busName!=''\">\n" +
    "        	<p ng-if=\"partner.content!=''&&banner_flag==0\" class=\"FadeInR\">【{{partner.busName}}】说：{{partner.content}}</p>\n" +
    "        	<p ng-if=\"banner_flag==1\" class=\"FadeInR\">红包由【{{partner.busName}}】和【多美贷】共同发放</p>\n" +
    "        </div>\n" +
    "        <div class=\"partners\" ng-if=\"partner.busName==''\">\n" +
    "        	<p ng-if=\"banner_flag==0\" class=\"FadeInR\">【多美贷】说：开开心心，不急不燥，做好自己</p>\n" +
    "        	<p ng-if=\"banner_flag==1\" class=\"FadeInR\">【多美贷】说：加戳群，找戳友</p>\n" +
    "        	<p ng-if=\"banner_flag==2\" class=\"FadeInR\">【多美贷】说：多找小鲜肉，多戳好基友</p>\n" +
    "        	<p ng-if=\"banner_flag==3\" class=\"FadeInR\">红包由【多美贷】发放</p>\n" +
    "        </div>\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "    <div ng-if=\"status!=9&&status!=0\">\n" +
    "        <div class=\"partners\" ng-if=\"partner.busName!=''\">\n" +
    "        	<p ng-if=\"partner.content!=''&&banner_flag==0\" class=\"FadeInR\">【{{partner.busName}}】说：{{partner.content}}</p>\n" +
    "        	<p ng-if=\"banner_flag==1\" class=\"FadeInR\">红包由【{{partner.busName}}】和【多美贷】共同发放</p>\n" +
    "        </div>\n" +
    "        <div class=\"partners\" ng-if=\"partner.busName==''\">\n" +
    "        	<p ng-if=\"banner_flag==0\" class=\"FadeInR\">【多美贷】说：开开心心，不急不燥，做好自己</p>\n" +
    "        	<p ng-if=\"banner_flag==1\" class=\"FadeInR\">【多美贷】说：加戳群，找戳友</p>\n" +
    "        	<p ng-if=\"banner_flag==2\" class=\"FadeInR\">【多美贷】说：多找小鲜肉，多戳好基友</p>\n" +
    "        	<p ng-if=\"banner_flag==3\" class=\"FadeInR\">红包由【多美贷】发放</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "	<div ng-if=\"status==1\">\n" +
    "	  	<h3 class=\"text-center color6\">今天已经戳过啦，明天再来吧。</h3>\n" +
    "	    <div class=\"row\">\n" +
    "			<div class=\"col-md-6 col-md-offset-3\">\n" +
    "				<div class=\"marginC biaoq_1\"></div>\n" +
    "			</div>\n" +
    "	    </div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"status==2\">\n" +
    "		<h3 class=\"text-center color6\">矮油～你今天已经戳过好友太多次了，歇歇明天再来吧。</h3>\n" +
    "		<h3 class=\"text-center color6\">邀请好友注册之后，每日可戳次数和被戳次数的上限均可增加。</h3>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-6 col-md-offset-3\">\n" +
    "		  		<div class=\"marginC biaoq_2\"></div>\n" +
    "		    </div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"status==3\">\n" +
    "		<h3 class=\"text-center color6\">Ta今天已经被戳过太多次了，明天再来吧。</h3>\n" +
    "		<h3 class=\"text-center color6\">邀请好友注册之后，每日可戳次数和被戳次数的上限均可增加。</h3>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-6 col-md-offset-3\">\n" +
    "					<div class=\"marginC biaoq_3\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"status==4\">\n" +
    "		<h3 class=\"text-center color6\">你的红包已经无法长大，不能继续戳好友了。</h3>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-6 col-md-offset-3\">\n" +
    "					<div class=\"marginC biaoq_3\"></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-if=\"status==-1\">\n" +
    "	  <div ng-if=\"mystatus==1\">\n" +
    "	        <h3 class=\"text-center color6\">你的红包已经长到<span>{{mymoney|moneyfilter}}</span>元</h3>\n" +
    "	        <h3 class=\"text-center color6\">还差<span>{{myneed|moneyfilter}}</span>元就可以领取了</h3>\n" +
    "	    <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"myInfo()\">去看看</button>\n" +
    "	  </div>\n" +
    "	  <div ng-if=\"mystatus==-1\">\n" +
    "	            <h3 class=\"text-center color6\">你也获得了一个神奇种子红包！</h3>\n" +
    "	        <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ui-sref=\"redenvelope.getSeed\">去领种子</button>\n" +
    "	  </div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"status==9\">\n" +
    "		<div class=\"row\">\n" +
    "	  		<ul class=\"nav nav-justified hb_tab\">\n" +
    "              	<li class=\"active_2\">\n" +
    "              		<a href=\"javascript:\">【{{nick}}】的红包</a>\n" +
    "              	</li>\n" +
    "              	<li>\n" +
    "              		<a ng-click=\"myInfo()\">我的红包</a>\n" +
    "              	</li>\n" +
    "            </ul>\n" +
    "	    </div>\n" +
    "		<div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "		    <h4 class=\"tipetex\">【{{nick}}】的红包已经无法再长大了<a ng-click=\"redStop()\">?</a></h4>\n" +
    "		    \n" +
    "		    <div class=\"mart1 frd_bg\"></div>\n" +
    "		    <div class=\"row mart2\">\n" +
    "		        <div class=\"col-xs-5 col-sm-6 col-md-6\">\n" +
    "		    		<div class=\"text-right mart1\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_9_1.png\" alt=\"\" width=\"65\" /></div>\n" +
    "		        </div>\n" +
    "		        <div class=\"col-xs-7 col-sm-6 col-md-6\">\n" +
    "		            <h4 class=\"text-left color6\">共获得：<span class=\"corred\">{{money}}</span>元</h4>\n" +
    "		            <h4 class=\"text-left color6\">已领取：<span class=\"corred\">{{hasReceiveAmount}}</span>元</h4>\n" +
    "		            <!-- <h4 class=\"text-left color6\">还有<span class=\"corred\">{{money-hasReceiveAmount|moneyfilter}}</span>元待领取</h4> -->\n" +
    "		        </div>\n" +
    "		    </div>\n" +
    "		    <div class=\"mart2\"><img ng-src=\"http://dev.static.duomeidai.com/redenvelope/img/{{Qr_code}}.jpg?version=1\" alt=\"\" class=\"widimg\" /></div>\n" +
    "		    <h3 class=\"text-center color6\">如果没戳过瘾，关注\"多美惠通多美贷\"<br/><br/>好玩的东东并没有结束，这才是刚刚开始</h3>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "	<div class=\"row marb1 mart1\">\n" +
    "        <div class=\"col-xs-7 col-sm-7 col-md-6 padrnone\">\n" +
    "        	<div class=\"hzhb_lqnub\" ng-if=\"partner.busName!=''\" ng-click=\"partShow();\">\n" +
    "                <h3 class=\"text-left\"><a href=\"javascript:\">合作伙伴【<b>{{partner.busName}}</b>】</a></h3>\n" +
    "                <!-- <h3 class=\"text-left\">红包领取数：<b class=\"corred\">{{partner.bus_invist_count}}人</b></h3> -->\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-5 col-sm-5 col-md-6 padlnone\">\n" +
    "            <h3 class=\"text-right rules-sm\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_4.png\" alt=\"\" /><a ui-sref=\"redenvelope.rule\">规则说明</a></h3>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "<!--好友成就-->\n" +
    "<div class=\"pub_window frd_cj\" style=\"display:none;top:2%;\">\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<!--我的成就-->\n" +
    "<div class=\"pub_window my_cj\" style=\"display:none;top:37%;\">\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "<!--提示弹窗样式-->\n" +
    "<div class=\"pub_window tips_t\" style=\"display:none;top:25%;\">\n" +
    "</div>\n" +
    "\n" +
    "<!--合作伙伴-->\n" +
    "<div class=\"pub_window hzhb_wind\" id=\"partnerWindow\" style=\"position:fixed;display:none;top:5%;left:6%;\">\n" +
    "	<div class=\"closepic\" ng-click=\"partClose()\"><a>关闭</a></div>\n" +
    "    <div class=\"hb_hd\">\n" +
    "		<a href=\"{{partner.busHref}}\" ng-if=\"partner.busHref!=''\">\n" +
    "			<img ng-src=\"{{partner.busLogo}}\" alt=\"{{partner.busName}}\" height=\"60\" />\n" +
    "			<h1>{{partner.busName}}</h1>\n" +
    "		</a>\n" +
    "		<a ng-if=\"partner.busHref==''\">\n" +
    "			<img ng-src=\"{{partner.busLogo}}\" alt=\"{{partner.busName}}\" height=\"60\" />\n" +
    "			<h1>{{partner.busName}}</h1>\n" +
    "		</a>\n" +
    "		<div class=\"clearB\"></div>\n" +
    "		<div class=\"hb_detail\">\n" +
    "			<div class=\"hb_p\" data-ng-bind-html=\"partner.busDesc\"></div>\n" +
    "	    	<img ng-if=\"partner.busImage!=''\" ng-src=\"{{partner.busImage}}\" width=\"250\"/>\n" +
    "		</div>\n" +
    "    </div>\n" +
    "    <div class=\"ad_gz\">\n" +
    "    	<p style=\"text-align: center;\">我想加入</p>\n" +
    "        <h6 class=\"color6\">关注公众账号<a>\"多美惠通多美贷\"</a>，点击菜单<a>\"我要红包\"－\"合作推广\"</a></h6>\n" +
    "    </div>\n" +
    "    \n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/getSeed.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/getSeed.html",
    "<div ng-if='onload'>\n" +
    "    <div class=\"list-group\">\n" +
    "        <h2 class=\"text-center padt1\">亲爱的<span>【{{usernick}}】</span>，恭喜你！</h2>\n" +
    "        <h2 class=\"text-center\">\n" +
    "          <span ng-if=\"status==0\">{{busName}}送给你</span>\n" +
    "          <span ng-if=\"status==1\">已领取</span>一个神奇的种子红包\n" +
    "        </h2>\n" +
    "    </div>\n" +
    "\n" +
    "    <div  class=\"hb_pic\">\n" +
    "        <div class=\"hb_bg\" ng-if=\"status==0\"></div>\n" +
    "        <div class=\"posit zhz_bg indefut_hb\" ng-if=\"status==1\">\n" +
    "            <p class=\"lead\"><i>{{money}}</i>元</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-12 col-md-12 col-lg-12\" ng-if=\"status==0\">\n" +
    "            <button ng-click=\"getSeed()\" type=\"button\" class=\"btn btn-primary btn-lg btn-block mart3 lqbut-cor\">领取种子</button>\n" +
    "            <h3 class=\"text-center\">好友戳一下，种子就会长大哦</h3>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-12 col-md-12 col-lg-12\" ng-if=\"status==1\">\n" +
    "            <h3 class=\"text-center mart2\">好友戳一下，种子就会长大哦</h3>\n" +
    "            <button ng-click=\"viewMyRev()\" type=\"button\" class=\"btn btn-primary btn-lg btn-block mart2 lqbut-cor\">让红包长大</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-12\" ui-sref=\"redenvelope.rule\">\n" +
    "            <h3 class=\"text-right rules-sm\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_4.png?version=1\" alt=\"\" /><a>规则说明</a></h3>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"padb8\"></div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div class=\"pub_window\" style=\"display:none;top:20%;\">\n" +
    "    <h2>开门见喜</h2>\n" +
    "    <h4 class=\"color6 padt1\">获得<span class=\"corred\">1</span>倍红包收益</h4>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/jabme.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/jabme.html",
    "<div id=\"jabme\">\n" +
    "<!--   <div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"jabme.length==0\">\n" +
    "    <img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_6.png?version=1\" alt=\"\" class=\"padt2 widimg\" />\n" +
    "      <h2 class=\"text-center color6\">真可怜，还没人戳过你呢！</h2>\n" +
    "      <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"shareShow()\">分享给更多的好友</button>\n" +
    "  </div> -->\n" +
    "  <div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "  <div class=\"row marginC\">\n" +
    "    <div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "      <div class=\"panel panel-default bornone mart2\">\n" +
    "        <ul class=\"nav nav-justified\">\n" +
    "            <li ng-class=\"{active:topflag==0}\" style=\"width:33%\"><a ng-click=\"topChange(0)\">我邀请的</a></li>\n" +
    "            <li ng-class=\"{active:topflag==2}\" style=\"width:34%\"><a ng-click=\"topChange(2)\">戳友同志</a></li>\n" +
    "            <li ng-class=\"{active:topflag==1}\" style=\"width:33%\"><a ng-click=\"topChange(1)\">排行榜</a></li>\n" +
    "        </ul>\n" +
    "        <div class=\"panel-body\" ng-if=\"topflag==0\">\n" +
    "          <div class=\"row\" ng-if=\"invitelist.length!=0\">\n" +
    "            <div class=\"col-xs-4 col-sm-4 col-md-4\" style='text-align: left;'>\n" +
    "              <span>昵称</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-3 col-sm-3 col-md-3\">\n" +
    "              <span>奖励(元)</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-2 col-sm-2 col-md-2\">\n" +
    "              <span>戳</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-3 col-sm-3 col-md-3\">\n" +
    "              <span>被戳</span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <ul class=\"list-group marginC\">\n" +
    "              <li class=\"list-group-item lihg\" ng-class=\"{disabled:item.i_has_clicked=='true'||item.is_end=='true'}\" ng-repeat=\"item in invitelist\" ui-sref=\"redenvelope.friend({friendId: item.openId})\">\n" +
    "                  <div class=\"row\">\n" +
    "                      <div class=\"col-xs-4 col-sm-4 col-md-4 posit_bor\">\n" +
    "                        <!-- <div ng-if=\"item.is_end!='true'\" style=\"width:24px;height:20px;float: left;\"></div> -->\n" +
    "                        \n" +
    "                        <img ng-if=\"item.is_auth=='true'\" src=\"http://dev.static.duomeidai.com/redenvelope/img/smrz.png\" width=\"15\" height=\"15\" style=\"margin-left:5px;\"/>\n" +
    "                        <img ng-if=\"item.is_reg=='true'&&item.is_auth!='true'\" src=\"http://dev.static.duomeidai.com/redenvelope/img/smzc.png\" width=\"15\" height=\"15\" style=\"margin-left:5px;\"/>\n" +
    "                        <img ng-if=\"item.is_receive=='true'&&item.is_reg!='true'&&item.is_auth!='true'\" src=\"http://dev.static.duomeidai.com/redenvelope/img/smlq.png\" width=\"15\" height=\"15\" style=\"margin-left:5px;\"/>\n" +
    "                        <span>{{item.nick|namefilter:3}}</span>\n" +
    "                      </div>\n" +
    "                      <div class=\"col-xs-3 col-sm-3 col-md-3\">\n" +
    "                        <span>+{{item.add_amount|moneyfilter}}</span>\n" +
    "                      </div>\n" +
    "                      <div class=\"col-xs-2 col-sm-2 col-md-2\">\n" +
    "                        <span>+{{item.is_auth|times:1:timesBase}}</span>\n" +
    "                      </div>\n" +
    "                      <div class=\"col-xs-3 col-sm-3 col-md-3\">\n" +
    "                        <span>+{{item.is_auth|times:2:timesBase}}</span>\n" +
    "                      </div>\n" +
    "                  </div>\n" +
    "              </li>\n" +
    "              <li ng-if=\"invitelist.length==0\" style=\"text-align:center;\">\n" +
    "                你还没有邀请好友注册，邀请好友成功注册互戳红包有10倍奖励哦！\n" +
    "              </li>\n" +
    "              <li style=\"text-align:center;\">\n" +
    "                每邀请一位好友注册以及绑定身份，每日戳红包次数和被戳红包次数都会永久增加。\n" +
    "              </li>\n" +
    "          </ul>\n" +
    "          <p ng-if=\"page_3<total_3\" ng-click=\"getMoreInvite()\" class=\"morelist\"><a>显示更多</a></p>\n" +
    "        </div>\n" +
    "        <ul class=\"list-group marginC\" ng-if=\"topflag==1\">\n" +
    "          <li class=\"list-group-item lihg disabled\" ng-repeat=\"item in toplist\">\n" +
    "              <div class=\"row\">\n" +
    "                  <div class=\"col-xs-6 col-sm-6 col-md-6 posit_bor\">\n" +
    "                    <span>【{{item.nick|namefilter:8}}】</span>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
    "                    <span>获得{{item.amount}}元红包</span>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <ul class=\"list-group marginC\" ng-if=\"topflag==2\">\n" +
    "          <li class=\"list-group-item lihg\" ng-repeat=\"item in chuolist\" ng-class=\"{disabled:item.i_has_clicked=='true'}\" ui-sref=\"redenvelope.friend({friendId: item.openId})\">\n" +
    "              <div class=\"row\">\n" +
    "                  <div class=\"col-xs-12 col-sm-12 col-md-12 posit_bor\">\n" +
    "                    <span>【{{item.nick|namefilter:8}}】</span>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </li>\n" +
    "          <li style=\"text-align:center;\">\n" +
    "            邀请好友玩红包，可获取更多奖励\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div> \n" +
    "  </div>\n" +
    "      <div class=\"row marginC\">\n" +
    "        <div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "              <div class=\"panel panel-default bornone mart2\">\n" +
    "              <ul class=\"nav nav-justified\">\n" +
    "                <li class=\"{{tabClass}}\"><a ng-click=\"tabChange(0)\">他们戳了我</a></li>\n" +
    "                <li class=\"{{tabClass2}}\"><a ng-click=\"tabChange(1)\">今天还可以戳</a></li>\n" +
    "              </ul>\n" +
    "                <div class=\"panel-body\">\n" +
    "                  <ul class=\"list-group marginC\" ng-if=\"tabflag==0\">\n" +
    "                    <li class=\"list-group-item lihg\" ng-class=\"{disabled:item.clicker_i_has_clicked=='true'}\" ng-repeat=\"item in jabme\">\n" +
    "                        <div class=\"row\" ui-sref=\"redenvelope.friend({friendId: item.clickerOpenid})\">\n" +
    "                          <div class=\"col-xs-5 col-sm-6 col-md-6 pad0\"><span>{{item.updateAt|timeLine}}</span></div>\n" +
    "                          <div class=\"col-xs-7 col-sm-6 col-md-6 posit_bor\"><i class=\"pull-left titbg\"></i><span>【{{item.clickerNick|namefilter:8}}】    +{{item.ownerGetAmount}}元</span></div>\n" +
    "                        </div>\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                  <ul class=\"list-group marginC\" ng-if=\"tabflag==1\">\n" +
    "                    <li class=\"list-group-item lihg\" ng-repeat=\"item in canjab\"  ui-sref=\"redenvelope.friend({friendId: item.openId})\">\n" +
    "                      <div class=\"row\">\n" +
    "                        <div class=\"col-xs-12 col-sm-12 col-md-6\" style=\"text-align: left;\">\n" +
    "                          <img ng-if=\"item.is_end=='true'\" src=\"http://dev.static.duomeidai.com/redenvelope/img/smsx.png\" width=\"15\" height=\"15\" style=\"margin-left:5px;\"/>\n" +
    "                          <div ng-if=\"!item.is_end\" style=\"width:24px;height:20px;float: left;\"></div>\n" +
    "                          <span>【{{item.nick|namefilter:8}}】</span>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </li>\n" +
    "                    <li ng-if=\"canjab.length==0\" style=\"text-align:center;\">\n" +
    "                      今天没有好友可以戳了\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                  <p ng-if=\"page<total&&tabflag==0\" ng-click=\"getMore()\" class=\"morelist\"><a>显示更多</a></p>\n" +
    "                  <p ng-if=\"page_2<total_2&&tabflag==1\" ng-click=\"getMore()\" class=\"morelist\"><a>显示更多</a></p>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"shareShow()\">分享给更多的好友</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div id=\"fullbg\" class=\"share_tips\" style=\"display:none;\" ng-click=\"shareHide()\">弹窗遮罩层</div>\n" +
    "<div class=\"pub_window share_bg share_tips\" style=\"display:none;top:0%;right:0;\"></div>\n" +
    "<div class=\"pub_window qr_wind share_tips\" id=\"qrcode\" style=\"display:none;top:150px;right:0;\"></div>");
}]);

angular.module("modules/redenvelope/templates/myachivement.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/myachivement.html",
    "<div id=\"myachivement\" class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "  <h2 class=\"text-center\">我的成就</h2>\n" +
    "  <div class=\"mart2\">\n" +
    "    <img src=\"http://dev.static.duomeidai.com/redenvelope/img/head_1.png?version=1\" width=\"165\" height=\"165\" alt=\"\">\n" +
    "  </div>\n" +
    "  <div class=\"row marginC\">\n" +
    "  <div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "    <div class=\"panel panel-default bornone mart2\">\n" +
    "      <ul class=\"nav nav-justified\">\n" +
    "        <li class=\"{{tabClass}}\" ng-click=\"tabChange(0);\"><a href=\"javascript:\">成长成就</a></li>\n" +
    "        <li class=\"{{tabClass2}}\" ng-click=\"tabChange(1);\"><a>红包成就</a></li>\n" +
    "      </ul>\n" +
    "      <div class=\"panel-tab\" ng-if=\"tab==0\">\n" +
    "        <div class=\"progress_all\">\n" +
    "          <div class=\"pull-left\"><h4 class=\"font16\">已达成</h4></div>\n" +
    "          <div class=\"pull-right\">\n" +
    "            <div class=\"progress\">\n" +
    "              <div ng-if=\"times==2&&is_auth=='true'\" class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{3/3*100}}%;\" >\n" +
    "                3/3\n" +
    "              </div>\n" +
    "              <div ng-if=\"!(times==2&&is_auth=='true')\" class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{times/3*100}}%;\" >\n" +
    "                {{times}}/3\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"clearfix visible-xs-block\"></div>\n" +
    "        <ul class=\"list-cjul\">\n" +
    "          <li>\n" +
    "            <div class=\"nub\"><span class=\"badge\">1</span></div>\n" +
    "            <div class=\"img-text\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/kmjx_bg_1.png?version=1\" alt=\"\" /></div>\n" +
    "            <div class=\"gz_text\">\n" +
    "            <p class=\"color6\">规则：领取种子红包</p>\n" +
    "            <p class=\"color6\">奖励：1个会长大的红包</p>\n" +
    "            </div>\n" +
    "            <div class=\"state\">\n" +
    "              <div class=\"complete\" ng-if=\"times==1||times==2||times==3\">已达成</div>\n" +
    "              <div class=\"go_complete\" ng-if=\"times==0\" ui-sref=\"redenvelope.friend\">去达成</div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "\n" +
    "          <li>\n" +
    "            <div class=\"nub\"><span class=\"badge\">2</span></div>\n" +
    "            <div class=\"img-text\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/kmjx_bg_2.png?version=1\" alt=\"\" /></div>\n" +
    "            <div class=\"gz_text\">\n" +
    "            <p class=\"color6\">规则：绑定账号</p>\n" +
    "            <p class=\"color6\">奖励：2倍戳红包收益</p>\n" +
    "            </div>\n" +
    "            <div class=\"state\">\n" +
    "              <div class=\"complete\" ng-if=\"times==2||times==3\">已达成</div>\n" +
    "              <div class=\"go_complete\" ng-if=\"times==1\" ui-sref=\"redenvelope.regist\">去达成</div>\n" +
    "              <div class=\"no-yiling\" ng-if=\"times==0\">去达成</div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "\n" +
    "          <li>\n" +
    "            <div class=\"nub\"><span class=\"badge\">3</span></div>\n" +
    "            <div class=\"img-text\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/kmjx_bg_3.png?version=1\" alt=\"\" /></div>\n" +
    "            <div class=\"gz_text\">\n" +
    "            <p class=\"color6\">规则：完成实名认证</p>\n" +
    "            <p class=\"color6\">奖励：3倍戳红包收益  </p>\n" +
    "            </div>\n" +
    "            <div class=\"state\">\n" +
    "              <div class=\"complete\" ng-if=\"times==3\">已达成</div>\n" +
    "              <div class=\"go_complete\" ng-if=\"times==2&&is_auth=='false'\" ui-sref=\"redenvelope.realname\">去达成</div>\n" +
    "              <div class=\"no-yiling\" ng-if=\"times==1\">去达成</div>\n" +
    "              <div class=\"complete\" ng-if=\"times==2&&is_auth=='true'\">已达成</div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "      <div class=\"hbcj-tab\" ng-if=\"tab==1\">\n" +
    "        <div class=\"progress_all\">\n" +
    "          <h4 class=\"font16\">\n" +
    "            红包：<span class=\"corred\">{{amount|moneyfilter}}</span>元\n" +
    "            已领取：<span class=\"corred\">{{recieveAmount|moneyfilter}}</span>元\n" +
    "          </h4>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"clearfix visible-xs-block\"></div>\n" +
    "\n" +
    "        <ul class=\"list-cjul\">\n" +
    "          <li ng-repeat=\"item in list\">\n" +
    "            <!-- 已领取 -->\n" +
    "            <div ng-if=\"item.receive_status==3\">\n" +
    "              <div class=\"nub\"><span class=\"badge\">{{$index+1}}</span></div>\n" +
    "              <div class=\"progress_2\">\n" +
    "                <div class=\"pull-left ic_total\">总</div>\n" +
    "                <h4 class=\"font16 pull-left\"><span class=\"corred\">{{item.endStartAmount}}</span>元</h4>\n" +
    "                  <p class=\"pull-right\">可领<span class=\"corred\">{{(item.endStartAmount-item.startAmount)|moneyfilter}}</span>元</p>\n" +
    "                  <div class=\"progress\">\n" +
    "                    <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%;\">\n" +
    "                      100%\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"state\"><div class=\"complete\">已领</div></div>\n" +
    "            </div>\n" +
    "            <!-- 未领取且可领取 -->\n" +
    "            <div ng-if=\"item.receive_status==2\">\n" +
    "              <div class=\"nub\"><span class=\"badge\">{{$index+1}}</span></div>\n" +
    "              <div class=\"progress_2\">\n" +
    "                <div class=\"pull-left ic_total\">总</div>\n" +
    "                <h4 class=\"font16 pull-left\"><span class=\"corred\">{{item.endStartAmount}}</span>元</h4>\n" +
    "                <p class=\"pull-right\">可领<span class=\"corred\">{{(item.endStartAmount-item.startAmount)|moneyfilter}}</span>元</p>\n" +
    "                <div class=\"progress\">\n" +
    "                  <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%;\">\n" +
    "                    100%\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"state\">\n" +
    "                <div class=\"yiling\" ng-click=\"getCash($index,item.level)\">领取</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- 未领取且不可领取 -->\n" +
    "            <div ng-if=\"item.receive_status==0\" ng-disabled=\"true\">\n" +
    "              <div class=\"nub\"><span class=\"badge\">{{$index+1}}</span></div>\n" +
    "              <div class=\"progress_2\">\n" +
    "                <div class=\"pull-left ic_total\">总</div>\n" +
    "                <h4 class=\"font16 pull-left\"><span class=\"corred\">{{item.endStartAmount|moneyfilter}}</span>元</h4>\n" +
    "                  <p class=\"pull-right\">可领<span class=\"corred\">{{(item.endStartAmount-item.startAmount)|moneyfilter}}</span>元</p>\n" +
    "                  <div class=\"progress\">\n" +
    "                    <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%;\">\n" +
    "                      100%\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"state\"><div class=\"no-yiling\">领取</div></div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <!-- 未达到 -->\n" +
    "            <div ng-if=\"item.receive_status==1\" ng-disabled=\"true\">\n" +
    "              <div class=\"nub\"><span class=\"badge\">{{$index+1}}</span></div>\n" +
    "              <div class=\"progress_2\">\n" +
    "                <div class=\"pull-left ic_total\">总</div>\n" +
    "                <h4 class=\"font16 pull-left\"><span class=\"corred\">{{item.endStartAmount|moneyfilter}}</span>元</h4>\n" +
    "                <p class=\"pull-right\">可领<span class=\"corred\">{{(item.endStartAmount-item.startAmount)|moneyfilter}}</span>元</p>\n" +
    "                <div class=\"progress\">\n" +
    "                  <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{(amount-item.startAmount)/(item.endStartAmount-item.startAmount)*100}}%;\">\n" +
    "                  {{(amount-item.startAmount)/(item.endStartAmount-item.startAmount)*100|moneyfilter}}%\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"state\">\n" +
    "                <p class=\"cha-money\">还差{{item.endStartAmount-amount|moneyfilter}}元</p>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- 未达到且未知 -->\n" +
    "            <div ng-if=\"item.receive_status==4\" ng-disabled=\"true\">\n" +
    "              <div class=\"nub\">\n" +
    "              <span class=\"badge\">{{$index+1}}</span>\n" +
    "              </div>\n" +
    "              <div class=\"progress_2\">\n" +
    "                <h4 class=\"font16 text-left unknown\"><span class=\"corred\">？</span>元</h4>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <h4 class=\"tipetex pull-left text-left\" ng-if=\"inviteCode\" ng-click=\"showTips('#inviteWindow','#strategyWindow')\" style=\"width:60%;\"><span class=\"color6\">邀请码：</span>{{inviteCode}}<a>?</a></h4>\n" +
    "        <h4 class=\"tipetex pull-right text-right\" ng-click=\"showTips('#strategyWindow','#inviteWindow')\" style=\"width:40%;\"><span class=\"color6\">领红包攻略</span><a>?</a></h4>\n" +
    "      </div>\n" +
    "</div>\n" +
    "<div class=\"pub_window tips_t\" id=\"moneyWindow\" style=\"display:none;top:25%;\">\n" +
    "  <h4 class=\"color6\" style=\"width:280px;\">\n" +
    "    1、每位成功注册的用户都可以获得一个邀请码。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;\">\n" +
    "    2、将邀请代码告诉好友，好友注册时填写你的邀请码，你即可成好友推荐人。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;\">\n" +
    "    3、推荐人有机会获得推荐奖励，请关注多美贷后续活动。\n" +
    "  </h4>\n" +
    "</div>\n" +
    "<div class=\"pub_window tips_t\" id=\"inviteWindow\" ng-click=\"hideTips('#inviteWindow')\" style=\"display:none;top:25%;\">\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    1、每位成功注册的用户都可以获得一个邀请码。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    2、将邀请代码告诉好友，好友注册时填写你的邀请码，你即可成好友推荐人。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    3、推荐人有机会获得推荐奖励，请关注多美贷后续活动。\n" +
    "  </h4>\n" +
    "</div>\n" +
    "<div class=\"pub_window tips_t\" id=\"strategyWindow\" ng-click=\"hideTips('#strategyWindow')\" style=\"display:none;top:25%;\">\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    1、绑定账号的用户可以获得2倍红包收益（无论是戳好友，还是被好友戳，红包都是2倍哦）。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    2、完成实名认证的用户可以获得3倍红包收益（无论是戳好友，还是被好友戳，红包都是3倍哦）。\n" +
    "  </h4>\n" +
    "  <h4 class=\"color6\" style=\"width:280px;text-align:left;\">\n" +
    "    3、戳红包获得的返利将在90天后收回，赶紧使用返利投资赚钱吧。\n" +
    "  </h4>\n" +
    "</div>\n" +
    "<!--提示弹窗样式-->\n" +
    "<div class=\"pub_window tips_t\" id=\"tipsWindow\" style=\"display:none;top:25%;\">\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/myinfo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/myinfo.html",
    "<div id=\"myinfo\"> \n" +
    "	<div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"status==0\">\n" +
    "        <ul class=\"nav nav-justified hb_tab\"  ng-if=\"fromFriend\">\n" +
    "            <li>\n" +
    "                <a ui-sref=\"redenvelope.friend({friendId:friendOpenId})\">【{{friendNick}}】的红包</a>\n" +
    "            </li>\n" +
    "            <li class=\"active_2\"><a href=\"javascript:\">我的红包</a></li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-5 col-sm-5 col-md-6 padrnone\">\n" +
    "                <h3 class=\"text-left padl8 fon13\"><b class=\"corred\">{{fks}}</b>位戳友</h3>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-7 col-sm-7 col-md-6 padlnone\">\n" +
    "                <h3 class=\"text-right padr8 fon13\"><span>{{day|timefilter}}</span>天<span>{{hour|timefilter}}</span>小时<span>{{min|timefilter}}</span>分<span>{{sec|timefilter}}</span>秒截止</h3>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    	<div class=\"posit mart1 zhz_bg\">\n" +
    "            <p class=\"lead\"><i>{{money|moneyfilter}}</i>元</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <h3 class=\"color6\">还差{{need|moneyfilter}}元可达到关卡({{nextlevel}}/15) 可领取{{next|moneyfilter}}元红包</h3>\n" +
    "        <!-- <div ng-click=\"partShow()\" class=\"partners\" ng-if=\"partner.busName!=''\">多美贷合作伙伴<a>【{{partner.busName}}】</a></div> \n" +
    "        <div class=\"partners\" ng-if=\"partner.busName==''\">\n" +
    "            <p>{{tips}}</p>\n" +
    "        </div> -->\n" +
    "\n" +
    "        <div class=\"partners\" ng-if=\"partner.busName!=''\">\n" +
    "            <p ng-if=\"partner.content!=''&&banner_flag==0\" class=\"FadeInR\">【{{partner.busName}}】说：{{partner.content}}</p>\n" +
    "            <p ng-if=\"banner_flag==1\" class=\"FadeInR\" ng-click=\"partShow()\">红包由【{{partner.busName}}】和【多美贷】共同发放</p>\n" +
    "        </div>\n" +
    "        <div class=\"partners\" ng-if=\"partner.busName==''\">\n" +
    "            <p ng-if=\"banner_flag==0\" class=\"FadeInR\">【多美贷】说：开开心心，不急不燥，做好自己</p>\n" +
    "            <p ng-if=\"banner_flag==1\" class=\"FadeInR\">【多美贷】说：加戳群，找戳友</p>\n" +
    "            <p ng-if=\"banner_flag==2\" class=\"FadeInR\">【多美贷】说：多找小鲜肉，多戳好基友</p>\n" +
    "            <p ng-if=\"banner_flag==3\" class=\"FadeInR\">红包由【多美贷】发放</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <h2 class=\"text-center color6\">红包长大方法</h2>\n" +
    "        <div class=\"row head_sm\">\n" +
    "            <div class=\"posita\">\n" +
    "                <img src=\"http://dev.static.duomeidai.com/redenvelope/img/head_n.png?version=1\" alt=\"\" />\n" +
    "            </div>\n" +
    "        	<div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "                <ul class=\"nav nav-justified\">\n" +
    "                  <li class=\"backred\"><a ng-click=\"jabMe()\">让好友来戳我</a></li>\n" +
    "                  <li class=\"backyellow\"><a ng-click=\"jabFriend()\">戳好友的红包</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <h3 class=\"color6\" ng-if=\"level==1\"><a ui-sref=\"redenvelope.regist\">绑定账号</a>再戳红包，获得2倍收益！</h3>\n" +
    "        <h3 class=\"color6\" ng-if=\"level==2&&is_auth=='false'\"><a ui-sref=\"redenvelope.realname\">实名认证</a>再戳红包，获得3倍收益！</h3>\n" +
    "        <div class=\"row marb1\">\n" +
    "            <div class=\"col-xs-6 col-sm-6 col-md-6 \">\n" +
    "            	<h3 class=\"text-left my-achievement\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_7.png?version=1\" alt=\"\" /><a ng-click=\"myAchieve()\">我的成就</a></h3>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
    "            	<h3 class=\"text-right rules-sm\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_4.png?version=1\" alt=\"\" /><a ng-click=\"rule()\">规则说明</a></h3>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "	<div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"status==1\">\n" +
    "        <ul class=\"nav nav-justified hb_tab\"  ng-if=\"fromFriend\">\n" +
    "            <li>\n" +
    "                <a ui-sref=\"redenvelope.friend({friendId:friendOpenId})\">【{{friendNick}}】的红包</a>\n" +
    "            </li>\n" +
    "            <li class=\"active_2\"><a href=\"javascript:\">我的红包</a></li>\n" +
    "        </ul>\n" +
    "        <h4 class=\"tipetex mart1\">红包已经停止长大了<a ng-click=\"redStop()\">?</a></h4>\n" +
    "        <h1 class=\"countdown font16 color6\">离红包消失还有：<span>{{day|timefilter}}</span>天<span>{{hour|timefilter}}</span>小时<span>{{min|timefilter}}</span>分钟{{sec|timefilter}}</span>秒</h1>\n" +
    "        <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"getAchieve()\">我的关卡红包</button>\n" +
    "        <h3 class=\"text-center color6 marb3\" ng-if=\"ach_amount>0\">您还有{{ach_amount}}元关卡红包未领取</h3>\n" +
    "        <div class=\"row head_sm\">\n" +
    "            <div class=\"posita\">\n" +
    "                <img src=\"http://dev.static.duomeidai.com/redenvelope/img/head_n.png?version=1\" alt=\"\" />\n" +
    "            </div>\n" +
    "        	<div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "                <ul class=\"nav nav-justified\">\n" +
    "                  <li class=\"backred\"><a ng-click=\"jabMe()\">戳过我的好友</a></li>\n" +
    "                  <li class=\"backyellow\"><a ng-click=\"jabFriend()\">我戳过的好友</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"mart4\"><img ng-src=\"http://dev.static.duomeidai.com/redenvelope/img/{{Qr_code}}.jpg?version=1\" alt=\"\" class=\"widimg\" /></div>\n" +
    "        <h3 class=\"text-center color6\">如果没戳过瘾，关注\"多美惠通多美贷\"<br/><br/>好玩的东东并没有结束，这才是刚刚开始</h3>\n" +
    "       	<div class=\"padt2\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "  	<div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"status==2\">\n" +
    "        <h4 class=\"tipetex mart2\">活动已经结束了！下次早点来吧！</h4>\n" +
    "        <div class=\"row mart2\">\n" +
    "            <div class=\"col-xs-5 col-sm-6 col-md-6\">\n" +
    "                <div class=\"text-right mart1\"><img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_9_1.png\" alt=\"\" width=\"65\" /></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-7 col-sm-6 col-md-6\">\n" +
    "                <h4 class=\"text-left color6 mart2\">共获得：<span class=\"corred\">{{hasReceiveAmount}}</span>元！</h4>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <a href=\"http://www.duomeidai.com/borrowList.action\" type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\">我要投资</a>\n" +
    "        <h3 class=\"text-center color6\">用红包投资，获最高12%年化收益。</h3>\n" +
    "        <a href=\"http://www.duomeidai.com\" type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\">我的账户</a>\n" +
    "        <h3 class=\"text-center color6\">查看个人信息、红包、投资收益。</h3>\n" +
    "        <div class=\"mart2\"><img ng-src=\"http://dev.static.duomeidai.com/redenvelope/img/{{Qr_code}}.jpg?version=1\" alt=\"\" class=\"widimg\" /></div>\n" +
    "        <h3 class=\"text-center color6\">如果没戳过瘾，关注\"多美惠通多美贷\"<br/><br/>好玩的东东并没有结束，这才是刚刚开始</h3>\n" +
    "       	<div class=\"padt2\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"status==9\">\n" +
    "    	<img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_6_2.png?version=1\" alt=\"\" class=\"padt2 widimg\" />\n" +
    "        <h3 class=\"text-center color6\">对不起，您已被限制参与</h3>\n" +
    "        <h3 class=\"text-center color6\">请联系客服电话：400-885-7027 处理</h3>\n" +
    "       	<div class=\"padt2\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<!--合作伙伴-->\n" +
    "<div class=\"pub_window hzhb_wind\" id=\"partnerWindow\" style=\"position:fixed;display:none;top:5%;left:6%;\">\n" +
    "    <div class=\"closepic\" ng-click=\"partClose()\"><a>关闭</a></div>\n" +
    "    <div class=\"hb_hd\">\n" +
    "        <a href=\"{{partner.busHref}}\" ng-if=\"partner.busHref!=''\">\n" +
    "            <img ng-src=\"{{partner.busLogo}}\" alt=\"{{partner.busName}}\"  height=\"60\" />\n" +
    "            <h1>{{partner.busName}}</h1>\n" +
    "        </a>\n" +
    "        <a ng-if=\"partner.busHref==''\">\n" +
    "            <img ng-src=\"{{partner.busLogo}}\" alt=\"{{partner.busName}}\"  height=\"60\" />\n" +
    "            <h1>{{partner.busName}}</h1>\n" +
    "        </a>\n" +
    "        <div class=\"clearB\"></div>\n" +
    "        <div class=\"hb_detail\">\n" +
    "            <div class=\"hb_p\" data-ng-bind-html=\"partner.busDesc\"></div>\n" +
    "            <img ng-if=\"partner.busImage!=''\" ng-src=\"{{partner.busImage}}\" width=\"250\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"ad_gz\">\n" +
    "        <p style=\"text-align: center;\">我想加入</p>\n" +
    "        <h6 class=\"color6\">关注公众账号<a>\"多美惠通多美贷\"</a>，点击菜单<a>\"我要红包\"－\"合作推广\"</a></h6>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/myjab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/myjab.html",
    "<div id=\"myjab\">\n" +
    "<!--   <div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\" ng-if=\"myjab.length==0\">\n" +
    "    <img src=\"http://dev.static.duomeidai.com/redenvelope/img/bg_6_1.png?version=1\" alt=\"\" class=\"padt2 widimg\" />\n" +
    "      <h2 class=\"text-center color6\">你还没有戳过任何一个人</h2>\n" +
    "      <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"shareShow()\">分享给更多的好友</button>\n" +
    "  </div> -->\n" +
    "<div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "  <div class=\"row marginC\">\n" +
    "    <div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "      <div class=\"panel panel-default bornone mart2\">\n" +
    "        <ul class=\"nav nav-justified\">\n" +
    "            <li ng-class=\"{active:topflag==0}\" style=\"width:33%\"><a ng-click=\"topChange(0)\">我邀请的</a></li>\n" +
    "            <li ng-class=\"{active:topflag==2}\" style=\"width:34%\"><a ng-click=\"topChange(2)\">戳友同志</a></li>\n" +
    "            <li ng-class=\"{active:topflag==1}\" style=\"width:33%\"><a ng-click=\"topChange(1)\">排行榜</a></li>\n" +
    "        </ul>\n" +
    "        <div class=\"panel-body\" ng-if=\"topflag==0\">\n" +
    "          <div class=\"row\" ng-if=\"invitelist.length!=0\">\n" +
    "            <div class=\"col-xs-4 col-sm-4 col-md-4\" style=\"text-align: left;\">\n" +
    "              <span>昵称</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-3 col-sm-3 col-md-3\">\n" +
    "              <span>奖励(元)</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-2 col-sm-2 col-md-2\">\n" +
    "              <span>戳</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-3 col-sm-3 col-md-3\">\n" +
    "              <span>被戳</span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <ul class=\"list-group marginC\">\n" +
    "              <li class=\"list-group-item lihg\" ng-class=\"{disabled:item.i_has_clicked=='true'||item.is_end=='true'}\" ng-repeat=\"item in invitelist\" ui-sref=\"redenvelope.friend({friendId: item.openId})\">\n" +
    "                  <div class=\"row\">\n" +
    "                      <div class=\"col-xs-4 col-sm-4 col-md-4 posit_bor\">\n" +
    "                        <!-- <div ng-if=\"item.is_end!='true'\" style=\"width:24px;height:20px;float: left;\"></div> -->\n" +
    "        \n" +
    "                        <img ng-if=\"item.is_auth=='true'\" src=\"http://dev.static.duomeidai.com/redenvelope/img/smrz.png\" width=\"15\" height=\"15\" style=\"margin-left:5px;\"/>\n" +
    "                        <img ng-if=\"item.is_reg=='true'&&item.is_auth!='true'\" src=\"http://dev.static.duomeidai.com/redenvelope/img/smzc.png\" width=\"15\" height=\"15\" style=\"margin-left:5px;\"/>\n" +
    "                        <img ng-if=\"item.is_receive=='true'&&item.is_reg!='true'&&item.is_auth!='true'\" src=\"http://dev.static.duomeidai.com/redenvelope/img/smlq.png\" width=\"15\" height=\"15\" style=\"margin-left:5px;\"/>\n" +
    "                        <span>{{item.nick|namefilter:3}}</span>\n" +
    "                      </div>\n" +
    "            <div class=\"col-xs-3 col-sm-3 col-md-3\">\n" +
    "\n" +
    "                        <span>+{{item.add_amount|moneyfilter}}</span>\n" +
    "                      </div>\n" +
    "                      <div class=\"col-xs-2 col-sm-2 col-md-2\">\n" +
    "                        <span>+{{item.is_auth|times:1:timesBase}}</span>\n" +
    "                      </div>\n" +
    "            <div class=\"col-xs-3 col-sm-3 col-md-3\">\n" +
    "                        <span>+{{item.is_auth|times:2:timesBase}}</span>\n" +
    "                      </div>\n" +
    "                  </div>\n" +
    "              </li>\n" +
    "              <li ng-if=\"invitelist.length==0\" style=\"text-align:center;\">\n" +
    "                你还没有邀请好友注册，邀请好友成功注册互戳红包有10倍奖励哦！\n" +
    "              </li>\n" +
    "              <li style=\"text-align:center;\">\n" +
    "                每邀请一位好友注册以及绑定身份，每日戳红包次数和被戳红包次数都会永久增加。\n" +
    "              </li>\n" +
    "          </ul>\n" +
    "          <p ng-if=\"page_3<total_3\" ng-click=\"getMoreInvite()\" class=\"morelist\"><a>显示更多</a></p>\n" +
    "        </div>\n" +
    "        <ul class=\"list-group marginC\" ng-if=\"topflag==1\">\n" +
    "          <li class=\"list-group-item lihg disabled\" ng-repeat=\"item in toplist\">\n" +
    "              <div class=\"row\">\n" +
    "                  <div class=\"col-xs-6 col-sm-6 col-md-6 posit_bor\">\n" +
    "                    <span>【{{item.nick|namefilter:8}}】</span>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-xs-6 col-sm-6 col-md-6\">\n" +
    "                    <span>获得{{item.amount}}元红包</span>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <ul class=\"list-group marginC\" ng-if=\"topflag==2\">\n" +
    "          <li class=\"list-group-item lihg\" ng-repeat=\"item in chuolist\" ng-class=\"{disabled:item.i_has_clicked=='true'}\"  ui-sref=\"redenvelope.friend({friendId: item.openId})\">\n" +
    "              <div class=\"row\">\n" +
    "                  <div class=\"col-xs-12 col-sm-12 col-md-12 posit_bor\">\n" +
    "                    <span>【{{item.nick|namefilter:8}}】</span>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </li>\n" +
    "          <li style=\"text-align:center;\">\n" +
    "            邀请好友玩红包，可获取更多奖励\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div> \n" +
    "  </div>\n" +
    "  <div class=\"row marginC\">\n" +
    "    <div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "        <div class=\"panel panel-default bornone mart2\">\n" +
    "          <ul class=\"nav nav-justified\">\n" +
    "            <li class=\"{{tabClass}}\"><a ng-click=\"tabChange(0)\">你戳了他们</a></li>\n" +
    "            <li class=\"{{tabClass2}}\"><a ng-click=\"tabChange(1)\">今天还可以戳</a></li>\n" +
    "          </ul>\n" +
    "          <div class=\"panel-body\">\n" +
    "            <ul class=\"list-group marginC\" ng-if=\"tabflag==0\">\n" +
    "              <li class=\"list-group-item lihg\" ng-class=\"{disabled:item.owner_i_has_clicked=='true'}\" ng-repeat=\"item in myjab\">\n" +
    "                <div class=\"row\" ui-sref=\"redenvelope.friend({friendId: item.ownerOpenid})\">\n" +
    "                  <div class=\"col-xs-5 col-sm-6 col-md-6 pad0\"><span>{{item.updateAt|timeLine}}</span></div>\n" +
    "                  <div class=\"col-xs-7 col-sm-6 col-md-6 posit_bor\"><i class=\"pull-left titbg\"></i><span>【{{item.ownerNick|namefilter:8}}】    +{{item.clickerGetAmount}}元</span></div>\n" +
    "                </div>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "            <ul class=\"list-group marginC\" ng-if=\"tabflag==1\">\n" +
    "              <li class=\"list-group-item lihg\" ng-repeat=\"item in canjab\" ui-sref=\"redenvelope.friend({friendId: item.openId})\">\n" +
    "                  <div class=\"row\">   \n" +
    "                    <div class=\"col-xs-12 col-sm-12 col-md-6\" style=\"text-align: left;\">>\n" +
    "                      <img ng-if=\"item.is_end=='true'\" src=\"http://dev.static.duomeidai.com/redenvelope/img/smsx.png\" width=\"15\" height=\"15\" style=\"margin-left:5px;\"/>\n" +
    "                      <div ng-if=\"!item.is_end\" style=\"width:24px;height:20px;float: left;\"></div>\n" +
    "                      <span>【{{item.nick|namefilter:8}}】</span>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "              </li>\n" +
    "              <li ng-if=\"canjab.length==0\" style=\"text-align:center;\">\n" +
    "                今天没有好友可以戳了\n" +
    "              </li>\n" +
    "            </ul> \n" +
    "            <p ng-if=\"page<total&&tabflag==0\" ng-click=\"getMore()\" class=\"morelist\"><a>显示更多</a></p>\n" +
    "            <p ng-if=\"page_2<total_2&&tabflag==1\" ng-click=\"getMore()\" class=\"morelist\"><a>显示更多</a></p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-lg btn-block share_but\" ng-click=\"shareShow()\">分享给更多的好友</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div id=\"fullbg\" class=\"share_tips\" style=\"display:none;\" ng-click=\"shareHide()\">弹窗遮罩层</div>\n" +
    "<div class=\"pub_window share_bg share_tips\" style=\"display:none;top:0%;right:0;\"></div>\n" +
    "<div class=\"pub_window qr_wind share_tips\" id=\"qrcode\" style=\"display:none;top:150px;right:0;\"></div>");
}]);

angular.module("modules/redenvelope/templates/realname.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/realname.html",
    "<div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "    <h2 class=\"text-center\">验明正身</h2>\n" +
    "    \n" +
    "    <h3 class=\"font16 color6\">验明正身后才可以投资，</h3>\n" +
    "    <h3 class=\"font16 color6\">还有3倍红包收益</h3>\n" +
    "    \n" +
    "    <div class=\"mart2\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" name=\"realname\" ng-model=\"real.realname\" placeholder=\"真实姓名\" cs-focus autofocus required>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" name=\"idcard\" ng-model=\"real.idcard\" placeholder=\"身份证号码\" cs-focus autofocus required>\n" +
    "        </div>                    \n" +
    "    </div>\n" +
    "    \n" +
    "    <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block but_zdy\" ng-click=\"checkRealName()\">验名正身</button>\n" +
    "    <h3 class=\"color6\">您可以免费进行2次验明正身操作，</h3>\n" +
    "    <h3 class=\"color6 marb3\">第3次起需收取5元手续费，请慎重填写！</h3>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/regist.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/regist.html",
    "<div id=\"regist\" class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor_2\">\n" +
    "	<div class=\"img-circle\">\n" +
    "        <h2 class=\"text-center\">绑定您的多美贷账号</h2>\n" +
    "    </div>\n" +
    "    <div class=\"pub_window\" style=\"display:none;top:20%;\">\n" +
    "        <h2>找到组织</h2>\n" +
    "        <h4 class=\"color6 padt1\">获得<span class=\"corred\">2</span>倍红包收益</h4>\n" +
    "    </div>\n" +
    "    <div class=\"register_tab\">\n" +
    "        <div class=\"row head_sm register_nav\">\n" +
    "            <div class=\"posita\">\n" +
    "                <img src=\"http://dev.static.duomeidai.com/redenvelope/img/head_2.png?version=1\" alt=\"\">\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-12 col-md-12 col-lg-12\">\n" +
    "                <ul class=\"nav nav-justified\">\n" +
    "                  <li class=\"{{tabClass}}\" ng-click=\"tabChange(0)\"><a>新用户注册</a></li>\n" +
    "                  <li class=\"{{tabClass2}}\" ng-click=\"tabChange(1)\"><a>已有账户</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!--新用户注册-->\n" +
    "        <form class=\"form-horizontal\" role=\"form\" ng-if=\"regtype==0\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" name=\"mobile\" ng-model=\"reg.mobile\" placeholder=\"手机号\">{{mobile}}\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-if=\"msgCount>2\">\n" +
    "                <input type=\"text\" class=\"form-control wid_2\" name=\"reg.imgcode\" ng-model=\"reg.imgcode\" placeholder=\"图形验证码\">\n" +
    "                <div class=\"btn btn-default img_code\" ng-click=\"imgCodeRefresh()\">\n" +
    "                    <img ng-src=\"{{imgUrl}}\" >\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control wid_3\" ng-model=\"reg.msgcode\" placeholder=\"验证码\">\n" +
    "                <button type=\"submit\" ng-disabled=\"codeDisabled\" class=\"btn btn-default but_voice\" ng-click=\"voiceCode(1)\">\n" +
    "                    <span ng-if=\"desableTime==0||clickType!=2\">语音</span>\n" +
    "                    <span ng-if=\"desableTime>0&&clickType==2\">{{desableTime}}</span>\n" +
    "                </button>\n" +
    "                <button type=\"submit\" ng-disabled=\"codeDisabled\" class=\"btn btn-default but_sms\" ng-click=\"msgCode(1)\">\n" +
    "                    <span ng-if=\"desableTime==0||clickType!=1\">短信</span>\n" +
    "                    <span ng-if=\"desableTime>0&&clickType==1\">{{desableTime}}</span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"password\" class=\"form-control\" ng-model=\"reg.loginPwd\" placeholder=\"密码，6-14位\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"password\" class=\"form-control\" ng-model=\"reg.tradePwd\" placeholder=\"交易密码，6-14位\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"reg.nickName\" placeholder=\"昵称，2-10位，不能下划线开头\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"reg.randkey\" placeholder=\"推荐人手机号／邀请代码，如无可不填\">\n" +
    "            </div>\n" +
    "            <div class=\"regis_tip\">\n" +
    "            	<span ng-click=\"accessRadioClick()\" ng-class=\"{default:recieve}\">&radic;</span>\n" +
    "            	<h3 class=\"corwhite\">我已满18岁，已阅读并接受<a ui-sref=\"redenvelope.agreement\">《服务协议》</a></h3>\n" +
    "            </div>\n" +
    "            <button type=\"submit\" ng-click=\"singIn()\" ng-class=\"{default:!recieve}\" ng-disabled=\"!recieve\" class=\"btn btn-primary btn-lg btn-block but_zdy\">注册并绑定</button>\n" +
    "            <h3 class=\"corwhite marb3\">新用户注册成功，还可多获得15~95元返利</h3>\n" +
    "        </form>\n" +
    "        \n" +
    "        <!--已有账户-->\n" +
    "        <form class=\"form-horizontal\" role=\"form\" ng-if=\"regtype==1\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"bind.mobile\" placeholder=\"手机号\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-if=\"msgCount>2\">\n" +
    "                <input type=\"text\" class=\"form-control wid_2\" ng-model=\"bind.imgcode\" placeholder=\"图形验证码\">\n" +
    "                <div class=\"btn btn-default img_code\" ng-click=\"imgCodeRefresh()\">\n" +
    "                    <img ng-src=\"{{imgUrl}}\" >\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control wid_3\" ng-model=\"bind.msgcode\" placeholder=\"验证码\">\n" +
    "                <button type=\"submit\" ng-disabled=\"codeDisabled\" class=\"btn btn-default but_voice\" ng-click=\"voiceCode(2)\">\n" +
    "                    <span ng-if=\"desableTime==0||clickType!=2\">语音</span>\n" +
    "                    <span ng-if=\"desableTime>0&&clickType==2\">{{desableTime}}</span>\n" +
    "                </button>\n" +
    "                <button type=\"submit\" ng-disabled=\"codeDisabled\" class=\"btn btn-default but_sms\" ng-click=\"msgCode(2)\">\n" +
    "                    <span ng-if=\"desableTime==0||clickType!=1\">短信</span>\n" +
    "                    <span ng-if=\"desableTime>0&&clickType==1\">{{desableTime}}</span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <button type=\"submit\" ng-click=\"bindUser()\" class=\"btn btn-primary btn-lg btn-block but_zdy\">绑定账号</button>\n" +
    "            <h3 class=\"corwhite marb3\">绑定账号，红包收益翻倍！</h3>\n" +
    "        </form>\n" +
    "        \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/regsuccess.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/regsuccess.html",
    "<div  class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "    <h2 class=\"text-center\" ng-if=\"regtype!=3\">恭喜，成功绑定账户！</h2>\n" +
    "    <h2 class=\"text-center\" ng-if=\"regtype==3\">恭喜，实名认证成功！</h2>\n" +
    "    <h3 class=\"font16 color6\" ng-if=\"regtype==3\">可获得3倍红包收益</h3>\n" +
    "    \n" +
    "    <h3 class=\"font16 color6\" ng-if=\"regtype==1\"><span class=\"corred\">{{extra|moneyfilter}}</span>元注册返利</h3>\n" +
    "    \n" +
    "    <h3 class=\"font16 color6\" ng-if=\"regtype==1\">已进入你的返利余额账户</h3>\n" +
    "    \n" +
    "    <div class=\"mart2\">\n" +
    "      	<div class=\"marginC biaoq_1\"></div>\n" +
    "    </div>\n" +
    "    \n" +
    "    <h3 class=\"color6\" ng-if=\"ach_amount>0\">您当前还有【{{ach_amount|moneyfilter}}】元的关卡红包未领取</h3>\n" +
    "    \n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-lg btn-block but_zdy\" ui-sref=\"redenvelope.myachivement({tab:1})\" ng-if=\"ach_amount>0\">点击领取</button>\n" +
    "    \n" +
    "    <h3 class=\"color6\" ng-if=\"regtype==1||(regtype==2&&isauth=='false')\">尚未实名认证，完成实名认证可得3倍红包收益</h3>\n" +
    "    \n" +
    "    <button ui-sref=\"redenvelope.realname\" type=\"button\" class=\"btn btn-primary btn-lg btn-block but_zdy\" ng-if=\"regtype==1||(regtype==2&&isauth=='false')\">实名认证</button>\n" +
    "\n" +
    "    <h3 class=\"color6\" ng-if=\"regtype==3\">已经获得了【{{money|moneyfilter}}】元收益，</h3>\n" +
    "    <h3 class=\"color6\" ng-if=\"regtype==3\">下次戳红包会获得3倍收益</h3>\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-lg btn-block but_zdy\" ui-sref=\"redenvelope.myinfo\" ng-if=\"regtype==3\">我的红包</button>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div id=\"zdzz\" class=\"pub_window\" style=\"display:none;top:20%;\">\n" +
    "    <h2>找到组织</h2>\n" +
    "    <h4 class=\"color6 padt1\">获得<span class=\"corred\">2</span>倍红包收益</h4>\n" +
    "</div>\n" +
    "<div id=\"ymzs\" class=\"pub_window\" style=\"display:none;top:20%;\">\n" +
    "    <h2>验明正身</h2>\n" +
    "    <h4 class=\"color6 padt1\">获得<span class=\"corred\">3</span>倍红包收益</h4>\n" +
    "</div>");
}]);

angular.module("modules/redenvelope/templates/rule.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/rule.html",
    "<div class=\"padb8 img-rounded mart3 hb_pic radiu_bgcor\">\n" +
    "	<h2 class=\"text-center\">活动规则</h2>\n" +
    "	<div class=\"pad0\">\n" +
    "	    <p class=\"text-left font16\">1、参与活动的用户都可以获得1个会长大的种子红包。</p>\n" +
    "	    <p class=\"text-left font16\">2、把红包分享给好友，好友每天首次点击都可为红包增加金额，同时好友自己也可获得红包。\n" +
    "		</p>\n" +
    "	    <p class=\"text-left font16\">3、通过微信绑定账号，每次点击增加红包为普通红包的2倍。通过微信注册并完成实名认证，增加红包为普通红包的3倍。如果好友之间存在邀请关系，且有一方是通过微信红包活动新注册的用户，那么增加红包为普通红包的10倍。\n" +
    "		</p>\n" +
    "	    <p class=\"text-left font16\">4、戳新用户奖励更高。</p>\n" +
    "	    <p class=\"text-left font16\">5、红包达到一定金额即可领取，领取的红包可在多美贷账户“返利余额”中查看，最高可达1000元。返利使用规则，请登录官网（http://www.duomeidai.com）查看。</p>\n" +
    "	    <p class=\"text-left font16\">6、红包自用户获得时起1周内有效，超过1周后将无法再增加金额。</p>\n" +
    "	    <p class=\"text-left font16\">7、红包失效1周后会消失，请在1周内领取。</p>\n" +
    "	    <p class=\"text-left font16\">8、本活动解释权归多美贷所有。</p>\n" +
    "	    <p class=\"text-left font16\">9、想了解“多美贷红包攻略”，敬请关注公众号“多美惠通多美贷”，对活动有任何疑问或建议，可随时在公众号上咨询客服。</p>\n" +
    "	</div>\n" +
    "	<div class=\"mart2\"><img ng-src=\"http://dev.static.duomeidai.com/redenvelope/img/{{Qr_code}}.jpg?version=1\" alt=\"\" class=\"widimg\" /></div>\n" +
    "	<div class=\"padt2\"></div>\n" +
    "</div> ");
}]);

angular.module("modules/redenvelope/templates/view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/redenvelope/templates/view.html",
    "<html>\n" +
    "<head>\n" +
    "	<style type=\"text/css\">@charset \"UTF-8\";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>\n" +
    "      <meta charset=\"UTF-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no\">\n" +
    "    <meta name=\"apple-mobile-web-app-title\" content=\"title\">\n" +
    "    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n" +
    "    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\">\n" +
    "    <meta content=\"telephone=no\" name=\"format-detection\">\n" +
    "    <title>微信红包</title>\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n" +
    "    \n" +
    "    \n" +
    "    <link rel=\"shortcut icon\" href=\"favicon.ico\" type=\"image/x-icon\">\n" +
    "    <link rel=\"stylesheet\" href=\"http://dev.static.duomeidai.com/public/bootstrap/dist/css/bootstrap.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"http://dev.static.duomeidai.com/public/fontawesome/css/font-awesome.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"http://dev.static.duomeidai.com/public/angular-growl/build/angular-growl.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"http://dev.static.duomeidai.com/redenvelope/app.css?version=0.16\">\n" +
    "    <!--[if lt IE 9]>\n" +
    "    <script src=\"http://dev.static.duomeidai.com/public/json2/json2.js\"></script>\n" +
    "    <script src=\"http://dev.static.duomeidai.com/public/html5shiv/dist/html5shiv.min.js\"></script>\n" +
    "    <script src=\"http://dev.static.duomeidai.com/public/respond/dest/respond.min.js\"></script>\n" +
    "    <link href=\"http://dev.static.duomeidai.com/public/cross-domain/respond-proxy.html\" id=\"respond-proxy\" rel=\"respond-proxy\" />\n" +
    "    <link href=\"http://dev.static.duomeidai.com/public/cross-domain/respond.proxy.gif\" id=\"respond-redirect\" rel=\"respond-redirect\" />\n" +
    "    <script src=\"http://dev.static.duomeidai.com/public/cross-domain/respond.proxy.js\"></script>\n" +
    "    <![endif]-->\n" +
    "    <script src=\"http://dev.static.duomeidai.com/public/jquery/dist/jquery.min.js\"></script>\n" +
    "    <script src=\"http://dev.static.duomeidai.com/public/angular-bootstrap/ui-bootstrap-tpls.min.js\"></script>\n" +
    "  \n" +
    "\n" +
    "  </head>\n" +
    "\n" +
    "\n" +
    "<body>\n" +
    "	<div class=\"pub_window hzhb_wind\" id=\"partnerWindow\" style=\"position:fixed;display:none;top:5%;left:6%;\">\n" +
    "	</div>\n" +
    "</body>\n" +
    "<script type=\"text/javascript\">\n" +
    "		var getParam = function() {\n" +
    "			var Url = window.location.href;\n" +
    "			var u, g, StrBack = '';\n" +
    "			if (arguments[arguments.length - 1] == \"#\") {\n" +
    "				u = Url.split(\"#\");\n" +
    "			} else {\n" +
    "				u = Url.split(\"#\")[0].split(\"?\");\n" +
    "			}\n" +
    "			if (u.length == 1) {\n" +
    "				g = '';\n" +
    "			} else {\n" +
    "				g = u[1];\n" +
    "			}\n" +
    "			if (g != '') {\n" +
    "				gg = g.split(\"&\");\n" +
    "				var MaxI = gg.length;\n" +
    "				str = arguments[0] + \"=\";\n" +
    "				for (xm = 0; xm < MaxI; xm++) {\n" +
    "					if (gg[xm].indexOf(str) == 0) {\n" +
    "						StrBack = gg[xm].replace(str, \"\");\n" +
    "						break;\n" +
    "					}\n" +
    "				}\n" +
    "			}\n" +
    "			return StrBack;\n" +
    "		}\n" +
    "\n" +
    "		$.ajax({\n" +
    "			url: '/path/to/file',\n" +
    "			data: {'busId': getParam('id')}\n" +
    "		})\n" +
    "		.done(function(res) {\n" +
    "			res=res.data;\n" +
    "			var html='<div class=\"closepic\"><a>关闭</a></div>';\n" +
    "			html+='<div class=\"hb_hd\">';\n" +
    "			html+='<a href='+res.busHref+' ng-if=\"partner.busHref!=''\">';\n" +
    "			html+='<img src=\"'+res.busLogo+'\" width=\"50\" height=\"50\" />';\n" +
    "			html+='<h1>'+res.busName+'</h1>';\n" +
    "			html+='</a>';\n" +
    "			html+='<div class=\"clearB\"></div>';\n" +
    "			html+='<div class=\"hb_detail\">';\n" +
    "			html+='<div class=\"hb_p\">'+res.busDesc+'</div>';\n" +
    "			if(res.busImage!=''){\n" +
    "				html+='<img src=\"'+res.busImage+'\" width=\"256\" height=\"128\" />';\n" +
    "			}\n" +
    "			html+='</div>';\n" +
    "			html+='</div>';\n" +
    "			html+='<div class=\"ad_gz\">';\n" +
    "			html+='<p style=\"text-align: center;\">我想加入</p>';\n" +
    "			html+='<h6 class=\"color6\">关注公众账号<a>\"多美惠通多美贷\"</a>，点击菜单<a>\"我要红包\"－\"合作推广\"</a></h6>';\n" +
    "			html+='</div>';\n" +
    "\n" +
    "\n" +
    "\n" +
    "			$(\"#partnerWindow\").html(html);\n" +
    "\n" +
    "\n" +
    "		})\n" +
    "		.fail(function() {\n" +
    "			console.log(\"error\");\n" +
    "		})\n" +
    "		.always(function() {\n" +
    "			console.log(\"complete\");\n" +
    "		});\n" +
    "		\n" +
    "\n" +
    "</script>\n" +
    "");
}]);

angular.module("modules/register/templates/realname.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/realname.html",
    "<form role=\"form\" name=\"mobileForm\" ng-submit=\"submit()\">\n" +
    "  <div class=\"form-group form-group-first\">\n" +
    "    <input type=\"text\" name=\"mobile\" ng-model=\"mobile\" class=\"form-control\" id=\"inputMobile\" placeholder=\"请输入手机号码\" cs-number required ng-pattern=\"/^\\d{11}$/\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <button type=\"submit\" class=\"btn btn-primary full-width\" ng-disabled=\"mobileForm.$invalid\">获取验证码</button>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("modules/register/templates/regist.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/regist.html",
    "<button ng-click=\"tabChange(0)\">新用户注册</button><button ng-click=\"tabChange(1)\">已有账户</button>\n" +
    "\n" +
    "<input class=\"form-control\" type=\"text\" placeholder=\"手机号\" name=\"phone\" ng-model=\"phone\" cs-focus autofocus required />\n" +
    "<input class=\"form-control\" ng-if=\"errcount>3\" type=\"text\" placeholder=\"图形验证码\" name=\"imgcode\" ng-model=\"imgcode\" cs-focus autofocus required />\n" +
    "<input class=\"form-control\" type=\"text\" placeholder=\"手机验证码\" name=\"msgcode\" ng-model=\"msgcode\" cs-focus autofocus required />\n" +
    "<input class=\"form-control\" ng-if=\"regtype==0\" type=\"password\" placeholder=\"密码\" name=\"psw\" ng-model=\"psw\" cs-focus autofocus required />\n" +
    "<input class=\"form-control\" ng-if=\"regtype==0\" type=\"password\" placeholder=\"交易密码\" name=\"tradepsw\" ng-model=\"tradepsw\" cs-focus autofocus required />\n" +
    "<input class=\"form-control\" ng-if=\"regtype==0\" type=\"text\" placeholder=\"推荐人手机号/邀请代码，如无可不填\" name=\"invitephone\" ng-model=\"invitephone\" cs-focus autofocus required />\n" +
    "<input type=\"checkbox\" name=\"recieve\" ng-model=\"recieve\" value=\"true\" ng-check=\"true\"/> 我已满18岁，已阅读并接受 服务协议\n" +
    "<button ng-click=\"singIn()\" ng-disabled=\"recieve\">注册并绑定</button>");
}]);
