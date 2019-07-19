import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal } from 'antd'

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
class DictModal extends PureComponent {
  handleOk = () => {
    const { onOk, form } = this.props
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
    const { dictType, item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={`类型`} {...formItemLayout}>
            {getFieldDecorator('dictType', {
              initialValue: dictType,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input disabled={true} />)}
          </FormItem>
          <FormItem label={`名称`} {...formItemLayout}>
            {getFieldDecorator('dictLabel', {
              initialValue: item.dictLabel,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`排序`} {...formItemLayout}>
            {getFieldDecorator('dictSort', {
              initialValue: item.dictSort,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`键值`} {...formItemLayout}>
            {getFieldDecorator('dictValue', {
              initialValue: item.dictValue,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`是否默认`} {...formItemLayout}>
            {getFieldDecorator('isDefault', {
              initialValue: item.isDefault,
              rules: [
                {
                  required: true,
                  //type: 'boolean',
                },
              ],
            })(
              <Radio.Group>
                <Radio value={0}>是</Radio>
                <Radio value={1}>否</Radio>
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

DictModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default DictModal
