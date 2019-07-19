import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal } from 'antd'
import { connect } from 'dva'
import ThingGroupForm from './ThingGroupForm'

//物模型分组-添加
@connect(({ thing, loading }) => ({
  thing,
  loading,
}))
@Form.create()
class ThingGroupModal extends PureComponent {
  handleOk = () => {
    const { onOk } = this.props
    const { form } = this.thingGroupFormRef.props
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
        <ThingGroupForm
          wrappedComponentRef={formRef => (this.thingGroupFormRef = formRef)}
          item={this.props.thing.curTreeOptItem}
        />
      </Modal>
    )
  }
}

ThingGroupModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ThingGroupModal
