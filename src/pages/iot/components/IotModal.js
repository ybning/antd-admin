import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal } from 'antd'
import { connect } from 'dva'

const SelectOption = Select.Option
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
@connect(({ iot, loading }) => ({
  iot,
  loading,
}))
class IotModal extends PureComponent {
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
    const {
      item = {},
      onOk,
      form,
      iotPlatformList,
      getIotPlatformLoading,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={`账号`} {...formItemLayout}>
            {getFieldDecorator('accessKey', {
              initialValue: item.accessKey,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="请输入账号" />)}
          </FormItem>
          <FormItem label={`密钥`} {...formItemLayout}>
            {getFieldDecorator('accessSecret', {
              initialValue: item.accessSecret,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="请输入密钥" />)}
          </FormItem>
          {/* <FormItem label={`状态`} {...formItemLayout}>
            {getFieldDecorator('status', {
              initialValue: item.status+'',
              rules: [
                {
                  required: true,
                  //type: 'boolean',
                },
              ],
            })(
              <Radio.Group>
                <Radio value={'0'}>
                  启用
                </Radio>
                <Radio value={'1'}>
                  停用
                </Radio>
              </Radio.Group>
            )}
          </FormItem> */}

          <FormItem label={`物联网平台名称`} {...formItemLayout}>
            {getFieldDecorator('iotName', {
              initialValue: item.iotName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="请输入物联网平台名称" />)}
          </FormItem>

          <FormItem label={`所属平台`} {...formItemLayout}>
            {getFieldDecorator('iotPlatform', {
              initialValue: item.iotPlatform,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                loading={getIotPlatformLoading}
                placeholder="请选择所属平台"
              >
                {iotPlatformList.map(v => {
                  const { name, value } = v
                  return <SelectOption value={value + ''}>{name}</SelectOption>
                })}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

IotModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default IotModal
