import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

import './UserList.css';


const UserList = ({ bot_users, match }) => {

	useEffect(() => {

	}, [bot_users])

	return (

		<div>
			<p><li>
				{bot_users.map((bot_user, i) => <ul><Link to={`${match.url}/${bot_user}`}>{bot_user}</Link></ul>)}

			</li></p>
		</div>
	)
}

export default UserList;