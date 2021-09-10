import { shallow } from 'enzyme'
import Notification from './Notification'

describe('<Notification />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Notification title="" message="" status="" />)
  })

  it('should render without errors', () => {
    expect(wrapper).toBeTruthy()
  })
})
