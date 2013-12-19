<!-- 我的项目--在投项目--申请委托监控在投项目 -->
 <div class="head bgRed">
     <img from="{{=it.gohash}}" class="pre" src="images/pre.png" alt="">
     <h1>{{=it.sqtypedesc}}申请委托</h1>
     <img class="pre" id="img_setting" src="images/top_menu.png" alt="" />
</div>
<div class="content">
    <!-- 选择监控类型 -->
    <h3 class="e-contentList">选择监控类型</h3>
      <div class="contentform nopdform" id="qm_wrapper">
           <div class="qm_scroll">
                <ul class="content_list" id="sqwt_tp">
              </ul>
               
               <div class="e-tijiao">
                    <a href="#" class="e-tj"  id="savesqwt" >提交</a>
               </div>
     </div>
   </div>
      
</div>

<!-- 提示 -->
<div class="popwin" id="pop1">
    <p class="e-pgreen">委托成功!</p>
    <p>请到[已委托监控项目]查看状态。
       向企业发送监控邀请邮件，可帮助尽
       早开始对该企业的监控！</p>
    <a href="#" class="pop_button pop_return e-acBG">返回</a>
</div>