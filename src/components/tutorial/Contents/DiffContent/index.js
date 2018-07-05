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
const filesFiltersHeight = '80px';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.white};
  color: ${({theme}) => theme.lightBlack};
  font-weight: normal;
  font-size: 14px;
`

const Content = styled.div`
  float: left;
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

const FilesPicker = styled.div `
  position: fixed;
  overflow: overlay;
  width: 100%;
  bottom: 0;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  // 'react-treebeard' is not set in a way that its classes or style can be modified
  // else wise
  & > ul {
    width: ${filesTreeWidth};
    height: calc(100% - ${filesTreeBarHeight});
    padding-top: 10px !important;
    overflow: overlay;
    clear: both;
  }
`

const FilesTreeBar = styled.div`
  width: ${filesTreeWidth};
  height: ${filesTreeBarHeight};
  background-color: #2f353e;
  font-size: ${filesTreeBarFontSize}px;
  line-height: ${filesTreeBarHeight};
  color: white;
  padding: 0 10px;
`

const FilesFilters = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  right: 0;
  left: ${filesTreeWidth};
  height: ${filesFiltersHeight};
  background-color: #2f353e;
  bottom: 0;
`

const FileFilter = styled.input`
  margin: 5px 10px;
  flex-grow: 1;
  height: ${parseInt(filesFiltersHeight) / 2 - 15}px;
  background-color: #22262b;
  outline: none;
  border: none;
  color: #9da5ab;
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
  static defaultProps = {
    containerStyle: {}
  }

  constructor(props) {
    super(props)

    this.state = {
      diffPaths: [],
      pickingFiles: true,
    }

    this.originalContainerHeight = '100%'

    let diffViewType = storage.getItem('diff-view-type')

    if (!diffViewType) {
      diffViewType = 'unified'
      storage.setItem('diff-view-type', diffViewType)
    }

    this.state.diffViewType = diffViewType

    this.resetDiffTypeParams()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.resetFilesPickerDimensions, true)

    this.resetFilesPickerDimensions()
  }

  componentWillReceiveProps(props) {
    if (props.hasOwnProperty('style') && props.containerStyle !== this.props.containerStyle) {
      this.originalContainerHeight = props.style.height
      this.forceUpdate()
    }
  }

  componentWillUpdate(props, state) {
    this.resetDiffTypeParams(state)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.resetFilesPickerDimensions, true)
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
      contentStyle.marginLeft = filesTreeWidth
      this.props.containerStyle.height = `calc(${this.originalContainerHeight} - ${filesFiltersHeight})`
    } else {
      contentStyle.width = '100%'
      contentStyle.marginLeft = 0
      this.props.containerStyle.height = this.originalContainerHeight
    }

    return (
      <Container ref={ref => this.container = ReactDOM.findDOMNode(ref)}>
        {this.state.pickingFiles && (
          <FilesPicker ref={ref => this.filesPicker = ReactDOM.findDOMNode(ref)}>
            <FilesTreeBar>
              <div style={{ float: 'left' }}>
                Pick Files
              </div>
              <div style={{ float: 'right' }}>
                <FaClose onClick={this.toggleFilePicking.bind(this)} />
              </div>
            </FilesTreeBar>
            <FilesTree cache={this} diff={this.props.diff} addFile={this.addFileDiff} removeFile={this.removeFileDiff} />
            <FilesFilters>
              <FileFilter />
              <FileFilter />
            </FilesFilters>
          </FilesPicker>
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
    }, () => {
      if (this.state.pickingFiles) {
        this.resetFilesPickerDimensions();
      }
    })
  }

  resetFilesPickerDimensions = (e) => {
    if (!this.container) return
    if (!this.filesPicker) return
    if (e && !e.target.contains(this.filesPicker)) return

    const { top } = this.container.getBoundingClientRect()
    this.filesPicker.style.top = Math.max(top, 0) + 'px'
  }
}
