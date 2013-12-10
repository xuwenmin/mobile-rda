using System;
using System.Collections.Generic;
using System.Web;
using System.Security.Cryptography;
using System.Text;
using RDA_Web.dal;
namespace RDA_Web.bill
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
                case "USER_Login":
                    USER_Login(context);
                    break;
                case "USER_Register":
                    USER_Register(context);
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
            result=RDA_Web.dal.rdaws.Index_KeyFinancial_Data("{\"GroupID\":\"IBD116\",\"Year\":2011,\"Code\":" + code + "}");
            context.Response.Write(result);
        }
        /// <summary>
        /// 用户登录接口.by xuwm on 20131209
        /// </summary>
        /// <param name="context"></param>
        public void USER_Login(HttpContext context) {
            //{'UserName':'rdatest31','Password':'e10adc3949ba59abbe56e057f20f883e'}
            string result = string.Empty;
            string username = HttpUtility.UrlDecode(context.Request["username"]);
            string pwd = NewMD5(HttpUtility.UrlDecode(context.Request["pwd"]),"utf-8").ToLower();
            string json = "{\"UserName\":\"" + username + "\",\"Password\":\""+pwd+"\"}";
            result = RDA_Web.dal.rdaws.USER_Login(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 用户注册接口.by xuwm on 20131209
        /// </summary>
        /// <param name="context"></param>
        public void USER_Register(HttpContext context) {
            //{'UserName':'rdatest31','Password':'e10adc3949ba59abbe56e057f20f883e','EtpName':'etp_rdatest31','Type':'1'} 
            string result = string.Empty;
            string username = HttpUtility.UrlDecode(context.Request["username"]);
            string pwd = NewMD5(HttpUtility.UrlDecode(context.Request["pwd"]),"utf-8").ToLower();
            string etpname = HttpUtility.UrlDecode(context.Request["etpname"]);
            string type = HttpUtility.UrlDecode(context.Request["type"]);
            string json = "{\"UserName\":\""+username+"\",\"Password\":\""+pwd+"\",\"EtpName\":\""+etpname+"\",\"Type\":\""+type+"\"}";
            result = RDA_Web.dal.rdaws.USER_Register(json);
            context.Response.Write(result);
        }
        /// <summary>
        /// 获取风险预警数据.by xuwm on 20131210
        /// </summary>
        /// <param name="context"></param>
        public void Index_OtherFinancial_Data(HttpContext context) {
            //{\"GroupID\":\"IBD116\",\"Code\":\"1\"}
            string result = string.Empty;

            string iteminfo=string.Empty;//父类下面的所有子项
            string codenumber=string.Empty;//父类下面子项的所有参考值

            string code = context.Request["code"];
            string json = "{\"GroupID\":\"IBD116\",\"Code\":" + code + "}";

            string jsoncode="{\"Code\":\""+code+"\",\"Flag\":\"1\"}";

            iteminfo = rdaws.Index_OtherFinancial_Data(json);
            codenumber = rdaws.Index_ReferenceValue_Data(jsoncode);

            result = "[" + iteminfo + "," + codenumber + "]";
           
            context.Response.Write(result);
        }

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