import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import storage from '../../../../utils/storage'
import Button from '../../../common/Button'
import SocialHelmet from '../../../common/SocialHelmet'
import DiffsList from './DiffsList'

const filesTreeBarHeight = '63px'
const filesFiltersHeight = '45px'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.lightBlack};
  font-weight: normal;
  font-size: 14px;
`

const Content = styled.div`
  float: left;
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
`

const FilesPicker = styled.div`
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
    height: calc(100% - ${filesTreeBarHeight});
    padding-top: 10px !important;
    overflow: overlay;
    clear: both;
  }
`

const FilesPickerStretcher = styled.div`
  position: fixed;
  width: 10px;
  bottom: 0;
  cursor: ew-resize;
`

const FilesHeader = styled(require('./FilesHeader').default)`
  border-right: 1px solid ${props => props.theme.separator};
  display: block;
`

const FilesTree = styled(require('./FilesTree').default)`
  height: calc(100% - ${filesTreeBarHeight} - ${filesFiltersHeight});
  border-right: 1px solid ${props => props.theme.separator};
  overflow-y: overlay;
  overflow-x: hidden;
`

const FilesFilters = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  left: 0;
  height: ${filesFiltersHeight};
  border: 1px solid ${props => props.theme.separator};
  bottom: 0;
`

const FileFilter = styled.input`
  margin: 5px 10px;
  padding: 0 10px;
  font-size: 14px;
  flex-grow: 1;
  height: ${parseInt(filesFiltersHeight) / 2 - 15}px;
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

const ActionButton = styled(Button)`
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
      filesTreeWidth: 280,
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
    this.setState(
      {
        diffViewType: this.oppositeViewType,
      },
      () => {
        storage.setItem('diff-view-type', this.state.diffViewType)
      }
    )
  }

  render() {
    const filesTreeStyle = { width: this.state.filesTreeWidth + 'px' }
    const stretcherStyle = { left: this.state.filesTreeWidth - 5 + 'px' }
    const contentStyle = {}

    // Any time parent components have changed, this render method will be invoked,
    // thus, the dimensions will always be updated
    if (this.state.pickingFiles) {
      contentStyle.width = `calc(100% - ${this.state.filesTreeWidth}px)`
      contentStyle.marginLeft = this.state.filesTreeWidth
      this.props.scrollerStyle.height = `calc(${
        this.props.scrollerHeight
      } - ${filesFiltersHeight})`
    } else {
      contentStyle.width = '100%'
      contentStyle.marginLeft = 0
      this.props.scrollerStyle.height = this.props.scrollerHeight
    }

    return (
      <Container ref={ref => (this.container = ReactDOM.findDOMNode(ref))}>
        <SocialHelmet
          description={`${this.props.tutorialTitle} - What's new in v${
            this.props.srcVersion
          }`}
          image={this.props.tutorialImage}
        />
        {this.state.pickingFiles && (
          <>
            <FilesPicker
              ref={ref => (this.filesPicker = ReactDOM.findDOMNode(ref))}
            >
              <FilesHeader
                opened={this.state.pickingFiles}
                close={this.toggleFilePicking}
                open={this.toggleFilePicking}
                style={filesTreeStyle}
              />
              <FilesTree
                style={filesTreeStyle}
                cache={this}
                diff={this.props.diff}
                showFiles={this.showDiffFiles}
                includePattern={this.state.includePattern}
                excludePattern={this.state.excludePattern}
              />
              <FilesFilters style={filesTreeStyle}>
                <FileFilter
                  onChange={this.includeFiles}
                  placeholder="🔍 Search files (regexp)"
                />
              </FilesFilters>
            </FilesPicker>
            <FilesPickerStretcher
              ref={ref =>
                (this.filesPickerStretcher = ReactDOM.findDOMNode(ref))
              }
              style={stretcherStyle}
              onMouseDown={this.startStretchingFilePicker}
            />
          </>
        )}

        <Content style={contentStyle}>
          <Title>
            $ tortilla release diff {this.props.srcVersion}{' '}
            {this.props.destVersion}
          </Title>

          <ActionButtons>
            {this.props.diff && (
              <ActionButton onClick={this.toggleDiffViewType}>
                {this.viewTypeAction}
              </ActionButton>
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
                baseUrl={this.props.tutorial.repo}
                srcHistoryObject={this.props.srcHistory}
                destHistoryObject={this.props.destHistory}
              />
            </span>
          ) : (
            <NoDiff>
              There are no visible changes between the versions :-)
            </NoDiff>
          )}
        </Content>
      </Container>
    )
  }

  toggleFilePicking = () => {
    this.setState(
      {
        pickingFiles: !this.state.pickingFiles,
      },
      () => {
        if (this.state.pickingFiles) {
          this.resetFilesPickerDimensions()
        }
      }
    )
  }

  showDiffFiles = diffPaths => {
    this.setState({
      diffPaths,
    })
  }

  resetFilesPickerDimensions = e => {
    if (!this.container) return
    if (!this.filesPicker) return
    if (e && !e.target.contains(this.filesPicker)) return

    let { top } = this.container.getBoundingClientRect()
    top = Math.max(top, 0) + 'px'

    this.filesPicker.style.top = top
    this.filesPickerStretcher.style.top = top
  }

  includeFiles = e => {
    this.setState({
      includePattern: createPattern(e.target.value),
    })
  }

  excludeFiles = e => {
    this.setState({
      excludePattern: createPattern(e.target.value),
    })
  }

  startStretchingFilePicker = e => {
    document.addEventListener('mousemove', this.stretchFilePicker)
    document.addEventListener('mouseup', this.stopStretchingFilePicker)

    this._clientX = e.clientX
  }

  stretchFilePicker = e => {
    const deltaClientX = e.clientX - this._clientX
    this._clientX = e.clientX

    const filesTreeWidth = this.state.filesTreeWidth + deltaClientX

    if (filesTreeWidth >= 200 && filesTreeWidth <= 600)
      this.setState({
        filesTreeWidth,
      })
  }

  stopStretchingFilePicker = e => {
    document.removeEventListener('mousemove', this.stretchFilePicker)
    document.removeEventListener('mouseup', this.stopStretchingFilePicker)
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
