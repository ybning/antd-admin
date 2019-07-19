import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Divider, Modal } from 'antd'
import styles from './Table.less'

/**
 * 菜单列表
 */
class MenuTable extends PureComponent {
  columns = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      key: 'orderNum',
    },
    {
      title: '请求地址',
      dataIndex: 'routePath',
      key: 'routePath',
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render: value => ['目录', '菜单', '按钮', '其它'][value],
    },
    {
      title: '状态',
      dataIndex: 'visible',
      key: 'visible',
      render: value => ['显示', '隐藏'][value],
    },
    {
      title: '权限标识',
      dataIndex: 'perms',
      key: 'perms',
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
            <Button size="small" onClick={this.onClickAdd.bind(this, record)}>
              新增
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

  //新增子菜单
  onClickAdd = record => {
    this.props.onAddChild(record)
  }

  //删除
  onClickDelete = record => {
    const { onDeleteItem } = this.props
    Modal.confirm({
      title: `确认删除 菜单：${record.menuName} 吗？`,
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

MenuTable.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onClickAdd: PropTypes.func,
  location: PropTypes.object,
}

export default MenuTable
