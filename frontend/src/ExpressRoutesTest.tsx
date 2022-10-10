import React from 'react'
import {fetchData} from './RGExpressRoutes'


class ExpressRoutesTest extends React.Component {
    constructor() {
      super();
      this.state = {
        data: "defualt"
      };
    }

    componentDidMount() {
      console.log('componentDidMount')
      fetchData().then(data => {
        // console.log('data', data);
        // data!.getReader().read().then((result) => {
        //   console.log('result', result)
        //   this.setState({ data: result.value })
        // })
        // console.log('data await', data?.getReader().read())
        this.setState({ data: data });
      });
    }

    render() {
      return (
        <div>
            <h1>show something</h1>
            <div>
                asdf
                <p>
                  {this.state.data}
                </p>
            </div>
        </div>
      );
    }
}
export default ExpressRoutesTest;