angular.module('templates', ['common/templates/layout.partials.html', 'modules/brokerfront/templates/index.html', 'modules/brokerfront/templates/invest.detail.html', 'modules/brokerfront/templates/invest.list.html', 'modules/brokerfront/templates/invite.html', 'modules/brokerfront/templates/invite.list.html', 'modules/brokerfront/templates/login.html', 'modules/brokerfront/templates/user.html']);

angular.module("common/templates/layout.partials.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/layout.partials.html",
    "<div ui-view class=\"bigbox\"></div>\n" +
    "<div id=\"errBox\">\n" +
    "	<div id=\"errBoxShadow\"></div>\n" +
    "	<div id=\"errBoxText\"></div>\n" +
    "</div>");
}]);

angular.module("modules/brokerfront/templates/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/index.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "	<div class=\"fanhui\"  ui-sref=\"brokerfront.login\"><span></span></div>\n" +
    "	<h5>首页</h5>\n" +
    "    <div class=\"set\" ui-sref=\"brokerfront.user\">\n" +
    "    	<span></span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"textCenter yq_nub\">\n" +
    "	<p>\n" +
    "		<b>{{count}}</b>人\n" +
    "	</p>\n" +
    "	<div>累计邀请人数</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"textCenter\">\n" +
    "	<button class=\"redButton autoSize editBt\" ui-sref=\"brokerfront.invite\">邀请客户</button>\n" +
    "	<button class=\"redButton autoSize editBt\" ui-sref=\"brokerfront.invitelist\">查看邀请列表</button>\n" +
    "	<button class=\"redButton autoSize editBt\" ui-sref=\"brokerfront.investlist\">查看投资列表</button>\n" +
    "</div>");
}]);

