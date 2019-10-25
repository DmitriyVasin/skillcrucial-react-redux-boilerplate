import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Head from './head'
import { getData } from '../redux/reducers/users'

const Dummy = (props) => {
  const [counter] = useState(4)
  const [pageIndex, setPageIndex] = useState(1)
  const { getData: getDataProps } = props
  useEffect(() => {
    getDataProps(pageIndex)
  }, [getDataProps, pageIndex])
  return (
    <div>
      <Head title="Hello" />
      {/* <div> { JSON.stringify(props.isRequesting) } </div> */}
      <div> Page: { pageIndex + 1} Qt/page: { props.users.length } Total: { props.total } MaxPage: {props.maxPage}</div>
      {/* <div> Hello World {counter} </div> */}
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Company</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {
            props.users.map((user) => (
              <tr>
                <td><img src={user.avatar} alt="" /></td>
                <td>{user.userName}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.country}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.company}</td>
                <td>{user.salary}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <button type="button" onClick={() => { setPageIndex(Math.max(0, pageIndex - 1)) }}>Previous</button>
      <button type="button" onClick={() => { setPageIndex(Math.min(pageIndex + 1, props.maxPage - 1)) }}>Next</button>
      <img src={`/tracker/${counter}.gif`} alt="tracker" />
    </div>
  )
}

Dummy.propTypes = {}

const mapStateToProps = (state) => ({
  users: state.users.list,
  total: state.users.total,
  maxPage: state.users.maxPage,
  isRequesting: state.users.isRequesting
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ getData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dummy)
