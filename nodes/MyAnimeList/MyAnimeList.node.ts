import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	IRequestOptions,
} from 'n8n-workflow';

export class MyAnimeList implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MyAnimeList',
		name: 'myAnimeList',
		icon: 'file:myanimelist.svg',
		group: ['transform'],
		version: 1,
		description: 'Fetch anime data from MyAnimeList API',
		defaults: {
			name: 'MyAnimeList',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'myAnimeListApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				required: true,
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			const username = this.getNodeParameter('username', i) as string;
			const limit = this.getNodeParameter('limit', i) as number;

			const options: IRequestOptions  = {
				method: 'GET',
				uri: `https://api.myanimelist.net/v2/users/${username}/animelist`,
				qs: {
					limit,
					fields: 'list_status(score)',
				},
				headers: {
					Accept: 'application/json',
				},
				json: true,
			};

			const response = await this.helpers.requestWithAuthentication.call(
				this,
				'myAnimeListApi',
				options,
			);

			for (const entry of response.data) {
				const transformed = {
					id: entry.node.id,
					title: entry.node.title,
					status: entry.list_status?.status,
					score: entry.list_status?.score,
					epsWatched: entry.list_status?.num_watched_episodes ?? entry.list_status?.num_episodes_watched,
				};
				returnData.push(transformed);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
