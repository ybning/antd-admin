import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, TreeSelect, Modal } from 'antd'

const FormItem = Form.Item
const { SHOW_PARENT } = TreeSelect

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

@Form.create()
class RoleModal extends PureComponent {
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
      modalType,
      menuList,
      queryMenuListLoading,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={`名称`} {...formItemLayout}>
            {getFieldDecorator('roleName', {
              initialValue: item.roleName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`角色权限字符`} {...formItemLayout}>
            {getFieldDecorator('roleKey', {
              initialValue: item.roleKey,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={`显示顺序`} {...formItemLayout}>
            {getFieldDecorator('roleSort', {
              initialValue: item.roleSort,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
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
          <FormItem label={`菜单`} {...formItemLayout}>
            {getFieldDecorator('menuIds', {
              initialValue: item.menuIds,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <TreeSelect
                loading={queryMenuListLoading}
                searchPlaceholder="请选择菜单"
                mode="multiple"
                treeData={menuList}
                showCheckedStrategy={SHOW_PARENT}
                treeCheckable={true}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

RoleModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default RoleModal
