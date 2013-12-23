<!-- 资产负债表 -->
 <div class="head">
                    <img from="cwbb" class="pre" src="images/pre.png" alt="">
                    <h1>资产负债表</h1>
                    <a href="#" class="next"></a>
                </div>
                <div class="content m_con">
                    <!-- 内容头部 -->
                    <div class="content_title">
                        <p>会计年度: <select class="selyear">
                            <option value="2013">2013</option>
                                        <option value="2012">2012</option>
                                        <option value="2011">2011</option>
                                      </select> 年 <select class="selmonth">
                                      <option value="12">12</option>
                                      <option value="11">11</option>
                                      <option value="10">10</option>
                                      <option value="9">9</option>
                    </select> 月  <span>单位:人民币元</span></p>
                    </div>
                    <div class="subitem" id="container_tmpl">
                        <!--资产-->
                        <div to="zcfz_sub!/fid={{=it[0].typeid}}" class="f1 qmcenter">
                            <div class="item_desc item_desc_w100">
                                <img src="images/zcicon.png" alt=""/>
                                <p>{{=it[0].Money}}</p>
                            </div>
                            <div class="item_desc_name">
                                 <p>{{=it[0].truename}}</p>
                            </div>
                        </div>
                        <!--负债-->
                        <div to="zcfz_sub!/fid={{=it[1].typeid}}" class="r1 qmcenter">
                            <div class="item_desc item_desc_w100">
                                <img src="images/fzicon.png" alt=""/>
                                <p>{{=it[1].Money}}</p>
                            </div>
                             <div class="item_desc_name">
                                 <p>{{=it[1].truename}}</p>
                            </div>
                        </div>
                        <!--所有者权益-->
                        <div to="zcfz_sub!/fid={{=it[2].typeid}}" class="r1 r2 qmcenter">
                            <div class="item_desc item_desc_w100">
                                <img src="images/syzqyicon.png" alt=""/>
                                <p>{{=it[2].Money}}</p>
                            </div>
                             <div class="item_desc_name">
                                 <p>{{=it[2].truename}}</p>
                            </div>
                        </div>
                    </div>

                </div>