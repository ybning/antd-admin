/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import {
  Form,
  Button,
  Row,
  Col,
  DatePicker,
  Input,
  Cascader,
  Select,
} from 'antd'
import city from 'utils/city'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

@Form.create()
class DictTypeFilter extends Component {
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
    const { getFieldDecorator } = form
    const { status, dictName, dictType } = filter

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('status', {
            initialValue: status,
          })(
            <Select
              style={{ width: '100%' }}
              placeholder="状态"
              onChange={this.handleChange.bind(this, 'status')}
            >
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">正常</Select.Option>
              <Select.Option value="1">停用</Select.Option>
            </Select>
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('dictName', {
            initialValue: dictName,
          })(
            <Input
              style={{ width: '100%' }}
              placeholder={`请输入字典名称`}
              onChange={this.handleChange.bind(this, 'dictName')}
            />
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('dictType', {
            initialValue: dictType,
          })(
            <Input
              style={{ width: '100%' }}
              placeholder={`请输入字典类型`}
              onChange={this.handleChange.bind(this, 'dictType')}
            />
          )}
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 10 }}
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
        </Col>
        <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
          <Button type="primary" icon="plus" onClick={onAdd}>
            新增
          </Button>
        </Col>
      </Row>
    )
  }
}

DictTypeFilter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default DictTypeFilter
