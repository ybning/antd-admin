import React, { PureComponent } from 'react'
import { Table, Avatar } from 'antd'
import { Ellipsis } from 'ant-design-pro'
import styles from './List.less'

class List extends PureComponent {
  render() {
    const { ...tableProps } = this.props
    const columns = [
      {
        title: `Image`,
        dataIndex: 'image',
        render: text => <Avatar shape="square" src={text} />,
      },
      {
        title: `Title`,
        dataIndex: 'title',
        render: text => (
          <Ellipsis tooltip length={30}>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: `Author`,
        dataIndex: 'author',
      },
      {
        title: `Categories`,
        dataIndex: 'categories',
      },
      {
        title: `Tags`,
        dataIndex: 'tags',
      },
      {
        title: `Visibility`,
        dataIndex: 'visibility',
      },
      {
        title: `Comments`,
        dataIndex: 'comments',
      },
      {
        title: `Views`,
        dataIndex: 'views',
      },
      {
        title: `Publish Date`,
        dataIndex: 'date',
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `Total ${total} Items`,
        }}
        bordered
        scroll={{ x: 1200 }}
        className={styles.table}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

export default List
