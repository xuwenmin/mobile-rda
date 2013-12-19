<!-- 用户登录或者注册页面 -->
 <div class="head bgRed">
                    <a href="#" class="pre"></a>
                     <h1>RDA实时信用管理专家</h1>
                     <a href="#" class="next"></a>
                 </div>
                 <div class="content">
                     <div class="loginfrm logintab">
                         <div class="tabdiv RedL">
                             <a href="#">用户注册</a>
                             <a href="#" class="active">会员登录</a>
                         </div>
                     </div>
                     <div class="div_register hide">
                         <div class="loginfrm">
                             <div class="login_inputline lred">
                                 <label >企业名称:</label>
                                 <input type="text" placeholder="公司全称" id="etpname" />
                             </div>
                             <div class="login_inputline lred hide">
                                 <label >企业类型:</label>
                                 <div class="tabtype" id="registertype">
                                     <a href="#" data-type="1">企业</a>
                                     <a href="#" class="active" data-type="3">投资银行</a>
                                 </div>
                             </div>
                             <div class="login_inputline lred">
                                 <label >用户名:</label>
                                 <input type="text" id="reg_username" placeholder="邮箱/手机号"/>
                             </div>
                             <div class="login_inputline lred">
                                 <label >密码:</label>
                                 <input type="password" id="reg_pwd" placeholder="6-20个字符或字母组合"/>
                             </div>
                             <div class="login_inputline lred">
                                 <label >确认密码:</label>
                                 <input type="password" id="reg_reppwd" placeholder="6-20个字符或字母组合"/>
                             </div>
                             <a href="#" class="a_register" >立即注册</a>
                     </div>
                     </div>
                     <div class="div_login">
                         <div class="loginfrm">

                             <div class="login_inputline lred">
                                 <label >用户名:</label>
                                 <input type="text" id="log_username" placeholder="邮箱/手机号"/>
                             </div>
                             <div class="login_inputline lred">
                                 <label >密码:</label>
                                 <input type="password" id="log_pwd" placeholder="6-20个字符或者字母组合"/>
                             </div>
                             <div class="login_inputline lred">
                                 <div class="login_f1">
                                     <div class="divwhite" id="div_autologin">
                                         <img class="hide" src="images/select.png" alt=""/>
                                     </div>
                                     <p>下次自动登录</p>
                                 </div>
                                 <div class="login_r1 hide">
                                     <p>忘记密码?</p>
                                 </div>

                             </div>
                             <a href="#" class="a_login Cred" id="but_login">登录</a>
                         </div>
                         <hr class="hide">
                         <div class="loginfrm hide">
                             <div class="login_inputline lred">
                                 <p>使用其它账户登录</p>
                             </div>
                             <a href="#" class="a_login a_login_other">信促会账户登录</a>
                         </div>
                     </div>
                 </div>