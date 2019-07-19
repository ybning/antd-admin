import React, { PureComponent } from 'react'
import { Row, Col, Modal, Button, Divider, message } from 'antd'
import { connect } from 'dva'
import ThingGroupForm from './ThingGroupForm'
import ThingForm from './ThingForm'

// const SelectOption = Select.Option;
// const FormItem = Form.Item

// const formItemLayout = {
//   labelCol: {
//     span: 2,
//   },
//   wrapperCol: {
//     span: 12,
//   },
// }

//物模型基本信息
//@Form.create()
@connect(({ thing, loading }) => ({
  thing,
  loading,
}))
class ThingBasic extends PureComponent {
  //保存物模型分组
  onClickSaveGroup = () => {
    const { form } = this.thingGroupFormRef.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      this.props
        .dispatch({
          type: 'thing/updateThingGroup',
          payload: {
            ...data,
          },
        })
        .then(res => {
          message.success('保存成功')
        })
    })
  }

  //增加物模型
  onClickAddThing = groupId => {
    this.props.onClickAddThing(groupId)
  }

  //删除分组
  onClickDeleteGroup = () => {
    const { dispatch, thing } = this.props
    Modal.confirm({
      title: '确认删除分组吗？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'thing/deleteThingGroup',
          payload: {
            groupId: thing.curTreeOptItem.groupId,
          },
        }).then(res => {
          dispatch({
            type: 'thing/queryThingGroupList',
          })
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  //保存物模型
  onClickSaveThing = () => {
    const { form } = this.thingFormRef.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      this.props
        .dispatch({
          type: 'thing/updateThing',
          payload: {
            ...data,
          },
        })
        .then(res => {
          message.success('保存成功')
        })
    })
  }

  //删除物模型
  onClickDeleteThing = () => {
    const { dispatch, thing } = this.props
    Modal.confirm({
      title: '确认删除物模型吗？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'thing/deleteThing',
          payload: {
            tid: thing.curTreeOptItem.tid,
          },
        }).then(res => {
          dispatch({
            type: 'thing/queryThingGroupList',
          })
          dispatch({
            type: 'thing/updateCurTreeOptItem',
            payload: {
              curTreeOptItem: { deep: '1' },
            },
          })
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  //物模型分组表单
  renderThingGroupForm() {
    // const { item = {}, form, } = this.props;
    // const { getFieldDecorator } = form;
    return (
      <Row gutter={8}>
        <Col md={12}>
          <ThingGroupForm
            wrappedComponentRef={formRef => (this.thingGroupFormRef = formRef)}
            item={this.props.thing.curTreeOptItem}
          />
          <Button type="primary" onClick={this.onClickSaveGroup.bind(this)}>
            保存
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            disabled={!this.props.thing.curTreeOptItem.groupId}
            onClick={this.onClickAddThing.bind(
              this,
              this.props.thing.curTreeOptItem.groupId
            )}
          >
            增加物模型
          </Button>
          <Divider type="vertical" />
          <Button
            disabled={!this.props.thing.curTreeOptItem.groupId}
            onClick={this.onClickDeleteGroup.bind(this)}
          >
            删除
          </Button>
        </Col>
      </Row>
    )
  }

  //物模型表单
  renderThingForm() {
    // const { item = {}, form, thingGroupList, thingModelList, dictKeyList, } = this.props;
    // const { getFieldDecorator } = form;
    return (
      <Row gutter={8}>
        <Col md={12}>
          <ThingForm
            wrappedComponentRef={formRef => (this.thingFormRef = formRef)}
            item={this.props.thing.thingByTid}
          />
          <Button type="primary" onClick={this.onClickSaveThing.bind(this)}>
            保存
          </Button>
          <Divider type="vertical" />
          <Button onClick={this.onClickDeleteThing.bind(this)}>删除</Button>
        </Col>
      </Row>
    )
  }

  render() {
    const { thing } = this.props
    const {
      curTreeOptItem: { deep },
    } = thing

    return [this.renderThingGroupForm(), this.renderThingForm()][deep - 1]
  }
}

export default ThingBasic
