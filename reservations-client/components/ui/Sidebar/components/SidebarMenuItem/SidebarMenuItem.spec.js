import { shallow } from 'enzyme'
import SidebarMenuItem from './SidebarMenuItem'

describe('SidebarMenuItem', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <SidebarMenuItem name="test name" icon="test icon" onClickLink={() => {}} isActive={false} />
    )
  })

  it('renders without error', () => {
    const matchingComponents = wrapper.find('[data-test="list-item"]')
    expect(matchingComponents.length).toBe(1)
  })

  it('renders list item icon', () => {
    const matchingComponents = wrapper.find('[data-test="list-item-icon"]')
    expect(matchingComponents.length).toBe(1)
  })

  it('renders the list item icon with a className equal to the "icon prop"', () => {
    const icon = 'test icon'
    wrapper.setProps({ icon })
    const matchingComponents = wrapper.find('[data-test="list-item-icon"]')
    expect(matchingComponents.hasClass(icon)).toBe(true)
  })

  it('renders the list item text passed in from the name "prop"', () => {
    const name = 'test name'
    wrapper.setProps({ name })
    const matchingComponents = wrapper.find('[data-test="list-item-text"]')
    expect(matchingComponents.text()).toBe(` ${name}`)
  })

  it('renders an li without a className of "active" when the component prop "isActive=false"', () => {
    expect(wrapper.find('li').hasClass('active')).toEqual(false)
  })

  it('renders an li with a className of "active" when the component prop "isActive=true"', () => {
    wrapper.setProps({ isActive: true })
    expect(wrapper.find('li').hasClass('active')).toEqual(true)
  })
})
