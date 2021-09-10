import { shallow } from 'enzyme'
import BlogList from './BlogList'

describe('<BlogList />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<BlogList />)
  })

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy()
  })
})
