<!-- 风险预警 -->
 <div class="head">
                     <img from="index" class="pre" src="images/pre.png" alt="">
                     <h1>风险预警</h1>
                     <a href="#" class="next"></a>
                 </div>
                 <div class="content">

                     <ul class="content_list">
                         <!--财务报表-->
                         <li>
                             <a href="#" class="desc">
                                 <img src="images/xtyx.png" alt="" class="icon">
                                 财务报表{{ if (it.CWBB) { }}<em class="yuan">{{=it.CWBB}}</em>{{  } }}<div class="list_next list_topright">
                                 <img src="images/a_right.png" alt="">
                             </div></a>
                         </li>
                         <!--财务指标-->
                         <li rel="li1"  class="hassub">
                             <a href="#" class="desc">
                                 <img src="images/cwzb.png" alt="" class="icon">
                                 财务指标{{ if (it.CWZB) { }}<em class="yuan">{{=it.CWZB}}</em>{{  } }}<div class="list_next list_topright">
                                 <img src="images/a_down.png" alt="" class="imgdown">
                                 <img src="images/a_top.png" alt="" class="imgtop">
                             </div></a>
                         </li>
                         <li to="fxyj_zhsl" name="li1" class="subli">
                             <a href="#fxyj_zhsl" class="desc">
                                 综合实力{{ if (it.FZHSL) { }}<em class="yuan">{{=it.FZHSL}}</em>{{  } }}<div class="list_next list_topright">
                                 <img src="images/a_right.png" alt="">
                             </div></a>
                         </li>
                         <li to="fxyj_zczl" name="li1"  class="subli">
                             <a href="#fxyj_zczl" class="desc">
                                 资产质量{{ if (it.FZCZL) { }}<em class="yuan">{{=it.FZCZL}}</em>{{  } }}<div class="list_next list_topright">
                                 <img src="images/a_right.png" alt="">
                             </div>
                             </a>
                         </li>
                         <li to="fxyj_xjll" name="li1"  class="subli">
                             <a href="#fxyj_xjll" class="desc">
                                 现金流量{{ if (it.FXJLL) { }}<em class="yuan">{{=it.FXJLL}}</em>{{  } }}<div class="list_next list_topright">
                                 <img src="images/a_right.png" alt="">
                             </div>
                             </a>
                         </li>
                         <!--财务实时监控-->
                         <li rel="li2" class="hassub">
                             <a href="#" class="desc">
                                 <img src="images/cwssjk.png" alt="" class="icon">
                                 财务实时监控<div class="list_next list_topright">
                                 <img src="images/a_down.png" alt="" class="imgdown">
                                 <img src="images/a_top.png" alt="" class="imgtop">
                             </div></a>
                         </li>
                         <li name="li2" class="subli">
                             <a href="#" class="desc">
                                 数据未上传<div class="list_next list_topright">
                                 <img src="images/a_right.png" alt="">
                             </div></a>
                         </li>
                         <li name="li2"  class="subli">
                             <a href="#" class="desc">
                                 监控中断<div class="list_next list_topright">
                                 <img src="images/a_right.png" alt="">
                             </div>
                             </a>
                         </li>
                         <!--网络巡检-->
                         <li>
                             <a href="#" class="desc">
                                 <img src="images/wlxj.png" alt="" class="icon">
                                 网络巡检{{ if (it.WLXJ) { }}<em class="yuan">{{=it.WLXJ}}</em>{{  } }}<div class="list_next list_topright">
                                 <img src="images/a_right.png" alt="">
                             </div></a>
                         </li>
                         <!--系统运行-->
                         <li>
                             <a href="#" class="desc">
                                 <img src="images/xtyx.png" alt="" class="icon">
                                 系统运行<em class="yuan yuan1">!</em><div class="list_next list_topright">
                                 <img src="images/a_right.png" alt="">
                             </div></a>
                         </li>
                     </ul>
                 </div>