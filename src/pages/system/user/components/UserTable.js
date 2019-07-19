import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Divider, Modal } from 'antd'
import styles from './Table.less'

/**
 * 用户列表
 */
class UserTable extends PureComponent {
  columns = [
    {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '姓名',
      dataIndex: 'fullName',
      key: 'fullName',
      //width: 150,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '角色名',
      dataIndex: 'roleNames',
      key: 'roleNames',
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
              onClick={this.onClickChangePwd.bind(this, record)}
            >
              修改密码
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

  //修改密码
  onClickChangePwd = record => {
    this.props.onChangePwd(record)
  }

  //删除
  onClickDelete = record => {
    const { onDeleteItem } = this.props
    Modal.confirm({
      title: `确认删除 用户：${record.userName} 吗？`,
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

UserTable.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onSetting: PropTypes.func,
  location: PropTypes.object,
}

export default UserTable
