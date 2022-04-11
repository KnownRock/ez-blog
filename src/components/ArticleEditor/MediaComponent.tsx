import {
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react'
import {
  ContentBlock,
  ContentState, EditorState,
} from 'draft-js'
import {
  Box, Button, IconButton, Input, Tooltip,
} from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MonacoEditorCom from '@monaco-editor/react'
import { useTranslation } from 'react-i18next'
import SettingsIcon from '@mui/icons-material/Settings'
import { useSettingCodeLanguage, useSettingFileTypeAndName } from '../../hooks/use-selector'
import EditorContext from '../../contexts/EditorContext'

function BlockTool({
  readOnly, handleRemove, children,
  handleSetting,
}:{
  readOnly: boolean,
  handleRemove: (e: any) => void,
  children: JSX.Element | JSX.Element[]
  handleSetting?: (e: any) => void,
}): JSX.Element | null {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        {!readOnly && (
        <Box sx={{
          position: 'relative',
          width: '100%',
          height: 0,
        }}
        >
          <Tooltip title={t('Remove') as string} placement="top">
            <IconButton color="warning" onClick={handleRemove}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Tooltip>
          {handleSetting && (
          <Tooltip title={t('Setting') as string} placement="top">
            <IconButton color="info" onClick={handleSetting}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          )}
        </Box>
        )}
        {children}
      </Box>
    </Box>
  )
}
function Code({
  handleCodeSetting,
  handleCodeChanged,
  setTempReadOnly,
  readOnly,
  handleRemove,
  data,
}:{
  handleCodeSetting: (e: any) => void,
  handleCodeChanged: (code: string) => void,
  setTempReadOnly: (readOnly: boolean) => void,
  handleRemove: (e: any) => void,
  readOnly: boolean,
  data: any
}) {
  console.log(data)
  const [editor, setEditor] = useState<any>(null)
  const container = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(300)
  useEffect(() => {
    if (editor && container.current) {
      const updateHeight = () => {
        // setHeight((editor.getModel().getLineCount() + 1) * 22)
      }
      editor.onDidContentSizeChange(updateHeight)
    }
  }, [editor])

  return (
    <BlockTool handleSetting={handleCodeSetting} readOnly={readOnly} handleRemove={handleRemove}>
      <Box
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onFocus={() => { setTempReadOnly(true) }}
        onBlur={() => setTempReadOnly(false)}
        width="80%"
        ref={container}
      >
        <MonacoEditorCom
          onMount={(parEditor) => {
            setEditor(parEditor)
          }}
          options={{
            readOnly,
            fontSize: 16,
          }}
          defaultValue={data.code}
          onChange={(v) => {
            handleCodeChanged(v ?? '')
          }}
        // theme="vs-dark"
          language={data.language ?? 'text'}
          height={height}
        />
      </Box>
    </BlockTool>

  )
}

function Image({
  handleImgClick, readOnly, handleRemove, data,
  handleFileSetting,
}:
{ handleImgClick: () => Promise<void>, readOnly: boolean,
  handleFileSetting: (e: any) => void,
  handleRemove: (e: any) => void, data: any }): JSX.Element | null {
  return (
    <BlockTool handleSetting={handleFileSetting} readOnly={readOnly} handleRemove={handleRemove}>

      <img
        style={{
          maxHeight: data.maxHeight,
          maxWidth: data.maxWidth,
          display: 'block',
          ...(!readOnly ? { cursor: 'pointer' } : {}),
        }}
        src={data.src}
        alt={data.alt}
        height={data.height}
        width={data.width}
      />
      <span>{data.displayName || data.alt}</span>
    </BlockTool>
  )
}

function File({
  readOnly, handleRemove, handleFileClick, data,
  handleFileSetting,
}:{
  readOnly: boolean,
  handleRemove: (e: any) => void,
  handleFileSetting: (e: any) => void,
  handleFileClick: () => Promise<void>, data: any
}): JSX.Element | null {
  return (
    <BlockTool handleSetting={handleFileSetting} readOnly={readOnly} handleRemove={handleRemove}>
      <Button variant="outlined" onClick={handleFileClick} startIcon={<AttachFileIcon />}>
        {data.displayName || data.fileName}
      </Button>
    </BlockTool>
  )
}

