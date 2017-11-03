import { ThemeProps } from './Theme'

export const stylesFunc = (theme: ThemeProps) => {
  return {
    padding: {
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    paddingWidth184: {
      width: 184,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    paddingWidth30: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    isFavorite: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      overflow: 'visible'
    },
    service: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
    },
    status: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      textAlign: 'center'
    },
    paddingWidth200: {
      width: 200,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    name: {
      width: 185,
      padding: 2,
      color: theme.genericTextColors.textColor,
      cursor: 'pointer',
      fontSize: '116%'
    },
    date: {
      width: 120,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    toolbar: {
      width: 150,
      padding: '2px 10px',
      color: theme.genericTextColors.textColorPale,
      marginLeft: 'auto',
      cursor: 'pointer'
    },
  }
}
