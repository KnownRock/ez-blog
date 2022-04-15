import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          'file.delete.title': 'Delete file',
          'file.delete.description': 'Are you sure you want to delete this file?',
          'folder.delete.title': 'Delete folder',
          'folder.delete.description': 'Are you sure you want to delete this folder?',
          'files.newFile.title': 'New file',
          'files.newFile.placeholder': 'File name',
          'login.s3.url': 'S3 URL',
          'login.s3.backet': 'S3 Bucket',
          'login.s3.accessKey': 'S3 Access Key',
          'login.s3.secretKey': 'S3 Secret Key',
          'files.error': 'Error',
          'Logout.content': 'Are you sure you want to logout?',
          'login.s3.error': 'S3 Login Error',
          'validate.error': 'Validation Error',
          'files.upload.success': 'File uploaded successfully',
        },
      },
      cn: {
        translation: {
          'Write something...': '写点什么...',
          Title: '标题',
          Upload: '上传',
          Delete: '删除',
          Rename: '重命名',
          root: '根目录',
          Folders: '文件夹',
          Files: '文件',
          Download: '下载',
          'Upload folder': '上传文件夹',
          'New name': '新名称',
          Ok: '确定',
          Cancel: '取消',
          'file.delete.title': '删除文件',
          'file.delete.description': '确定要删除这个文件吗？',
          'New File': '新建文件',
          'folder.delete.title': '删除文件夹',
          'folder.delete.description': '确定要删除这个文件夹吗？',
          'files.newFile.title': '新建文件',
          'files.newFile.placeholder': '文件名',
          'Remote Folders': '远程文件夹',
          Edit: '编辑',
          Error: '错误',
          Loading: '加载中',
          Refresh: '刷新',
          'login.s3.url': 'S3 网址',
          'login.s3.backet': 'S3 存储捅',
          'login.s3.accessKey': 'S3 访问密钥',
          'login.s3.secretKey': 'S3 秘密密钥',
          Login: '登录',
          Logout: '登出',
          'files.error': '错误',
          'Access Denied.': '拒绝访问。',
          'Logout.content': '确定要登出吗？',
          'login.s3.error': 'S3 登录失败，请检查输入的信息。',
          'validate.error': '验证错误',
          'The file or directory already exists': '文件或目录已存在',
          Message: '消息',
          'Copy to': '复制到',
          'File saved': '文件已保存',
          Share: '分享',
          'Not implemented': '未实现',
          'Move to': '移动到',
          'Object name contains unsupported characters.': '对象名称包含不支持的字符。',
          'Please input a valid name': '请输入有效的名称',
          'files.upload.success': '文件上传成功',
          Succeed: '成功',
          LastModified: '最后修改',
          'File size': '文件大小',
          'Select upload type': '选择上传类型',
          File: '文件',
          'Select file': '选择文件',
          Clear: '清除',
          'Remove image': '移除图片',
          'Are you sure to remove the image?': '确定要移除图片吗？',
          Export: '导出',
          Import: '导入',
          Save: '保存',
          'Blog exported': '博客已导出',
          More: '更多',
          'Setting code language': '设置代码语言',
          'Programming language': '编程语言',
          'Setting file type and name': '设置文件类型和名称',
          'File name': '文件名',
          'File type': '文件类型',
          'Display file name': '显示文件名',
          image: '图片',
          video: '视频',
          file: '文件',
          Setting: '设置',
          Remove: '移除',
          Preview: '预览',
          Code: '代码',
          'Markdown Block': 'Markdown 块',
          'setting resource path': '设置资源路径',
          'setting export path': '设置导出路径',
          'Code saved': '代码已保存',
          'Setting resource path': '设置资源路径',
          'Setting export path': '设置导出路径',
          Clipboard: '剪贴板',
          'Setting code': '设置代码',

        },
      },
    },
    lng: 'cn', // if you're using a language detector, do not define the lng option
    fallbackLng: 'cn',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })
