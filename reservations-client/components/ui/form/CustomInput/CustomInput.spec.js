/* eslint-disable no-undef */
import { shallow } from 'enzyme'
import CustomInput from './CustomInput'

describe('<CustomInput />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CustomInput props={{}} ref={``} />)
  })

  it('should render without errors', () => {
    expect(wrapper.find('[data-test="custom-input"]').length).toBe(1)
    // or expect(wrapper.find('[data-test="sidebar-menu-title"]')).toHaveLength(1)
  })
})
