import {
	Icon,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MyAnimeListOAuth2Api implements ICredentialType {
	name = 'myAnimeListOAuth2Api';
	displayName = 'MyAnimeList OAuth2 API';
	documentationUrl = 'https://myanimelist.net/apiconfig/references/authorization';
	extends = ['oAuth2Api'];
	icon: Icon = 'file:icons/myanimelist.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://myanimelist.net/v1/oauth2/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://myanimelist.net/v1/oauth2/token',
		},
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'pkce',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
		{
			displayName:
				'Make sure to register your application and redirect URI on MyAnimeList. You must use the same redirect URI here and in their developer portal.',
			name: 'apiNotice',
			type: 'notice',
			default: '',
		},
	];
}
