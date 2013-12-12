<!-- 资产负债表 -->
 <div class="head">
                    <img from="cwbb" class="pre" src="images/pre.png" alt="">
                    <h1>资产负债表</h1>
                    <a href="#" class="next"></a>
                </div>
                <div class="content m_con">
                    <!-- 内容头部 -->
                    <div class="content_title">
                        <p>会计年度: <select><option value="">2013</option></select> 年 <select><option value="">12</option></select> 月  <span>单位:人民币元</span></p>
                    </div>
                    <div class="subitem">
                        <!--资产-->
                        <div to="zcfz_sub!/fid={{=it[0].typeid}}" class="f1 qmcenter">
                            <div class="item_desc item_desc_w100">
                                <img src="images/zcicon.png" alt=""/>
                                <p>{{=it[0].truename}}</p>
                                <p>{{=it[0].Money}}</p>
                            </div>
                        </div>
                        <!--负债-->
                        <div to="zcfz_sub!/fid={{=it[1].typeid}}" class="r1 qmcenter">
                            <div class="item_desc item_desc_w100">
                                <img src="images/fzicon.png" alt=""/>
                                <p>{{=it[1].truename}}</p>
                                <p>{{=it[1].Money}}</p>
                            </div>
                        </div>
                        <!--所有者权益-->
                        <div to="zcfz_sub!/fid={{=it[2].typeid}}" class="r1 r2 qmcenter">
                            <div class="item_desc item_desc_w100">
                                <img src="images/syzqyicon.png" alt=""/>
                                <p>{{=it[2].truename}}</p>
                                <p>{{=it[2].Money}}</p>
                            </div>
                        </div>
                    </div>

                </div>