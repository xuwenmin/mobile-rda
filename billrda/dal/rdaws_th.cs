using System;
using System.Collections.Generic;
using System.Web;
using billrda.RDA_TH;
using System.Configuration;
namespace billrda.dal
{
    /// <summary>
    /// RDA webservice引用类
    /// </summary>
    public class rdaws_th
    {
        private static RDAIBService _rda;
        static rdaws_th()
        {
            _rda = new RDAIBService();
            _rda.Url = ConfigurationManager.AppSettings["th_rdaservice"];
            SOAPHeaderHandleIB soap = new SOAPHeaderHandleIB();
            soap.CurName = ConfigurationManager.AppSettings["th_soapname"];
            soap.CurPwd = ConfigurationManager.AppSettings["th_soappwd"];
            _rda.SOAPHeaderHandleIBValue = soap; 
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
        /// 获取在投项目列表数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string ZTProject_List(string json) {
            return _rda.ZTProject_List(json);
        }
        /// <summary>
        /// 获取结项项目列表数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string JXProject_List(string json) {
            return _rda.JXProject_List(json);
        }
        /// <summary>
        /// 获取已关注项目列表数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string YIGZProject_List(string json) {
            return _rda.YIGZProject_List(json);
        }
        /// <summary>
        /// 申请委托页面选择监控时长初始化
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string JKSCInit() {
            return _rda.JKSCInit();
        }
        /// <summary>
        /// 申请委托页面选择监控类型初始化
        /// </summary>
        /// <returns></returns>
        public static string SZWTInit() {
            return _rda.SZWTInit();
        }
        /// <summary>
        /// 申请委托操作
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string THGZ_Ope(string json) {
            return _rda.THGZ_Ope(json);
        }
        /// <summary>
        /// 投行预警中心首页
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string Investmentbank_Index_Data(string json) {
            return _rda.Investmentbank_Index_Data(json);
        }
        /// <summary>
        /// 获取风险预警,财务报表相关的数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string Investmentbank_CWBB_Data(string json)
        {
            return _rda.Investmentbank_CWBB_Data(json);
        }
        /// <summary>
        /// 挑选项目页面挑选条件初始化
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string TXProCondiInit(string json) {
            return _rda.TXProCondiInit(json);
        }
        /// <summary>
        ///挑选项目页面数据查询 
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string TXProject_List(string json) {
            return _rda.TXProject_List(json);
        }
        /// <summary>
        /// 根据项目编号获得项目信息
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string gettrading(string json) {
            return _rda.gettrading(json);
        }
        /// <summary>
        /// 根据企业编号获得项目信息
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string getenterprise(string json) {
            return _rda.getenterprise(json);
        }
        /// <summary>
        /// 付费
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string FuFei(string json) {
            return _rda.FuFei(json);
        }
        /// <summary>
        /// 添加到关注项目列表
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string THGZ_Add(string json) {
            return _rda.THGZ_Add(json);
        }
        /// <summary>
        /// 是否付费
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string IsFuFei(string json) {
            return _rda.IsFuFei(json);
        }
        /// <summary>
        /// 改在投项目或关注项目某条记录委托者，"1092,1091,1099"
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static string Add_WTZ(string json) {
            return _rda.Add_WTZ(json);
        }

    }
}