angular.module("modules/brokerfront/templates/invest.detail.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/invest.detail.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "    <div class=\"fanhui\" ui-sref=\"brokerfront.investlist\"><span></span></div>\n" +
    "    <h5>客户投资详细</h5>\n" +
    "</div>\n" +
    "<div class=\"textCenter user_list\">\n" +
    "    <table width=\"90%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "        <tbody>\n" +
    "            <tr style=\"padding-right: 5%; padding-left: 5%;\">\n" +
    "                <th align=\"center\" scope=\"col\" width=\"15%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    <label>日期</label>\n" +
    "                </th>\n" +
    "                <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    <input style=\"width:80%\" type=\"date\" ng-model=\"InvestTimeBegin\" class=\"ng-pristine ng-valid\">\n" +
    "                </th>\n" +
    "               <th align=\"center\" scope=\"col\" width=\"10%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    <label>--</label>\n" +
    "                </th>\n" +
    "                <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    <input style=\"width:80%\" type=\"date\" ng-model=\"InvestTimeEnd\" class=\"ng-pristine ng-valid\">\n" +
    "                </th>\n" +
    "            </tr>\n" +
    "            <tr style=\"padding-right: 5%; padding-left: 5%;\">\n" +
    "                <th align=\"center\" scope=\"col\" width=\"15%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    {{name}}\n" +
    "                </th>\n" +
    "                <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    {{mobile}}\n" +
    "                </th>\n" +
    "               <th align=\"center\" scope=\"col\" width=\"10%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                </th>\n" +
    "                <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                    <button class=\"redButton  \" style=\"width:80%;height: 20px;line-height: 20px;\" ng-click=\"detailList()\">筛选</button>\n" +
    "                </th>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "    <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "        <tbody>\n" +
    "            <tr>\n" +
    "                <th align=\"center\" scope=\"col\" width=\"20%\"><a ng-click=\"predicate = 'name'; reverse=!reverse\">ID</a>\n" +
    "\n" +
    "                </th>\n" +
    "                <th align=\"center\" scope=\"col\" width=\"26%\"><a href=\"\" ng-click=\"predicate = 'mobile'; reverse=!reverse\">期限</a>\n" +
    "\n" +
    "                </th>\n" +
    "                <th align=\"center\" scope=\"col\" width=\"24%\"><a href=\"\" ng-click=\"predicate = 'invest_at'; reverse=!reverse\">投资时间</a>\n" +
    "\n" +
    "                </th>\n" +
    "                <th align=\"center\" scope=\"col\" width=\"14%\"><a href=\"\" ng-click=\"predicate = 'status'; reverse=!reverse\">投资金额</a>\n" +
    "\n" +
    "                </th>\n" +
    "            </tr>\n" +
    "            <tr ng-repeat=\"userInvest in list\" class=\"ng-scope\">\n" +
    "                <td><a href=\"http://www.duomeidai.com/borrowDetail.action?id={{userInvest.borrowId}}\" target=\"blank\"><span ng-bind=\"userInvest.borrowId\" class=\"ng-binding\"></span></a>\n" +
    "                </td>\n" +
    "                <td class=\"ng-binding\">{{userInvest.deadline}}个月</td>\n" +
    "                <td class=\"ng-binding\">{{userInvest.investTime}}</td>\n" +
    "                <td class=\"ng-binding\">{{userInvest.investAmount}}</td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "    <a ng-if=\"total<=page\" style=\"padding-bottom: 35px;\" href=\"javascript:\" class=\"more ng-binding\" >木有更多投资啦</a>\n" +
    "    <a ng-if=\"total>page\" href=\"javascript:\" style=\"padding-bottom: 35px;\" class=\"more ng-binding\" ng-click=\"displayMore()\">点击加载更多</a>\n" +
    "	<div style=\"float: right; width: 100%; height: auto\">\n" +
    "		<div class=\"textCenter\" style=\"float: right; border-top: 3px; width: 100%; position: fixed; left: auto; right: auto; bottom: 10px; _position: absolute; _top: expression(document.documentElement.clientHeight +   document.documentElement.scrollTop -   this.offsetHeight);\">\n" +
    "			<span style=\"float: right; margin-right: 20px; display: block; font-weight: bold;\" class=\"ng-binding\">{{baseInfo.investCountS}}笔/{{baseInfo.investSumS}}元</span>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/brokerfront/templates/invest.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/invest.list.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "    <div class=\"fanhui\"  ui-sref=\"brokerfront.index\"><span></span></div>\n" +
    "    <h5>投资列表</h5>\n" +
    "</div>\n" +
    "<div class=\"textCenter user_list\">\n" +
    "  <table width=\"90%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "    <tbody>\n" +
    "        <tr style=\"padding-right: 5%; padding-left: 5%;\">\n" +
    "            <th align=\"center\" scope=\"col\" width=\"15%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <label>日期</label>\n" +
    "            </th>\n" +
    "            <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <input style=\"width:80%\" type=\"date\" ng-model=\"InvestTimeBegin\" class=\"ng-pristine ng-valid\">\n" +
    "            </th>\n" +
    "           <th align=\"center\" scope=\"col\" width=\"10%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <label>--</label>\n" +
    "            </th>\n" +
    "            <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <input style=\"width:80%\" type=\"date\" ng-model=\"InvestTimeEnd\" class=\"ng-pristine ng-valid\">\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "        <tr style=\"padding-right: 5%; padding-left: 5%;\">\n" +
    "            <th align=\"center\" scope=\"col\" width=\"15%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <label style=\"width:18%\">手机</label>\n" +
    "            </th>\n" +
    "            <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <input type=\"tel\" style=\"width:80%;height: 20px;line-height: 20px;\" name=\"mobile\" id=\"mobile\" ng-model=\"mobile\" placeholder=\"请输入客户手机号\" class=\"ng-pristine ng-valid\">\n" +
    "            </th>\n" +
    "           <th align=\"center\" scope=\"col\" width=\"10%\" style=\"background-color: white;border-width: 0px;\">\n" +
    "            </th>\n" +
    "            <th align=\"left\" scope=\"col\" style=\"background-color: white;border-width: 0px;\">\n" +
    "                <!-- <input type=\"button\" style=\"width:80%;height: 20px;\" value=\"筛选 \" ng-click=\"search()\"> -->\n" +
    "                <button class=\"redButton\" style=\"width:80%;height: 20px;line-height: 20px;\" ng-click=\"investList()\">筛选</button>\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "                   \n" +
    " <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "     <tbody>\n" +
    "         <tr>\n" +
    "             <th align=\"center\" scope=\"col\" width=\"20%\"><a href=\"\" ng-click=\"predicate = 'name'; reverse=!reverse\">姓名</a>\n" +
    "\n" +
    "             </th>\n" +
    "             <th align=\"center\" scope=\"col\" width=\"26%\"><a href=\"\" ng-click=\"predicate = 'mobile'; reverse=!reverse\">手机号</a>\n" +
    "\n" +
    "             </th>\n" +
    "             <th align=\"center\" scope=\"col\" width=\"14%\"><a href=\"\" ng-click=\"predicate = 'status'; reverse=!reverse\">投资总金额</a>\n" +
    "\n" +
    "             </th>\n" +
    "             <th align=\"center\" scope=\"col\" width=\"24%\"><a href=\"\" ng-click=\"predicate = 'invest_at'; reverse=!reverse\">投资总笔数</a>\n" +
    "\n" +
    "             </th>\n" +
    "         </tr>\n" +
    "         <tr ng-repeat=\"userInvest in list\" class=\"ng-scope\">\n" +
    "             <td><a ng-click=\"choose(userInvest)\"><span class=\"ng-binding\">{{userInvest.realName}}</span></a>\n" +
    "\n" +
    "             </td>\n" +
    "             <td class=\"ng-binding\">{{userInvest.cellPhone}}</td>\n" +
    "             <td class=\"ng-binding\">{{userInvest.investSum}}</td>\n" +
    "             <td class=\"ng-binding\">{{userInvest.investCount}}</td>\n" +
    "         </tr>\n" +
    "     </tbody>\n" +
    " </table>\n" +
    "  <div>\n" +
    "    <a ng-if=\"total<=page\" style=\"padding-bottom: 35px;\" href=\"javascript:\" class=\"more ng-binding\" >木有更多投资啦</a>\n" +
    "    <a ng-if=\"total>page\" href=\"javascript:\" style=\"padding-bottom: 35px;\" class=\"more ng-binding\" ng-click=\"displayMore()\">点击加载更多</a>\n" +
    "	</div>\n" +
    "	<div style=\"float: right; width: 100%; height: auto\">\n" +
    "		<div class=\"textCenter\" style=\"float: right; border-top: 3px; width: 100%; position: fixed; left: auto; right: auto; bottom: 10px; _position: absolute; _top: expression(document.documentElement.clientHeight +   document.documentElement.scrollTop -   this.offsetHeight);\">\n" +
    "			<span style=\"float: right; margin-right: 20px; display: block; font-weight: bold;\" class=\"ng-binding\">{{baseInfo.investorCountS}}人/{{baseInfo.investCountS}}笔/{{baseInfo.investSumS}}元</span>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<!-- \n" +
    "昨日：投资列表、预约列表需要修改                  \n" +
    "今日：首页累计邀请人数    和预约列表的修改 -->");
}]);

