import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Badge, Divider, Modal, Switch } from 'antd'
import styles from './Table.less'

/**
 * 物联配置列表
 */
class IotTable extends PureComponent {
  columns = [
    {
      title: '名称',
      dataIndex: 'iotName',
      key: 'iotName',
      //width: 80,
      //fixed: 'left',
    },
    {
      title: '所属平台',
      dataIndex: 'iotPlatform',
      key: 'iotPlatform',
      //width: 200,
    },
    {
      title: 'accessKey',
      dataIndex: 'accessKey',
      key: 'accessKey',
      //width: 150,
    },
    {
      title: 'accessSecret',
      dataIndex: 'accessSecret',
      key: 'accessSecret',
      //width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      //width: 100,
      render: (text, record) => {
        //return <Badge status={['success','error'][text]} text={['启用','停用'][text]}/>
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="停用"
            checked={!Boolean(record.status)}
            onClick={this.onChangeStatus.bind(this, record)}
          />
        )
      },
    },
    {
      title: '操作',
      key: 'opt',
      //fixed: 'right',
      render: (text, record) => {
        return (
          <div>
            <Button size="small" onClick={this.onEditIot.bind(this, record)}>
              编辑
            </Button>
          </div>
        )
      },
    },
  ]

  //编辑
  onEditIot = record => {
    this.props.onEditItem(record)
  }

  // 启用/停用
  onChangeStatus(record) {
    this.props.onChangeStatus(record)
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

IotTable.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default IotTable
