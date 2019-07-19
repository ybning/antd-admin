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
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      let data = {
        ...getFieldsValue(),
      }
      if (getFieldsValue().roleIds) {
        data = {
          ...data,
          roleIds: JSON.stringify(getFieldsValue().roleIds),
        }
      }
      onOk(data)
    })
  }

  render() {
    const {
      item = {},
      onOk,
      form,
      enableRoleList,
      getEnableRoleListLoading,
      modalType,
      ...modalProps
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          {modalType === 'createUser' || modalType === 'updateUser' ? (
            <FormItem label={`账号`} {...formItemLayout}>
              {getFieldDecorator('userName', {
                initialValue: item.userName,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
          ) : (
            <FormItem label={`账号`} {...formItemLayout}>
              {item.userName}
            </FormItem>
          )}

          {modalType === 'createUser' || modalType === 'changePassword' ? (
            <FormItem label={`密码`} {...formItemLayout}>
              {getFieldDecorator('password', {
                initialValue: item.password,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input.Password />)}
            </FormItem>
          ) : null}

          {modalType === 'createUser' || modalType === 'updateUser' ? (
            <div>
              <FormItem label={`姓名`} {...formItemLayout}>
                {getFieldDecorator('fullName', {
                  initialValue: item.fullName,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem label={`电话`} {...formItemLayout}>
                {getFieldDecorator('phone', {
                  initialValue: item.phone,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem label={`邮箱`} {...formItemLayout}>
                {getFieldDecorator('email', {
                  initialValue: item.email,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem label={`角色`} {...formItemLayout}>
                {getFieldDecorator('roleIds', {
                  initialValue: item.roleIds,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select
                    loading={getEnableRoleListLoading}
                    placeholder="请选择角色"
                    mode="multiple"
                  >
                    {enableRoleList.map(v => {
                      const { roleName: name, id: value } = v
                      return (
                        <SelectOption value={value + ''}>{name}</SelectOption>
                      )
                    })}
                  </Select>
                )}
              </FormItem>
            </div>
          ) : null}
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
