import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from '../Theme'
import { PasswordAction, ConflictingPassword } from '../../../types/Accounts'

import ConflictingPw from './ConflictingPassword';
import { ConflictingPwProps } from './ConflictingPassword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ConflictingPwProps = {
    key: 0,
    conflictingPassword: {
      value: 'pw',
      actionStatus: PasswordAction.extracted,
      actionDate: 0
    },
    onConflictingPasswordClick: (password: ConflictingPassword) => null,
    theme: Theme.defaultTheme
  }

  ReactDOM.render(<ConflictingPw {...props}/>, div);
});
