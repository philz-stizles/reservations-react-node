import { shallow } from 'enzyme'
import SidebarMenu from './SidebarMenu'
import SidebarMenuTitle from './../SidebarMenuTitle/SidebarMenuTitle'
import SidebarMenuItem from '../SidebarMenuItem/SidebarMenuItem'
import { checkProps } from '../../../../../tests/testUtils'

describe('<SidebarMenu />', () => {
  let wrapper
  const defaultProps = {
    title: '',
    menuItems: [],
    onClickLink: () => {},
    activeMenuItem: ''
  }

  beforeEach(() => {
    wrapper = shallow(<SidebarMenu {...defaultProps} />)
  })

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy()
  })

  it('should not throw warning with expected props', () => {
    checkProps(SidebarMenuTitle, defaultProps)
  })

  it('should render without error', () => {
    const matchingComponents = wrapper.find('[data-test="sidebar-menu"]')
    expect(matchingComponents).toHaveLength(1)
    // console.log(wrapper.debug())
  })

  it('should render <SidebarMenuTitle /> if the title prop is truthy', () => {
    wrapper.setProps({ title: 'Test Title' })
    expect(wrapper.find(SidebarMenuTitle)).toHaveLength(1)
  })

  it('should not render <SidebarMenuTitle /> if the title prop is falsy', () => {
    wrapper.setProps({ title: undefined })
    expect(wrapper.find(SidebarMenuTitle)).toHaveLength(0)
  })

  it('should not render any <SidebarMenuItem /> if the menuItems prop is an empty array', () => {
    wrapper.setProps({ menuItems: [] })
    expect(wrapper.find(SidebarMenuItem)).toHaveLength(0)
    // or expect(wrapper.find(SidebarMenuItem).length).toBe(0)
  })

  it('should render the correct number of <SidebarMenuItem /> components if the menuItems prop has values', () => {
    const menuItems = [
      { id: '1', name: 'menu item 1', icon: 'menu item icon 1' },
      { id: '2', name: 'menu item 2', icon: 'menu item icon 2' },
      { id: '3', name: 'menu item 3', icon: 'menu item icon 3' }
    ]
    wrapper.setProps({ menuItems: menuItems })
    expect(wrapper.find(SidebarMenuItem)).toHaveLength(menuItems.length)
    // or expect(wrapper.find(SidebarMenuItem).length).toBe(menuItems.length)
  })
})
