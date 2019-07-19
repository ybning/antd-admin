import React from 'react'
import { connect } from 'dva'
import { Tree, Input, Row, Col } from 'antd'

const { TreeNode } = Tree
const { Search } = Input

const x = 3
const y = 2
const z = 1
const gData = []

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0'
  const tns = _tns || gData

  const children = []
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`
    tns.push({ title: key, key })
    if (i < y) {
      children.push(key)
    }
  }
  if (_level < 0) {
    return tns
  }
  const level = _level - 1
  children.forEach((key, index) => {
    tns[index].children = []
    return generateData(level, key, tns[index].children)
  })
}
generateData(z)

const dataList = []
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const { key } = node
    dataList.push({ key, title: key })
    if (node.children) {
      generateList(node.children)
    }
  }
}
generateList(gData)

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

@connect(({ thing, loading }) => ({
  thing,
  loading,
}))
class ThingGroupTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  onChange = e => {
    const {
      thing: { thingGroupList: treeData },
    } = this.props
    const { value } = e.target
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    })
  }

  onSelect = (selectedKeys, { selected, selectedNodes, node, event }) => {
    this.props.onTreeSelectNode(node)
  }

  onClickAddThingGroup = () => {
    this.props.onClickAddThingGroup()
  }

  render() {
    const { treeData } = this.props
    const { searchValue, expandedKeys, autoExpandParent } = this.state
    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue)
        const beforeStr = item.title.substr(0, index)
        const afterStr = item.title.substr(index + searchValue.length)
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            item.title
          )
        //
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title} data={item}>
              {loop(item.children)}
            </TreeNode>
          )
        }
        return <TreeNode key={item.key} title={title} data={item} />
      })
    return (
      <div>
        <Row gutter={8}>
          <Col md={24}>
            <Search
              style={{ marginBottom: 8 }}
              placeholder="搜索"
              onChange={this.onChange}
            />
          </Col>
          {/* <Col md={4}>
            <Button type="primary" icon="plus" shape="circle" onClick={this.onClickAddThingGroup.bind(this)} />
          </Col> */}
        </Row>
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.onSelect}
        >
          {loop(treeData)}
        </Tree>
      </div>
    )
  }
}

export default ThingGroupTree
