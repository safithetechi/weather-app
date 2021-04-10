import App from './App';
import { shallow } from 'enzyme';

describe('App',()=>{

  it('Has one H1 Tag',()=>{

    const wrapper = shallow(<App/>)
    const MainHeadingTag = wrapper.find("h1")
    expect(MainHeadingTag.length).toEqual(1)
  })


  it('Has H1 header with text Weather App', ()=>{
    const wrapper = shallow(<App/>)
    const MainHeadingTag = wrapper.find("h1")
    expect(MainHeadingTag.at(0).text()).toEqual('Weather App')

  })

})

