import { NotebookPostData } from '../../types/Notebook';
import moment = require('moment');

export function groupPostsByDays(posts: NotebookPostData[]) {
  let postGroup = [];
  if (! (posts.length > 0) ) { return postGroup };
  let counter = 0;
  let tempTimestamp = posts[0].timestamp;
  let tempArray: NotebookPostData[] = [];
  tempArray.push(posts[0])

  if (! (posts.length > 1) ) {
    postGroup.push(tempArray);
    return postGroup
  }

  do {
    if (moment(tempTimestamp).startOf('day') > moment(posts[counter + 1].timestamp).startOf('day')) {
      tempTimestamp = posts[counter + 1].timestamp;
      postGroup.push(tempArray);
      tempArray = [];
    }
    tempArray.push(posts[counter + 1]);
    counter++;
  }
  while (counter < posts.length - 1);

  if (tempArray.length > 0 ) {
    postGroup.push(tempArray)
  }
  return postGroup;
}
