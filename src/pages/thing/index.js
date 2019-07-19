import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
//import styles from './index.less'
//import store from 'store'
import { router } from 'utils'
import { stringify } from 'qs'

// import ThingFilter from './components/ThingFilter'
// import ThingTable from './components/ThingTable'
// import ThingModal from './components/ThingModal'
import { Row, Col, Tabs, Modal, message } from 'antd'

import ThingGroupTree from './components/ThingGroupTree'
import ThingGroupModal from './components/ThingGroupModal'
import ThingModal from './components/ThingModal'
import ThingBasic from './components/ThingBasic'

import ThingProductFilter from './components/ThingProductFilter'
import ThingProductTable from './components/ThingProductTable'
import ThingProductModal from './components/ThingProductModal'

const { TabPane } = Tabs

//物模型配置
@connect(({ thing, loading }) => ({
  thing,
  loading,
  //queryLoading: loading.effects['dict/query'],
}))
class Thing extends PureComponent {
  componentDidMount() {
    //this.handleRefresh({ page: 1, pageSize: 10 });
    const { dispatch } = this.props
    dispatch({
      type: 'thing/queryThingGroupList',
    })
    dispatch({
      type: 'thing/queryThingModelList',
    })
    dispatch({
      type: 'thing/queryDataByTypes',
      payload: {
        dictTypes: 'thing_type',
      },
    })
  }

  handleRefresh = newQuery => {
    const { location, dispatch } = this.props
    const { query, pathname } = location
    const payload = {
      ...query,
      ...newQuery,
    }
    dispatch({
      type: 'thing/query',
      payload,
    })
    router.push({
      pathname,
      search: stringify(payload, { arrayFormat: 'repeat' }),
    })
  }

  //tab切换时，触发
  onTabChange = activeKey => {
    const { dispatch, thing } = this.props
    const { curTreeOptItem } = thing
    //基本信息
    if (activeKey === '1') {
    }
    //数据项
    else if (activeKey === '2') {
    }
    //关联产品
    else if (activeKey === '3') {
      dispatch({
        type: 'thing/queryProductsByTid',
        payload: {
          tid: curTreeOptItem.tid,
        },
      })
      dispatch({
        type: 'thing/queryEnabledIotConfigList',
      })
    }
    dispatch({
      type: 'thing/update',
      payload: {
        tabActiveKey: activeKey,
      },
    })
  }

  render() {
    const { location, dispatch, thing, loading } = this.props
    //const { query } = location
    const {
      thingGroupList,
      //thingModelList,
      //dictKeyList,
      //curTreeOptDeep,
      currentItem,
      modalType,
      modalVisible,
      thingProductList,
      pagination,

      tabActiveKey,
      curTreeOptItem,

      enabledIotConfigList,
      iotProductList,
    } = thing

    // const thingFilterProps = {
    //   filter: {
    //     ...query,
    //   },
    //   onFilterChange: value => {
    //     this.handleRefresh({
    //       ...value,
    //     })
    //   },
    //   onAdd() {
    //     dispatch({
    //       type: 'thing/showModal',
    //       payload: {
    //         modalType: 'createThing',
    //       },
    //     })
    //     dispatch({
    //       type: 'thing/getThingPlatforms',
    //     });
    //   },
    // }

    const thingGroupTreeProps = {
      treeData: thingGroupList,
      queryThingGroupListLoading: loading.effects['thing/queryThingGroupList'],
      onClickAddThingGroup: () => {
        dispatch({
          type: 'thing/showModal',
          payload: {
            modalType: 'createThingGroup',
          },
        })
      },
      onTreeSelectNode: node => {
        const { data } = node.props
        const { deep, tid } = data
        if (deep === '1') {
          dispatch({
            type: 'thing/update',
            payload: {
              tabActiveKey: '1',
            },
          })
        } else if (deep === '2') {
          dispatch({
            type: 'thing/queryThingByTid',
            payload: {
              tid,
            },
          })
        }
        dispatch({
          type: 'thing/updateCurTreeOptItem',
          payload: {
            curTreeOptItem: data,
          },
        })
      },
    }

    const thingGroupModalProps = {
      item: modalType === 'createThingGroup' ? {} : currentItem,
      visible:
        modalVisible &&
        (modalType === 'createThingGroup' || modalType === 'updateThingGroup'),
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`thing/${modalType}`],
      title: `${
        modalType === 'createThingGroup' ? `新增物模型分组` : `编辑物模型分组`
      }`,
      centered: true,
      onOk: data => {
        dispatch({
          type: `thing/${modalType}`,
          payload: data,
        })
        //.then(() => {
        //this.handleRefresh();
        dispatch({
          type: 'thing/queryThingGroupList',
        })
        dispatch({
          type: 'thing/hideModal',
        })
        //})
      },
      onCancel() {
        dispatch({
          type: 'thing/hideModal',
        })
      },
    }

