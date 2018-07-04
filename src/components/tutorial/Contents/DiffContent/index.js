import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { faTimes, faFile } from '@fortawesome/fontawesome-free-solid'

import storage from '../../../../utils/storage';
import Button from '../../../common/Button';
import FaIcon from '../../../common/FaIcon'
import DiffsList from './DiffsList';
import FilesTree from './FilesTree';

const filesTreeBarFontSize = 15;
const filesTreeBarHeight = '45px';
const filesTreeWidth = '280px';

const Container = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.white};
  color: ${({theme}) => theme.lightBlack};
  font-weight: normal;
  font-size: 14px;
`

const Content = styled.div`
  float: left;
  min-width: calc(100% - ${filesTreeWidth});
  max-width: 100%;
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
`

const FaClose = styled(FaIcon).attrs({
  icon: faTimes,
  size: filesTreeBarFontSize,
}) `
  color: black;
  cursor: pointer;
`

const FaFile = styled(FaIcon).attrs({
  icon: faFile,
  size: 25,
}) `
  color: black;
`

const FilesTreeContainer = styled.div `
  float: left;
  width: ${filesTreeWidth};
  height: 100%;
  overflow: overlay;

  // 'react-treebeard' is not set in a way that its classes or style can be modified
  // else wise
  & > ul {
    height: calc(100% - ${filesTreeBarHeight});
    padding-top: 10px !important;
    overflow: overlay;
    clear: both;
  }
`

const FilesTreeBar = styled.div`
  width: 100%;
  height: ${filesTreeBarHeight};
  background-color: #2f353e;
  font-size: ${filesTreeBarFontSize}px;
  line-height: ${filesTreeBarHeight};
  color: white;
  padding: 0 10px;
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

const ActionButtons = styled.div`
  margin: 25px 15px;
`

const ActionButton = Button.extend`
  width: 120px;
  height: 50px;
  color: ${({ theme }) => theme.primaryBlue};
  background-color: ${({ theme }) => theme.white};
  padding: 10px;
  border-radius: 5px;
  float: right;
  margin: 0px 5px;
  outline: none;

  &:hover {
    background-color: #e8e8e8;
  }
`

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      diffPaths: [],
      pickingFiles: true,
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
    const contentStyle = {}

    if (this.state.pickingFiles) {
      contentStyle.width = `calc(100% - ${filesTreeWidth})`
    } else {
      contentStyle.width = '100%'
    }

    return (
      <Container>
        {this.state.pickingFiles && (
          <FilesTreeContainer>
            <FilesTreeBar>
              <div style={{ float: 'left' }}>
                Pick Files
              </div>
              <div style={{ float: 'right' }}>
                <FaClose onClick={this.toggleFilePicking.bind(this)} />
              </div>
            </FilesTreeBar>
            <FilesTree cache={this} diff={this.props.diff} addFile={this.addFileDiff} removeFile={this.removeFileDiff} />
          </FilesTreeContainer>
        )}

        <Content style={contentStyle}>
          <Title>$ tortilla release diff {this.props.srcVersion} {this.props.destVersion}</Title>

          <ActionButtons>
            {this.props.diff && (
              <ActionButton onClick={this.toggleDiffViewType}>{this.viewTypeAction}</ActionButton>
            )}
            {!this.state.pickingFiles && (
              <ActionButton onClick={this.toggleFilePicking.bind(this)}>pick</ActionButton>
            )}
          </ActionButtons>

          {this.props.diff ? (
            <span>
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
      </Container>
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

  toggleFilePicking() {
    this.setState({
      pickingFiles: !this.state.pickingFiles
    })
  }
}
