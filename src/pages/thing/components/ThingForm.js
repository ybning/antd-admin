import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form, Input, Select } from 'antd'

const SelectOption = Select.Option
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
}

/**
 * 物模型基本信息-表单
 */
@connect(({ thing, loading }) => ({
  thing,
  loading,
}))
@Form.create()
class ThingForm extends PureComponent {
  render() {
    const { item = {}, form, thing } = this.props
    const { getFieldDecorator } = form
    const { thingGroupList, thingModelList, dictKeyList } = thing
    return (
      <Form layout="horizontal">
        <FormItem label={`名称`} {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.tname,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="请输入名称" />)}
        </FormItem>

        <FormItem label={`所属分组`} {...formItemLayout}>
          {getFieldDecorator('groupId', {
            initialValue: item.groupId + '',
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
              //loading={queryThingGroupListLoading}
              placeholder="请选择所属分组"
            >
              {thingGroupList.map(v => {
                const { title: name, key: value } = v
                return (
                  <SelectOption key={name + value} value={value + ''}>
                    {name}
                  </SelectOption>
                )
              })}
            </Select>
          )}
        </FormItem>

        <FormItem label={`关联模型`} {...formItemLayout}>
          {getFieldDecorator('modelIds', {
            initialValue: item.models,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
              mode="multiple"
              //loading={getIotPlatformLoading}
              placeholder="请选择关联模型"
            >
              {thingModelList.map(v => {
                const { name, value } = v
                return (
                  <SelectOption key={name + value} value={value + ''}>
                    {name}
                  </SelectOption>
                )
              })}
            </Select>
          )}
        </FormItem>

        <FormItem label={`分类`} {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type ? item.type + '' : null,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
              //loading={getIotPlatformLoading}
              placeholder="请选择分类"
            >
              {dictKeyList.map(v => {
                const { name, value } = v
                return (
                  <SelectOption key={name + value} value={value + ''}>
                    {name}
                  </SelectOption>
                )
              })}
            </Select>
          )}
        </FormItem>

        <FormItem label={`备注`} {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            // rules: [
            //   {
            //     required: true,
            //   },
            // ],
          })(<Input placeholder="请输入备注" />)}
        </FormItem>
      </Form>
    )
  }
}

export default ThingForm
