module.exports = [
  {
    key: 'submenu',
    name: 'Menu Principal',
    icon: 'ios-add',
    child: [
      {
        key: 'sub1',
        name: 'Home',
        link: '/app',
        icon: 'ios-add',
      },
      {
        key: 'sub1',
        name: 'Data Table',
        link: '/app/table',
        icon: 'ios-add',
      },
      {
        key: 'sub2',
        name: 'Grupo XXXX',
        title: true,
      },
      {
        key: 'sub3',
        name: 'Form',
        link: '/app/form',
        icon: 'ios-home-outline',
      },
    ]
  },
];
