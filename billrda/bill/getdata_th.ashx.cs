using System;
using System.Collections.Generic;
using System.Web;
using System.Security.Cryptography;
using System.Text;
using billrda.dal;
namespace billrda.bill
{
    /// <summary>
    /// getdata 的摘要说明
    /// </summary>
    public class getdata_th : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/json";
            //获取请求的方法名
            string method = context.Request["action"];         
            switch (method) {
                //查询风险预警父级下面的子项数据
                case "Index_OtherFinancial_Data":
                    Index_OtherFinancial_Data(context);
                    break;
                //用户登录
                case "USER_Login":
                    USER_Login(context);
                    break;
                //用户注册
                case "USER_Register":
                    USER_Register(context);
                    break;
                //在投项目列表
                case "ZTProject_List":
                    ZTProject_List(context);
                    break;
                //结项目列表数据
                case "JXProject_List":
                    JXProject_List(context);
                    break;
                //已关注项目列表
                case "YIGZProject_List":
                    YIGZProject_List(context);
                    break;
                //申请委托页面选择监控时长初始化
                case "JKSCInit":
                    JKSCInit(context);
                    break;
                //申请委托操作
                case "THGZ_Ope":
                    THGZ_Ope(context);
                    break;
                //投行预警中心首页
                case "Investmentbank_Index_Data":
                    Investmentbank_Index_Data(context);
                    break;
                //风险预警,财务报表
                case "Investmentbank_CWBB_Data":
                    Investmentbank_CWBB_Data(context);
                    break;
                //挑选项目页面挑选条件初始化 *
                case "TXProCondiInit":
                    TXProCondiInit(context);
                    break;
                //挑选项目页面数据查询 
                case "TXProject_List":
                    TXProject_List(context);
                    break;
                //申请委托页面选择监控类型初始化
                case "SZWTInit":
                    SZWTInit(context);
                    break;
                //根据项目编号获得项目信息
                case "gettrading":
                    gettrading(context);
                    break;
                //根据企业编号获得项目信息
                case "getenterprise":
                    getenterprise(context);
                    break;
                //付费
                case "FuFei":
                    FuFei(context);
                    break;
                //添加到关注项目列表
                case "THGZ_Add":
                    THGZ_Add(context);
                    break;
                //是否付费
                case "IsFuFei":
                    IsFuFei(context);
                    break;
                //修改在投项目或关注项目某条记录委托者
                case "Add_WTZ":
                    Add_WTZ(context);
                    break;
            }
            context.Response.Write("");
        }
        /// <summary>
        /// 根据项目编号获得项目信息
        /// {EquityId:"0caa8e82-947a-4f52-bc6d-e21d8fa13631"}
        /// </summary>
        /// <param name="context"></param>
        public void gettrading(HttpContext context) {
            string result = string.Empty;
            string json = string.Empty;
            string EquityId = context.Request["proid"];
            json = "{\"EquityId\":\"" + EquityId + "\"}";
            result = rdaws_th.gettrading(json);
            context.Response.Write(result);   
        }
        /// <summary>
        /// 根据企业编号获得项目信息
        /// {EgroupId:"IBD101"}
        /// </summary>
        /// <param name="context"></param>
        public void getenterprise(HttpContext context) {
            string result = string.Empty;
            string json = string.Empty;
            string EgroupId = context.Request["e_ibdid"];
            json = "{\"EgroupId\":\"" + EgroupId + "\"}";
            result = rdaws_th.getenterprise(json);
            context.Response.Write(result);   
        }
        /// <summary>
        /// 付费
        /// {GroupId:"IBD140",EgroupId:"IBD101",EquityId:"0caa8e82-947a-4f52-bc6d-e21d8fa13631"}
        /// </summary>
        /// <param name="context"></param>
        public void FuFei(HttpContext context) {
            string result = string.Empty;
            string json = string.Empty;
            string EquityId = context.Request["proid"];
            string GroupId = context.Request["ibdid"];
            string EgroupId = context.Request["e_ibdid"];
            json = "{\"GroupId\":\"" + GroupId + "\",\"EgroupId\":\"" + EgroupId + "\",\"EquityId\":\"" + EquityId + "\"}";
            result = rdaws_th.FuFei(json);
            context.Response.Write(result);  
        }
        /// <summary>
        /// 添加到关注项目列表
        /// {GroupId:"IBD140",EgroupId:"IBD101",EquityId:"0caa8e82-947a-4f52-bc6d-e21d8fa13631",UserId:"1099"}
        /// </summary>
        /// <param name="context"></param>
        public void THGZ_Add(HttpContext context) {
            string result = string.Empty;
            string json = string.Empty;
            string EquityId = context.Request["proid"];
            string GroupId = context.Request["ibdid"];
            string userid = context.Request["userid"];
            string EgroupId = context.Request["e_ibdid"];
            json = "{\"GroupId\":\"" + GroupId + "\",\"EgroupId\":\"" + EgroupId + "\",\"EquityId\":\"" + EquityId + "\",\"UserId\":\"" + userid + "\"}";
            result = rdaws_th.THGZ_Add(json);
            context.Response.Write(result); 
        }
        /// <summary>
        /// 是否付费
        /// {GroupId:"IBD140",EquityId:"0caa8e82-947a-4f52-bc6d-e21d8fa13631"}
        /// </summary>
        /// <param name="context"></param>
        public void IsFuFei(HttpContext context) {
            string result = string.Empty;
            string json = string.Empty;
            string EquityId = context.Request["proid"];
            string GroupId = context.Request["ibdid"];
            json = "{\"GroupId\":\"" + GroupId + "\",\"EquityId\":\"" + EquityId + "\"}";
            result = rdaws_th.IsFuFei(json);
            context.Response.Write(result); 
        }
        /// <summary>
        /// 修改在投项目或关注项目某条记录委托者
        /// {QF:"zt","UserId":"1099",EquityId:"0caa8e82-947a-4f52-bc6d-e21d8fa13631"}
        /// </summary>
        /// <param name="context"></param>
        public void Add_WTZ(HttpContext context) {
            string result = string.Empty;
            string json = string.Empty;
            string QF = context.Request["qf"];
            string EquityId = context.Request["proid"];
            string userid = context.Request["userid"];
            json = "{\"QF\":\"" + QF + "\",\"UserId\":\"" + userid + "\",\"EquityId\":\"" + EquityId + "\"}";
            result = rdaws_th.Add_WTZ(json);
            context.Response.Write(result); 
        }

        /// <summary>
        /// 申请委托页面选择监控类型初始化
        /// </summary>
        /// <returns></returns>
        public void SZWTInit(HttpContext context)
        {
            string result = string.Empty;
            result = rdaws_th.SZWTInit();
            context.Response.Write(result);
        }
        /// <summary>
        ///挑选项目页面数据查询 
        ///{GroupId:"IBD140",RZLX:"",SSHY:"",RZJE:"",BZ:"",RZSC:""}
        /// </summary>
        /// <param name="context"></param>
        public void TXProject_List(HttpContext context) {
            string result = string.Empty;
            string json = string.Empty;
            string ibdid = context.Request["ibdid"];
            string RZLX = context.Request["RZLX"];
            string SSHY = context.Request["SSHY"];
            string RZJE = context.Request["RZJE"];
            string BZ = context.Request["BZ"];
            string RZSC = context.Request["RZSC"];
            json = "{\"GroupId\":\"" + ibdid + "\",\"RZLX\":\"" + RZLX + "\",\"SSHY\":\"" + SSHY + "\",\"RZJE\":\"" + RZJE + "\",\"BZ\":\"" + BZ + "\",\"RZSC\":\"" + RZSC + "\"}";
            result = rdaws_th.TXProject_List(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 挑选项目页面挑选条件初始化
        /// {"EnumName":"所属行业"}
        /// </summary>
        /// <param name="context"></param>
        public void TXProCondiInit(HttpContext context)
        {
            string result = string.Empty;
            string json = string.Empty;
            string enumdesc = HttpUtility.UrlDecode(context.Request["enumname"]);
            json = "{\"EnumName\":\"" + enumdesc + "\"}";
            result = rdaws_th.TXProCondiInit(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 获取风险预警,财务报表相关的信息
        ///{\"GroupID\":\"IBD116\",\"Flag\":\"0\"}
        ///GroupID：企业Id,Flag：0 - 资产负债 1 - 现金流量 2 - 利润
        /// </summary>
        /// <param name="context"></param>
        public void Investmentbank_CWBB_Data(HttpContext context)
        {

            string result = string.Empty;
            string flag = context.Request["flag"];
            string ibdid = context.Request["ibdid"];
            string json = "{\"GroupID\":\"" + ibdid + "\",\"Flag\":\"" + flag + "\"}";
            result = rdaws_th.Investmentbank_CWBB_Data(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 投行预警中心首页
        /// {'GroupID':'IBD001','UserID':1001'}
        /// </summary>
        /// <param name="context"></param>
        public void Investmentbank_Index_Data(HttpContext context) {
            string result = string.Empty;
            string ibdid = context.Request["ibdid"];
            string userid = context.Request["userid"];
            string json = "{\"GroupID\":\"" + ibdid + "\",\"UserID\":\"" + userid + "\"}";
            result = rdaws_th.Investmentbank_Index_Data(json);
            context.Response.Write(result); 
        }
        /// <summary>
        /// 申请委托操作
        /// {'QF':'zt','EquityId':'7e287b07-b3ab-4c25-b020-37d1d6d8b1a2','TYPS':'1;2;3;4','SC':'6','UserId':'1099'}
        /// </summary>
        /// <param name="context"></param>
        public void THGZ_Ope(HttpContext context) {
            string result = string.Empty;
            string json = string.Empty;
            string QF = context.Request["qf"];
            string EquityId = context.Request["proid"];
            string TYPS = context.Request["typs"];
            string SC = context.Request["sc"];
            string userid = context.Request["userid"];
            json = "{'QF':'" + QF + "','EquityId':'" + EquityId + "','TYPS':'" + TYPS + "','SC':'" + SC + "','UserId':'" + userid + "'}";
            result = rdaws_th.THGZ_Ope(json);
            context.Response.Write(result); 
        }
        /// <summary>
        /// 申请委托页面选择监控类型初始化
        /// </summary>
        /// <param name="context"></param>
        public void JKSCInit(HttpContext context) {
            string result = string.Empty;
            result = rdaws_th.JKSCInit();
            context.Response.Write(result);
        }
        /// <summary>
        /// 获取已关注项目列表数据
        /// {"GroupId":"IBD140","UserId":"1099"}
        /// </summary>
        /// <param name="context"></param>
        public void YIGZProject_List(HttpContext context) {
            string result = string.Empty;
            string ibdid = context.Request["ibdid"];
            string userid = context.Request["userid"];
            string json = "{\"GroupId\":\"" + ibdid + "\",\"UserId\":\"" + userid + "\"}";
            result = rdaws_th.YIGZProject_List(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 获取结项目列表数据
        /// </summary>
        /// <param name="context"></param>
        public void JXProject_List(HttpContext context) {
            string result = string.Empty;
            string ibdid = context.Request["ibdid"];
            string userid = context.Request["userid"];
            string json = "{\"GroupId\":\"" + ibdid + "\",\"UserId\":\"" + userid + "\"}";
            result = rdaws_th.JXProject_List(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 获取在投项目列表数据
        /// 增加了一个userid 20131220
        /// {"GroupId":"IBD140"}
        /// </summary>
        /// <param name="context"></param>
        public void ZTProject_List(HttpContext context) {
            string result = string.Empty;
            string ibdid = context.Request["ibdid"];
            string userid = context.Request["userid"];
            string json = "{\"GroupId\":\"" + ibdid + "\",\"UserId\":\"" + userid + "\"}";
            result = rdaws_th.ZTProject_List(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 用户登录接口.by xuwm on 20131209
        /// //{'UserName':'rdatest31','Password':'e10adc3949ba59abbe56e057f20f883e'}
        /// </summary>
        /// <param name="context"></param>
        public void USER_Login(HttpContext context) {
            
            string result = string.Empty;
            string username = HttpUtility.UrlDecode(context.Request["username"]);
            string pwd = NewMD5(HttpUtility.UrlDecode(context.Request["pwd"]),"utf-8").ToLower();
            string json = "{\"UserName\":\"" + username + "\",\"Password\":\""+pwd+"\"}";
            result = rdaws_th.USER_Login(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 用户注册接口.by xuwm on 20131209
        ///  //{'UserName':'rdatest31','Password':'e10adc3949ba59abbe56e057f20f883e','EtpName':'etp_rdatest31','Type':'1'} 
        /// </summary>
        /// <param name="context"></param>
        public void USER_Register(HttpContext context) {
           
            string result = string.Empty;
            string username = HttpUtility.UrlDecode(context.Request["username"]);
            string pwd = NewMD5(HttpUtility.UrlDecode(context.Request["pwd"]),"utf-8").ToLower();
            string etpname = HttpUtility.UrlDecode(context.Request["etpname"]);
            string type = HttpUtility.UrlDecode(context.Request["type"]);
            string json = "{\"UserName\":\""+username+"\",\"Password\":\""+pwd+"\",\"EtpName\":\""+etpname+"\",\"Type\":\""+type+"\"}";
            result = rdaws_th.USER_Register(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 获取风险预警数据.by xuwm on 20131210
        ///  //{\"GroupID\":\"IBD116\",\"Code\":\"1\"}
        /// </summary>
        /// <param name="context"></param>
        public void Index_OtherFinancial_Data(HttpContext context) {
           
            string result = string.Empty;

            string iteminfo=string.Empty;//父类下面的所有子项
            string codenumber=string.Empty;//父类下面子项的所有参考值

            string code = context.Request["code"];
            string ibdid = context.Request["ibdid"];
            string json = "{\"GroupID\":\"" + ibdid + "\",\"Code\":" + code + "}";

            string jsoncode="{\"Code\":\""+code+"\",\"Flag\":\"1\"}";

            iteminfo = rdaws_th.Index_OtherFinancial_Data(json);
            codenumber = rdaws_th.Index_ReferenceValue_Data(jsoncode);

            result = "[" + iteminfo + "," + codenumber + "]";
           
            context.Response.Write(result);
        }

        /// <summary>
        /// md5相关加密方法
        /// </summary>
        /// <param name="source"></param>
        /// <param name="charset"></param>
        /// <returns></returns>
        private string NewMD5(string source, string charset)
        {
            StringBuilder sb = new StringBuilder();
            byte[] MD5Out = new MD5CryptoServiceProvider().ComputeHash(Encoding.GetEncoding(charset).GetBytes(source));
            for (int i = 0; i < MD5Out.Length; i++)
            {
                sb.Append(MD5Out[i].ToString("x").PadLeft(2, char.Parse("0")));
            }
            return sb.ToString();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}