export default function MediaComponent(props: {
  block: ContentBlock;
  contentState: ContentState;
  blockProps: any;
}) {
  const {
    block, contentState, blockProps,
  } = props

  const {
    state, setState, readOnly, setTempReadOnly,
  } = useContext(EditorContext)
  const { settingFileTypeAndName } = useSettingFileTypeAndName()

  // const { foo } = blockProps
  const data = contentState.getEntity(block.getEntityAt(0)).getData()
  const mediaType = data.type

  const handleCodeChanged = useCallback((newValue: string) => {
    state.editorState
      .getCurrentContent()
      .mergeEntityData(block.getEntityAt(0), {
        code: newValue,
      })

    setState({
      editorState: state.editorState,
    })
  }, [block, setState, state.editorState])

  const handleFileSetting = useCallback(async () => {
    const { fileName, fileType, displayName } = await settingFileTypeAndName({
      fileName: data.fileName,
      fileType: data.type as ('image' | 'file'),
      displayName: data.displayName,
    })

    state.editorState
      .getCurrentContent()
      .mergeEntityData(block.getEntityAt(0), {
        type: fileType,
        alt: fileName,
        fileName,
        displayName,
      })

    setState({
      editorState: state.editorState,
    })
  }, [
    block, data.displayName, data.fileName,
    data.type, setState, settingFileTypeAndName,
    state.editorState,
  ])

  const { settingCodeLanguage } = useSettingCodeLanguage()

  const handleCodeSetting = useCallback(async () => {
    const { language } = await settingCodeLanguage({
      language: data.language,
    })
    state.editorState
      .getCurrentContent()
      .mergeEntityData(block.getEntityAt(0), {
        language,
      })

    setState({
      editorState: state.editorState,
    })
  }, [block, data.language, setState, settingCodeLanguage, state.editorState])

  const handleFileClick = useCallback(async () => {
    const a = document.createElement('a')
    a.href = data.src
    a.download = data.fileName
    a.target = '_blank'
    a.click()
  }, [data.fileName, data.src])

  const handleImgClick = useCallback(async () => {
    if (readOnly) { return }

    // const contentState = Modifier.insertText(
    //   editorState.getCurrentContent(),
    //   editorState.getSelection(),
    //   insertionText,
    //   editorState.getCurrentInlineStyle(),
    // );
    const { fileName, fileType, displayName } = await settingFileTypeAndName({
      fileName: data.fileName,
      fileType: data.type as ('image' | 'file'),
      displayName: data.displayName,
    })

    state.editorState
      .getCurrentContent()
      .mergeEntityData(block.getEntityAt(0), {
        type: fileType,
        alt: displayName,
        fileName,
        displayName,
      })

    setState({
      editorState: state.editorState,
    })
  }, [block, data.displayName, data.fileName,
    data.type, readOnly, setState, settingFileTypeAndName, state.editorState])

  const handleRemove = useCallback((e) => {
    e.stopPropagation()

    const currentContentState = state.editorState.getCurrentContent()
    const changedContentState = ContentState.createFromBlockArray(
      currentContentState
        .getBlockMap()
        .toArray()
        .filter((b) => b.getKey() !== block.getKey()),
    )
    const editorState = EditorState.push(state.editorState, changedContentState, 'change-block-data')
    setState({
      editorState,
    })
  }, [block, setState, state.editorState])

  const imageNode = useMemo(() => {
    if (mediaType === 'image') {
      return (
        <Image
          handleFileSetting={handleFileSetting}
          handleImgClick={handleImgClick}
          readOnly={readOnly}
          handleRemove={handleRemove}
          data={data}
        />
      )
    }
    return null
  }, [data, handleFileSetting, handleImgClick, handleRemove, mediaType, readOnly])

  const mediaNode = useMemo(
    () => {
      if (mediaType === 'file') {
      // File(mediaType, readOnly, handleRemove, handleFileClick, data)
        return (
          <File
            handleFileSetting={handleFileSetting}
            readOnly={readOnly}
            handleRemove={handleRemove}
            handleFileClick={handleFileClick}
            data={data}
          />
        )
      }
      return null
    },
    [mediaType, handleFileSetting, readOnly, handleRemove, handleFileClick, data],
  )

  const codeNode = useMemo(() => {
    // https://stackoverflow.com/questions/58898700/how-to-enter-text-in-a-text-input-inside-an-atomic-block
    if (mediaType === 'code') {
      return (
        <Code
          handleCodeSetting={handleCodeSetting}
          handleCodeChanged={handleCodeChanged}
          data={data}
          handleRemove={handleRemove}
          setTempReadOnly={setTempReadOnly}
          readOnly={readOnly}
        />
      )
    }
    return null
  }, [data, handleCodeChanged,
    handleCodeSetting, handleRemove, mediaType, readOnly, setTempReadOnly])

  // debugger
  return (
    <Box style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
    >
      {imageNode}
      {mediaNode}
      {codeNode}
    </Box>
  )
}
