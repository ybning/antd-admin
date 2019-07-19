module.exports = {
  siteName: '物模块配置',
  copyright: '物模块配置',
  logoPath: '/logo.svg',
  //apiPrefix: process.env.NODE_ENV === 'production'?'http://www.mlcloud.com.cn/thingapi':'http://192.168.1.102:8062',
  apiPrefix: 'http://www.mlcloud.com.cn/thingapi',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login/],
    },
  ],

  // /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  // i18n: {
  //   /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
  //   languages: [
  //     // {
  //     //   key: 'pt-br',
  //     //   title: 'Português',
  //     //   flag: '/portugal.svg',
  //     // },
  //     // {
  //     //   key: 'en',
  //     //   title: 'English',
  //     //   flag: '/america.svg',
  //     // },
  //     {
  //       key: 'zh',
  //       title: '中文',
  //       flag: '/china.svg',
  //     },
  //   ],
  //   defaultLanguage: 'zh',
  // },
}
