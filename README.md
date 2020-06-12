# COMPONENTS
<details>
<summary>Agents</summary>

			Service Panel:{
				Chat: { InfoBar,
						Messages: {
							Message
							},
						Input:{
							SuggestionPopUp,s
							Voice: {
								Record,
								VAD
							},
							Video: {
								Record,
								VAD
							},
							Image: {
								Camera,
								OtherInput
							},
							CallAgent: {
								Voice,
								Video
							}
						}
					}
				ButtonPanel: {
					Agent/BotButton
				}
				UserList: {
					NameDisplay,
					Channel Icon (Social Media),
					CallWaiting/AwaitingAgentReply/AwaitingCustomerReply/Finished Icon
					}
			}
</details>

<details>
<summary>Customers</summary>

			Chat: { InfoBar,
					Messages: {
						Message
						},
					Input:{
						SuggestionPopUp,
						Voice: {
							Record,
							VAD
						},
						Video: {
							Record,
							VAD
						},
						Image: {
							Camera,
							OtherInput
						},
						CallAgent: {
							Voice,
							Video
						}
					}
				}

</details>

# STATES

<details>
<summary>PERSONAL</summary>

			{
				name : '', 
				socket : {},
				id : '', 
				chatId : '' //agent use mostly
			}

</details>


<details>
<summary>USERS</summary>

			{
				users: [] // array of objects containing user details
				bot_users : [],  // id only
				agent_users : [],  // id only
			}

</details>

<details>
<summary>MESSAGES</summary>
			{
				message: '' //for on key sending
				messages: [] array of message objects
			}
</details>

# ACTIONS

<details>
<summary> PERSONAL</summary>

			-set name
			-set socket
			-set id
			-set chatid
</details>


<details>
<summary> USERS</summary>

			-set bot users
			-set agent users
			-add user
			-remove user
</details>


<details>
<summary> MESSAGES</summary>

			-set message
			-add message
			-load messages
			
</details>

# LISTENERS
<details>

<summary>Click to expand </summary>

			//DISPLAY NEW MESSAGE FROM OTHER USER
			socket.on('addMessageResponse', (content) => {

			//UPDATE USER LIST FOR AGENT
			socket.on('addUserResponse', ({user, name}) => {

			//JOIN ROOM NOTIFICATION
			socket.on('joinResponse', ({id, name}) => {
			//LOAD OLD MESSAGES ON ROOM JOIN
			socket.on('getMessagesByRoomIdResponse', ({content}) => {

			//FILTER MESSAGES BY TYPE
			content.filter(x => x.isImage != undefined).forEach((message) => {


			//LOAD USER LISTS ON SERVICE PANEL LOAD
			socket.on('getAgentUsersResponse', ({ users }) => {

			socket.on('getBotUsersResponse', ({ users }) => {


			//GET AUDIO DATA FROM ID
			socket.on('addAudioResponse', (audioPayload) => {


			//PUT AUDIO DATA INTO MESSAGE DISPLAY
			socket.on('getAudioResponse', ({ data }) => {

</details>