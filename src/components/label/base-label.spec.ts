import { mount } from '@vue/test-utils'
import Label from './base-label.vue'

describe('components/label', () => {

    test('message is rendering', () => {
        const wrapper = mount(Label, {
            props: {
                value: 'Обрабатываем'
            }
        })

        expect(wrapper.html()).toContain('Обрабатываем')
    })

    test('slot is rendering', () => {
        const wrapper = mount(Label, {
            slots: {
                default: 'Подписка'
            }
        })

        expect(wrapper.html()).toContain('Подписка')
    })

    test('props rendering preffered', () => {
        const wrapper = mount(Label, {
            props: {
                value: 'Обрабатываем'
            },
            slots: {
                default: 'Подписка'
            }
        })

        expect(wrapper.html()).toContain('Подписка')
    })
})
