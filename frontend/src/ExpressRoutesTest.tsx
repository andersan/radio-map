import React from 'react'
import {fetchData} from './RGExpressRoutes'


class ExpressRoutesTest extends React.Component {
    state = {
      data: "default"
    }
    constructor(props:any) {
      super(props);
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
            <h1>show something --- new</h1>
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