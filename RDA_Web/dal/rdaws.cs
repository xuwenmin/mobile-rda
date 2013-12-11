using System;
using System.Collections.Generic;
using System.Web;
using RDA_Web.RDA;
namespace RDA_Web.dal
{
    /// <summary>
    /// RDA webservice引用类
    /// </summary>
    public class rdaws
    {
        private static RDAWebService _rda;
        static rdaws(){
            _rda = new RDAWebService();
            SOAPHeaderHandle soap = new SOAPHeaderHandle();
            soap.CurName = "ServiceUser@1120";
            soap.CurPwd = "ServicePassword@1120";
            _rda.SOAPHeaderHandleValue = soap; 
        }
        /// <summary>
        /// 用户注册接口
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string USER_Register(string json) {
            return _rda.USER_Register(json);
        }
        /// <summary>
        /// 用户登录接口
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string USER_Login(string json) {
            return _rda.USER_Login(json);
        }
        /// <summary>
        /// 获取企业关键财务指标数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string Index_KeyFinancial_Data(string json) {
            return _rda.Index_KeyFinancial_Data(json);
        }
        /// <summary>
        /// 获取企业月份现金流量表数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string Report_CashFlow_Data(string json) {
            return _rda.Report_CashFlow_Data(json);
        }
        /// <summary>
        /// 获取企业月份利润表数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string Report_Profit_Data(string json) {
            return _rda.Report_Profit_Data(json);
        }
        /// <summary>
        /// 获取风险预警数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string Index_OtherFinancial_Data(string json) {
            return _rda.Index_OtherFinancial_Data(json);
        }
        /// <summary>
        /// 获取风险预警参考值
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string Index_ReferenceValue_Data(string json) {
            return _rda.Index_ReferenceValue_Data(json);
        }
        /// <summary>
        /// 获取风险预警首页,所有预警的图标数量
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string Risk_Count_Data(string json) {
            return _rda.Risk_Count_Data(json);
        }
        /// <summary>
        /// 获取风险预警,财务报表相关的数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string Risk_Report_Data(string json) {
            return _rda.Risk_Report_Data(json);
        }
    }
}