import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Divider, Modal } from 'antd'
import styles from './Table.less'

/**
 * 角色列表
 */
class RoleTable extends PureComponent {
  columns = [
    {
      title: '名字',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '角色权限字符串',
      dataIndex: 'roleKey',
      key: 'roleKey',
    },
    {
      title: '显示顺序',
      dataIndex: 'roleSort',
      key: 'roleSort',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'opt',
      render: (text, record) => {
        return (
          <div>
            <Button size="small" onClick={this.onClickEdit.bind(this, record)}>
              编辑
            </Button>
            <Divider type="vertical" />
            <Button
              size="small"
              onClick={this.onClickDelete.bind(this, record)}
            >
              删除
            </Button>
          </div>
        )
      },
    },
  ]

  //编辑
  onClickEdit = record => {
    this.props.onEditItem(record)
  }

  //删除
  onClickDelete = record => {
    const { onDeleteItem } = this.props
    Modal.confirm({
      title: `确认删除 角色：${record.roleName} 吗？`,
      onOk() {
        onDeleteItem(record.id)
      },
    })
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
        scroll={{ x: 1200 }}
        columns={this.columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

RoleTable.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onClickAdd: PropTypes.func,
  location: PropTypes.object,
}

export default RoleTable
