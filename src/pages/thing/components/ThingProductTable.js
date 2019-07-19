import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
//import { connect } from 'dva'
import { Table, Button, Divider, Tooltip, Icon } from 'antd'
import styles from './Table.less'

/**
 * 关联产品列表
 */
class ThingProductTable extends PureComponent {
  columns = [
    {
      title: '物模型名称',
      dataIndex: 'thing.tname',
      key: 'thing.tname',
    },
    {
      title: '关联平台',
      dataIndex: 'iotName',
      key: 'iotName',
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '产品key',
      dataIndex: 'productKey',
      key: 'productKey',
    },
    {
      title: '产品密钥',
      dataIndex: 'productSecret',
      key: 'productSecret',
      render(value, record) {
        return value ? (
          <div>
            ******{' '}
            <Tooltip title={value}>
              <Icon type="up-circle" />
            </Tooltip>
          </div>
        ) : null
      },
    },
    {
      title: '操作',
      render: record => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={this.onEdit.bind(this, record)}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Button size="small" onClick={this.onDelete.bind(this, record)}>
              删除
            </Button>
          </div>
        )
      },
    },
  ]

  //编辑
  onEdit = record => {
    this.props.onEditItem(record)
  }

  //删除
  onDelete(record) {
    this.props.onDeleteItem(record)
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props
    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `共 ${total} 条`,
        }}
        className={styles.table}
        bordered
        //scroll={{ x: 1200 }}
        columns={this.columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

ThingProductTable.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default ThingProductTable
