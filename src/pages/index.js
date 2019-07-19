import React, { PureComponent } from 'react'
import Redirect from 'umi/redirect'

class Index extends PureComponent {
  render() {
    //const { i18n } = this.props
    // return <Redirect to={`/dashboard`} />
    return <Redirect to={`/thing`} />
  }
}

export default Index
