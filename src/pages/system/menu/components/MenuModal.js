import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Radio } from 'antd'

const FormItem = Form.Item
//const SelectOption = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

@Form.create()
class MenuModal extends PureComponent {
  handleOk = () => {
    const {
      //item = {},
      onOk,
      form,
    } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      let data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, modalType, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={`上级菜单`} {...formItemLayout}>
            {getFieldDecorator('parentMenu', {
              initialValue: item.parentMenu,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label={`菜单类型`} {...formItemLayout}>
            {getFieldDecorator('menuType', {
              initialValue: item.menuType || '0',
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Radio.Group>
                <Radio value="0">目录</Radio>
                <Radio value="1">菜单</Radio>
                <Radio value="2">按钮</Radio>
                <Radio value="3">其它</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label={`菜单名称`} {...formItemLayout}>
            {getFieldDecorator('menuName', {
              initialValue: item.menuName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`请求地址`} {...formItemLayout}>
            {getFieldDecorator('routePath', {
              initialValue: item.routePath,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`权限标识`} {...formItemLayout}>
            {getFieldDecorator('perms', {
              initialValue: item.perms,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`显示顺序`} {...formItemLayout}>
            {getFieldDecorator('orderNum', {
              initialValue: item.orderNum,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`菜单状态`} {...formItemLayout}>
            {getFieldDecorator('visible', {
              initialValue: item.visible,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Radio.Group>
                <Radio value="0">显示</Radio>
                <Radio value="1">隐藏</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

MenuModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default MenuModal
