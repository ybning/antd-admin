import React, { PureComponent } from 'react'
import { Form, Input } from 'antd'
import { connect } from 'dva'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
}
//物模型分组信息-表单
@connect(({ thing, loading }) => ({
  thing,
  loading,
}))
@Form.create()
class ThingGroupForm extends PureComponent {
  render() {
    const { item = {}, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form layout="horizontal">
        <FormItem label={`分组名称`} {...formItemLayout}>
          {getFieldDecorator('groupName', {
            initialValue: item.groupName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="请输入分组名称" />)}
        </FormItem>
        {/* <FormItem label={`备注`} {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            // rules: [
            //   {
            //     required: true,
            //   },
            // ],
          })(<Input placeholder="请输入备注" />)}
        </FormItem> */}
      </Form>
    )
  }
}

export default ThingGroupForm
