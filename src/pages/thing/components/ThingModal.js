import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal } from 'antd'
import { connect } from 'dva'
import ThingForm from './ThingForm'

//物模型-添加
@connect(({ thing, loading }) => ({
  thing,
  loading,
}))
@Form.create()
class ThingModal extends PureComponent {
  handleOk = () => {
    const { onOk } = this.props
    const { form } = this.thingFormRef.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }

  render() {
    const { ...modalProps } = this.props
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <ThingForm
          wrappedComponentRef={formRef => (this.thingFormRef = formRef)}
          item={this.props.thing.curTreeOptItem}
        />
      </Modal>
    )
  }
}

ThingModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ThingModal
