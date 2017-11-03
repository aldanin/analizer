export const ADD_TAG_ACTION = 'addTagCallback';

export interface ActionsArray {
  actions: ActionItem[];
}

export interface ActionItem {
  primaryText: string;
  icon: string;
  callbackKey: string;
}

export const actionMenu: ActionsArray = {
  actions: [{
    primaryText: 'Add tag',
    icon: 'base_icons icon_tag',
    callbackKey: ADD_TAG_ACTION,
  },
  //   {
  //   primaryText: 'Add to notebook',
  //   icon: 'base_icons icon_notebook',
  //   callbackKey: 'addToNotebookCallback',
  // },
    {
    primaryText: 'Mark as read',
    icon: 'base_icons icon_mark_as_unread',
    callbackKey: 'markAsReadCallback',
  }, {
    primaryText: 'Mark as unread',
    icon: 'base_icons icon_mark_as_unread',
    callbackKey: 'markAsUnreadCallback',
  },
  //   {
  //   primaryText: 'Translate',
  //   icon: 'base_icons icon_translate',
  //   callbackKey: 'translateCallback',
  // }, {
  //   primaryText: 'Transcript',
  //   icon: 'base_icons icon_doc_sound',
  //   callbackKey: 'transcriptCallback',
  // }, {
  //   primaryText: 'Export',
  //   icon: 'base_icons icon_share',
  //   callbackKey: 'exportCallback',
  // },
  ]
}
