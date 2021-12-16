import {SingUp} from '../components/SingUp';
import {SingIn} from '../components/SingIn';
import {NewMailing} from '../components/NewMailing';
import {MailingLists} from '../components/MailingLists';

export const Public = [
	{
		path: '/singIn',
		component: SingIn,
		exact: true,
		index: 1,
	},
	{
		path: '/singUp',
		component: SingUp,
		exact: true,
		index: 2,
	},
]
export const Private = [
	{
		path: '/newMailing',
		component: NewMailing,
		exact: true,
		index: 1,
	},
	{
		path: '/mailingLists',
		component: MailingLists,
		exact: true,
		index: 2,
	},

]
