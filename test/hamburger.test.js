import {mount} from '@vue/test-utils'
import Header from '../components/Header.vue'

describe('Hamburger Test', () => {

  const wrapper = mount(Header);

  it('renders the correct markup', () => {
    expect('abc').toContain('d')
  })
  
});