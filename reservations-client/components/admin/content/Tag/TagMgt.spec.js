import { shallow } from 'enzyme'
import TagMgt from './TagMgt'

describe('<TagMgt />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<TagMgt />)
  })

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy()
  })
})
