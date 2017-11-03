import { connect } from 'react-redux'
import StoryAppViewer from '../components/StoryAppViewer'
import { PRODUCT_TYPES } from '../types/Product'

import { storyViewer as storyViewerTheme } from '../theme/ScTheme'

const mapStateToProps = (state, ownProps) => {
  return {
    stories: state[PRODUCT_TYPES.STORIES].data,
    theme: storyViewerTheme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryAppViewer)

// const mockData = [
//   {
//     id: 1,
//     durationMs: 8000,
//     keyStrokes: [],
//     screenshot: {
//       imageUrl: 'http://unsplash.it/800/600',
//       timeTaken: 1201391239,
//       timeExtracted: 1201399239,
//       width: 800,
//       height: 600,
//       isFavorite: true,
//     }
//   },
//   {
//     id: 2,
//     durationMs: 2000,
//     clicks: [],
//     keyStrokes: [],
//     screenshot: {
//       imageUrl: 'http://unsplash.it/800/600',
//       timeTaken: 1201391239,
//       timeExtracted: 1201399239,
//       width: 800,
//       height: 600,
//       isFavorite: true,
//     }
//   },
//   {
//     id: 3,
//     durationMs: 2000,
//     clicks: [],
//     keyStrokes: [],
//     screenshot: {
//       imageUrl: 'http://unsplash.it/800/600',
//       timeTaken: 1201391239,
//       timeExtracted: 1201399239,
//       width: 800,
//       height: 600,
//       isFavorite: true,
//     }
//   },
//   {
//     id: 4,
//     durationMs: 2000,
//     clicks: [],
//     keyStrokes: [],
//     screenshot: {
//       imageUrl: 'http://unsplash.it/800/600',
//       timeTaken: 1201391239,
//       timeExtracted: 1201399239,
//       width: 800,
//       height: 600,
//       isFavorite: true,
//     }
//   },
// ]
