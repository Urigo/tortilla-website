import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

import storage from '../../../../utils/storage';
import Button from '../../../common/Button';
import FaIcon from '../../../common/FaIcon'
import DiffsList from './DiffsList';
import FilesTree from './FilesTree';

const filesTreeBarFontSize = 15;
const filesTreeBarHeight = '45px';
const filesTreeWidth = '280px';
const filesFiltersHeight = '90px';

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
  padding: 0 10px;
  font-size: 14px;
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
    scrollerStyle: {},
    scrollerHeight: '100%',
  }

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

  componentDidMount() {
    window.addEventListener('scroll', this.resetFilesPickerDimensions, true)

    this.resetFilesPickerDimensions()
  }

  componentShouldUpdate(props) {
    return (
      (
        props.hasOwnProperty('scrollerStyle') &&
        props.scrollerStyle !== this.props.scrollerStyle
      ) || (
        props.hasOwnProperty('scrollerHeight') &&
        props.scrollerHeight !== this.props.scrollerHeight
      )
    )
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.resetFilesPickerDimensions, true)

    this.props.scrollerStyle.height = this.props.scrollerHeight
  }

  setState(state, callback) {
    super.setState(state, callback)

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
      default:
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

    // Any time parent components have changed, this render method will be invoked,
    // thus, the dimensions will always be updated
    if (this.state.pickingFiles) {
      contentStyle.width = `calc(100% - ${filesTreeWidth})`
      contentStyle.marginLeft = filesTreeWidth
      this.props.scrollerStyle.height = `calc(${this.props.scrollerHeight} - ${filesFiltersHeight})`
      this.resetFilesFiltersDimensions()
    } else {
      contentStyle.width = '100%'
      contentStyle.marginLeft = 0
      this.props.scrollerStyle.height = this.props.scrollerHeight
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
                <FaClose onClick={this.toggleFilePicking} />
              </div>
            </FilesTreeBar>
            <FilesTree
              cache={this}
              diff={this.props.diff}
              addFile={this.addFileDiff}
              removeFile={this.removeFileDiff}
              includePattern={this.state.includePattern}
              excludePattern={this.state.excludePattern}
            />
            <FilesFilters ref={ref => this.filesFilters = ReactDOM.findDOMNode(ref)}>
              <FileFilter
                onChange={this.includeFiles}
                placeholder="Include files (regular expression)..."
              />
              <FileFilter
                onChange={this.excludeFiles}
                placeholder="Exclude files (regular expression)..."
              />
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
              <ActionButton onClick={this.toggleFilePicking}>pick</ActionButton>
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

  toggleFilePicking = () => {
    this.setState({
      pickingFiles: !this.state.pickingFiles
    }, () => {
      if (this.state.pickingFiles) {
        this.resetFilesPickerDimensions();
      }
    })
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

    if (index !== -1) {
      this.state.diffPaths.splice(index, 1)
      this.forceUpdate()
    }
  }

  resetFilesPickerDimensions = (e) => {
    if (!this.container) return
    if (!this.filesPicker) return
    if (e && !e.target.contains(this.filesPicker)) return

    const { top } = this.container.getBoundingClientRect()
    this.filesPicker.style.top = Math.max(top, 0) + 'px'
  }

  resetFilesFiltersDimensions = () => {
    if (!this.filesFilters) return

    const { left } = this.filesFilters.getBoundingClientRect()
    this.filesFilters.style.width = `calc(100% - ${left}px)`
  }

  includeFiles = (e) => {
    this.setState({
      includePattern: createPattern(e.target.value)
    })
  }

  excludeFiles = (e) => {
    this.setState({
      excludePattern: createPattern(e.target.value)
    })
  }
}

// This will ensure that the application won't crash even if the typed RegExp is invalid
function createPattern(str) {
  if (!str) return ''

  try {
    return new RegExp(str)
  } catch (e) {
    return ''
  }
}