angular.module("modules/brokerfront/templates/invite.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/invite.html",
    "<div id=\"ReserveApp\" class=\"ng-scope\">\n" +
    "	<div class=\"webName autoSize textCenter grayButton\">\n" +
    "    	<div class=\"fanhui\"  ui-sref=\"brokerfront.index\"><span></span></div>\n" +
    "    	<h5>预约客户</h5>\n" +
    "        <div class=\"set\" style=\"display:none;\"><span></span></div>\n" +
    "    </div>\n" +
    "    <div class=\"textCenter logo_2\"></div>\n" +
    "	<ul class=\"nav autoSize\">\n" +
    "        <li><i></i><span>姓&nbsp;&nbsp;名：</span><input type=\"text\" class=\"input8 ng-pristine\" ng-model=\"name\" placeholder=\"请输入您要预约的客户姓名\" required=\"\" ng-maxlength=\"12\"></li>\n" +
    "		<li><i class=\"phone_bg\"></i><span>手&nbsp;&nbsp;机：</span><input type=\"tel\" class=\"input8 ng-pristine\" ng-model=\"mobile\"  ng-pattern=\"/^\\d+$/\" placeholder=\"请输入客户手机号\" required=\"\"></li>\n" +
    "	</ul>\n" +
    "	<div class=\"textCenter\"><button class=\"redButton autoSize editBt\" ng-click=\"invite()\">确认预约</button></div>\n" +
    "    \n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/brokerfront/templates/invite.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/invite.list.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "  	<div class=\"fanhui\" ui-sref=\"brokerfront.index\"><span></span></div>\n" +
    "  	<h5>预约列表</h5>\n" +
    "    <div class=\"add_user\" ui-sref=\"brokerfront.invite\"><span></span></div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"textCenter user_list\">\n" +
    "    <ul>\n" +
    "      <li ng-class=\"{this:type==''}\" ng-click=\"invitelist('')\" >全部</li>\n" +
    "      <li ng-class=\"{this:type==1}\" ng-click=\"invitelist(1)\" >预约</li>\n" +
    "      <li ng-class=\"{this:type==2}\" ng-click=\"invitelist(2)\" >成功</li>\n" +
    "      <li ng-class=\"{this:type==3}\" ng-click=\"invitelist(3)\" >失败</li>\n" +
    "    </ul>\n" +
    "    <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
    "      <tr>\n" +
    "        <th align=\"center\" scope=\"col\" width=\"20%\">\n" +
    "          姓名</th>\n" +
    "        <th align=\"center\" scope=\"col\" width=\"26%\">\n" +
    "          手机号</th>\n" +
    "        <th align=\"center\" scope=\"col\" width=\"14%\">\n" +
    "          状态</th>\n" +
    "        <th align=\"center\" scope=\"col\" width=\"24%\">\n" +
    "          操作时间</th>\n" +
    "        <th align=\"center\" scope=\"col\" width=\"16%\" class=\"last\">\n" +
    "          剩余时间</th>\n" +
    "      </tr>\n" +
    "      <tr ng-repeat=\"userReserve in list\" class=\"ng-scope\">\n" +
    "        <td>{{userReserve.name}}</td>\n" +
    "        <td>{{userReserve.mobile}}</td>\n" +
    "        <td>{{userReserve.status|invitefilter}}</td>\n" +
    "        <td>{{userReserve.updateAt|date:'yyyy-MM-dd HH:mm'}}</td>\n" +
    "        <td>{{userReserve.deadline}}</td>\n" +
    "      </tr>\n" +
    "  </table>\n" +
    "    <a class=\"more ng-binding\" ng-click=\"displayMore()\">查看更多</a>\n" +
    "</div>");
}]);