    const thingModalProps = {
      item: {}, //modalType === 'createThing' ? {} : currentItem,
      //visible: modalVisible,
      visible:
        modalVisible &&
        (modalType === 'createThing' || modalType === 'updateThing'),
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`thing/${modalType}`],
      title: `${modalType === 'createThing' ? `新增物模型` : `编辑物模型`}`,
      centered: true,
      onOk: data => {
        dispatch({
          type: `thing/${modalType}`,
          payload: data,
        }).then(() => {
          //this.handleRefresh();
          dispatch({
            type: 'thing/queryThingGroupList',
          })
          dispatch({
            type: 'thing/hideModal',
          })
        })
      },
      onCancel() {
        dispatch({
          type: 'thing/hideModal',
        })
      },
    }

    const thingBasicProps = {
      // thingGroupList,
      // queryThingGroupListLoading: loading.effects['thing/queryThingGroupList'],
      // thingModelList,
      // queryThingModelListLoading: loading.effects['thing/queryThingModelList'],
      // dictKeyList,
      onClickAddThing: groupId => {
        dispatch({
          type: 'thing/showModal',
          payload: {
            modalType: 'createThing',
          },
        })
      },
    }

    const thingProductFilterProps = {
      // filter: {
      //   ...query,
      // },
      // onFilterChange: value => {
      //   this.handleRefresh({
      //     ...value,
      //   })
      // },
      onAdd() {
        dispatch({
          type: 'thing/showModal',
          payload: {
            modalType: 'createThingProduct',
          },
        })
        dispatch({
          type: 'thing/queryProductsByTid',
          payload: {
            tid: curTreeOptItem.tid,
          },
        })
      },
    }

    const thingProductTableProps = {
      dataSource: thingProductList,
      loading: loading.effects['thing/queryProductsByTid'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'thing/showModal',
          payload: {
            modalType: 'updateThingProduct',
            currentItem: item,
          },
        })
      },
      onDeleteItem: item => {
        Modal.confirm({
          title: `确认删除 ${item.iotName}吗？`,
          okText: '确认',
          cancelText: '取消',
          onOk() {
            dispatch({
              type: 'thing/delThingIotProById',
              payload: {
                id: item.id,
              },
            }).then(res => {
              dispatch({
                type: 'thing/queryProductsByTid',
                payload: {
                  tid: curTreeOptItem.tid,
                },
              })
            })
          },
          onCancel() {
            console.log('Cancel')
          },
        })
      },
    }

    const thingProductModalProps = {
      curTreeOptItem,
      enabledIotConfigList,
      iotProductList,
      item: modalType === 'createThingProduct' ? {} : currentItem,
      visible:
        modalVisible &&
        (modalType === 'createThingProduct' ||
          modalType === 'updateThingProduct'),
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`thing/${modalType}`],
      title: `${
        modalType === 'createThingProduct' ? `新增关联产品` : `编辑关联产品`
      }`,
      centered: true,
      onSelectChangeIot: iotId => {
        dispatch({
          type: 'thing/queryIotProductList',
          payload: {
            iotId,
          },
        })
      },
      onOk: data => {
        dispatch({
          type: `thing/${modalType}`,
          payload: data,
        }).then(() => {
          //this.handleRefresh();
          message.success('保存成功')
          dispatch({
            type: 'thing/queryProductsByTid',
            payload: {
              tid: curTreeOptItem.tid,
            },
          })
          dispatch({
            type: 'thing/hideModal',
          })
        })
      },
      onCancel() {
        dispatch({
          type: 'thing/hideModal',
        })
      },
    }

    const tabDisabled = curTreeOptItem.deep == '1'

    return (
      <Page
        //loading={queryLoading}
        inner
      >
        <Row gutter={16}>
          <Col md={4}>
            <ThingGroupTree {...thingGroupTreeProps} />
            <ThingGroupModal {...thingGroupModalProps} />
            <ThingModal {...thingModalProps} />
          </Col>
          <Col md={20}>
            <Tabs
              size="small"
              activeKey={tabActiveKey}
              onChange={this.onTabChange.bind(this)}
            >
              <TabPane tab="基本信息" key="1">
                <ThingBasic {...thingBasicProps} />
              </TabPane>
              <TabPane tab="数据项" key="2" disabled={tabDisabled}>
                Content of tab 2
              </TabPane>
              <TabPane tab="关联产品" key="3" disabled={tabDisabled}>
                <ThingProductFilter {...thingProductFilterProps} />
                <ThingProductTable {...thingProductTableProps} />
                <ThingProductModal {...thingProductModalProps} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Page>
    )
  }
}

Thing.propTypes = {
  thing: PropTypes.object,
  loading: PropTypes.object,
}

export default Thing
