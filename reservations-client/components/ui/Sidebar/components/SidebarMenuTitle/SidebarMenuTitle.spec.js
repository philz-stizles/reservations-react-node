/* eslint-disable no-undef */
import { shallow } from 'enzyme'
import SidebarMenuTitle from './SidebarMenuTitle'

describe('<SidebarMenuTitle />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SidebarMenuTitle title="Mock Menu Title" />)
  })

  it('renders without errors', () => {
    expect(wrapper.find('[data-test="sidebar-menu-title"]').length).toBe(1)
    // or expect(wrapper.find('[data-test="sidebar-menu-title"]')).toHaveLength(1)
  })

  it('should show a single menu title element when passed a title prop', () => {
    expect(wrapper.find('[data-test="menu-title"]')).toHaveLength(1)
  })

  it('should show the correct menu title when passed a title prop', () => {
    const title = 'Test title'
    wrapper.setProps({ title })
    expect(wrapper.find('[data-test="menu-title"]').text()).toEqual(title)
  })
})
