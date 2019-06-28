import Vue from 'vue'
import TodoView from '../src/components/views/TodoView.vue'


function getTaskDescription(Component, propsData) {
    const Constructor = Vue.extend(Component);
    const vm = new Constructor({ propsData: propsData }).$mount
    return vm.$el.textContent;
}

describe('TodoView', () => {
    it('Renders correctly with different props', () => {
        expect(getRenderedText(TodoView, {
            task: {
                id: 1,
                text: "Hello",
                done: false,
                date: "2019-06-28"
            }
        })).toBe('Hello')
    })
})
