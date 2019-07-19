import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

@Form.create()
class DictTypeModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
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
    const { item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={`名称`} {...formItemLayout}>
            {getFieldDecorator('dictName', {
              initialValue: item.dictName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`类型`} {...formItemLayout}>
            {getFieldDecorator('dictType', {
              initialValue: item.dictType,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`状态`} {...formItemLayout}>
            {getFieldDecorator('status', {
              initialValue: item.status,
              rules: [
                {
                  required: true,
                  //type: 'boolean',
                },
              ],
            })(
              <Radio.Group>
                <Radio value={0}>正常</Radio>
                <Radio value={1}>停用</Radio>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem label={`备注`} {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

DictTypeModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default DictTypeModal
