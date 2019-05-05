const dict = {
  'en-US': {
    login: 'login',
    logout: 'logout',
    appName: 'Bank Account Demo System',
    homePageContent: 'This is the Home Page',
    thAccountId: 'Account Id',
    thName: 'Name',
    thBalance: 'Balance',
    thActions: 'Actions',
  },
  zh: {
    login: '登录',
    logout: '登出',
    appName: '银行账户测试系统',
    homePageContent: '这是首页',
    thAccountId: 'Account Id',
    thName: 'Name',
    thBalance: 'Balance',
    thActions: 'Actions',
  },
};

dict.en = dict['en-US'];
dict['zh-HK'] = dict.zh;
dict['zh-TW'] = dict.zh;
dict['zh-CN'] = dict.zh;

export default dict;
