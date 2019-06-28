import Vue from 'vue'
import Todo from '../src/components/views/Todo.vue'


function getTaskDescription(Component, propsData) {
    const Constructor = Vue.extend(Component);
    const vm = new Constructor({ propsData: propsData }).$mount
    return vm.$el.textContent;
}

describe('Todo', () => {
    it('Renders correctly with different props', () => {
        expect(getRenderedText(Todo, {
            task: {
                id: 1,
                text: "Hello",
                done: false,
                date: "2019-06-28"
            }
        })).toBe('Hello')
    })
})
