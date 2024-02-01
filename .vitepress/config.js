export default {
    lang: 'ru-RU',
    title: 'Shared components',
    description: '',
    head: [
        [
            'link',
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '152x152',
                href: '/favicon.png' 
            }
        ]
    ],
    alias: [{
        find: '/~/',
        replacement: '../../'
    }],
    themeConfig: {
        logo: '/favicon.png',
        sidebar: [{
            text: 'Components',
            link: 'src/components/',
            collapsed: true,
            items: [
                {
                    text: 'Label',
                    link: 'src/components/label/'
                },
                {
                    text: 'Checkbox',
                    link: 'src/components/checkbox/'
                }
            ]
        }]
    }
}
