import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Badge, Divider, Modal, Drawer, Tag } from 'antd'
import styles from './Table.less'

/**
 * 字典列表
 */
class DictTypeTable extends PureComponent {
  columns = [
    {
      title: '字典名称',
      dataIndex: 'dictLabel',
      key: 'dictLabel',
      width: 220,
      render: (text, record) => {
        const { isDefault } = record
        return (
          <span>
            {text} {isDefault == '0' ? <Tag color="blue">默认</Tag> : null}
          </span>
        )
      },
    },
    {
      title: '字典类型',
      dataIndex: 'dictType',
      key: 'dictType',
      width: 150,
    },
    {
      title: '字典键值',
      dataIndex: 'dictValue',
      key: 'dictValue',
      width: 150,
    },
    {
      title: '字典排序',
      dataIndex: 'dictSort',
      key: 'dictSort',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: text => {
        return (
          <Badge
            status={['success', 'error'][text]}
            text={['正常', '停用'][text]}
          />
        )
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 150,
    },
    {
      title: '操作',
      width: 250,
      fixed: 'right',
      render: row => {
        return (
          <div>
            <Button size="small" onClick={this.onEditDict.bind(this, row)}>
              编辑
            </Button>
            <Divider type="vertical" />
            <Button
              type="primary"
              size="small"
              onClick={this.onAddDict.bind(this, row)}
            >
              新增
            </Button>
            <Divider type="vertical" />

            <Button size="small" onClick={this.onConfirmDel.bind(this, row)}>
              删除
            </Button>
          </div>
        )
      },
    },
  ]

  //编辑
  onEditDict = record => {
    this.props.onEditItem(record)
  }

  //字典配置
  onAddDict = record => {
    this.props.onAddDict(record)
  }

  //删除
  onConfirmDel = record => {
    const { onDeleteItem } = this.props
    Modal.confirm({
      title: `确认删除 字典：${record.dictLabel} 吗？`,
      onOk() {
        onDeleteItem(record.id)
      },
    })
  }

  onCloseDrawer = () => {
    this.props.onCloseDrawer()
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props
    return (
      <Drawer
        placement="right"
        {...tableProps}
        title="字典列表"
        onClose={this.onCloseDrawer.bind(this)}
      >
        {/* <Button type="primary" icon="plus" onClick={onAdd}>
          新增
        </Button> */}
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
      </Drawer>
    )
  }
}

DictTypeTable.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onSetting: PropTypes.func,
  location: PropTypes.object,
}

export default DictTypeTable
