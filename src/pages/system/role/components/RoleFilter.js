import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col } from 'antd'

//const SelectOption = Select.Option;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

// const TwoColProps = {
//   ...ColProps,
//   xl: 96,
// }

@Form.create()
class RoleFilter extends Component {
  handleFields = fields => {
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }
  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { onAdd, filter, form } = this.props
    // const { getFieldDecorator } = form
    // const { menuName, visible } = filter

    return (
      <Row gutter={24}>
        {/* <Col
          {...ColProps}
          xl={{ span: 4 }}
          md={{ span: 8 }}
        >
          {
            getFieldDecorator('menuName', 
            { 
              initialValue: menuName 
            })
            (
              <Input
                style={{ width: '100%' }}
                placeholder={`请输入名称`}
                onChange={this.handleChange.bind(this, 'menuName')}
              />
            )
          }
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 4 }}
          md={{ span: 8 }}
        >
            {
              getFieldDecorator('visible', 
              {
                initialValue: visible,
              }
              )(
                <Select
                  style={{ width: '100%' }}
                  placeholder={`请选择状态`}
                  onChange={this.handleChange.bind(this, 'visible')}
                >
                  <SelectOption value="">全部</SelectOption>
                  <SelectOption value="0">显示</SelectOption>
                  <SelectOption value="1">隐藏</SelectOption>
                </Select>
              )
            }
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 14 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button
                type="primary"
                className="margin-right"
                icon="search"
                onClick={this.handleSubmit}
              >
                搜索
              </Button>
              <Button icon="reload" onClick={this.handleReset}>
                重置
              </Button>
            </div>
          </Row>
        </Col> */}
        <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
          <Button type="primary" icon="plus" onClick={onAdd}>
            新增
          </Button>
        </Col>
      </Row>
    )
  }
}

RoleFilter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default RoleFilter