angular.module("modules/brokerfront/templates/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/login.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "	<div class=\"fanhui\"><span></span></div>\n" +
    "	<h5>绑定账号</h5>\n" +
    "    <div class=\"set\" style=\"display:none;\"><span></span></div>\n" +
    "</div>\n" +
    "<div class=\"textCenter logo_1\"></div>\n" +
    "<ul class=\"nav autoSize\">\n" +
    "    <li><i></i><span>用户名：</span>\n" +
    "    	<input type=\"text\" ng-model=\"loginName\" class=\"input8 ng-valid-maxlength ng-dirty ng-valid ng-valid-required\" name=\"name\" id=\"name\" placeholder=\"请输入您的登录密码\" required ng-maxlength=\"12\"></li>\n" +
    "	<li><i class=\"pawodbg\"></i><span>密&nbsp;&nbsp;&nbsp;码：</span>\n" +
    "		<input type=\"password\"  ng-model=\"passWord\" class=\"input8 ng-vaild-maxlength ng-valid ng-valid-required\" name=\"pwd\" id=\"pwd\" ng-model=\"user.pwd\" placeholder=\"请输入密码，至少6位数\"required ng-maxlength=\"12\"></li>\n" +
    "</ul>\n" +
    "<div class=\"textCenter\">\n" +
    "	<button class=\"redButton autoSize editBt\" ng-click=\"login()\">确认绑定</button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("modules/brokerfront/templates/user.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/brokerfront/templates/user.html",
    "<div class=\"webName autoSize textCenter grayButton\">\n" +
    "	<div class=\"fanhui\"><span></span></div>\n" +
    "	<h5>个人中心</h5>\n" +
    "    <div class=\"set\" style=\"display:none;\"><span></span></div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"textCenter user_hd\">\n" +
    "    <div class=\"head_bg\"><img src=\"images/user_head_mid.jpg\" /></div>\n" +
    "</div>\n" +
    "\n" +
    "<ul class=\"nav autoSize\">\n" +
    "    <li><span class=\"user_infor\">用户名：</span><p class=\"input8 left\" ng-click=\"user()\">XXXX</p></li>\n" +
    "	<li><span class=\"user_infor\">姓名：</span><p class=\"input8 left\" ng-click=\"name()\">李**</p></li>\n" +
    "    <li><span class=\"user_infor\">手机号：</span><p class=\"input8 left\" ng-click=\"mobile()\">13234567890</p></li>\n" +
    "    <li><span class=\"paswd_xgbut\" ng-click=\"password()\">修改密码</span></li>\n" +
    "</ul>");
}]);
