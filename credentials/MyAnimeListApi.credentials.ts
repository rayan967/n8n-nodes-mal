import {
	ICredentialType,
	IAuthenticateGeneric,
	INodeProperties, Icon,
} from 'n8n-workflow';

export class MyAnimeListApi implements ICredentialType {
	name = 'myAnimeListApi';
	displayName = 'MyAnimeList API';
	documentationUrl = 'https://myanimelist.net/apiconfig/references/api/v2';
	icon: Icon = 'file:icons/myanimelist.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-MAL-CLIENT-ID': '={{$credentials.clientId}}',
			},
		},
	};
}
