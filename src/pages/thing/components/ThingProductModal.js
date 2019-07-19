import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal } from 'antd'

const FormItem = Form.Item
const SelectOption = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

@Form.create()
class ThingProductModal extends PureComponent {
  handleOk = () => {
    const { onOk, form, curTreeOptItem } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const { iotId, productKey } = getFieldsValue()
      const data = {
        iotId,
        productKey,
        tid: curTreeOptItem.tid,
      }
      onOk(data)
    })
  }

  onSelectChangeIot = value => {
    this.props.onSelectChangeIot(value)
  }

  render() {
    const {
      item = {},
      onOk,
      form,
      enabledIotConfigList,
      iotProductList,
      curTreeOptItem,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={`物模型名称`} {...formItemLayout}>
            {curTreeOptItem.tname}
          </FormItem>

          <FormItem label={`关联平台`} {...formItemLayout}>
            {getFieldDecorator('iotId', {
              initialValue: item.iotId,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                placeholder="请选择关联平台"
                onChange={this.onSelectChangeIot.bind(this)}
              >
                {enabledIotConfigList.map(v => {
                  const { name, value } = v
                  return (
                    <SelectOption key={name + value} value={value}>
                      {name}
                    </SelectOption>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label={`产品名称`} {...formItemLayout}>
            {getFieldDecorator('productKey', {
              initialValue: item.productKey,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select placeholder="请选择产品名称">
                {iotProductList.map(v => {
                  const { name, value } = v
                  return (
                    <SelectOption key={name + value} value={value}>
                      {name}
                    </SelectOption>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label={`产品Key`} {...formItemLayout}>
            {getFieldDecorator('_productKey', {
              initialValue: item.productKey,
              // rules: [
              //   {
              //     required: true,
              //   },
              // ],
            })(<Input disabled={true} />)}
          </FormItem>
          <FormItem label={`产品密钥`} {...formItemLayout}>
            {getFieldDecorator('productSecret', {
              initialValue: item.productSecret,
              // rules: [
              //   {
              //     required: true,
              //   },
              // ],
            })(<Input disabled={true} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

ThingProductModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ThingProductModal
