import * as Dir from '../../../types/Directory'
import * as Repo from './Repo'
import { EntityStatus } from '../../../types/Enums'
import * as IMM  from 'immutable'
import { FiltersData } from '../../../types/Filters'

let idGen = 0;

const now = new Date();

const sortByName = (data: Dir.FileItem[], desc: boolean) => {
  data.sort((x, y) => {
    const fieldX = x.name;
    const fieldY = y.name;
    let result = fieldX > fieldY
      ? 1
      : ( fieldY === fieldX
        ? 0
        : -1);
    result = desc ? -1 * result : result;
    return result;
  })
}

const sortByInfo = (data: Dir.FileItem[], desc: boolean, sortBy: string) => {
  data.sort((x, y) => {
    const fieldX = x.info[sortBy];
    const fieldY = y.info[sortBy];
    ;
    let result = fieldX > fieldY
      ? 1
      : ( fieldY === fieldX
        ? 0
        : -1);
    result = desc ? -1 * result : result;
    return result;
  })
}

const sortDefault = (data: Dir.FileItem[], sortBy: string, desc: boolean) => {
  data.sort((x, y) => {
    const fieldX = x[sortBy].toString();
    const fieldY = y[sortBy].toString();
    let result = fieldX > fieldY
      ? 1
      : ( fieldY === fieldX
        ? 0
        : -1);
    result = desc ? -1 * result : result;
    return result;
  })
}

const cloneDirectoryContent = (directory: Dir.DirectoryItem) => {
  const cloneContent = (IMM.fromJS(directory.content)).toJS();
  cloneContent.forEach((item) => {
    if ((item as Dir.DirectoryItem).content) {
      item.content = [];
    }
  });

  return cloneContent;
}

export let getDate = () => {
  return now.getTime();
}

const fileProto: Dir.FileItem = {
  id: null,
  name: '',
  parentDirectoryId: null,
  type: 'file',
  latestUpdate: 1418302440,
  info: null,
  isFavorite: false,
  hasTranslation: false,
  hasTranscript: false,
  hasNotes: false,
  isRead: false,
  tags: [],
  downloadUrl: 'www.google.com/dl'
}
const dirProto: Dir.DirectoryItem = {
  id: null,
  name: '',
  parentDirectoryId: null,
  type: 'directory',
  latestUpdate: 1418302440,
  info: {
    path: '',
    size: -1,
    dates: {
      created: -1,
      modified: -1,
      accessed: -1
    },
    status: null
  },
  content: [],
  isFavorite: false,
  hasTranslation: false,
  hasTranscript: false,
  hasNotes: false,
  isRead: false,
  tags: [],
}

const getPreview = (extension: string) => {
  let preview;
  switch (extension) {
    case 'jpg':
      preview = 'https://unsplash.it/500/400?image=' + Math.floor((Math.random() * 999));
      break;
    case 'txt':
      preview = Repo.texts[Math.floor((Math.random() * Repo.texts.length))]
      break;
    case 'doc':
    case 'pdf':
      preview = Repo.docs[0];
      break;
    default:
      break;
  }

  return preview;
}

const getStatus = () => {
  const rand = Math.floor((Math.random() * 4));

  let status: EntityStatus;

  switch (rand) {
    case 0:
      status = EntityStatus.created;
      break;
    case 1:
      status = EntityStatus.modified;
      break;
    case 2:
      status = EntityStatus.accessed;
      break;
    case 3:
      status = EntityStatus.deleted;
      break;
    default:
      break;
  }

  return status;
};

const getFileInfo = (path: string, extension: string): Dir.FileInfo => {
  const size = Math.floor(Math.random() * (50000 - 5)) + 5;
  const preview = getPreview(extension);

  const info = {
    extension: extension,
    size: size,
    dates: {
      created: getDate(),
      modified: getDate(),
      accessed: getDate()
    },
    preview: preview,
    status: getStatus(),
    path: path
  }

  return info;
}

