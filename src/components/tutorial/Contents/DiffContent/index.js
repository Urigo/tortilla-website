import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import storage from '../../../../utils/storage';
import Button from '../../../common/Button';
import FilesTree from './FilesTree';
import DiffsList from './DiffsList';

const Content = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.white};
  color: ${({theme}) => theme.lightBlack};
  font-weight: normal;
  font-size: 14px;
  overflow-y: auto;
`

const Title = styled.div`
  margin: 40px;
  font-size: 24px;
  font-family: monospace;
  float: left;
`

const NoDiff = styled.div`
  width: 100%;
  height: 200px;
  line-height: 200px;
  clear: both;
  text-align: center;
`

const ViewTypeButton = Button.extend`
  width: 120px;
  height: 50px;
  color: ${({ theme }) => theme.primaryBlue};
  background-color: ${({ theme }) => theme.white};
  padding: 10px;
  border-radius: 5px;
  float: right;
  margin: 25px 20px;
  outline: none;

  &:hover {
    background-color: #e8e8e8;
  }
`

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      diffPaths: []
    }

    let diffViewType = storage.getItem('diff-view-type')

    if (!diffViewType) {
      diffViewType = 'unified'
      storage.setItem('diff-view-type', diffViewType)
    }

    this.state.diffViewType = diffViewType

    this.resetDiffTypeParams()
  }

  componentWillUpdate(props, state) {
    this.resetDiffTypeParams(state)
  }

  resetDiffTypeParams(state = this.state) {
    switch (state.diffViewType) {
      case 'split':
        this.oppositeViewType = 'unified'
        this.viewTypeAction = 'unify'
        break
      case 'unified':
        this.oppositeViewType = 'split'
        this.viewTypeAction = 'split'
        break
    }
  }

  toggleDiffViewType = () => {
    this.setState({
      diffViewType: this.oppositeViewType
    }, () => {
      storage.setItem('diff-view-type', this.state.diffViewType)
    })
  }

  render() {
    return (
      <Content>
        <FilesTree diff={this.props.diff} addFile={this.addFileDiff} removeFile={this.removeFileDiff} />

        <Title>$ tortilla release diff {this.props.srcVersion} {this.props.destVersion}</Title>
        {this.props.diff ? (
          <span>
            <ViewTypeButton onClick={this.toggleDiffViewType}>{this.viewTypeAction}</ViewTypeButton>
            <DiffsList
              diff={this.props.diff}
              diffType={this.state.diffViewType}
              paths={this.state.diffPaths}
              baseUrl={this.props.tutorialRepo}
              srcHistoryObject={this.props.srcHistory}
              destHistoryObject={this.props.destHistory}
            />
          </span>
        ) : (
          <NoDiff>There are no visible changes between the versions :-)</NoDiff>
        )}
      </Content>
    )
  }

  addFileDiff = (path) => {
    if (!this.state.diffPaths.includes(path)) {
      this.setState({
        diffPaths: [...this.state.diffPaths, path]
      })
    }
  }

  removeFileDiff = (path) => {
    const index = this.state.diffPaths.indexOf(path)

    if (index != -1) {
      this.state.diffPaths.splice(index, 1)
      this.forceUpdate()
    }
  }
}
