import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Avatar, Popover, Badge, List, Button } from 'antd'
import { Ellipsis } from 'ant-design-pro'
import { setLocale } from 'utils'
import moment from 'moment'
import classnames from 'classnames'
import config from 'config'
import styles from './Header.less'

const { SubMenu } = Menu

class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }
  render() {
    const {
      i18n,
      fixed,
      avatar,
      username,
      collapsed,
      notifications,
      onCollapseChange,
      onAllNotificationsRead,
    } = this.props

    const rightContent = [
      <Button
        type="primary"
        shape="round"
        icon="cloud"
        size="small"
        href="/index.html#/main"
      >
        进入大屏端
      </Button>,
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>你好！</span>
              <span>{username}</span>
              <Avatar style={{ marginLeft: 8 }} src={avatar} />
            </Fragment>
          }
        >
          <Menu.Item key="SignOut">退出</Menu.Item>
        </SubMenu>
      </Menu>,
    ]

    // if (config.i18n) {
    //   const { languages } = config.i18n
    //   const currentLanguage = languages.find(
    //     item => item.key === i18n._language
    //   )

    //   rightContent.unshift(
    //     <Menu
    //       key="language"
    //       selectedKeys={[currentLanguage.key]}
    //       onClick={data => {
    //         setLocale(data.key)
    //       }}
    //       mode="horizontal"
    //     >
    //       <SubMenu title={<Avatar size="small" src={currentLanguage.flag} />}>
    //         {languages.map(item => (
    //           <Menu.Item key={item.key}>
    //             <Avatar
    //               size="small"
    //               style={{ marginRight: 8 }}
    //               src={item.flag}
    //             />
    //             {item.title}
    //           </Menu.Item>
    //         ))}
    //       </SubMenu>
    //     </Menu>
    //   )
    // }

    // rightContent.unshift(
    //   <Popover
    //     placement="bottomRight"
    //     trigger="click"
    //     key="notifications"
    //     overlayClassName={styles.notificationPopover}
    //     getPopupContainer={() => document.querySelector('#layoutHeader')}
    //     content={
    //       <div className={styles.notification}>
    //         <List
    //           itemLayout="horizontal"
    //           dataSource={notifications}
    //           locale={{
    //             emptyText: <Trans>You have viewed all notifications.</Trans>,
    //           }}
    //           renderItem={item => (
    //             <List.Item className={styles.notificationItem}>
    //               <List.Item.Meta
    //                 title={
    //                   <Ellipsis tooltip lines={1}>
    //                     {item.title}
    //                   </Ellipsis>
    //                 }
    //                 description={moment(item.date).fromNow()}
    //               />
    //               <Icon
    //                 style={{ fontSize: 10, color: '#ccc' }}
    //                 type="right"
    //                 theme="outlined"
    //               />
    //             </List.Item>
    //           )}
    //         />
    //         {notifications.length ? (
    //           <div
    //             onClick={onAllNotificationsRead}
    //             className={styles.clearButton}
    //           >
    //             <Trans>Clear notifications</Trans>
    //           </div>
    //         ) : null}
    //       </div>
    //     }
    //   >
    //     <Badge
    //       count={notifications.length}
    //       dot
    //       offset={[-10, 10]}
    //       className={styles.iconButton}
    //     >
    //       <Icon className={styles.iconFont} type="bell" />
    //     </Badge>
    //   </Popover>
    // )

    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
        id="layoutHeader"
      >
        <div
          className={styles.button}
          onClick={onCollapseChange.bind(this, !collapsed)}
        >
          <Icon
            type={classnames({
              'menu-unfold': collapsed,
              'menu-fold': !collapsed,
            })}
          />
        </div>

        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  notifications: PropTypes.array,
  onCollapseChange: PropTypes.func,
  onAllNotificationsRead: PropTypes.func,
}

export default Header