const getDirInfo = (path: string): Dir.DirectoryInfo => {
  const size = Math.floor(Math.random() * (50000 - 5)) + 5;

  const info = {
    size: size,
    dates: {
      created: getDate(),
      modified: getDate(),
      accessed: getDate()
    },
    status: getStatus(),
    path: path
  }

  return info;
}

const fillFiles = (parentDir: Dir.DirectoryItem) => {
  const length = Math.floor(Math.random() * 20);
  for (let i = 0; i < length; i++) {
    const extension = Repo.fileExtentions[Math.floor(Math.random() * Repo.fileExtentions.length)];
    const name = Repo.fileNames[Math.floor(Math.random() * Repo.fileNames.length)];
    const file = (IMM.fromJS(fileProto)).toJS();
    file.id = (++idGen).toString();
    file.name = `${name}_${file.id}.${extension}`;
    file.latestUpdate = getDate();
    file.tags = ['tag' + ((idGen + 1) * 2)];
    file.isFavorite = Math.floor(Math.random() * 5) % 2 === 0;
    file.hasTranslation = Math.floor(Math.random() * 5) % 2 === 0;
    file.hasTranscript = Math.floor(Math.random() * 5) % 2 === 0;
    file.hasNotes = Math.floor(Math.random() * 5) % 2 === 0;
    const path = `${parentDir.info.path}\\${file.name}`;
    file.info = getFileInfo(path, extension);
    file.parentDirectoryId = parentDir.id;
    file.downloadUrl = `www.downloadsite.com/${file.name}`;
    parentDir.content.push(file);
  }
}

const fillDirs = (parentDir: Dir.DirectoryItem, currentlevel: number) => {
  if (currentlevel === 4) {
    return;
  }

  const length = Math.floor(Math.random() * 8);
  for (let i = 0; i < length; i++) {
    const dir = (IMM.fromJS(dirProto)).toJS();
    dir.id = (++idGen).toString();
    dir.name = Repo.dirNames[Math.floor(Math.random() * Repo.dirNames.length)];
    dir.latestUpdate = getDate();
    dir.tags = [{id: ((idGen + 1) * 2).toString(), text: 'tag' + ((idGen + 1) * 2)}];
    dir.isFavorite = Math.floor(Math.random() * 5) % 2 === 0;

    dir.parentDirectoryId = parentDir.id;

    const path = !parentDir.id ? dir.name : `${parentDir.info.path}\\${dir.name}`;
    dir.info = getDirInfo(path);

    parentDir.content.push(dir);
    fillDirs(dir, currentlevel + 1);
    fillFiles(dir);
  }
}

const createDrive = (drivename: string) => {
  const drive = (IMM.fromJS(dirProto)).toJS();
  drive.id = (++idGen).toString();
  drive.name = drivename;
  drive.info = getDirInfo(drivename);

  fillDirs(drive, 0);
  fillFiles(drive);
  return drive;
}
const DIRECTORY_TREE: Dir.DirectoryItem[] = [
  createDrive('c:'),
  createDrive('d:'),
  createDrive('e:'),
]

const getFilesList = (dir: Dir.DirectoryItem, fileList: Dir.FileItem[]) => {
  dir.content.forEach(item => {
    if (item.type === 'file') {
      fileList.push(item as Dir.FileItem);
    } else {
      getFilesList(item as Dir.DirectoryItem, fileList);
    }
  })
}

const FILE_LIST = [];

DIRECTORY_TREE.forEach(drive => {
  getFilesList(drive, FILE_LIST)
});

export const demoData = {
  directoryTree: DIRECTORY_TREE,
  fileList: FILE_LIST,
  totalCount: FILE_LIST.length,
  nextFileListPageNumber: 1,
  filters: undefined,
  metadata: {
    timerIndicator: getDate(),
    updateTimeIndicator: 200000,
    extractionDate: getDate()
  }
}

