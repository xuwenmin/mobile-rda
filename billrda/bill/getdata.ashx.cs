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
    public class getdata : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/json";
            //获取请求的方法名
            string method = context.Request["action"];         
            switch (method) {
                //查询财务指标数据.by xuwm on 20131209
                case "Index_KeyFinancial_Data":
                    getIndex_KeyFinancial_Data(context);
                    break;
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
                //查询风险预警首页统计数量信息
                case "Risk_Count_Data":
                    Risk_Count_Data(context);
                    break;
                //查询风险预警,财务报表相关信息
                case "Risk_Report_Data":
                    Risk_Report_Data(context);
                    break;
                //查询财务报表-现金流量表 相关信息
                case "Report_CashFlow_Data":
                    Report_CashFlow_Data(context);
                    break;
                //查询财务报表-利润 相关信息
                case "Report_Profit_Data":
                    Report_Profit_Data(context);
                    break;
                //查询财务报表-资产利润相关信息
                case "Report_Assets_Data":
                    Report_Assets_Data(context);
                    break;
                //查询融资详细信息
                case "Trading_Get":
                    Trading_Get(context);
                    break;
                //查询融资列表信息
                case "Trading_List":
                    Trading_List(context);
                    break;
                //获取融资枚举相关信息
                case "Trading_Enum_Data":
                    Trading_Enum_Data(context);
                    break;
                //发布融资一步提交接口
                case "Trading_Edit":
                    Trading_Edit(context);
                    break;
                //获取企业基本信息
                case "Enterprise_BasicData":
                    Enterprise_BasicData(context);
                    break;
            }
            context.Response.Write("");
        }
        /// <summary>
        /// 查询财务指标数据.by xuwm on 20131209
        /// </summary>
        /// <param name="context"></param>
        public void getIndex_KeyFinancial_Data(HttpContext context)
        {
            string result = string.Empty;
            string code = context.Request["code"];
            string ibdid = context.Request["ibdid"];
            string year = context.Request["year"];
            result = rdaws.Index_KeyFinancial_Data("{\"GroupID\":\"" + ibdid + "\",\"Year\":" + year + ",\"Code\":" + code + "}");
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
            result = rdaws.USER_Login(json);
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
            result = rdaws.USER_Register(json);
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

            iteminfo = rdaws.Index_OtherFinancial_Data(json);
            codenumber = rdaws.Index_ReferenceValue_Data(jsoncode);

            result = "[" + iteminfo + "," + codenumber + "]";
           
            context.Response.Write(result);
        }
        /// <summary>
        /// 获取风险预警,首页相关图标统计数据.by xuwm on 20131211
        ///   //{\"GroupID\":\"IBD116\"}
        /// </summary>
        /// <param name="context"></param>
        public void Risk_Count_Data(HttpContext context) {
          
            string result = string.Empty;
            string ibdid = context.Request["ibdid"];
            string json = "{\"GroupID\":\""+ibdid+"\"}";
            result = rdaws.Risk_Count_Data(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 获取风险预警,财务报表相关的信息
        ///{\"GroupID\":\"IBD116\",\"Flag\":\"0\"}
        ///GroupID：企业Id,Flag：0 - 资产负债 1 - 现金流量 2 - 利润
        /// </summary>
        /// <param name="context"></param>
        public void Risk_Report_Data(HttpContext context) {
          
            string result = string.Empty;
            string flag = context.Request["flag"];
            string ibdid = context.Request["ibdid"];
            string json = "{\"GroupID\":\""+ibdid+"\",\"Flag\":\""+flag+"\"}";
            result = rdaws.Risk_Report_Data(json);
            context.Response.Write(result);
        }

        /// <summary>
        /// 获取企业月份利润表数据
        /// {\"GroupID\":\"IBD116\",\"Year\":2013,\"Month\":1,\"PLevel\":0}
        /// </summary>
        /// <param name="context"></param>
        public void Report_Profit_Data(HttpContext context) {
            string result = string.Empty;
            string id = context.Request["fid"];
            string ibdid = context.Request["ibdid"];
            string year = context.Request["year"];
            string month = context.Request["month"];
            string json = "{\"GroupID\":\""+ibdid+"\",\"Year\":"+year+",\"Month\":"+month+",\"PLevel\":" + id + "}";
            result = rdaws.Report_Profit_Data(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 获取企业月份现金流量表数据.by xuwm
        /// {\"GroupID\":\"IBD116\",\"Year\":2013,\"Month\":1,\"PLevel\":0}
        /// </summary>
        /// <param name="context"></param>
        public void Report_CashFlow_Data(HttpContext context) {
            string result = string.Empty;
            string id = context.Request["fid"];
            string ibdid = context.Request["ibdid"];
            string year = context.Request["year"];
            string month = context.Request["month"];
            string json = "{\"GroupID\":\"" + ibdid + "\",\"Year\":" + year + ",\"Month\":" + month + ",\"PLevel\":" + id + "}";
            result = rdaws.Report_CashFlow_Data(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 获取财务报表--资产负债相关信息
        /// {\"GroupID\":\"IBD116\",\"Year\":2013,\"Month\":1,\"PLevel\":64}
        /// </summary>
        /// <param name="context"></param>
        public void Report_Assets_Data(HttpContext context) {
            string result = string.Empty;
            string id = context.Request["fid"];
            string ibdid = context.Request["ibdid"];
            string year = context.Request["year"];
            string month = context.Request["month"];
            string json = "{\"GroupID\":\"" + ibdid + "\",\"Year\":" + year + ",\"Month\":" + month + ",\"PLevel\":" + id + "}";
            result = rdaws.Report_Assets_Data(json);
            context.Response.Write(result);   
        }
        /// <summary>
        /// 查看融资详细信息.by xuwm 20131213
        /// {\"ProjectID\":\"82694bed-c841-43bf-a697-f6aecc655db3\"}
        /// </summary>
        /// <param name="context"></param>
        public void Trading_Get(HttpContext context) {
            string result = string.Empty;
            string projectid = context.Request["projectid"];
            string json = "{\"ProjectID\":\""+projectid+"\"}";
            result = rdaws.Trading_Get(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 查看融资列表信息
        /// {\"GroupID\":\"IBD116\"}
        /// </summary>
        /// <param name="context"></param>
        public void Trading_List(HttpContext context) {
            string result = string.Empty;
            string ibdid = context.Request["ibdid"];
            string json = "{\"GroupID\":\""+ibdid+"\"}";
            result = rdaws.Trading_List(json);
            context.Response.Write(result);
        }

        /// <summary>
        /// 获取融资类型相关枚举信息.by xuwm
        /// {\"Type\":\"1\"}
        /// 【"1"= 融资类型,"2"=所属行业，"3"=融资时长，"4"=币种，"5" =企业性质，"6"=企业规模，"7"=所属行业，"8"=企业发展所处阶段】
        /// </summary>
        /// <param name="context"></param>
        public void Trading_Enum_Data(HttpContext context) {
            string result = string.Empty;
            string typeid = context.Request["typeid"];
            string json = "{\"Type\":\""+typeid+"\"}";
            result = rdaws.Trading_Enum_Data(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 发布融资管理一步保存数据.by xuwm
        /// {"GroupID":"IBD188","UserID":"1099","ProjectName":"数据风险管理项目","Category":4901,"Trade":497,
        /// "MoneyBegin":300,"MoneyEnd":400,"Currency":140,"RZSC":4888,
        ///"LXR":"张三","MPhone":"13613373301","PhoneArea":"010","Phone":"12345678","PhoneFJ":"321",
        ///"Email":"z1@123.com","EType":61,"Industry":504,"Sales":200,"SalesCurrency":140,"Park":"中关村园区"} 
        /// </summary>
        /// <param name="context"></param>
        public void Trading_Edit(HttpContext context) {
            string result = string.Empty;

            string GroupID = context.Request["GroupID"];
            string UserID = context.Request["UserID"];
            string ProjectName = context.Request["ProjectName"];
            string Category = context.Request["Category"];
            string Trade = context.Request["Trade"];
            string MoneyBegin = context.Request["MoneyBegin"];
            string MoneyEnd = context.Request["MoneyEnd"];
            string Currency = context.Request["Currency"];
            string RZSC = context.Request["RZSC"];
            string LXR = context.Request["LXR"];
            string MPhone = context.Request["MPhone"];
            string PhoneArea = context.Request["PhoneArea"];
            string Phone = context.Request["Phone"];
            string PhoneFJ = context.Request["PhoneFJ"];
            string Email = context.Request["Email"];
            string EType = context.Request["EType"];
            string Industry = context.Request["Industry"];
            string Sales = context.Request["Sales"];
            string SalesCurrency = context.Request["SalesCurrency"];
            string Park = context.Request["Park"];

            string json = string.Empty;
            
            if (!string.IsNullOrEmpty(context.Request["proid"]))
            {
                //ProjectID
                //编辑融资信息 update
                json = "{\"ProjectID\":\"" + context.Request["proid"] + "\",\"GroupID\":\"" + GroupID + "\",\"UserID\":\"" + UserID + "\",\"ProjectName\":\"" + ProjectName + "\",\"Category\":\"" + Category + "\",\"Trade\":\"" + Trade + "\"," +
         "\"MoneyBegin\":" + MoneyBegin + ",\"MoneyEnd\":" + MoneyEnd + ",\"Currency\":" + Currency + ",\"RZSC\":" + RZSC + "," +
        "\"LXR\":\"" + LXR + "\",\"MPhone\":\"" + MPhone + "\",\"PhoneArea\":\"" + PhoneArea + "\",\"Phone\":\"" + Phone + "\",\"PhoneFJ\":\"" + PhoneFJ + "\"," +
        "\"Email\":\"" + Email + "\",\"EType\":" + EType + ",\"Industry\":\"" + Industry + "\",\"Sales\":" + Sales + ",\"SalesCurrency\":" + SalesCurrency + ",\"Park\":\"" + Park + "\"} ";
            }
            else {
                //发布融资信息 add
                json = "{\"GroupID\":\"" + GroupID + "\",\"UserID\":\"" + UserID + "\",\"ProjectName\":\"" + ProjectName + "\",\"Category\":\"" + Category + "\",\"Trade\":\"" + Trade + "\"," +
                         "\"MoneyBegin\":" + MoneyBegin + ",\"MoneyEnd\":" + MoneyEnd + ",\"Currency\":" + Currency + ",\"RZSC\":" + RZSC + "," +
                        "\"LXR\":\"" + LXR + "\",\"MPhone\":\"" + MPhone + "\",\"PhoneArea\":\"" + PhoneArea + "\",\"Phone\":\"" + Phone + "\",\"PhoneFJ\":\"" + PhoneFJ + "\"," +
                        "\"Email\":\"" + Email + "\",\"EType\":" + EType + ",\"Industry\":\"" + Industry + "\",\"Sales\":" + Sales + ",\"SalesCurrency\":" + SalesCurrency + ",\"Park\":\"" + Park + "\"} ";
            }
            result = rdaws.Trading_Edit(json);

            context.Response.Write(result);
        }

        /// <summary>
        /// 获取企业基本信息.by xuwm
        /// {\"GroupID\":\"IBD101\"}
        /// </summary>
        /// <param name="context"></param>
        public void Enterprise_BasicData(HttpContext context) {
            string result = string.Empty;
            string ibdid = context.Request["ibdid"];
            string json ="{\"GroupID\":\""+ibdid+"\"}";
            result = rdaws.Enterprise_BasicData(json);
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