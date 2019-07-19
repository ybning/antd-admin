import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Badge, Divider, Modal } from 'antd'
import styles from './Table.less'

/**
 * 字典类型列表
 */
class DictTypeTable extends PureComponent {
  columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      //width: 80,
      //fixed: 'left',
    },
    {
      title: '类型名称',
      dataIndex: 'dictName',
      key: 'dictName',
      //width: 200,
    },
    {
      title: '类型',
      dataIndex: 'dictType',
      key: 'dictType',
      //width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      //width: 100,
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
      //width: 150,
    },
    {
      title: '操作',
      key: 'opt',
      //fixed: 'right',
      render: (text, record) => {
        return (
          <div>
            <Button
              size="small"
              onClick={this.onEditDictType.bind(this, record)}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Button
              type="primary"
              size="small"
              onClick={this.onSettingDict.bind(this, record)}
            >
              字典配置
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
  onEditDictType = record => {
    this.props.onEditItem(record)
  }

  //字典配置
  onSettingDict = record => {
    this.props.onSetting(record)
  }

  //删除
  onClickDelete = record => {
    const { onDeleteItem } = this.props
    Modal.confirm({
      title: `确认删除 字典类型：${record.dictName} 吗？`,
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

DictTypeTable.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onSetting: PropTypes.func,
  location: PropTypes.object,
}

export default DictTypeTable