/////////////
////////////// Data Getters ///////////////
//////////////
export const getFiles = (nextPageNumber: number,
                         pageSize: number,
                         filters: FiltersData) => {
  const data = FILE_LIST.filter((item) => {
    return !filters ||
      filters.boolean && !filters.boolean.length ||
      filters.boolean && filters.boolean.find(x => x === item.appSymbol.key);
  });

  const sortBy = filters && filters.sort ? filters.sort.sortBy : undefined;
  const desc = filters && filters.sort ? filters.sort.desc : undefined;

  if (sortBy) {
    switch (sortBy) {
      case 'name':
        sortByName(data, desc);
        break;
      case 'extension':
      case 'path':
      case 'size':
        sortByInfo(data, desc, sortBy);
        break;
      default:
        sortDefault(data, sortBy, desc);
        break;
    }
  }

  const totalCount = data.length;

  const slicedData = {
    fileList: data.slice((nextPageNumber - 1) * pageSize, nextPageNumber * pageSize),
    nextPageNumber: nextPageNumber + 1,
    totalCount: totalCount,
    filters: filters || null,
    metadata: {
      timerIndicator: getDate(),
      updateTimeIndicator: 200000,
      extractionDate: getDate()
    }
  }

  return slicedData;
}

// Get contents of a directory given a path recusrively. In each round, we enter
// 1 level deeper and get the current paths's content. The path is given as a string array
// representing the path's nodes:
//
const reducePathArray = (pathArray: string[], directoryTree: Dir.FileSystemItem[]) => {
  if (!pathArray) {
    const dir = (IMM.fromJS(dirProto)).toJS();
    dir.content = DIRECTORY_TREE;
    return cloneDirectoryContent(dir);
  }
  const dirName = pathArray[0];

  const found = directoryTree.find(x => x.name === dirName);

  if (!found) {
    return null;
  }

  if ((found as Dir.DirectoryItem).content) {
    if (pathArray.length === 1) {
      //
      // As this mocks a real life situation, we want to return only this level's children
      // and dispose of the next generation's children, if exist. We deep clone the children
      // array and remove all directory content, without killing the source DIRECTORY_TREE
      //
      const cloneContent = cloneDirectoryContent(found as Dir.DirectoryItem);

      return cloneContent;
    } else {
      return reducePathArray(pathArray.slice(1), (found as Dir.DirectoryItem).content)
    }
  } else {
    //
    // We're here by mistake, as this item is a FILE, not a DIORECTORY. We return null:
    //
    return null;
  }
}

export const pathToStringArray = (path: string): string[] => {
  const arr = path ? path.split('\\') : null;

  return arr;
}

export const getItemsByPath = (path: string) => {
  const pathArray = pathToStringArray(path);

  const items = reducePathArray(pathArray, DIRECTORY_TREE);

  return {
    directoryTree: items,
    path: path,
    metadata: {
      timerIndicator: getDate(),
      updateTimeIndicator: 200000,
      extractionDate: getDate()
    }
  }
}

export const getFilePathById = (id: Dir.FileId) => {
  const file = FILE_LIST.find(x => x.id === id);
  const path = file && file.info ? file.info.path : null;
  return path;
}

export const getFileByPath = (path: string) => {
  const file = FILE_LIST.find(x => x.info.path === path);
  return file;
}

//
// For Testing:
//
export const getItemsByPathTest = (path: string) => {

  let newItems = [IMM.fromJS(FILE_LIST[0]).toJS()];
  newItems[0].info.preview = 'preview';
  newItems[0].info.path = `${path}\\${newItems[0].name}`;
  newItems[0].isFavorite = false;
  newItems[0].isRead = false;

  return {
    directoryTree: newItems,
    path: path,
    metadata: {
      timerIndicator: getDate(),
      updateTimeIndicator: 200000,
      extractionDate: getDate()
    }
  }
}

export const getTestDirectoryTree = (driveName: string) => {
  const Cdrive = createDrive(driveName);
  const file = (IMM.fromJS(fileProto)).toJS();
  file.name = 'filename';
  file.info = getFileInfo(`c:\\${file.name}.${'txt'}`, 'txt');
  file.name = `${file.name}.${file.info.extension}`;

  // We need at least one tag:
  file.tags = file.tags.length ? file.tags : [{text: 'tag', id: '1'}];

  Cdrive.content = [file];

  return Cdrive;
}
